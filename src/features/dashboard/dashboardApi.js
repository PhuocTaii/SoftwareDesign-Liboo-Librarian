import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { instance } from "../../config/axiosConfig";


const url = "http://localhost:8080/api"

export const getBorrowingBooks = async (token) => {
    try{
        const res = await axios.get(`${url + '/librarian/borrowing-books'}`, {
            headers: {
                'Authorization': `Bearer ${token}`}
        })
        return res.data;
    } catch(err){
        toast.error(err.response);
    }
}

export const getPendingReservations = async (token) => {
    try{
        const res = await axios.get(`${url + '/librarian/pending-reservations'}`, {
            headers: {
                'Authorization': `Bearer ${token}`}
        })
        return res.data;
    } catch(err){
        toast.error(err.response);
    }
}

export const getTotalActiveBorrowers = async (token) => {
    try{
        const res = await axios.get(`${url + '/librarian/total-active-borrowers'}`, {
            headers: {
                'Authorization': `Bearer ${token}`}
        })
        return res.data;
    } catch(err){
        toast.error(err.response);
    }
}

export const getBookBorrowedCount = async (year, token) => {
    try{
        const res = await axios.get(`${url + '/librarian/book-borrowed-count?year=' + year}`, {
            headers: {
                'Authorization': `Bearer ${token}`}
        })
        return res.data;
    } catch(err){
        toast.error(err.response);
    }
}

export const getBorrows = async (page, filterIdx, dateFrom, dateTo) => {
  console.log(filterIdx)
  const filterOption = () => {
      switch(filterIdx){
      case 1:
        return "borrow-date"
      case 2:
        return "due-date"
      case 3:
        return "return-date"
      default:
        {
          dateFrom = ""
          dateTo = ""
          return ""
        }
    }
  }


  if(filterOption() !== "" && (dateFrom === "" || dateTo === ""))
    return null

  try{
    const res = await instance.get(`/librarian/all-transactions?page=${page}&filter-by=${filterOption()}&from=${dateFrom}&to=${dateTo}`);
    console.log(res.data)
    return res.data;
  } catch (err){
    console.log(err.response);
    return null
  }
}

export const getRenews = async (page, filterIdx, dateFrom, dateTo) => {
    if(filterIdx !== 0 && (dateFrom === "" || dateTo === ""))
      return null
  
    if(filterIdx === 0) {
      dateFrom = ""
      dateTo = ""
    }

    try{
      const res = await instance.get(`/librarian/renewals?page=${page}&from=${dateFrom}&to=${dateTo}`);
      return res.data;
    } catch (err){
      console.log(err.response);
      return null
    }
}

export const getReservations = async (page, filterIdx, dateFrom, dateTo) => {
    const filterOption = () => {
      switch(filterIdx){
      case 1:
        return "reserve-date"
      case 2:
        return "pickup-date"
      default:
        {
          dateFrom = ""
          dateTo = ""
          return ""
        }
    }
  }

  if(filterOption() !== "" && (dateFrom === "" || dateTo === ""))
    return null

  try{
    const res = await instance.get(`/librarian/reservations?page=${page}&filter-by=${filterOption()}&from=${dateFrom}&to=${dateTo}`);
    return res.data;
  } catch (err){
    console.log(err.response);
    return null
  }
}