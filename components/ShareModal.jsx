import Modal from 'react-modal'
import getConfig from 'next/config'
import { MdClose } from 'react-icons/md'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import CopyButton from './CopyButton'
import modalStyles from '@styles/Modal.module.scss'
import { useAppContext } from '@contexts/AppContext'

Modal.setAppElement('#reactModal')

export default ({ modalIsOpen, closeModal }) => {
  const { state } = useAppContext()
  const { colors } = state

  const { publicRuntimeConfig } = getConfig()
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? publicRuntimeConfig.productionBaseUrl
      : publicRuntimeConfig.developmentBaseUrl

  const colorsForUrl = colors
    .map(color => color.substr(1))
    .join('-')

  const fullUrl = `${baseUrl}${colorsForUrl}`

  return (
    <Modal
      shouldCloseOnEsc
      isOpen={modalIsOpen}
      className={modalStyles.modal}
      onRequestClose={closeModal}
      overlayClassName={modalStyles.modalOverlay}
    >
      <div className={modalStyles.modalHeader}>
        <div className={modalStyles.title}>
          Share Palette
        </div>

        <button
          type='button'
          onClick={closeModal}
          className={modalStyles.closeButton}
        >
          <MdClose />
        </button>
      </div>

      <div className={modalStyles.modalContent}>
        <div className={modalStyles.content}>
          <CopyButton text={fullUrl} />

          <SyntaxHighlighter
            language='txt'
            wrapLongLines
            style={oneDark}
            className={modalStyles.syntaxHighlighter}
          >
            {fullUrl}
          </SyntaxHighlighter>
        </div>
      </div>
    </Modal>
  )
}
