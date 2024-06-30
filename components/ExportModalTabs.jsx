import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import clx from '@functions/clx'
import styles from '@styles/ExportModalTabs.module.scss'

const Css = () => {
  const code = 'body { color: blue; }'

  return (
    <div>
      <SyntaxHighlighter
        style={oneDark}
        language='css'
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

const Scss = () => {
  const code = 'body { color: $blue; }'

  return (
    <div>
      <SyntaxHighlighter
        style={oneDark}
        language='scss'
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

const Js = () => {
  const code = 'console.log("test")'

  return (
    <div>
      <SyntaxHighlighter
        style={oneDark}
        language='js'
      >
        {code}
      </SyntaxHighlighter>
    </div>
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
