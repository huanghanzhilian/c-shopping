import StoreProvider from 'app/StoreProvider'

export default function Layout({ children }) {
  return (
    <StoreProvider>{children}</StoreProvider>
  )
}
