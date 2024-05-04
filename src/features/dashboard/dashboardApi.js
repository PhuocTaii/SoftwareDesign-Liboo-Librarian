import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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