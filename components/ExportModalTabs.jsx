import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import clx from '@functions/clx'
import CopyButton from './CopyButton'
import modalStyles from '@styles/Modal.module.scss'
import { useAppContext } from '@contexts/AppContext'
import styles from '@styles/ExportModalTabs.module.scss'
import generateColorVariables from '@functions/generateColorVariables'

export default () => {
  const { state } = useAppContext()
  const { colors } = state

  const tabs = [
    { id: 'css', title: 'CSS' },
    { id: 'scss', title: 'SCSS' },
    { id: 'js', title: 'JS' }
  ]
  const [activeButtonKey, setActiveButtonKey] = useState(0)
  const colorVariables = generateColorVariables(colors)

  return (
    <div className={styles.tabs}>
      <div className={styles.header}>
        {
          tabs.map((tab, key) => {
            return (
              <button
                key={key}
                onClick={() => setActiveButtonKey(key)}
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

          const code = colorVariables[tab.id]

          return (
            <div
              key={key}
              className={modalStyles.content}
            >
              <CopyButton text={code} />

              <SyntaxHighlighter
                showLineNumbers
                style={oneDark}
                language={tab.id}
                className={modalStyles.syntaxHighlighter}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          )
        })
      }
    </div>
  )
}
