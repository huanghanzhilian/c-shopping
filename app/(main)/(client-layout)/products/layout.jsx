import { siteTitle } from '@/utils'

export const metadata = {
  title: `分类 ${siteTitle}`,
}

export default function Layout({ children }) {
  return <>{children}</>
}
