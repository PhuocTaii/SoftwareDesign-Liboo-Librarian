import React, {useEffect, useState} from 'react'
import {formatDate} from '../../helpers/dateFormat';
import { BiUserCircle } from 'react-icons/bi';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import { Select, Option } from '@material-tailwind/react';
import { getReaders } from './accountApi';
import { useDispatch } from 'react-redux';
import { setSelectedItem } from '../../slices/menu';

const TABLE_HEAD = ['', 'Name', 'Email', 'Identifier', 'Gender', 'Phone', 'Birthdate', 'Address', 'Reg. date', 'Exp. date', 'Membership'];

const Accounts = () => {
  const dispatch = useDispatch();
  dispatch(setSelectedItem(1));

  const dataEmpty = {
    users: [],
    pageNumber: 0,
    totalPages: 0,
    totalItems: 0
  }

  const [data, setData] = useState(dataEmpty);

  const filterSearch = ['name', 'email']
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedSort, setSelectedSort] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log("paging")

    getReaders(data.pageNumber, filterSearch[selectedFilter], searchTerm, selectedSort).then((res) => {
      if(res !== null) {
        setData(res);
      }
      else {
        setData(dataEmpty)
      }
    })
  }, [data.pageNumber])
  const prevPage = () => {
    if(data.pageNumber > 0) {
      setData({...data, pageNumber: data.pageNumber - 1})
    }
  }
  const nextPage = () => {
    if(data.pageNumber < data.totalPages - 1) {
      setData({...data, pageNumber: data.pageNumber + 1})
    }
  }

  const handleSearch = (searchTerm, filterBy, selectedSort) => {
    console.log("searching")

    getReaders(data.pageNumber, filterSearch[filterBy], searchTerm, selectedSort).then((res) => {
      if(res !== null)
        setData(res);
      else
        setData(dataEmpty)
    })
  }

  return (
    <div className={`flex w-full h-full flex-col`}>
      {/* Search bar */}
      <div className='w-full flex justify-between gap-4'>
        <SearchBar 
          filters={filterSearch} 
          onSearch={(searchTerm, filterBy, selectedSort) => handleSearch(searchTerm, filterBy, selectedSort)}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          selectedSort={selectedSort}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="w-72">
          <Select 
            label="Sort by"
            value={selectedSort}
            onChange={(e) => {
              setSelectedSort(e)
            }}
          >
            <Option value="">None</Option>
            <Option value="joined-date-desc">Registration date: Newest</Option>
            <Option value="joined-date-asc">Registration date: Oldest</Option>
            <Option value="name-asc">Name: A-Z</Option>
            <Option value="name-desc">Name: Z-A</Option>
            <Option value="email-asc">Email: A-Z</Option>
            <Option value="email-desc">Email: Z-A</Option>
          </Select>
        </div>
      </div>
      <div className='flex py-4'>
          <p className='font-semibold text-2xl'>Reader list</p>
      </div>
      <div className='w-full min-h-max overflow-x-scroll'>
        <table className="w-full min-w-max table-auto text-left">
          <thead className='z-0'>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4">
                  <p className="leading-none">{head}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.users.map((record) => (
              <tr key={record.id} className="even:bg-blue-gray-50/50 hover:bg-lightOrange/30">
                <td className="p-2 w-12 h-12">
                  {record.image?.secureUrl ?
                    <img src={record.image.secureUrl} alt="logo" className="w-full h-full rounded-full object-cover shrink-0" /> 
                    :
                    <BiUserCircle className='w-full h-full' />
                  }
                </td>
                <td className="p-2">
                  <p>{record.name}</p>
                </td>
                <td className="p-2">
                  <p>{record.email}</p>
                </td>
                <td className="p-2">
                  <p>{record.identifier}</p>
                </td>
                <td className="p-2">
                  <p>{!record.gender ? 'Male' : 'Female'}</p>
                </td>
                <td className="p-2">
                  <p>{record.phone}</p>
                </td>
                <td className="p-2">
                  <p>{formatDate(record.birthDate)}</p>
                </td>
                <td className="p-2">
                  <p>{record.address}</p>
                </td>
                <td className="p-2">
                  <p>{formatDate(record.joinedDate)}</p>
                </td>
                <td className="p-2">
                  <p>{formatDate(record.expiredDate)}</p>
                </td> 
                <td className="p-2">
                  <p>{record.membership.type}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination 
        className={"mx-auto w-fit"} 
        numPages={data.totalPages} 
        currentPage={data.pageNumber}
        onPageClick={(page) => 
          setData({
            ...data,
            pageNumber: page
          })
        }
        onPrevClick={prevPage}
        onNextClick={nextPage}
      />
    </div>
  )
}

export default Accounts