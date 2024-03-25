import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Button } from '@material-tailwind/react';
import { BiBookOpen, BiChevronLeft, BiChevronRight, BiSolidBookAdd } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import dummyImage from '../../assets/book.png';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';


const TABLE_HEAD = ['', 'ISBN', 'Name', 'Author', 'Publisher', 'Year', 'Genre', 'Price', 'Quantity', 'Borrowed', '', ''];

const generateISBN = () => {
  const characters = '0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `${result}`;
};

const generateGenre = () => {
  const genres = ['Fiction', 'Non-fiction', 'Fantasy', 'Science Fiction', 'Mystery', 'Thriller', 'Romance', 'Horror', 'Adventure', 'Biography'];
  const randomIndex = Math.floor(Math.random() * genres.length);
  return [genres[randomIndex]];
};


// Book page
const Books = () => {
  return (
    <div>
      <h1>Books</h1>
    </div>
  )
}

export default Books
