import Link from 'next/link'

import styles from '@styles/Header.module.scss'

export default () => {
  return (
    <div className={styles.header}>
      <Link
        href='/'
        className={styles.button}
      >
        🎨 Colors
      </Link>

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

        <a
          target='_blank'
          rel='noreferrer'
          className={styles.button}
          href='https://x.com/ozgrozer'
        >
          X
        </a>
      </div>
    </div>
  )
}
