import ntc from '@functions/ntc'
import styles from '@styles/Colors.module.scss'
import adjustTextColor from '@functions/adjustTextColor'

export default () => {
  const colors = ['#a1e8af', '#94c595', '#747c92', '#372772', '#3a2449']

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
          </div>
        )
      })}
    </div>
  )
}
