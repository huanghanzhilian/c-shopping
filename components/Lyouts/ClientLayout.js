import { Header } from 'components'

export default function ClientLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
