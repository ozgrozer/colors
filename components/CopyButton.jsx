import { useState } from 'react'
import { PiCopySimple } from 'react-icons/pi'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import clx from '@functions/clx'
import styles from '@styles/CopyButton.module.scss'

export default ({ text }) => {
  const [isFlashing, setIsFlashing] = useState(false)
  const toggleIsFlashing = () => {
    setIsFlashing(true)
    setTimeout(() => setIsFlashing(false), 300)
  }

  return (
    <CopyToClipboard
      text={text}
      onCopy={() => toggleIsFlashing()}
    >
      <button className={clx(styles.copyButton, isFlashing ? styles.flashing : '')}>
        <PiCopySimple />
      </button>
    </CopyToClipboard>
  )
}
