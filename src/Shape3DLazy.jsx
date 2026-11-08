import { lazy, Suspense } from 'react'

// three.js is large, so it loads on demand after the first paint.
const Shape3D = lazy(() => import('./Shape3D.jsx'))

export default function Shape3DLazy(props) {
  return <Suspense fallback={null}><Shape3D {...props} /></Suspense>
}
