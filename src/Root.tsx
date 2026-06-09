import { lazy, Suspense, useEffect, useState } from 'react'
import App from './App'

// El panel admin se carga en un chunk aparte: no entra en el bundle público.
const AdminPage = lazy(() => import('./admin/AdminPage'))

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

  if (route === 'admin') {
    return (
      <Suspense
        fallback={
          <div className="grid min-h-screen place-items-center bg-cream text-sm text-ink-muted">
            Cargando…
          </div>
        }
      >
        <AdminPage />
      </Suspense>
    )
  }
  return <App />
}
