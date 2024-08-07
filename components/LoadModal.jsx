import Modal from 'react-modal'
import { MdClose } from 'react-icons/md'
import { setCookie } from 'cookies-next'
import { PiTrash, PiFolderOpen } from 'react-icons/pi'

import clx from '@functions/clx'
import findInObject from '@functions/findInObject'
import styles from '@styles/LoadModal.module.scss'
import modalStyles from '@styles/Modal.module.scss'
import { useAppContext } from '@contexts/AppContext'

Modal.setAppElement('#reactModal')

export default ({ modalIsOpen, closeModal }) => {
  const { state, setState } = useAppContext()
  const { palettes } = state

  const loadPalette = ({ paletteId }) => {
    const paletteIndex = findInObject({
      object: palettes,
      search: { id: paletteId }
    })
    const palette = palettes[paletteIndex]

    setCookie('selectedPaletteId', palette.id, {
      maxAge: 315360000
    })
    setState({
      colors: palette.colors,
      selectedPaletteId: palette.id
    })

    closeModal()
  }

  const deletePalette = ({ paletteId }) => {
    const newPalettes = [...palettes]
    const paletteIndex = findInObject({
      object: newPalettes,
      search: { id: paletteId }
    })
    newPalettes.splice(paletteIndex, 1)
    setCookie('palettes', newPalettes, {
      maxAge: 315360000
    })
    setState({ palettes: newPalettes })

    if (!newPalettes.length) {
      closeModal()
    }
  }

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
                        <div className={styles.nameAndColors}>
                          <div>{palette.name}</div>

                          <div className={styles.colors}>
                            {palette.colors.map((color, key) => {
                              return (
                                <div
                                  key={key}
                                  className={styles.color}
                                  style={{ backgroundColor: color }}
                                />
                              )
                            })}
                          </div>
                        </div>

                        <div className={styles.icons}>
                          <button
                            title='Open'
                            className={styles.load}
                            onClick={() => loadPalette({ paletteId: palette.id })}
                          >
                            <PiFolderOpen />
                          </button>

                          <button
                            title='Delete'
                            className={styles.delete}
                            onClick={() => deletePalette({ paletteId: palette.id })}
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
