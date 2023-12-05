import { Header } from 'components'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
