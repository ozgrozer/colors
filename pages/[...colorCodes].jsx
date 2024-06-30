import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import App from '@components/App'

export default () => {
  const router = useRouter()
  const { colorCodes } = router.query
  const [urlColors, setUrlColors] = useState([])

  useEffect(() => {
    if (colorCodes) {
      const colorString = Array.isArray(colorCodes)
        ? colorCodes.join('-')
        : colorCodes
      setUrlColors(colorString.split('-'))
    }
  }, [colorCodes])

  if (!urlColors.length) return null

  return (
    <>
      <Head>
        <title>Colors</title>
      </Head>

      <App urlColors={urlColors} />
    </>
  )
}
