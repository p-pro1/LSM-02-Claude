import './globals.css'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'City Events',
  description: 'Find and add exciting events in your city',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-16"> {/* Add padding-top to account for fixed navbar */}
          {children}
        </main>
      </body>
    </html>
  )
}