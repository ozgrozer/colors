import Header from './Header'
import Colors from './Colors'
import styles from '@styles/App.module.scss'
import { AppProvider } from '@contexts/AppContext'

export default () => {
  return (
    <AppProvider>
      <div className={styles.app}>
        <div className={styles.headerWrapper}>
          <Header />
        </div>

        <div className={styles.colorsWrapper}>
          <Colors />
        </div>
      </div>
    </AppProvider>
  )
}
