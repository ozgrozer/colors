import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import App from '@components/App'

export default () => {
  const router = useRouter()
  const [urlColors, setUrlColors] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (router.isReady) {
      const { colors } = router.query
      if (colors) {
        const colorString = Array.isArray(colors) ? colors.join('-') : colors
        setUrlColors(colorString.split('-'))
      }
      setIsLoading(false)
    }
  }, [router.isReady, router.query])

  if (isLoading) return null

  return (
    <>
      <Head>
        <title>Colors</title>
      </Head>

      <App urlColors={urlColors} />
    </>
  )
}
