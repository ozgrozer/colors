import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import App from '@components/App'

export default () => {
  const router = useRouter()
  const { colorCodes } = router.query
  const [colors, setColors] = useState([])

  useEffect(() => {
    if (colorCodes) {
      const colorString = Array.isArray(colorCodes)
        ? colorCodes.join('-')
        : colorCodes
      setColors(colorString.split('-'))
    }
  }, [colorCodes])

  return (
    <>
      <Head>
        <title>Colors</title>
      </Head>

      <App colors={colors} />
    </>
  )
}
