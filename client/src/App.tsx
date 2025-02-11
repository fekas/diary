import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import './App.css'

function App() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
