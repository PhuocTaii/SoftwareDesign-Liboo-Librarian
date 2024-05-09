// call API here
import { instance } from "../../config/axiosConfig";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const getReaders = async (page, searchBy="", query="", sortBy="") => {
  try{
    const res = await instance.get(`/librarian/readers?page=${page}&search-by=${searchBy}&query=${query}&sort-by=${sortBy}`);
    return res.data;
  } catch (err){
    console.log(err.response);
    toast.error("Failed to load data. Please try again later.")
    return null
  }
}

export const getReaderByEmail = async (email) => {
  try{
    const res = await instance.get(`/reader?email=${email}`);
    return res.data;
  } catch (err){
    console.log(err.response);
    toast.error(err.response.data)
    return null
  }
}