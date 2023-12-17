import { Header, Footer } from 'components'

export default function ClientLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
