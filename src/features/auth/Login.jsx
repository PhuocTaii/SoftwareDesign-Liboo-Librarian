import React, {useState} from 'react'
import { Input } from "@material-tailwind/react";
import CustomButton from "../../components/CustomButton";
import { FaRegUser, FaLock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Login page
const Login = () => {
  const [account, setAccount] = useState({username: '', password: ''});
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setAccount({...account, [name]: value});
  }

  const handleSignin = (e) => {
    e.preventDefault();
    // loginUser(account, dispatch, navigate);
  }

  return (
    <form className="flex flex-col items-center gap-8 w-full" onSubmit={(e) => handleSignin(e)}>
      <p className='text-2xl font-medium'>Sign In</p>
      <div className="w-full flex flex-col gap-3">
        <Input 
          icon={<FaRegUser />} 
          label="Username"
          onChange={(e) => handleChangeInfo(e)}
          required
          name="username"
          value={account.username}
        />
        <Input 
          icon={<FaLock />} 
          label="Password"
          type="password"
          onChange={(e) => handleChangeInfo(e)}
          required
          name="password"
          value={account.password}
        />
      </div>
      <CustomButton label="Sign In" type='submit' />
    </form>
  )
}

export default Login
