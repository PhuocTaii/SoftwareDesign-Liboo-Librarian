// call API here
import { instance } from "../../config/axiosConfig";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const getBooks = async (page, searchBy="", query="", sortBy="") => {
  try{
    const res = await instance.get(`/books?page=${page}&search-by=${searchBy}&query=${query}&sort-by=${sortBy}`);
    return res.data;
  } catch (err){
    console.log(err.response);
    toast.error("Failed to load data. Please try again later.")
    return null
  }
}