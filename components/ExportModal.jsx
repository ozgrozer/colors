import Modal from 'react-modal'
import { MdClose } from 'react-icons/md'

import ExportModalTabs from './ExportModalTabs'
import modalStyles from '@styles/Modal.module.scss'

Modal.setAppElement('#reactModal')

export default ({ modalIsOpen, closeModal }) => {
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
          Export Palette
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
        <ExportModalTabs />
      </div>
    </Modal>
  )
}
