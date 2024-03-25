import React, {useState, useEffect} from 'react'
import {Input} from "@material-tailwind/react";
import CustomButton from "../../components/CustomButton";
import Pagination from '../../components/Pagination';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {formatDate} from '../../helpers/dateFormat';
import { BiChevronLeft, BiChevronRight, BiDotsHorizontalRounded, BiRefresh } from 'react-icons/bi';


const EXPIRATION = 7;
const TABLE_HEAD = ['Username', 'ISBN', 'Received date', ''];

// Borrow page
const Borrow = () => {
  const today = new Date()

  const calcDueDate = (receivedDate) => {
    const objReceived = new Date(receivedDate)
    const objDue = new Date(objReceived.getFullYear(), objReceived.getMonth(), objReceived.getDate() + EXPIRATION)
    return formatDate(objDue)
  }

  const [slip, setSlip] = useState({_id:'', username:'', isbns: [], borrowDate: formatDate(today), dueDate: calcDueDate(today)})
  const [tempISBN, setTempISBN] = useState('');

  const handleChangeInfo = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setSlip({...slip, [name]: value});
  }

  const addISBN = (e) => {
    e.preventDefault();
    if(tempISBN !== '' && slip.isbns.length < 2 && !slip.isbns.includes(tempISBN))
      setSlip({...slip, isbns: [...slip.isbns, tempISBN]});
    setTempISBN('');
  }
  
  const handleBorrow = (e) => {
    e.preventDefault();
    if(slip._id){
      // addSlipById(slip._id, user?.accessToken, dispatch);
    }
    if(!slip._id){
      // addSlipByUsername(slip.username, slip.isbns ,user?.accessToken, dispatch);
    }
    setSlip({username:'', isbns: [], borrowDate: formatDate(today), dueDate: calcDueDate(today)})
  };

  // const showDetailBorrow = (selectedRecord) => {
  //   setSlip({
  //     _id: selectedRecord._id,
  //     username: selectedRecord?.UserID.username,
  //     isbns: selectedRecord?.borrowList?.map((b) => b.book?.ISBN),
  //     borrowDate: formatDate(selectedRecord.borrowDate),
  //     dueDate: formatDate(selectedRecord?.borrowList?.[0]?.DueDate),
  //   });
  // }

  // const refreshBorrow = (e) => {
  //   e.preventDefault();
  //   setSlip({username:'', isbns: [], borrowDate: formatDate(today), dueDate: calcDueDate(today)})
  // }

  // const [borrowData, setBorrowData] = useState(slipList)

  // const generateUsername = () => {
  //   const adjectives = ['Happy', 'Sunny', 'Brave', 'Clever', 'Gentle', 'Kind', 'Bright', 'Calm', 'Lively', 'Wise'];
  //   const nouns = ['Panda', 'Tiger', 'Lion', 'Elephant', 'Giraffe', 'Kangaroo', 'Koala', 'Monkey', 'Owl', 'Zebra'];
  //   const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
  //   const randomNounIndex = Math.floor(Math.random() * nouns.length);
  //   return `${adjectives[randomAdjectiveIndex]}${nouns[randomNounIndex]}`;
  // };
  
  // // Function to generate random ISBN number
  // const generateISBN = () => {
  //   const characters = '0123456789';
  //   let result = '';
  //   for (let i = 0; i < 10; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * characters.length));
  //   }
  //   return `${result}`;
  // };
  
  // // Function to generate random date within a range
  // const generateRandomDate = (start, end) => {
  //   return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  // };

  // useEffect(() => {
  //   // Dummy data creation
  //   const dummyData = Array.from({ length: 10 }, (_, index) => ({
  //     _id: index + 1,
  //     username: generateUsername(),
  //     ISBN: generateISBN(),
  //     receivedDate: formatDate(generateRandomDate(new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000), currentDate)), // Random date in the last 30 days
  //   }));
  //   setData(dummyData);
  // }, []);

  return (
    <div className="flex flex-col w-full h-full pl-16 pr-8 pt-3 pb-3 gap-8">
       <form className="w-full space-y-5" onSubmit={(e) => handleBorrow(e)}>
        <div className='flex justify-between'>
          <p className="text-2xl font-semibold">BORROW BOOKS</p>
            {/* <button onClick={(e) => refreshBorrow(e)}>
              <BiRefresh size='2rem' />
            </button> */}
            <button>
              <BiRefresh size='2rem' />
            </button>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className='col-span-2'>
            <Input
              variant="standard"  
              label="Username"
              name="username"
              value={slip.username}
              onChange={handleChangeInfo}
              required
            />
          </div>
          <Input
            variant="standard"
            label="Borrowing date"
            name="borrowDate"
            value={slip.borrowDate}
            readOnly
          />
          <Input
            variant="standard"
            label="Due date"
            name="dueDate"
            value={slip.dueDate}
            readOnly
          />
          <div className="relative">
            <Input
              variant="standard"
              label="ISBNs"
              onInput={ (e) =>
                e.target.value = e.target.value.replace(/[^0-9]/g, '')
              }
              pattern=".{13}"
              maxLength={13}
              value={tempISBN}
              onChange={(e) => setTempISBN(e.target.value)}
            />
            <button
              className="absolute right-1 bottom-1 border-2 px-2 py-1 rounded-md bg-lightGrey font-medium"
              type="submit"
              onClick={addISBN}
            >
              Add
            </button>
          </div>
          <Input
            variant="standard"
            label="Borrowed books"
            value={slip.isbns?.join(", ")}
            readOnly
            required
          />
        </div>
        <div className="flex justify-center pt-3">
          <CustomButton label="Done" type="submit" />
        </div>
       </form>
       <div className='w-full space-y-3'>
          <div className='flex justify-between'>
            <p className='text-2xl font-semibold'>REQUESTS</p>
            <SearchBar 
              filters={filterSearch}
              onClick={(e) => setSelectedFilter(e.target.value)} 
              onChange={handleSearch}
            />
          </div>
       </div>
    </div>
  )
}

export default Borrow
