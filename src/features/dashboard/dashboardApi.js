import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { instance } from "../../config/axiosConfig";


const url = "http://localhost:8080/api"

export const getBorrowingBooks = async () => {
    try{
        const res = await instance.get(`/librarian/borrowing-books`);
        return res.data;
    } catch(err){
        toast.error(err.response);
    }
}

export const getPendingReservations = async () => {
    try{
        const res = await instance.get(`/librarian/pending-reservations`);
        return res.data;
    } catch(err){
        toast.error(err.response);
    }
}

export const getTotalActiveBorrowers = async () => {
    try{
        const res = await instance.get(`/librarian/total-active-borrowers`);
        return res.data;
    } catch(err){
        toast.error(err.response);
    }
}

export const getBookBorrowedCount = async (year) => {
    try{
        const res = await instance.get(`/librarian/book-borrowed-count?year=${year}`);
        return res.data;
    } catch(err){
        toast.error(err.response);
    }
}

export const getBorrows = async (page, filterIdx, dateFrom, dateTo) => {
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
    return null
  }
}