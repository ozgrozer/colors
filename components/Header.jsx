import Link from 'next/link'
import { useState } from 'react'
import niceColors from 'nice-color-palettes'
import { PiXLogo, PiShare, PiShuffle, PiGithubLogo, PiExportBold, PiDownloadSimple } from 'react-icons/pi'

import ShareModal from './ShareModal'
import ImportModal from './ImportModal'
import ExportModal from './ExportModal'
import styles from '@styles/Header.module.scss'
import { useAppContext } from '@contexts/AppContext'

export default () => {
  const { setState } = useAppContext()

  const shuffleColors = () => {
    const colors = niceColors[Math.floor(Math.random() * niceColors.length)]
    setState({ colors })
  }

  const [importModalIsOpen, setImportModalIsOpen] = useState(false)
  const openImportModal = () => setImportModalIsOpen(true)
  const closeImportModal = () => setImportModalIsOpen(false)

  const [exportModalIsOpen, setExportModalIsOpen] = useState(false)
  const openExportModal = () => setExportModalIsOpen(true)
  const closeExportModal = () => setExportModalIsOpen(false)

  const [shareModalIsOpen, setShareModalIsOpen] = useState(false)
  const openShareModal = () => setShareModalIsOpen(true)
  const closeShareModal = () => setShareModalIsOpen(false)

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
          onClick={shuffleColors}
          className={styles.button}
        >
          <PiShuffle />
          <span>Shuffle</span>
        </button>

        <button
          className={styles.button}
          onClick={openImportModal}
        >
          <PiDownloadSimple />
          <span>Import</span>
        </button>

        <button
          className={styles.button}
          onClick={openExportModal}
        >
          <PiExportBold />
          <span>Export</span>
        </button>

        <button
          onClick={openShareModal}
          className={styles.button}
        >
          <PiShare />
          <span>Share</span>
        </button>

        <div className={styles.verticalLine} />

        <a
          target='_blank'
          rel='noreferrer'
          className={styles.button}
          href='https://x.com/ozgrozer'
        >
          <PiXLogo />
        </a>

        <a
          target='_blank'
          rel='noreferrer'
          className={styles.button}
          href='https://github.com/ozgrozer/colors'
        >
          <PiGithubLogo />
        </a>
      </div>

      <ImportModal
        openModal={openImportModal}
        closeModal={closeImportModal}
        modalIsOpen={importModalIsOpen}
      />

      <ExportModal
        openModal={openExportModal}
        closeModal={closeExportModal}
        modalIsOpen={exportModalIsOpen}
      />

      <ShareModal
        openModal={openShareModal}
        closeModal={closeShareModal}
        modalIsOpen={shareModalIsOpen}
      />
    </div>
  )
}
