import Document, { Html, Head, Main, NextScript } from 'next/document'

const MyDocument = () => {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async ctx => {
  const initialProps = await Document.getInitialProps(ctx)
  return { ...initialProps }
}

export default MyDocument
