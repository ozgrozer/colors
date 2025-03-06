import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import clx from '@functions/clx'
import CopyButton from './CopyButton'
import modalStyles from '@styles/Modal.module.scss'
import { useAppContext } from '@contexts/AppContext'
import styles from '@styles/ExportModalTabs.module.scss'
import generateColorVariables from '@functions/generateColorVariables'
import { LLMChatService } from '@services/ChatService'

export default () => {
  const { state } = useAppContext()
  const { colors, llmConfig, useLLM } = state

  const tabs = [
    { id: 'css', title: 'CSS' },
    { id: 'scss', title: 'SCSS' },
    { id: 'js', title: 'JS' },
    { id: 'shadcn', title: 'ShadCN' }
  ]
  const [activeButtonKey, setActiveButtonKey] = useState(0)
  const colorVariables = generateColorVariables(colors)
  const [shadcnStyles, setShadcnStyles] = useState(null)
  const [isLoadingShadcn, setIsLoadingShadcn] = useState(false)
  const [shadcnError, setShadcnError] = useState(null)

  // Check if LLM is properly configured
  const isLLMConfigured = useLLM && llmConfig?.endpoint && llmConfig?.apiKey;

  // Function to generate ShadCN styles
  const generateShadcnStyles = async () => {
    if (shadcnStyles) return; // Already generated
    
    setIsLoadingShadcn(true);
    setShadcnError(null);
    
    try {
      // Create LLMChatService instance with the current settings
      const llmService = new LLMChatService({
        endpoint: llmConfig?.endpoint || '',
        apiKey: llmConfig?.apiKey || ''
      });
      
      // Generate ShadCN styles
      const result = await llmService.generateShadCNStyles(colors);
      
      if (result.success) {
        setShadcnStyles(result.stylesContent);
      } else {
        setShadcnError(result.message);
      }
    } catch (error) {
      console.error('Error generating ShadCN styles:', error);
      setShadcnError(`Failed to generate ShadCN styles: ${error.message}`);
    } finally {
      setIsLoadingShadcn(false);
    }
  };

  // When the ShadCN tab is selected, generate styles if needed
  const handleTabChange = (key) => {
    setActiveButtonKey(key);
    if (tabs[key].id === 'shadcn' && !shadcnStyles && !isLoadingShadcn && isLLMConfigured) {
      generateShadcnStyles();
    }
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.header}>
        {
          tabs.map((tab, key) => {
            return (
              <button
                key={key}
                onClick={() => handleTabChange(key)}
                className={clx(styles.button, key === activeButtonKey ? styles.active : '')}
              >
                {tab.title}
              </button>
            )
          })
        }
      </div>

      {
        tabs.map((tab, key) => {
          if (key !== activeButtonKey) return null

          let content;
          let language = tab.id;
          
          if (tab.id === 'shadcn') {
            language = 'css';
            
            if (!isLLMConfigured) {
              content = 'To generate ShadCN styles, you need to enable and configure the external LLM in Assistant Settings.\n\nPlease go to the chat icon in the header, click the settings icon, and configure your LLM settings.';
            } else if (isLoadingShadcn) {
              content = 'Generating ShadCN styles...';
            } else if (shadcnError) {
              content = `Error: ${shadcnError}\n\nMake sure you have enabled "Use External LLM" and configured the API endpoint and key in the Assistant Settings.`;
            } else {
              content = shadcnStyles || 'Click the "Generate ShadCN Styles" button to create styles.';
            }
            
            return (
              <div key={key} className={modalStyles.content}>
                {!isLoadingShadcn && !shadcnError && !shadcnStyles && isLLMConfigured && (
                  <button 
                    className={styles.generateButton}
                    onClick={generateShadcnStyles}
                    disabled={isLoadingShadcn}
                  >
                    Generate ShadCN Styles
                  </button>
                )}
                
                <SyntaxHighlighter
                  showLineNumbers
                  style={oneDark}
                  language={language}
                  className={modalStyles.syntaxHighlighter}
                >
                  {content}
                </SyntaxHighlighter>
                
                {shadcnStyles && <CopyButton text={shadcnStyles} />}
              </div>
            );
          }
          
          content = colorVariables[tab.id];
          
          return (
            <div
              key={key}
              className={modalStyles.content}
            >
              <CopyButton text={content} />

              <SyntaxHighlighter
                showLineNumbers
                style={oneDark}
                language={language}
                className={modalStyles.syntaxHighlighter}
              >
                {content}
              </SyntaxHighlighter>
            </div>
          )
        })
      }
    </div>
  )
}
