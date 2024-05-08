// call API here
import { toast } from "react-toastify";
import { instance } from "../../config/axiosConfig";
import { getReaderByEmail } from "../account/accountApi";

export const borrowBook = async (transaction) => {
  try{
    const res = await instance.post(`/librarian/add-transaction`, transaction);
    toast.success("Borrowed book successfully");
    return res.data
  } catch (err){
    toast.error(err.response.data);
    return null
  }
}

export const getNotPickUpToday = async (page, readerName="") => {
  try{
    const res = await instance.get(`/librarian/not-picked-up-reservations?page=${page}&date=${new Date().toISOString().split('T')[0]}&reader-name=${readerName}`);
    return res.data;
  } catch (err){
    console.log(err.response);
    return null
  }
}

export const updateReservationPickup = async (reservationId) => {
  try{
    const res = await instance.put(`/librarian/update-reservation/${reservationId}`);
    return res.data;
  } catch (err){
    console.log(err.response);
    return null
  }
}

export const returnBook = async (transactionBookId, isLost) => {
  try{
    const res = await instance.put(`/librarian/return-book/${transactionBookId}?lost=${isLost}`);
    toast.success("Return book successfully");
    return res.data;
  } catch (err){
    console.log(err.response);
    toast.error(err.response.data);
    return null
  }
}

export const getTransactionBook = async (email, isbn) => {
  const reader = await getReaderByEmail(email);
  if(reader != null) {
    try{
      const res = await instance.get(`/librarian/transaction-book/${reader.id}/${isbn}`);
      return res.data;
    } catch (err){
      console.log(err.response);
      toast.error(err.response.data);
    }
  }
  return null;
}

export const getReturnBookInfo = async (transactionBookId, isLost) => {
  try{
    const res = await instance.get(`/librarian/return-book/info/${transactionBookId}?lost=${isLost}`);
    return res.data;
  } catch (err){
    console.log(err.response);
    toast.error(err.response.data);
    return null
  }
}