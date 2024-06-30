import Modal from 'react-modal'

import styles from '@styles/ExportModal.module.scss'

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
        modalHeader
      </div>

      <div className={styles.modalContent}>
        modalContent
      </div>
    </Modal>
  )
}
