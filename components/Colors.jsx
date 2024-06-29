import { useEffect } from 'react'
import niceColors from 'nice-color-palettes'

import ntc from '@functions/ntc'
import styles from '@styles/Colors.module.scss'
import NewColorButtons from './NewColorButtons'
import { AppContext } from '@contexts/AppContext'
import adjustTextColor from '@functions/adjustTextColor'

export default () => {
  const { state, setState } = AppContext()
  const { colors } = state

  useEffect(() => {
    const colors = niceColors[Math.floor(Math.random() * niceColors.length)]
    setState({ colors })
  }, [])

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
            >
              {color.substr(1).toUpperCase()}
            </button>

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
