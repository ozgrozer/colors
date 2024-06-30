import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import clx from '@functions/clx'
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

          return (
            <div
              key={key}
              className={styles.content}
            >
              <SyntaxHighlighter
                style={oneDark}
                language={tab.id}
                className={styles.syntaxHighlighter}
              >
                {colorVariables[tab.id]}
              </SyntaxHighlighter>
            </div>
          )
        })
      }
    </div>
  )
}
