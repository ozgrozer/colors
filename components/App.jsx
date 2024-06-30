import { useState } from 'react'
import { getCookie } from 'cookies-next'

import Header from './Header'
import Colors from './Colors'
import styles from '@styles/App.module.scss'
import { useAppContext, AppProvider } from '@contexts/AppContext'

const App = ({ colors }) => {
  const { setState } = useAppContext()

  useState(() => {
    const getPalettesCookie = getCookie('palettes')
    const palettes = getPalettesCookie
      ? JSON.parse(getPalettesCookie)
      : []
    const getSelectedPaletteIdCookie = getCookie('selectedPaletteId')
    const selectedPaletteId = getSelectedPaletteIdCookie || ''
    setState({ palettes, selectedPaletteId })
  }, [])

  return (
    <div className={styles.app}>
      <div className={styles.headerWrapper}>
        <Header />
      </div>

      <div className={styles.colorsWrapper}>
        <Colors colors={colors} />
      </div>
    </div>
  )
}

export default ({ colors }) => {
  return (
    <AppProvider>
      <App colors={colors} />
    </AppProvider>
  )
}
