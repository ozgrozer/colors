import { useRef, useEffect, useState } from 'react'
import { ChromePicker } from 'react-color'

import styles from '@styles/ColorItem.module.scss'
import { useAppContext } from '@contexts/AppContext'

export default ({ index, color, buttonRef, displayColorPicker, setDisplayColorPicker, onLocalColorChange }) => {
  const { setState } = useAppContext()
  const [localColor, setLocalColor] = useState(color)

  useEffect(() => {
    setLocalColor(color)
  }, [color])

  const pickerRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target) &&
        buttonRef &&
        !buttonRef.contains(event.target)
      ) {
        if (localColor !== color) {
          commitColorChange(localColor)
        }
        
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
  }, [index, setDisplayColorPicker, buttonRef, localColor, color])

  const commitColorChange = (finalColor) => {
    setState(prevState => {
      const newColors = [...prevState.colors]
      newColors[index] = finalColor.hex || finalColor
      return {
        ...prevState,
        colors: newColors
      }
    })
  }

  const handleChange = (color) => {
    const newColor = color.hex || color
    setLocalColor(newColor)
    
    if (onLocalColorChange) {
      onLocalColorChange(index, newColor)
    }
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
              color={localColor}
              onChange={handleChange}
              disableAlpha={true}
            />
          </div>
        )
      }
    </>
  )
}
