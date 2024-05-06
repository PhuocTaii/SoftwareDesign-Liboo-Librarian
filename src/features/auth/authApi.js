import axios from "axios";
import {slice} from "./authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const url = "http://localhost:8080/api/authentication/"

export const login = async (user, dispatch, navigate) => {
    dispatch(slice.signInBegin());
    try{
        const res = await axios.post(`${url + 'librarian/login'}`, user, {
            'Content-Type': 'application/json'
        })
        dispatch(slice.signInSuccess(res.data))
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
        const res = await axios.post(`${url + 'logout'}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`}
        })
        dispatch(slice.logoutSuccess());
        toast.success('Logout successfully!');
    } catch(err){
        dispatch(slice.logoutFailure());
        toast.error(err.response);
    }
}