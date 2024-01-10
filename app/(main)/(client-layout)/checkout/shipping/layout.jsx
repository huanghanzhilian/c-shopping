import { siteTitle } from '@/utils'

export const metadata = {
  title: `付款-${siteTitle}`,
}

export default function Layout({ children }) {
  return <>{children}</>
}
