import { useState, useContext, createContext, useEffect } from 'react'

const Context = createContext()

export function AppProvider ({ children }) {
  const [state, setState] = useState({
    colors: [],
    palettes: [],
    cookiesLoaded: false,
    selectedPaletteId: '',
    initialColorsUpdated: false,
    // Chat-related state
    chatHistory: [],
    suggestedColors: [],
    useLLM: false,
    llmConfig: {
      endpoint: '',
      apiKey: ''
    }
  })

  // Load LLM settings from localStorage on initialization
  useEffect(() => {
    // Check if we're in a browser environment (not server-side rendering)
    if (typeof window !== 'undefined') {
      try {
        // Load useLLM setting
        const storedUseLLM = localStorage.getItem('useLLM')
        const useLLM = storedUseLLM ? JSON.parse(storedUseLLM) : false
        
        // Load llmConfig settings
        const storedLLMConfig = localStorage.getItem('llmConfig')
        const llmConfig = storedLLMConfig ? JSON.parse(storedLLMConfig) : {
          endpoint: '',
          apiKey: ''
        }
        
        // Update state with stored settings
        setState(prevState => ({
          ...prevState,
          useLLM,
          llmConfig
        }))
      } catch (error) {
        console.error('Error loading LLM settings from localStorage:', error)
      }
    }
  }, [])

  const _setState = updater => {
    if (typeof updater === 'function') {
      setState(prevState => ({
        ...prevState,
        ...updater(prevState)
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        ...updater
      }))
    }
  }

  const value = {
    state,
    setState: _setState
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export function useAppContext () {
  return useContext(Context)
}
