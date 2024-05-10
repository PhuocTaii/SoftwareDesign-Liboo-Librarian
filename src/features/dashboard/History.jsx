// Statistic page
import React, {useState, useEffect} from 'react'
import { 
  Select, 
  Option,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Input
} from '@material-tailwind/react';
import Pagination from '../../components/Pagination';
import {formatDate} from '../../helpers/dateFormat';
import { BiChevronDown } from 'react-icons/bi'
import { getBorrows, getRenews, getReservations } from './dashboardApi';
import { useDispatch } from 'react-redux';
import { setSelectedItem } from '../../slices/menu';

const StatusChip = ({status}) => {
  if(status) {
    return <div className="px-2 py-1 bg-green-200 rounded-full text-xs w-20 text-center text-nowrap">PICKED-UP</div>
  }
  else
    return <div className="px-2 py-1 bg-gray-300 rounded-full text-xs w-20 text-center text-nowrap">NOT YET</div>
}

const InputDate = ({onChange, value}) => {
  return (
    <div className='w-48'>
      <Input
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        containerProps={{
          className: "min-w-fit",
        }}
        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
        type="date"
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

const MenuFilter = ({filters, selectedFilter, setSelectedFilter, openMenu, setOpenMenu}) => {
  return(
    <Menu placement="bottom-start" open={openMenu} handler={setOpenMenu}>
      <MenuHandler>
        <Button
          ripple={false}
          variant="text"
          className="flex justify-between w-48 h-8 items-center gap-2 rounded-lg border border-blue-gray-200 px-2 normal-case font-normal text-sm">
          {filters[selectedFilter]}
          <BiChevronDown
            size="1.3rem"
            className={`transition-transform ${openMenu ? 'rotate-180' : ''}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="max-h-[20rem] max-w-[18rem]">
        {filters.map((item, index) => {
          return (
            <MenuItem
              key={index}
              value={item}
              className="flex items-center gap-2"
              onClick={() => setSelectedFilter(index)}>
              <p className="">{item}</p>
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}

const TABLE_BORROW_HEAD = ['ISBN', 'Book name', 'Borrow date', 'Due date', 'Return date', 'Fine', 'Renewal count'];
const TABLE_RENEWAL_HEAD = ['ISBN', 'Book name', 'Renew date'];
const TABLE_RESERVATION_HEAD = ['ISBN', 'Book name', 'Reserve date', 'Pickup date', 'Status'];

const History = () => {
  const dispatch = useDispatch();
  dispatch(setSelectedItem(5));

  // BORROW
  // const [selectedFilterBororw, setSelectedFilterBorrow] = useState(0);
  const handleSearchBorrow = (e) => {
    
  }
  const dateTypesBorrow = ['None', 'Borrow date', 'Due date', 'Return date']
  const [selectedDateTypeBorrow, setSelectedDateTypeBorrow] = useState(0)
  const [openMenu, setOpenMenu] = useState(false)
  const [dataBorrow, setDataBorrow] = useState({
    transactions: [],
    totalPages: 1,
    pageNumber: 0
  })
  const [selectedDatesBorrow, setSelectedDatesBorrow] = useState({
    from: "",
    to: ""
  })


  // RENEW
  // const [selectedFilterRenew, setSelectedFilterRenew] = useState(0);
  const handleSearchRenew = (e) => {
    
  }
  const [dataRenew, setDataRenew] = useState({
    renewals: [],
    totalPages: 1,
    pageNumber: 0
  })
  const [selectedDateTypeRenew, setSelectedDateTypeRenew] = useState({
    from: "",
    to: ""
  })

  // RESERVE
  // const [selectedFilterReserve, setSelectedFilterReserve] = useState(0);
  const handleSearchReserve = (e) => {
    
  }
  const dateTypesReserve = ['None', 'Reserve date', 'Pickup date']
  const [selectedDateTypeReserve, setSelectedDateTypeReserve] = useState(0)
  const [openMenuReserve, setOpenMenuReserve] = useState(false)
  const [dataReserve, setDataReserve] = useState({
    reservations: [],
    totalPages: 1,
    pageNumber: 0
  })
  const [selectedDatesReserve, setSelectedDatesReserve] = useState({
    from: "",
    to: ""
  })

  // ------------------- HANDLE PAGING -------------------
  // Paging borrows
  useEffect(() => {
    getBorrows(dataBorrow.pageNumber, selectedDateTypeBorrow, selectedDatesBorrow.from, selectedDatesBorrow.to).then((data) => {
      if(data != null) {
        setDataBorrow(data)
      }
    })
  }, [dataBorrow.pageNumber, selectedDateTypeBorrow, selectedDatesBorrow])
  const prevPageBorrow = () => {
    if(dataBorrow.pageNumber > 0) {
      setDataBorrow({...dataBorrow, pageNumber: dataBorrow.pageNumber - 1})
    }
  }
  const nextPageBorrow = () => {
    if(dataBorrow.pageNumber < dataBorrow.totalPages - 1) {
      setDataBorrow({...dataBorrow, pageNumber: dataBorrow.pageNumber + 1})
    }
  }

  // Paging renewals
  useEffect(() => {
    getRenews(dataRenew.pageNumber, "renew-date", selectedDateTypeRenew.from, selectedDateTypeRenew.to).then((data) => {
      if(data != null) {
        setDataRenew(data)
      }
    })
  }, [dataRenew.pageNumber, "renew-date", selectedDateTypeRenew])
  const prevPageRenew = () => {
    if(dataRenew.pageNumber > 0) {
      setDataRenew({...dataRenew, pageNumber: dataRenew.pageNumber - 1})
    }
  }
  const nextPageRenew = () => {
    if(dataRenew.pageNumber < dataRenew.totalPages - 1) {
      setDataRenew({...dataRenew, pageNumber: dataRenew.pageNumber + 1})
    }
  }

  // Paging reservations
  useEffect(() => {
    getReservations(dataReserve.pageNumber, selectedDateTypeReserve, selectedDatesReserve.from, selectedDatesReserve.to).then((data) => {
      if(data != null) {
        setDataReserve(data)
      }
    })
  }, [dataReserve.pageNumber, selectedDateTypeReserve, selectedDatesReserve])
  const prevPageReserve = () => {
    if(dataReserve.pageNumber > 0) {
      setDataReserve({...dataReserve, pageNumber: dataReserve.pageNumber - 1})
    }
  }
  const nextPageReserve = () => {
    if(dataReserve.pageNumber < dataReserve.totalPages - 1) {
      setDataReserve({...dataReserve, pageNumber: dataReserve.pageNumber + 1})
    }
  }

  const [selectedId, setSelectedId] = useState(0)

  return (
    <div className={`flex w-full h-full flex-col`}>
      {/* -------------------BORROW------------------- */}
      <div>
        <div className='flex justify-between py-4 flex-col'>
          <p className='font-semibold text-2xl pb-4'>BORROWS</p>
          {/* Search bar */}
          <div className='w-full flex flex-col justify-between gap-4'>
            <div className='flex gap-2 items-center'>
              <p>Filter</p>
              <MenuFilter
                filters={dateTypesBorrow}
                selectedFilter={selectedDateTypeBorrow}
                setSelectedFilter={setSelectedDateTypeBorrow}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
              {
                selectedDateTypeBorrow !== 0 &&
                <>
                  <p>from</p>
                  <InputDate
                    onChange={(e) =>
                      setSelectedDatesBorrow({
                        ...selectedDatesBorrow,
                        from: e.target.value})
                    }
                    value={selectedDatesBorrow.from}
                  />
                  <p>to</p>
                  <InputDate
                    onChange={(e) =>
                      setSelectedDatesBorrow({
                        ...selectedDatesBorrow,
                        to: e.target.value})
                    }
                    value={selectedDatesBorrow.to}
                  />
                </>
              }
            </div>
          </div>
        </div>
        <div className='w-full min-h-max overflow-x-scroll'>
          <table className="w-full min-w-max table-auto text-left">
            <thead className='sticky top-0'>
              <tr>
                {TABLE_BORROW_HEAD.map((head, index) => (
                  <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4">
                    <p className="leading-none opacity-70">{head}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataBorrow.transactions.map((record) => (
                <>
                  {record?.transactionBooks.map((detail, index) => (
                    <tr key={detail.id} className="" onClick={() => setSelectedId(detail.id)}>
                      <td className='p-2 border border-blue-gray-50'>
                        <p>{detail.book.isbn}</p>
                      </td>
                      <td className='p-2 border border-blue-gray-50'>
                        <p>{detail.book.name}</p>
                      </td>
                      {index === 0 && 
                        <td className="p-2 border border-blue-gray-100" rowSpan={record.transactionBooks.length}>
                          <p>{formatDate(record.borrowedDate)}</p>
                        </td>
                      }
                      <td className='p-2 border border-blue-gray-50'>
                        <p>{formatDate(detail.dueDate)}</p>
                      </td>
                      <td className='p-2 border border-blue-gray-50'>
                        <p>{formatDate(detail.returnDate)}</p>
                      </td>
                      {index === 0 && 
                        <td className="p-2 border border-blue-gray-100" rowSpan={record.transactionBooks.length}>
                          <p>{record.fine}</p>
                        </td>
                      }
                      <td className='p-2 border border-blue-gray-50'>
                        <p>{detail.renewalCount}</p>
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination 
          className={"mx-auto w-fit"} 
          numPages={dataBorrow.totalPages} 
          currentPage={dataBorrow.pageNumber}
          onPageClick={(page) => 
            setDataBorrow({
              ...dataBorrow,
              pageNumber: page
            })
          }
          onPrevClick={prevPageBorrow}
          onNextClick={nextPageBorrow}
          />
      </div>

      {/* -------------------RENEW------------------- */}
      <div>
        <div className='flex justify-between py-4 flex-col'>
          <p className='font-semibold text-2xl pb-4'>RENEWALS</p>
          {/* Search bar */}
          <div className='w-full flex flex-col justify-between gap-4'>
            <div className='flex gap-2 items-center'>
              <p>Filter <span className='font-semibold'>Renew date</span> from</p>
              <div className='w-fit'>
                <Input
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "min-w-0",
                  }}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  type="date"
                  // onChange={handleChangeInfo}
                  name='filter-from'
                />
              </div>
              <p>to</p>
              <div className='w-fit'>
                <Input
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "min-w-0",
                  }}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  type="date"
                  // onChange={handleChangeInfo}
                  name='filter-to' 
                />
              </div>
            </div>
          </div>
        </div>
        <div className='w-full min-h-max overflow-x-scroll'>
          <table className="w-full min-w-max table-auto text-left">
            <thead className='sticky top-0'>
              <tr>
                {TABLE_RENEWAL_HEAD.map((head, index) => (
                  <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4">
                    <p className="leading-none opacity-70">{head}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRenew.renewals.map((record) => (
                <tr key={record.id} className="even:bg-blue-gray-50/50">
                  <td className="p-2">
                    <p>{record.transactionBook?.book?.isbn}</p>
                  </td>
                  <td className="p-2">
                    <p>{record.transactionBook?.book?.name}</p>
                  </td>
                  <td className="p-2">
                    <p>{formatDate(record.requestDate)}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination 
          className={"mx-auto w-fit"} 
          numPages={dataRenew.totalPages} 
          currentPage={dataBorrow.pageNumber}
          onPageClick={(page) => 
            setDataRenew({
              ...dataRenew,
              pageNumber: page
            })
          }
          onPrevClick={prevPageRenew}
          onNextClick={nextPageRenew}
          />
      </div>

      {/* -------------------RESERVATIONS------------------- */}
      <div>
        <div className='flex justify-between py-4 flex-col'>
          <p className='font-semibold text-2xl pb-4'>RESERVATIONS</p>
          {/* Search bar */}
          <div className='w-full flex flex-col justify-between gap-4'>
            <div className='flex gap-2 items-center'>
              <p>Filter</p>
              <MenuFilter
                filters={dateTypesReserve}
                selectedFilter={selectedDateTypeReserve}
                setSelectedFilter={setSelectedDateTypeReserve}
                openMenu={openMenuReserve}
                setOpenMenu={setOpenMenuReserve}
              />
              {
                selectedDateTypeReserve !== 0 &&
                <>
                  <p>from</p>
                  <InputDate
                    onChange={(e) =>
                      setSelectedDatesReserve({
                        ...selectedDatesReserve,
                        from: e.target.value})
                    }
                    value={selectedDatesReserve.from}
                  />
                  <p>to</p>
                  <InputDate
                    onChange={(e) =>
                      setSelectedDatesReserve({
                        ...selectedDatesReserve,
                        to: e.target.value})
                    }
                    value={selectedDatesReserve.to}
                  />
                </>
              }
            </div>
          </div>
        </div>
        <div className='w-full min-h-max overflow-x-scroll'>
          <table className="w-full min-w-max table-auto text-left">
            <thead className='sticky top-0'>
              <tr>
                {TABLE_RESERVATION_HEAD.map((head, index) => (
                  <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4">
                    <p className="leading-none opacity-70">{head}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
            {dataReserve.reservations.map((record) => (
                <>
                {record?.books.map((detail, index) => (
                  <tr key={`${record.id}${detail.id}`} className="">
                    <td className='p-2 border border-blue-gray-50'>
                      <p>{detail.isbn}</p>
                    </td>
                    <td className='p-2 border border-blue-gray-50'>
                      <p>{detail.name}</p>
                    </td>
                    {index === 0 && 
                      <>
                        <td className="p-2 border border-blue-gray-100" rowSpan={record.books.length}>
                          <p>{formatDate(record.reservedDate)}</p>
                        </td>
                        <td className="p-2 border border-blue-gray-100" rowSpan={record.books.length}>
                          <p>{formatDate(record.pickupDate)}</p>
                        </td>
                      </>
                    }
                    {index === 0 && 
                      <td className="p-2 border border-blue-gray-100" rowSpan={record.books.length}>
                        <StatusChip status={record.status} />
                      </td>
                    }
                  </tr>
                ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination 
          className={"mx-auto w-fit"} 
          numPages={dataReserve.totalPages} 
          currentPage={dataReserve.pageNumber}
          onPageClick={(page) => 
            setDataReserve({
              ...dataReserve,
              pageNumber: page
            })
          }
          onPrevClick={prevPageReserve}
          onNextClick={nextPageReserve}
          />
      </div>
    </div>
  )
}

export default History
