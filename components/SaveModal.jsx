import * as Yup from 'yup'
import Modal from 'react-modal'
import { useState } from 'react'
import { useFormik } from 'formik'
import { MdClose } from 'react-icons/md'
import { getCookie, setCookie } from 'cookies-next'

import clx from '@functions/clx'
import { FormikInput } from './Formik'
import modalStyles from '@styles/Modal.module.scss'
import { useAppContext } from '@contexts/AppContext'

Modal.setAppElement('#reactModal')

export default ({ modalIsOpen, closeModal }) => {
  const { state } = useAppContext()
  const { colors } = state

  const [formIsSubmitting, setFormIsSubmitting] = useState(false)
  const formik = useFormik({
    initialValues: {
      paletteName: ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      paletteName: Yup.string().min(1).required()
    }),
    onSubmit: async values => {
      setFormIsSubmitting(true)

      const palettes = getCookie('palettes')
        ? JSON.parse(getCookie('palettes'))
        : []
      palettes.push({
        colors,
        name: values.paletteName
      })
      setCookie('palettes', palettes)

      closeModal()
      formik.resetForm()
      setFormIsSubmitting(false)
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

            <button
              type='submit'
              className={clx(modalStyles.button, modalStyles.blue)}
            >
              Save
            </button>

            <div className={clx(modalStyles.alert, modalStyles.info)}>
              <div className={modalStyles.colorText}>
                Saved palettes are stored in cookies
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </Modal>
  )
}
