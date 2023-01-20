import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { Checkout } from './pages/Checkout'
import { Home } from './pages/Home'
import { Success } from './pages/Success'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Route>
    </Routes>
  )
}
