import { useState, useRef, useEffect } from 'react'
import { MdClose, MdAdd, MdRemove } from 'react-icons/md'
import Draggable from 'react-draggable'
import { PiPaperPlaneTilt, PiGear, PiArrowLeft } from 'react-icons/pi'

import styles from '@styles/ChatModal.module.scss'
import { useAppContext } from '@contexts/AppContext'
import { createChatService } from '@services/ChatService'
import ntc from '@functions/ntc'

export default ({ modalIsOpen, closeModal }) => {
  const { state, setState } = useAppContext()
  const { colors, chatHistory = [], useLLM = false, llmConfig = {} } = state
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [localUseLLM, setLocalUseLLM] = useState(useLLM)
  const [localEndpoint, setLocalEndpoint] = useState(llmConfig.endpoint || '')
  const [localApiKey, setLocalApiKey] = useState(llmConfig.apiKey || '')
  const [selectedColors, setSelectedColors] = useState({})
  const chatContainerRef = useRef(null)
  const nodeRef = useRef(null) // Required by react-draggable in React 18
  const chatService = useRef(createChatService(useLLM, llmConfig))

  // Load settings from localStorage when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Load useLLM setting
        const storedUseLLM = localStorage.getItem('useLLM')
        if (storedUseLLM !== null) {
          setLocalUseLLM(JSON.parse(storedUseLLM))
        }
        
        // Load llmConfig settings
        const storedLLMConfig = localStorage.getItem('llmConfig')
        if (storedLLMConfig !== null) {
          const config = JSON.parse(storedLLMConfig)
          setLocalEndpoint(config.endpoint || '')
          setLocalApiKey(config.apiKey || '')
        }
      } catch (error) {
        console.error('Error loading LLM settings from localStorage:', error)
      }
    }
  }, [])

  // Update chat service if useLLM or llmConfig changes
  useEffect(() => {
    chatService.current = createChatService(useLLM, llmConfig)
    setLocalUseLLM(useLLM)
    setLocalEndpoint(llmConfig.endpoint || '')
    setLocalApiKey(llmConfig.apiKey || '')
  }, [useLLM, llmConfig])

  // Scroll to bottom when chat history changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory])

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return
    
    // Add user message to chat history
    const userMessage = {
      isUser: true,
      message: message.trim(),
      timestamp: new Date().toISOString()
    }
    
    const updatedChatHistory = [...chatHistory, userMessage];
    
    setState(prevState => ({
      chatHistory: updatedChatHistory
    }))
    
    // Clear input after sending
    setMessage('')
    setIsLoading(true)
    
    try {
      // Process message with chat service, passing in the current chat history
      const response = await chatService.current.processMessage(
        userMessage.message, 
        colors,
        updatedChatHistory
      )
      
      // Add assistant response to chat history
      const assistantMessage = {
        isUser: false,
        message: response.message,
        suggestedColors: response.suggestedColors,
        timestamp: new Date().toISOString()
      }

      // Add the assistant's response to chat history
      setState(prevState => ({
        chatHistory: [...prevState.chatHistory, assistantMessage]
      }))

      // Reset selected colors for the new message
      setSelectedColors({})
    } catch (error) {
      console.error('Error processing message:', error)
      
      // Add error message to chat history
      const errorMessage = {
        isUser: false,
        message: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date().toISOString()
      }
      
      setState(prevState => ({
        chatHistory: [...prevState.chatHistory, errorMessage]
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleColorSelection = (messageIndex, colorIndex) => {
    const key = `${messageIndex}-${colorIndex}`
    setSelectedColors(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const isColorInPalette = (hexColor) => {
    // Check if the color is already in the palette or has a similar name
    const colorName = ntc.name(hexColor)[1]
    
    return colors.some(existingColor => {
      const existingColorName = ntc.name(existingColor)[1]
      return existingColor === hexColor || existingColorName === colorName
    })
  }

  const handleAddColors = (messageIndex) => {
    // Get all selected colors for this message
    const selectedForMessage = Object.entries(selectedColors)
      .filter(([key, isSelected]) => isSelected && key.startsWith(`${messageIndex}-`))
      .map(([key]) => {
        const colorIndex = parseInt(key.split('-')[1])
        return chatHistory[messageIndex].suggestedColors[colorIndex].hex
      })
    
    // Filter out colors that are already in the palette
    const newColors = selectedForMessage.filter(color => !isColorInPalette(color))
    
    if (newColors.length > 0) {
      setState(prevState => ({
        colors: [...prevState.colors, ...newColors]
      }))
    }
  }

  const handleRemoveColors = (messageIndex) => {
    // Get all selected colors for this message
    const selectedForMessage = Object.entries(selectedColors)
      .filter(([key, isSelected]) => isSelected && key.startsWith(`${messageIndex}-`))
      .map(([key]) => {
        const colorIndex = parseInt(key.split('-')[1])
        return chatHistory[messageIndex].suggestedColors[colorIndex].hex
      })
    
    // Filter out colors that are in the palette
    const colorsToRemove = selectedForMessage.filter(color => isColorInPalette(color))
    
    if (colorsToRemove.length > 0) {
      setState(prevState => ({
        colors: prevState.colors.filter(color => !colorsToRemove.includes(color))
      }))
    }
  }

  const openSettings = () => setShowSettings(true)
  const closeSettings = () => setShowSettings(false)
  
  const saveSettings = () => {
    // Update state
    setState({
      useLLM: localUseLLM,
      llmConfig: {
        endpoint: localEndpoint,
        apiKey: localApiKey
      }
    })
    
    // Save settings to localStorage
    localStorage.setItem('useLLM', JSON.stringify(localUseLLM))
    localStorage.setItem('llmConfig', JSON.stringify({
      endpoint: localEndpoint,
      apiKey: localApiKey
    }))
    
    closeSettings()
  }

  if (!modalIsOpen) return null;

  return (
    <Draggable 
      nodeRef={nodeRef} 
      handle=".handle"
      defaultPosition={{x: 100, y: 100}}
    >
      <div 
        ref={nodeRef} 
        className={styles.draggableWrapper}
      >
        <div className={styles.draggableContainer}>
          {!showSettings ? (
            // Chat UI
            <>
              <div className={`${styles.modalHeader} handle`}>
                <div className={styles.title}>
                  Color Assistant
                </div>
                <div className={styles.headerButtons}>
                  <button
                    type='button'
                    onClick={openSettings}
                    className={styles.settingsButton}
                  >
                    <PiGear />
                  </button>
                  <button
                    type='button'
                    onClick={closeModal}
                    className={styles.closeButton}
                  >
                    <MdClose />
                  </button>
                </div>
              </div>

              <div className={styles.modalContent}>
                <div className={styles.chatContainer} ref={chatContainerRef}>
                  {chatHistory.length === 0 ? (
                    <div className={styles.emptyChat}>
                      <p>Ask me about color suggestions or palette advice!</p>
                    </div>
                  ) : (
                    chatHistory.map((chat, messageIndex) => (
                      <div 
                        key={messageIndex} 
                        className={`${styles.chatMessage} ${chat.isUser ? styles.userMessage : styles.assistantMessage}`}
                      >
                        <div className={styles.messageContent}>
                          {chat.isUser ? chat.message : (
                            <div dangerouslySetInnerHTML={{ __html: chat.message }}></div>
                          )}
                        </div>
                        {!chat.isUser && chat.suggestedColors && chat.suggestedColors.length > 0 && (
                          <div className={styles.suggestedColorsContainer}>
                            <div className={styles.suggestedColors}>
                              {chat.suggestedColors.map((color, colorIndex) => {
                                const isSelected = selectedColors[`${messageIndex}-${colorIndex}`]
                                const isInPalette = isColorInPalette(color.hex)
                                
                                return (
                                  <div 
                                    key={colorIndex} 
                                    className={`${styles.colorBox} ${isSelected ? styles.selected : ''}`}
                                    onClick={() => toggleColorSelection(messageIndex, colorIndex)}
                                  >
                                    <div 
                                      className={styles.colorPreview} 
                                      style={{ backgroundColor: color.hex }}
                                    />
                                    {isInPalette && (
                                      <div className={styles.inPaletteIndicator} title="Already in palette">
                                        ✓
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            <div className={styles.colorActionButtons}>
                              <button 
                                className={styles.addButton}
                                onClick={() => handleAddColors(messageIndex)}
                                title="Add selected colors to palette"
                              >
                                <MdAdd /> Add
                              </button>
                              <button 
                                className={styles.removeButton}
                                onClick={() => handleRemoveColors(messageIndex)}
                                title="Remove selected colors from palette"
                              >
                                <MdRemove /> Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                  {isLoading && (
                    <div className={`${styles.chatMessage} ${styles.assistantMessage}`}>
                      <div className={styles.loadingIndicator}>
                        <span>•</span><span>•</span><span>•</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className={styles.inputContainer}>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about colors or palette advice..."
                    className={styles.chatInput}
                    disabled={isLoading}
                  />
                  <button 
                    onClick={handleSendMessage}
                    className={styles.sendButton}
                    disabled={!message.trim() || isLoading}
                  >
                    <PiPaperPlaneTilt />
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Settings UI
            <>
              <div className={`${styles.modalHeader} handle`}>
                <div className={styles.titleWithBack}>
                  <button
                    type='button'
                    onClick={closeSettings}
                    className={styles.backButton}
                  >
                    <PiArrowLeft />
                  </button>
                  <div className={styles.title}>
                    Assistant Settings
                  </div>
                </div>
                <button
                  type='button'
                  onClick={closeModal}
                  className={styles.closeButton}
                >
                  <MdClose />
                </button>
              </div>

              <div className={styles.modalContent}>
                <div className={styles.settingsForm}>
                  <div className={styles.settingItem}>
                    <label className={styles.settingLabel}>
                      <input
                        type="checkbox"
                        checked={localUseLLM}
                        onChange={(e) => setLocalUseLLM(e.target.checked)}
                      />
                      Use External LLM
                    </label>
                    <p className={styles.settingDescription}>
                      When enabled, the assistant will use an external LLM API for responses.
                      When disabled, it will use a built-in rule-based system.
                    </p>
                  </div>
                  
                  {localUseLLM && (
                    <>
                      <div className={styles.settingItem}>
                        <label className={styles.settingLabel}>
                          LLM API Endpoint
                        </label>
                        <input
                          type="text"
                          value={localEndpoint}
                          onChange={(e) => setLocalEndpoint(e.target.value)}
                          placeholder="https://api.example.com/v1/chat/completions"
                          className={styles.settingInput}
                        />
                      </div>
                      
                      <div className={styles.settingItem}>
                        <label className={styles.settingLabel}>
                          API Key
                        </label>
                        <input
                          type="password"
                          value={localApiKey}
                          onChange={(e) => setLocalApiKey(e.target.value)}
                          placeholder="Your API key"
                          className={styles.settingInput}
                        />
                      </div>
                    </>
                  )}
                  
                  <div className={styles.buttonContainer}>
                    <button
                      onClick={closeSettings}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveSettings}
                      className={styles.saveButton}
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Draggable>
  )
} 