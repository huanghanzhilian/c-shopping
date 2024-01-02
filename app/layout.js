import '/styles/main.css'
import '/styles/browser-styles.css'

export const metadata = {
  title: 'ChoiceShop',
  description: 'ChoiceShop',
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
