import Modal from 'react-modal'
import { PiX } from 'react-icons/pi'

import ExportModalTabs from './ExportModalTabs'
import styles from '@styles/ExportModal.module.scss'

Modal.setAppElement('#reactModal')

export default ({ modalIsOpen, closeModal }) => {
  return (
    <Modal
      shouldCloseOnEsc
      isOpen={modalIsOpen}
      className={styles.modal}
      onRequestClose={closeModal}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.modalHeader}>
        <div className={styles.title}>
          Export Palette
        </div>

        <button
          type='button'
          onClick={closeModal}
          className={styles.closeButton}
        >
          <PiX />
        </button>
      </div>

      <div className={styles.modalContent}>
        <ExportModalTabs />
      </div>
    </Modal>
  )
}
