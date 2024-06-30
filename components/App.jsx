import { useState } from 'react'
import { getCookie } from 'cookies-next'

import Header from './Header'
import Colors from './Colors'
import styles from '@styles/App.module.scss'
import findInObject from '@functions/findInObject'
import { useAppContext, AppProvider } from '@contexts/AppContext'

const App = ({ urlColors }) => {
  const { setState } = useAppContext()

  useState(() => {
    const getPalettesCookie = getCookie('palettes')
    const palettes = getPalettesCookie
      ? JSON.parse(getPalettesCookie)
      : []
    const getSelectedPaletteIdCookie = getCookie('selectedPaletteId')
    const selectedPaletteId = getSelectedPaletteIdCookie || ''

    const paletteIndex = findInObject({
      object: palettes,
      search: { id: selectedPaletteId }
    })
    const palette = palettes[paletteIndex] || {}
    const colors = palette.colors || []

    setState({
      colors,
      palettes,
      selectedPaletteId,
      cookiesLoaded: true
    })
  }, [])

  return (
    <div className={styles.app}>
      <div className={styles.headerWrapper}>
        <Header />
      </div>

      <div className={styles.colorsWrapper}>
        <Colors urlColors={urlColors} />
      </div>
    </div>
  )
}

export default ({ urlColors }) => {
  return (
    <AppProvider>
      <App urlColors={urlColors} />
    </AppProvider>
  )
}
