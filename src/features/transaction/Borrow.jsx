import React, {useState, useEffect} from 'react'
import {Input, Select, Option, Button} from "@material-tailwind/react";
import CustomButton from "../../components/CustomButton";
import Pagination from '../../components/Pagination';
import {formatDate} from '../../helpers/dateFormat';
import { BiRefresh } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { borrowBook, getNotPickUpToday, updateReservationPickup } from './transactionApi';
import SearchBook from './SearchBook'
import SearchBar from '../../components/SearchBar';

const EXPIRATION = 30;
const TABLE_HEAD = ['Reserve date' , 'Reader name', 'Reader email', 'ISBN', 'Book name', ''];

const StatusChip = () => {
  return <div className="px-2 py-1 bg-green-100 bg-opacity-80 rounded-full text-xs w-20 text-center text-nowrap h-fit">PICK UP</div>
}

// Borrow page
const Borrow = () => {
  const [selectedReservation, setSelectedReservation] = useState(null)

  const tempBorrowedDate = new Date()

  const [transaction, setTransaction] = useState({
    email: '',
    isbns: [],
    borrowedDate: tempBorrowedDate.toISOString().split('T')[0],
    dueDate: new Date(tempBorrowedDate.getFullYear(), tempBorrowedDate.getMonth(), tempBorrowedDate.getDate() + EXPIRATION).toISOString().split('T')[0]
  })

  const [bookNameSearch, setBookNameSearch] = useState('');

  const handleBorrowBook = (e) => {
    e.preventDefault();
    if(transaction.isbns.length <= 0) {
      toast.info("Please have at least 1 book to borrow.")
      return
    }
    borrowBook(transaction).then((data) => {
      if(data != null)
      {
        setTransaction({
          ...transaction,
          email: '',
          isbns: []
        });
        setBookNameSearch("")

        if(selectedReservation !== null) {
          updateReservationPickup(selectedReservation.id).then((data) => {
            if(data != null)
            {
              getNotPickUpToday(notPickUpToday.pageNumber).then((newData) => {
                console.log(data);
                if(newData != null){
                  setNotPickUpToday(newData);
                }
              })
            }
            setSelectedReservation(null)
          })
        }
      }
    })
  }

  const addISBN = (isbn) => {
    if(isbn !== '' && transaction.isbns.length < 2 && !transaction.isbns.includes(isbn)) {
      setSelectedReservation(null)
      setTransaction({...transaction, isbns: [...transaction.isbns, isbn]});
    }
  }

  const refreshBorrow = (e) => {
    e.preventDefault();
    const tempBorrowedDate = new Date()
    setTransaction({
      email: '',
      isbns: [],
      borrowedDate: tempBorrowedDate.toISOString().split('T')[0],
      dueDate: new Date(tempBorrowedDate.getFullYear(), tempBorrowedDate.getMonth(), tempBorrowedDate.getDate() + EXPIRATION).toISOString().split('T')[0]
    });
    setBookNameSearch("")
  }

  const [notPickUpToday, setNotPickUpToday] = useState({
    reservations: [],
    totalPages: 0,
    pageNumber: 0
  });

  useEffect(() => {
    getNotPickUpToday(notPickUpToday.pageNumber).then((data) => {
      console.log(data);
      if(data != null){
        setNotPickUpToday(data);
      }
    })
  }, [notPickUpToday.pageNumber])
  const prevPage = () => {
    if(notPickUpToday.pageNumber > 0) {
      setNotPickUpToday({...notPickUpToday, pageNumber: notPickUpToday.pageNumber - 1})
    }
  }
  const nextPage = () => {
    if(notPickUpToday.pageNumber < notPickUpToday.totalPages - 1) {
      setNotPickUpToday({...notPickUpToday, pageNumber: notPickUpToday.pageNumber + 1})
    }
  }

  const fillTransaction = (record) => {
    const tempBorrowedDate = new Date()
    setTransaction({
      email: record.user.email,
      isbns: record.books.map((book) => book.isbn),
      borrowedDate: tempBorrowedDate.toISOString().split('T')[0],
      dueDate: new Date(tempBorrowedDate.getFullYear(), tempBorrowedDate.getMonth(), tempBorrowedDate.getDate() + EXPIRATION).toISOString().split('T')[0]
    })
  }

  const handleSearch = (searchTerm) => {
    getNotPickUpToday(notPickUpToday.pageNumber, searchTerm).then((data) => {
      console.log(data);
      if(data != null){
        setNotPickUpToday(data);
      }
    })
  }

  return (
    <div className="flex flex-col w-full h-full gap-8">
      <form className="w-full space-y-5" onSubmit={handleBorrowBook}>
        <div className='flex justify-between'>
          <div className='flex gap-2 items-center'>
            <p className="text-2xl font-semibold">BORROW BOOKS</p>
            {selectedReservation && <StatusChip />}
          </div>

          <button onClick={refreshBorrow}>
            <BiRefresh size='2rem' />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className='col-span-2'>
            <Input
              variant="standard"  
              label="Email"
              name="email"
              value={transaction.email}
              onChange={(e) => {
                setSelectedReservation(null)
                setTransaction({...transaction, email: e.target.value})
              }}
              required
            />
          </div>
          <Input
            variant="standard"
            label="Borrowing date"
            name="borrowDate"
            value={formatDate(transaction.borrowedDate)}
            readOnly
          />
          <Input
            variant="standard"
            label="Due date"
            name="dueDate"
            value={formatDate(transaction.dueDate)}
            readOnly
          />
          <div className="relative">
            <SearchBook
              onClick={(item) => addISBN(item.isbn)}
              bookName={bookNameSearch}
              setBookName={setBookNameSearch}
            />
          </div>
          <Input
            variant="standard"
            label="Chosen book ISBNs"
            value={transaction.isbns}
            readOnly
          />
        </div>
        <div className="flex justify-center pt-3">
          <CustomButton label="Done" type="submit" />
        </div>
      </form>
      <div className='w-full space-y-3'>
        <div className='flex justify-between'>
          <p className='text-2xl font-semibold w-fit'>NOT PICKUP TODAY</p>
          <SearchBar
            filters={null} 
            onSearch={(searchTerm, filterBy, selectedSort) => handleSearch(searchTerm)}
            selectedFilter={null}
            setSelectedFilter={null}
            selectedSort={null}
            placeholder='Enter reader name'
          />
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
              {notPickUpToday.reservations.map((record) => (
                <>
                {record?.books.map((detail, index) => (
                  <tr key={`${record.id}${detail.id}`} className="">
                    {index === 0 && 
                      <>
                        <td className="p-2 border border-blue-gray-100" rowSpan={record.books.length}>
                          <p>{formatDate(record.reservedDate)}</p>
                        </td>
                        <td className='p-2 border border-blue-gray-50'>
                          <p>{record.user.name}</p>
                        </td>
                        <td className='p-2 border border-blue-gray-50'>
                          <p>{record.user.email}</p>
                        </td>
                      </>
                    }
                    <td className='p-2 border border-blue-gray-50'>
                      <p>{detail.isbn}</p>
                    </td>
                    <td className='p-2 border border-blue-gray-50'>
                      <p>{detail.name}</p>
                    </td>
                    {index === 0 && 
                      <td className="p-2 border border-blue-gray-100" rowSpan={record.books.length}>
                        <Button 
                          variant="outlined"
                          className='p-2 text-xs normal-case font-normal mr-2'
                          onClick={() => {
                            setSelectedReservation(record)
                            fillTransaction(record)
                          }}
                        >
                          Pick up
                        </Button>
                      </td>
                    }
                  </tr>
                ))}
                </>
              ))}
            </tbody>
          </table>
          <Pagination 
            className={"mx-auto w-fit"} 
            numPages={notPickUpToday.totalPages} 
            currentPage={notPickUpToday.pageNumber}
            onPageClick={(page) => 
              setNotPickUpToday({
                ...notPickUpToday,
                pageNumber: page
              })
            }
            onPrevClick={prevPage}
            onNextClick={nextPage}
          />

          {/* <ModalRequest open={openRequest} handleOpen={() => setOpenRequest(!openRequest)}></ModalRequest>
          <DialogConfirm open={openConfirm} handleOpen={() => setOpenConfirm(!openConfirm)}></DialogConfirm> */}
      </div>
    </div>
  )
}

export default Borrow
