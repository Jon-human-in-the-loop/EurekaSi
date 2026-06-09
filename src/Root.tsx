import { useEffect, useState } from 'react'
import App from './App'
import AdminPage from './admin/AdminPage'

/** Rota mínima por hash: #admin → painel privado; resto → site público. */
function currentRoute() {
  return window.location.hash.replace(/^#\/?/, '').toLowerCase()
}

export default function Root() {
  const [route, setRoute] = useState(currentRoute())

  useEffect(() => {
    const onChange = () => {
      setRoute(currentRoute())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  if (route === 'admin') return <AdminPage />
  return <App />
}
