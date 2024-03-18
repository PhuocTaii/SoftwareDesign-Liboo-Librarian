import { Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/Auth'
import MainLayout from './layouts/Main'
import Login from './features/auth/Login'
import Accounts from './features/account/Accounts'
import Books from './features/book/Books'
import Borrow from './features/transaction/Borrow'
import Return from './features/transaction/Return'
import Statistic from './features/statistic/Statistic'

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route index element={<Accounts />} />
          <Route path="books" element={<Books />} />
          <Route path="borrow" element={<Borrow />} />
          <Route path="return" element={<Return />} />
          <Route path="statistics" element={<Statistic />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
