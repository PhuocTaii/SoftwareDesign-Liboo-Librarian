import { Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/Auth'
import MainLayout from './layouts/Main'
import Login from './features/auth/Login'
import Accounts from './features/account/Accounts'
import Books from './features/book/Books'
import Borrow from './features/transaction/Borrow'
import Return from './features/transaction/Return'
import Dashboard from './features/dashboard/Dashboard'
import History from './features/dashboard/History'
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute />} >
          <Route element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="readers" element={<Accounts />} />
            <Route path="books" element={<Books />} />
            <Route path="borrow" element={<Borrow />} />
            <Route path="return" element={<Return />} />
            <Route path="history" element={<History />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
