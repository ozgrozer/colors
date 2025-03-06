import Link from 'next/link'
import { useState, useEffect } from 'react'
import niceColors from 'nice-color-palettes'
import { PiXLogo, PiShare, PiShuffle, PiFloppyDisk, PiFolderOpen, PiGithubLogo, PiExportBold, PiDownloadSimple, PiChatCircleText } from 'react-icons/pi'

import SaveModal from './SaveModal'
import LoadModal from './LoadModal'
import ShareModal from './ShareModal'
import ImportModal from './ImportModal'
import ExportModal from './ExportModal'
import ChatModal from './ChatModal'
import styles from '@styles/Header.module.scss'
import findInObject from '@functions/findInObject'
import { useAppContext } from '@contexts/AppContext'

export default () => {
  const { state, setState } = useAppContext()
  const { palettes, selectedPaletteId } = state

  const [selectedPalette, setSelectedPalette] = useState({})
  useEffect(() => {
    if (!selectedPaletteId) return

    const paletteIndex = findInObject({
      object: palettes,
      search: { id: selectedPaletteId }
    })
    const palette = palettes[paletteIndex] || {}
    setSelectedPalette(palette)
  }, [palettes, selectedPaletteId])

  const shuffleColors = () => {
    const colors = niceColors[Math.floor(Math.random() * niceColors.length)]
    setState({ colors })
  }

  const [loadModalIsOpen, setLoadModalIsOpen] = useState(false)
  const openLoadModal = () => setLoadModalIsOpen(true)
  const closeLoadModal = () => setLoadModalIsOpen(false)

  const [saveModalIsOpen, setSaveModalIsOpen] = useState(false)
  const openSaveModal = () => setSaveModalIsOpen(true)
  const closeSaveModal = () => setSaveModalIsOpen(false)

  const [importModalIsOpen, setImportModalIsOpen] = useState(false)
  const openImportModal = () => setImportModalIsOpen(true)
  const closeImportModal = () => setImportModalIsOpen(false)

  const [exportModalIsOpen, setExportModalIsOpen] = useState(false)
  const openExportModal = () => setExportModalIsOpen(true)
  const closeExportModal = () => setExportModalIsOpen(false)

  const [shareModalIsOpen, setShareModalIsOpen] = useState(false)
  const openShareModal = () => setShareModalIsOpen(true)
  const closeShareModal = () => setShareModalIsOpen(false)

  const [chatModalIsOpen, setChatModalIsOpen] = useState(false)
  const openChatModal = () => setChatModalIsOpen(true)
  const closeChatModal = () => setChatModalIsOpen(false)

  return (
    <div className={styles.header}>
      <div className={styles.logoAndPalette}>
        <Link
          href='/'
          className={styles.button}
        >
          🎨 Colors
        </Link>

        {
          Object.keys(selectedPalette).length
            ? (
              <div className={styles.palette}>
                <div>/</div>

                <div>{selectedPalette.name}</div>
              </div>
              )
            : null
        }
      </div>

      <div className={styles.buttons}>
        <button
          onClick={openLoadModal}
          className={styles.button}
        >
          <PiFolderOpen />
          <span>Load</span>
        </button>

        <button
          onClick={openSaveModal}
          className={styles.button}
        >
          <PiFloppyDisk />
          <span>Save</span>
        </button>

        <button
          onClick={shuffleColors}
          className={styles.button}
        >
          <PiShuffle />
          <span>Shuffle</span>
        </button>

        <div className={styles.verticalLine} />

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

        <button
          onClick={openChatModal}
          className={styles.button}
        >
          <PiChatCircleText />
          <span>Assistant</span>
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

      <LoadModal
        openModal={openLoadModal}
        closeModal={closeLoadModal}
        modalIsOpen={loadModalIsOpen}
      />

      <SaveModal
        openModal={openSaveModal}
        closeModal={closeSaveModal}
        modalIsOpen={saveModalIsOpen}
      />

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

      <ChatModal
        openModal={openChatModal}
        closeModal={closeChatModal}
        modalIsOpen={chatModalIsOpen}
      />
    </div>
  )
}
