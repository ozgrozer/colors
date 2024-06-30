import niceColors from 'nice-color-palettes'
import { useRef, useState, useEffect } from 'react'

import ntc from '@functions/ntc'
import ColorPicker from './ColorPicker'
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

  const buttonRefs = useRef({})
  const [displayColorPicker, setDisplayColorPicker] = useState({})
  const handleClick = ({ index }) => {
    setDisplayColorPicker(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }))
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
              ref={el => (buttonRefs.current[key] = el)}
              onClick={() => handleClick({ index: key })}
            >
              {color.substr(1).toUpperCase()}
            </button>

            <div>
              {colorName}
            </div>

            <NewColorButtons index={key} />

            <ColorPicker
              index={key}
              color={color}
              buttonRef={buttonRefs.current[key]}
              displayColorPicker={displayColorPicker}
              setDisplayColorPicker={setDisplayColorPicker}
            />
          </div>
        )
      })}
    </div>
  )
}
