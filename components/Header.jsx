import Link from 'next/link'
import { useState } from 'react'

import ExportModal from './ExportModal'
import styles from '@styles/Header.module.scss'

export default () => {
  const [exportModalIsOpen, setExportModalIsOpen] = useState(false)
  const openExportModal = () => setExportModalIsOpen(true)
  const closeExportModal = () => setExportModalIsOpen(false)

  return (
    <div className={styles.header}>
      <Link
        href='/'
        className={styles.button}
      >
        🎨 Colors
      </Link>

      <div className={styles.buttons}>
        <button
          className={styles.button}
          onClick={openExportModal}
        >
          Export
        </button>

        <a
          target='_blank'
          rel='noreferrer'
          className={styles.button}
          href='https://github.com/ozgrozer/colors'
        >
          GitHub
        </a>

        <a
          target='_blank'
          rel='noreferrer'
          className={styles.button}
          href='https://x.com/ozgrozer'
        >
          X
        </a>
      </div>

      <ExportModal
        openModal={openExportModal}
        closeModal={closeExportModal}
        modalIsOpen={exportModalIsOpen}
      />
    </div>
  )
}
