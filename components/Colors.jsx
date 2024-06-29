import { ChromePicker } from 'react-color'
import niceColors from 'nice-color-palettes'
import { useRef, useState, useEffect } from 'react'

import ntc from '@functions/ntc'
import styles from '@styles/Colors.module.scss'
import NewColorButtons from './NewColorButtons'
import { useAppContext } from '@contexts/AppContext'
import adjustTextColor from '@functions/adjustTextColor'

export default () => {
  const { state, setState } = useAppContext()
  const { colors } = state

  useEffect(() => {
    const colors = niceColors[Math.floor(Math.random() * niceColors.length)]
    setState({ colors })
  }, [])

  const [displayColorPicker, setDisplayColorPicker] = useState({})
  const handleClick = ({ index }) => {
    setDisplayColorPicker(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }))
  }
  const pickerRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setDisplayColorPicker({})
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
    <div className={styles.colors}>
      {colors.map((color, key) => {
        const colorName = ntc.name(color)[1]
        const textColor = adjustTextColor(color)

        return (
          <div
            key={key}
            className={styles.colorWrapper}
            style={{ color: textColor, backgroundColor: color }}
          >
            <button
              className={styles.colorCode}
              onClick={() => handleClick({ index: key })}
            >
              {color.substr(1).toUpperCase()}
            </button>

            {
              displayColorPicker[key] && (
                <div
                  ref={pickerRef}
                  style={{ left: 50, top: 200, position: 'absolute', zIndex: '2' }}
                >
                  <ChromePicker
                    color={color}
                    onChange={color => handleChange({ color, index: key })}
                  />
                </div>
              )
            }

            <div>
              {colorName}
            </div>

            <NewColorButtons index={key} />
          </div>
        )
      })}
    </div>
  )
}
