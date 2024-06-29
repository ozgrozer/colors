import Header from './Header'
import Colors from './Colors'
import styles from '@styles/App.module.scss'

export default () => {
  return (
    <div className={styles.app}>
      <div className={styles.headerWrapper}>
        <Header />
      </div>

      <div className={styles.colorsWrapper}>
        <Colors />
      </div>
    </div>
  )
}
