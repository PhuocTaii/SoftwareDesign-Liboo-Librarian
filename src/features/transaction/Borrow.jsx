import React, {useState, useEffect} from 'react'
import {Input, Select, Option} from "@material-tailwind/react";
import CustomButton from "../../components/CustomButton";
import Pagination from '../../components/Pagination';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {formatDate} from '../../helpers/dateFormat';
import { BiChevronLeft, BiChevronRight, BiDotsHorizontalRounded, BiRefresh } from 'react-icons/bi';
import SearchBar from '../../components/SearchBar';
import ModalRequest from './ModalRequest';
import DialogConfirm from '../../components/DialogConfirm';

const EXPIRATION = 7;
const TABLE_HEAD = ['Name', 'ISBN', 'Received date', 'Status', ''];

const StatusChip = ({status}) => {
  switch (status) {
    case 'Pending':
      return <div className="px-2 py-1 bg-gray-300 rounded-full text-xs w-20 flex justify-center">Pending</div>
    case 'Rejected':
      return <div className="px-2 py-1 bg-deep-orange-400 rounded-full text-xs w-20 flex justify-center">Rejected</div>
    case 'Accepted':
      return <div className="px-2 py-1 bg-amber-400 rounded-full text-xs w-20 flex justify-center">Accepted</div>
    default:
      return <div className="px-2 py-1 bg-green-200 rounded-full text-xs w-20 flex justify-center">Done</div>
  }
}

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

  const filterSearch = ['name', 'ISBN']
  const [selectedFilter, setSelectedFilter] = useState(filterSearch[0]);

  const handleSearch = (e) => { //TODO: Uncomment and add search function
    // const searchTerm = e.target.value;
    // if (searchTerm === '') {
    //   setBorrowData(slipList);
    //   return;
    // }
    // const searchedData = slipList.filter((d) =>
    //   {
    //     if (selectedFilter === 'ISBN') {
    //       return d.borrowList.some((book) => book.book[selectedFilter].includes(searchTerm));
    //     }
    //     else {
    //       return d.UserID[selectedFilter].toLowerCase().includes(searchTerm.toLowerCase())
    //     }
    //   }
    // );
    // setBorrowData(searchedData);
  }

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

  // const [borrowData, setBorrowData] = useState(slipList) //TODO: Dung cai nay, nhung ma du lieu lay tu database len
  const [borrowData, setBorrowData] = useState([])

  const generateUsername = () => {
    const adjectives = ['Happy', 'Sunny', 'Brave', 'Clever', 'Gentle', 'Kind', 'Bright', 'Calm', 'Lively', 'Wise'];
    const nouns = ['Panda', 'Tiger', 'Lion', 'Elephant', 'Giraffe', 'Kangaroo', 'Koala', 'Monkey', 'Owl', 'Zebra'];
    const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
    const randomNounIndex = Math.floor(Math.random() * nouns.length);
    return `${adjectives[randomAdjectiveIndex]}${nouns[randomNounIndex]}`;
  };
  
  // Function to generate random ISBN number
  const generateISBN = () => {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `${result}`;
  };
  
  // Function to generate random date within a range
  const generateRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  useEffect(() => {
    // Dummy data creation
    const currentDate = new Date(); // Current date
    const dummyData = Array.from({ length: 10 }, (_, index) => ({
      _id: index + 1,
      username: generateUsername(),
      ISBN: generateISBN(),
      receivedDate: formatDate(generateRandomDate(new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000), currentDate)), // Random date in the last 30 days
    }));
    setBorrowData(dummyData);
  }, []);

  const [openRequest, setOpenRequest] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('all');

  return (
    <div className="flex flex-col w-full h-full gap-8">
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
              label="Name"
              name="name"
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
            <p className='text-2xl font-semibold'>PENDING REQUESTS</p>
            <div className='flex gap-2'>
              <SearchBar 
                filters={filterSearch}
                onClick={(e) => setSelectedFilter(e.target.value)} 
                onChange={handleSearch}
              />
              <div className="w-48">
                <Select 
                  label="Filter by"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e)}
                >
                  <Option value="all">All</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="accepted">Accepted</Option>
                </Select>
              </div>
            </div>
          </div>
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
              {borrowData?.map((record, index) => (
                <tr 
                  key={index} 
                  className="even:bg-blue-gray-50/50 hover:bg-lightOrange/30 hover:cursor-pointer"
                >
                  <td 
                    className="p-2"
                    onClick={() => setOpenRequest(!openRequest)}
                  >
                    {/* <p>{record?.UserID?.username}</p> */}
                    <p>{record.username}</p>
                  </td>
                  <td 
                    className="p-2"
                    onClick={() => setOpenRequest(!openRequest)}
                  >
                    {/* <p>{record?.borrowList?.map((b) => b.book?.ISBN)?.join(', ')}</p> */}
                    <p>{record.ISBN}</p>
                  </td>
                  <td 
                    className="p-2"
                    onClick={() => setOpenRequest(!openRequest)}
                  >
                    {/* <p>{formatDate(record.borrowDate)}</p> */}
                    <p>{record.receivedDate}</p>
                  </td>
                  <td 
                    className="p-2"
                    onClick={() => setOpenRequest(!openRequest)}
                  >
                    <StatusChip status='Pending' />
                  </td>
                  <td className="p-2 space-x-6 text-right">
                    <FaTrash onClick={() => setOpenConfirm(!openConfirm)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination/>

          <ModalRequest open={openRequest} handleOpen={() => setOpenRequest(!openRequest)}></ModalRequest>
          <DialogConfirm open={openConfirm} handleOpen={() => setOpenConfirm(!openConfirm)}></DialogConfirm>
      </div>
    </div>
  )
}

export default Borrow
