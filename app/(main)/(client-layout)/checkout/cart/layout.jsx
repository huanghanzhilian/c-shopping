import { siteTitle } from '@/utils'

export const metadata = {
  title: `购物车-${siteTitle}`,
}

export default function Layout({ children }) {
  return <>{children}</>
}
