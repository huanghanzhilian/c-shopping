import '/styles/main.css'
import '/styles/browser-styles.css'
import '/styles/swiper.css'

import { enSiteTitle, siteDescription, siteTitle } from '@/utils'

export const metadata = {
  title: `${siteTitle} | ${enSiteTitle}`,
  description: `${siteDescription}`,
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
