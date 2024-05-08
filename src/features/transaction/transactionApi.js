// call API here
import { toast } from "react-toastify";
import { instance } from "../../config/axiosConfig";

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