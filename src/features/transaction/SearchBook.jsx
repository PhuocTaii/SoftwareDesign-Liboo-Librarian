import React, {useState, useEffect, useRef} from "react";
import {
  Input,
} from "@material-tailwind/react";
import {getBookByName} from '../book/bookApi'
import {debounce} from 'lodash'
import {useCallback} from 'react'
import { BiBookOpen } from 'react-icons/bi';

const SearchBook = ({onClick, bookName, setBookName}) => {
  const [bookList, setBookList] = useState([]);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  function searchBook(name) {
    getBookByName(name).then(res => setBookList(res));
  }

  const debounceSearch = useCallback(
    debounce((searchTerm) => {
      searchBook(searchTerm)
      setOpen(true)
    }, 500), // Debounce the searchBook function
    []
  );

  const handleSearchBook = (e) => {
    const searchTerm = e.target.value;
    setBookName(searchTerm);

    if (searchTerm === '') {
      setBookList([]);
      setOpen(false);
      return;
    } else {
      debounceSearch(searchTerm);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <div className='w-full relative'>
      <Input
        value={bookName}
        variant="standard"
        type="text"
        label="Input to search books"
        onChange={handleSearchBook}
      />
      {open &&
        <div ref={menuRef} className='z-50 w-full h-fit absolute top-12 space-y-2 bg-white border-blue-gray-200 border-[1.2px] rounded-md px-1.5 py-2 overflow-auto'>
          {bookList.map((item) => (
            <div key={item.id} className='space-y-2'>
              <div className='flex gap-2 w-full h-fit cursor-pointer' onClick={() => onClick(item)}>
                {/* <img src={item.image.secureUrl} alt='book' className='w-10 h-10 object-cover' /> */}
                {item.image?.secureUrl ?
                  <img src={item.image.secureUrl} alt="logo" className="w-10 h-10 object-cover" />:
                  <BiBookOpen className='h-10' />
                }
                <div>
                  <p>{item.name}</p>
                  <p>{item.isbn}</p>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default SearchBook;