import Modal from 'react-modal'

import clx from '@functions/clx'
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
      <div className={styles.header}>
        <div className={styles.title}>
          Export Palette
        </div>

        <button
          type='button'
          onClick={closeModal}
          className={clx(styles.closeButton, styles.button, styles.lightGray)}
        >
          <i className='icon-Close' />
        </button>
      </div>

      <div className={styles.content}>
        content
      </div>
    </Modal>
  )
}
