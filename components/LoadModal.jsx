import Modal from 'react-modal'
import { useState } from 'react'
import { getCookie } from 'cookies-next'
import { MdClose } from 'react-icons/md'
import { PiTrash, PiFolderOpen } from 'react-icons/pi'

import clx from '@functions/clx'
import styles from '@styles/LoadModal.module.scss'
import modalStyles from '@styles/Modal.module.scss'
import { useAppContext } from '@contexts/AppContext'

Modal.setAppElement('#reactModal')

export default ({ modalIsOpen, closeModal }) => {
  const { setState } = useAppContext()

  const [palettes, setPalettes] = useState([])
  useState(() => {
    const palettes = getCookie('palettes')
      ? JSON.parse(getCookie('palettes'))
      : []
    setPalettes(palettes)
  }, [])

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
          Load Palette
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
        {
          palettes.length
            ? (
              <div className={styles.palettes}>
                {
                  palettes.map((palette, key) => {
                    return (
                      <div key={key} className={styles.palette}>
                        <div className={styles.name}>
                          {palette.name}
                        </div>

                        <div className={styles.icons}>
                          <button
                            title='Open'
                            className={styles.load}
                          >
                            <PiFolderOpen />
                          </button>

                          <button
                            title='Delete'
                            className={styles.delete}
                          >
                            <PiTrash />
                          </button>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              )
            : (
              <div className={clx(modalStyles.alert, modalStyles.info)}>
                <div className={modalStyles.colorText}>
                  No palettes found
                </div>
              </div>
              )
        }
      </div>
    </Modal>
  )
}
