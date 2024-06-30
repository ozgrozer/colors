import styles from '@styles/Header.module.scss'

export default () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        🎨 Colors
      </div>

      <div className={styles.buttons}>
        <button className={styles.button}>
          Export
        </button>

        <a
          target='_blank'
          rel='noreferrer'
          className={styles.button}
          href='https://github.com/ozgrozer/colors'
        >
          GitHub
        </a>
      </div>
    </div>
  )
}
