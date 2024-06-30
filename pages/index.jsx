import Head from 'next/head'

import App from '@components/App'

export default () => {
  return (
    <>
      <Head>
        <title>Colors</title>
      </Head>

      <App urlColors={[]} />
    </>
  )
}
