import { useRef, useEffect } from 'react'
import { ChromePicker } from 'react-color'

import styles from '@styles/Colors.module.scss'
import { useAppContext } from '@contexts/AppContext'

export default ({ index, color, displayColorPicker, setDisplayColorPicker }) => {
  const { setState } = useAppContext()

  const pickerRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = event => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setDisplayColorPicker(prevState => ({
          ...prevState,
          [index]: false
        }))
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleChange = ({ color, index }) => {
    setState(prevState => {
      const newColors = [...prevState.colors]
      newColors[index] = color.hex
      return {
        ...prevState,
        colors: newColors
      }
    })
  }

  return (
    <>
      {
        displayColorPicker[index] && (
          <div
            ref={pickerRef}
            className={styles.colorPickerWrapper}
          >
            <ChromePicker
              color={color}
              onChange={color => handleChange({ color, index })}
            />
          </div>
        )
      }
    </>
  )
}
