import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import clx from '@functions/clx'
import { useAppContext } from '@contexts/AppContext'
import styles from '@styles/ExportModalTabs.module.scss'

const Css = () => {
  const { state } = useAppContext()
  const { colors } = state
  console.log(colors)

  const code = 'body { color: blue; }'

  return (
    <SyntaxHighlighter
      language='css'
      style={oneDark}
      className={styles.syntaxHighlighter}
    >
      {code}
    </SyntaxHighlighter>
  )
}

const Scss = () => {
  const code = 'body { color: $blue; }'

  return (
    <SyntaxHighlighter
      language='scss'
      style={oneDark}
      className={styles.syntaxHighlighter}
    >
      {code}
    </SyntaxHighlighter>
  )
}

const Js = () => {
  const code = 'console.log("test")'

  return (
    <SyntaxHighlighter
      language='js'
      style={oneDark}
      className={styles.syntaxHighlighter}
    >
      {code}
    </SyntaxHighlighter>
  )
}

export default () => {
  const tabs = [
    {
      id: 'css',
      title: 'CSS',
      Component: Css
    },
    {
      id: 'scss',
      title: 'SCSS',
      Component: Scss
    },
    {
      id: 'js',
      title: 'JS',
      Component: Js
    }
  ]
  const [activeButtonKey, setActiveButtonKey] = useState(0)

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
              <tab.Component />
            </div>
          )
        })
      }
    </div>
  )
}
