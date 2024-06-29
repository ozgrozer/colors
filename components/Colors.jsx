import styles from '@styles/Colors.module.scss'

export default () => {
  const colors = ['#a1e8af', '#94c595', '#747c92', '#372772', '#3a2449']

  return (
    <div className={styles.colors}>
      {colors.map((color, key) => {
        return (
          <div
            key={key}
            className={styles.color}
            style={{ backgroundColor: color }}
          >
            {color}
          </div>
        )
      })}
    </div>
  )
}
