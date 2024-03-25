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
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    // Dummy data creation
    const dummyData = Array.from({ length: 10 }, (_, index) => ({
      _id: index + 1,
      name: `Book ${index + 1}`,
      image: dummyImage,
      ISBN: generateISBN(),
      author: `Author ${index + 1}`,
      publisher: `Publisher ${index + 1}`,
      publishYear: 2000 + Math.floor(Math.random() * 20),
      genre: generateGenre(),
      price: Math.floor(Math.random() * 50) + 10, // Random price between 10 and 59
      quantity: Math.floor(Math.random() * 100) + 1, // Random quantity between 1 and 100
      borrowed: Math.floor(Math.random() * 50), // Random borrowed between 0 and 49
    }));
    setData(dummyData);
  }, []);

  const filterSearch = ['name', 'ISBN', 'author', 'publisher', 'genre']
  const [selectedFilter, setSelectedFilter] = useState(filterSearch[0]);

  const handleSearch = (e) => {
    // const searchTerm = e.target.value;
    // if (searchTerm === '') {
    //   setBookData(bookList);
    //   return;
    // }
    // const searchedBooks = bookList.filter((book) => {
    //   if (selectedFilter === 'genre') {
    //     return book[selectedFilter].some((genre) => genre.toLowerCase().includes(searchTerm.toLowerCase()));
    //   }
    //   else
    //     return book[selectedFilter].toLowerCase().includes(searchTerm.toLowerCase())
    // });
    // setBookData(searchedBooks);
  }

  return (
    <div className={`flex w-full h-full flex-col`}>    
     <div className='w-full px-4 py-3'>
      <div className='flex justify-end pl-14'>
        <SearchBar   
          filters={filterSearch} 
          onClick={(e) => setSelectedFilter(e.target.value)} 
          onChange={handleSearch}
        />
      </div>
     </div>
      <div className='flex justify-between py-4'>
        <p className='font-semibold text-2xl'>Book list</p>
        <Button
          className="flex items-center gap-3" 
          size="sm" 
          style={{backgroundImage: `linear-gradient(to right, var(--my-red), var(--my-orange)`}}
          // onClick={() => dispatch(setShowAddBook())}
        >
          <BiSolidBookAdd className="h-4 w-4" /> Add book
        </Button>
      </div>  
      <div className='w-full min-h-max overflow-x-scroll'>
        <table className="w-full min-w-max table-auto text-left">
          <thead className='sticky top-0'>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4">
                  <p className="leading-none opacity-70">{head}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id} className="even:bg-blue-gray-50/50 hover:bg-lightOrange/30">
                <td className="p-2 w-12 h-12">
                  {!record.image ?
                  <BiBookOpen className='w-full h-full' /> :
                  <img src={record.image} alt="logo" className="w-full h-full object-contain" />
                  }
                </td>
                <td className="p-2">
                  <p>{record.ISBN}</p>
                </td>
                <td className="p-2">
                  <p>{record.name}</p>
                </td>
                <td className="p-2">
                  <p>{record.author}</p>
                </td>
                <td className="p-2">
                  <p>{record.publisher}</p>
                </td>
                <td className="p-2">
                  <p>{record.publishYear}</p>
                </td>
                <td className="p-2">
                  <p>{record.genre.join(', ')}</p>
                </td>
                <td className="p-2">
                  <p>{record.price}</p>
                </td>
                <td className="p-2">
                  <p>{record.quantity}</p>
                </td>
                <td className="p-2">
                  <p>{record.borrowed}</p>
                </td>              
                <td className="p-2">
                  {/* <button 
                  onClick={() => {
                    dispatch(setUpdatedBook(record))
                    dispatch(setShowUpdateBook()); 
                  }}>
                    <MdEdit />
                  </button> */}
                  <button>
                    <MdEdit />
                  </button>
                </td>
                <td className="p-2">
                  {/* <button onClick={() => {
                    dispatch(setUpdatedBook(record))
                    dispatch(setShowDeleteBook()); 
                  }}>
                    <FaTrash />
                  </button> */}
                  <button>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination/>
    </div>
  )
}

export default Books