// Menu sidebar component
import logo from '../assets/logo.png'
import { Link, useLocation } from 'react-router-dom'
import {
  GoBook,
  GoArrowRight,
  GoPerson,
  GoArrowLeft,
  GoGraph,
} from 'react-icons/go'
import { BiLogOut, BiX } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { setToggle, setSelectedItem } from '../slices/menu'
import { motion } from 'framer-motion'
// import {logoutUser} from "../slices/requestApi"

const items = [
  {
    icon: <GoPerson color="white" size="1.5rem" />,
    text: 'Readers',
    path: '/',
  },
  {
    icon: <GoBook color="white" size="1.5rem" />,
    text: 'Books',
    path: '/books',
  },
  {
    icon: <GoArrowRight color="white" size="1.5rem" />,
    text: 'Borrow books',
    path: '/borrow',
  },
  {
    icon: <GoArrowLeft color="white" size="1.5rem" />,
    text: 'Return books',
    path: '/return',
  },
  {
    icon: <GoGraph color="white" size="1.5rem" />,
    text: 'Statistics',
    path: '/statistics',
  },
]

const MenuItem = ({ icon, text, active, onClick }) => {
  return (
    <li
      className={`flex gap-2 px-3 py-2 rounded-l-3xl ${active ? 'bg-orange' : 'hover:bg-orange hover:bg-opacity-30'}`}
      onClick={onClick}>
      {icon}
      <span className="text-white text-base">{text}</span>
    </li>
  )
}

const MenuSidebar = () => {
  // const location = useLocation();
  const { toggle, selectedItem } = useSelector((state) => state.menu)
  // const user = useSelector((state) => state.auth.login?.currentUser);

  const dispatch = useDispatch()

  const handleToggleMenu = (e) => {
    e.preventDefault()
    dispatch(setToggle())
  }

  const logout = () => {
    // console.log(user);
    // logoutUser(dispatch, user?._id, user?.accessToken);
    // dispatch(setToggle());
  }

  return (
    <div className="h-screen fixed">
      {toggle && (
        <motion.div
          className="bg-red w-full h-full sm:relative sm:w-[12.875rem]"
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 20,
            duration: 0.3,
          }}>
          <div className="flex flex-col items-center pt-14 pb-5 h-full">
            <div className="flex items-center gap-3 h-fit">
              <img src={logo} alt="logo" className="w-12 h-12" />
              <p className="text-2xl font-semibold text-lightOrange">LIBOO</p>
            </div>

            <ul className="flex flex-col gap-3 w-full pl-5 h-full pt-8">
              {items.map((item, index) => {
                return (
                  <Link key={index} to={item.path}>
                    <MenuItem
                      icon={item.icon}
                      text={item.text}
                      active={selectedItem === index}
                      onClick={() => dispatch(setSelectedItem(index))}
                    />
                  </Link>
                )
              })}
            </ul>

            <div className="w-full pl-8">
              <button onClick={logout} className="flex gap-2 rounded-l-3xl">
                <BiLogOut color="white" size="1.5rem" />
                <span className="text-white text-base">Logout</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {toggle && <motion.button
        className="absolute top-2 left-4"
        onClick={(e) => handleToggleMenu(e)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ rotate: 360, transition: { duration: 0.5 } }}>
        <BiX size="2.5rem" color="white" />
      </motion.button>}
    </div>
  )
}

export default MenuSidebar
