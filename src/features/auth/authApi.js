import axios from "../../config/axiosConfig";
import {slice} from "./authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const login = async (user, dispatch, navigate) => {
    dispatch(slice.signInBegin());
    try{
        const res = await axios.post('/authentication/librarian/login', user, {
            'Content-Type': 'application/json'
        })
        window.localStorage.setItem('access_token', res.data.access_token);
        window.localStorage.setItem('refresh_token', res.data.refresh_token);
        dispatch(slice.signInSuccess(res.data.user))

        toast.success('Login successfully!');
        navigate('/');
    } catch(err){
        dispatch(slice.signInFailure());
        toast.error(err.response.data);
    }
}

export const logout = async (dispatch, token) => {
    dispatch(slice.logoutBegin());
    try{
        const res = await axios.post('/authentication/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`}
        })
        dispatch(slice.logoutSuccess());
        window.localStorage.clear();
        toast.success('Logout successfully!');
    } catch(err){
        dispatch(slice.logoutFailure());
        toast.error(err.response);
    }
}