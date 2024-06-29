import { useState, useEffect } from 'react'
import niceColors from 'nice-color-palettes'

import clx from '@functions/clx'
import ntc from '@functions/ntc'
import styles from '@styles/Colors.module.scss'
import adjustTextColor from '@functions/adjustTextColor'

export default () => {
  const [colors, setColors] = useState([])

  useEffect(() => {
    setColors(niceColors[Math.floor(Math.random() * niceColors.length)])
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

            {
              key === 0 && (
                <div className={clx(styles.newColorButtonWrapper, styles.firstButton)}>
                  <button className={styles.newColorButton}>
                    +
                  </button>
                </div>
              )
            }

            {
              key !== colors.length - 1 && (
                <div className={styles.newColorButtonWrapper}>
                  <button className={styles.newColorButton}>
                    +
                  </button>
                </div>
              )
            }

            {
              key === colors.length - 1 && (
                <div className={clx(styles.newColorButtonWrapper, styles.lastButton)}>
                  <button className={styles.newColorButton}>
                    +
                  </button>
                </div>
              )
            }
          </div>
        )
      })}
    </div>
  )
}
