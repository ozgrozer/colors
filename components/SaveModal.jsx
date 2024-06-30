import * as Yup from 'yup'
import Modal from 'react-modal'
import { useState } from 'react'
import { useFormik } from 'formik'
import { MdClose } from 'react-icons/md'

import clx from '@functions/clx'
import { FormikInput } from './Formik'
import modalStyles from '@styles/Modal.module.scss'
import { useAppContext } from '@contexts/AppContext'

Modal.setAppElement('#reactModal')

export default ({ modalIsOpen, closeModal }) => {
  const { setState } = useAppContext()

  const [formIsSubmitting, setFormIsSubmitting] = useState(false)
  const formik = useFormik({
    initialValues: {
      colors: ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      colors: Yup.string().min(6).required()
    }),
    onSubmit: async values => {
      setFormIsSubmitting(true)

      const newColors = values.colors
        .split('\n')
        .map(color => color.substr(0, 1) !== '#' ? `#${color}` : color)
      setState({ colors: newColors })

      setFormIsSubmitting(false)

      closeModal()
    }
  })

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
          Save Palette
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
        <form onSubmit={formik.handleSubmit}>
          <fieldset
            disabled={formIsSubmitting}
            style={{ gap: 20, display: 'flex', flexDirection: 'column' }}
          >
            <FormikInput
              type='text'
              formik={formik}
              id='paletteName'
              name='paletteName'
              placeholder='Palette name'
              className={modalStyles.input}
              invalidClassName={modalStyles.invalid}
            />

            <div className={modalStyles.alert}>
              Saved palettes are stored in cookies
            </div>

            <button
              type='submit'
              className={clx(modalStyles.button, modalStyles.blue)}
            >
              Save
            </button>
          </fieldset>
        </form>
      </div>
    </Modal>
  )
}
