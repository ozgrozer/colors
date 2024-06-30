import { useEffect, useRef, useState } from 'react'

const getNestedValue = (obj, path) => {
  return path.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, obj)
}

const FormikInput = ({ _ref, formik, name, value, className, invalidClassName, errorMessageClassName, onChange, showEyeIcon, ...props }) => {
  const splitName = name.split('.')
  const hasDeepLevel = splitName.length > 1
  let _invalidClassName = ''
  if (hasDeepLevel) {
    _invalidClassName = (getNestedValue(formik.touched, splitName) && getNestedValue(formik.errors, splitName))
      ? invalidClassName
      : ''
  } else {
    _invalidClassName = (formik.touched[name] && formik.errors[name])
      ? invalidClassName
      : ''
  }

  const inputValue = value || formik.values[name] || ''

  const inputOnChange = e => {
    if (onChange) onChange(e)
    formik.handleChange(e)
  }

  const [inputType, setInputType] = useState(props.type)
  const toggleEyeIcon = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }

  return (
    <>
      {
        showEyeIcon
          ? (
            <div className='eyeIconWrapper'>
              <input
                ref={_ref}
                {...props}
                name={name}
                type={inputType}
                value={inputValue}
                onChange={inputOnChange}
                className={`${className}${_invalidClassName ? ` ${_invalidClassName}` : ''} eyeIconInput`}
              />

              <button
                type='button'
                onClick={toggleEyeIcon}
                className='eyeIconButton'
              >
                <i className={inputType === 'password' ? 'icon-Show' : 'icon-Hide'} />
              </button>
            </div>
            )
          : (
            <input
              ref={_ref}
              {...props}
              name={name}
              value={inputValue}
              onChange={inputOnChange}
              className={`${className}${_invalidClassName ? ` ${_invalidClassName}` : ''}`}
            />
            )
      }

      {(errorMessageClassName && formik.errors[name] && formik.touched[name]) && (
        <div className={errorMessageClassName}>
          {formik.errors[name]}
        </div>
      )}
    </>
  )
}

const FormikTextarea = ({ formik, name, value, className, invalidClassName, autoResize, onChange, ...props }) => {
  const splitName = name.split('.')
  const hasDeepLevel = splitName.length > 1
  let _invalidClassName = ''
  if (hasDeepLevel) {
    _invalidClassName = (getNestedValue(formik.touched, splitName) && getNestedValue(formik.errors, splitName))
      ? invalidClassName
      : ''
  } else {
    _invalidClassName = (formik.touched[name] && formik.errors[name])
      ? invalidClassName
      : ''
  }

  const textareaRef = useRef(null)
  const textareaValue = value || formik.values[name] || ''

  const textareaOnChange = e => {
    if (onChange) onChange(e)
    formik.handleChange(e)
  }

  useEffect(() => {
    if (!autoResize) return

    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [formik.values[name]])

  return (
    <textarea
      {...props}
      name={name}
      ref={textareaRef}
      value={textareaValue}
      onChange={textareaOnChange}
      className={`${className}${_invalidClassName ? ` ${_invalidClassName}` : ''}`}
    />
  )
}

module.exports = {
  FormikInput,
  FormikTextarea
}
