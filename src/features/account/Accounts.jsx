import React, {useEffect, useState} from 'react'
import { Button } from '@material-tailwind/react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {formatDate} from '../../helpers/dateFormat';
import { FaTrash, FaUserPlus } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md'
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import ModalAccount from './ModalAccount';
import CustomButton from '../../components/CustomButton';
import DialogConfirm from '../../components/DialogConfirm';
import { Select, Option } from '@material-tailwind/react';

const TABLE_HEAD = ['', 'Name', 'ID', 'Birthdate', 'Gender', 'Email', 'Address', 'Reg. date', 'Exp. date', 'Membership' ,'', ''];

const Accounts = () => {

  // const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    // Dummy data creation
    const dummyData = Array.from({ length: 10 }, (_, index) => ({
      _id: index + 1,
      name: `User Name ${index + 1}`,
      id: `ID-${index + 1}`,
      birthdate: `19${Math.floor(Math.random() * 10) + 70}-0${Math.floor(Math.random() * 9) + 1}-0${Math.floor(Math.random() * 9) + 1}`, // Random birthdate between 1970 and 1979
      gender: Math.random() < 0.5 ? 'Male' : 'Female',
      email: `user${index + 1}@example.com`,
      address: `Address ${index + 1}`,
      regDate: `2023-01-${Math.floor(Math.random() * 28) + 1}`, // Random registration date in January 2023
      expDate: `2024-01-${Math.floor(Math.random() * 28) + 1}`, // Random expiration date in January 2024
      membership: Math.random() < 0.33 ? 'Regular' : Math.random() < 0.66 ? 'Premium' : 'Student',
    }));
    setData(dummyData);
  }, []);

  const filterSearch = ['name', 'username']
  const [selectedFilter, setSelectedFilter] = useState(filterSearch[0]);
  const [selectedSort, setSelectedSort] = useState('newest');

  const handleSearch = (e) => {
    // const searchTerm = e.target.value;
    // if (searchTerm === '') {
    //   setReaderData(readerList);
    //   return;
    // }
    // const searchedReaders = readerList.filter((reader) => reader[selectedFilter].toLowerCase().includes(searchTerm.toLowerCase()));
    // setReaderData(searchedReaders);
  }

  const [openModal, setOpenModal] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)

  const [modalType, setModalType] = useState(0) // 0: Add, 1: Edit

  return (
    <div className={`flex w-full h-full flex-col`}>
      {/* Search bar */}
      <div className='w-full flex justify-between gap-4'>
        <SearchBar 
          filters={filterSearch} 
          onClick={(e) => setSelectedFilter(e.target.value)} 
          onChange={handleSearch}
        />
        <div className="w-72">
          <Select 
            label="Sort by"
            value={selectedSort}
            onChange={(e) => {setSelectedSort(e.value)}}
          >
            <Option value="newest">Registration date: Newest</Option>
            <Option value="oldest">Registration date: Oldest</Option>
            <Option value="name-a-z">Name: A-Z</Option>
            <Option value="name-z-a">Name: Z-A</Option>
          </Select>
        </div>
      </div>
      <div className='flex justify-between py-4'>
          <p className='font-semibold text-2xl'>Reader list</p>
          <CustomButton 
            label= {
              <div className="flex items-center gap-3">
                <FaUserPlus strokeWidth={2} className="h-4 w-4" /> Add member
              </div>
            }
            onClick={() => {
              setOpenModal(!openModal)
              setModalType(0)
            }}
            classes={"w-fit"}
          >
          </CustomButton>
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
                  <BiUserCircle className='w-full h-full' /> :
                  <img src={record.image} alt="logo" className="w-full h-full rounded-full object-cover shrink-0" />
                  }
                </td>
                <td className="p-2">
                  <p>{record.name}</p>
                </td>
                <td className="p-2">
                  <p>{record.id}</p>
                </td>
                <td className="p-2">
                  <p>{formatDate(record.birthday)}</p>
                </td>
                <td className="p-2">
                  <p>{record.gender}</p>
                </td>
                <td className="p-2">
                  <p>{record.email}</p>
                </td>
                <td className="p-2">
                  <p>{record.address}</p>
                </td>
                <td className="p-2">
                  <p>{formatDate(record.makingDay)}</p>
                </td>
                <td className="p-2">
                  <p>{formatDate(record.invalidDay)}</p>
                </td> 
                <td className="p-2">
                  <p>{record.membership}</p>
                </td>              
                <td className="p-2">
                    <MdEdit 
                      className="hover:cursor-pointer" 
                      onClick={() => {
                        setOpenModal(!openModal)
                        setModalType(1)
                      }}/>
                </td>
                <td className="p-2">
                    <FaTrash className="hover:cursor-pointer" onClick={() => setOpenConfirm(!openConfirm)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination/>

      <ModalAccount open={openModal} handleOpen={() => setOpenModal(!openModal)} type={modalType} />
      <DialogConfirm open={openConfirm} handleOpen={() => setOpenConfirm(!openConfirm)}></DialogConfirm>
    </div>
  )
}

export default Accounts