import { combineReducers } from 'redux'
import menuSlice from './slices/menu'
import authSlice from './features/auth/authSlice'

const rootReducer = combineReducers({
  menu: menuSlice,
  auth: authSlice,
})

export default rootReducer
