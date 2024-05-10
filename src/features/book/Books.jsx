import React, {useState, useEffect} from 'react'
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import { Select, Option } from '@material-tailwind/react';
import { getBooks } from './bookApi';
import { PiBookLight } from "react-icons/pi";

const TABLE_HEAD = ['', 'ISBN', 'Name', 'Author', 'Publisher', 'Year', 'Genre', 'Price', 'Quantity', 'Borrowed'];

// Book page
const Books = () => {
  const dataEmpty = {
    books: [],
    pageNumber: 0,
    totalPages: 0,
    totalItems: 0
  }

  const [data, setData] = useState(dataEmpty);

  const filterSearch = ['name', 'isbn']
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedSort, setSelectedSort] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log("paging")

    getBooks(data.pageNumber, filterSearch[selectedFilter], searchTerm, selectedSort).then((res) => {
      if(res !== null)
        setData(res);
      else
        setData(dataEmpty)
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

    getBooks(data.pageNumber, filterSearch[filterBy], searchTerm, selectedSort).then((res) => {
      if(res !== null)
        setData(res);
      else
        setData(dataEmpty)
    })
  }

  return (
    <div className={`flex w-full h-full flex-col`}>    
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
            <Option value="borrowed-asc">Borrowed: Low - High</Option>
            <Option value="borrowed-desc">Borrowed: High - Low</Option>
            <Option value="name-asc">Name: A-Z</Option>
            <Option value="name-desc">Name: Z-A</Option>
          </Select>
        </div>
      </div>
      <div className='flex py-4'>
        <p className='font-semibold text-2xl'>Book list</p>
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
            {data.books.map((record) => (
              <tr key={record.id} className="even:bg-blue-gray-50/50">
                <td className="p-2 w-12 h-12">
                  {record.image?.secureUrl ?
                  <img src={record.image.secureUrl} alt="logo" className="w-full h-full object-contain" />:
                  <PiBookLight className='w-full h-full' />
                  }
                </td>
                <td className="p-2">
                  <p>{record.isbn}</p>
                </td>
                <td className="p-2">
                  <p>{record.name}</p>
                </td>
                <td className="p-2">
                  <p>{record.author.name}</p>
                </td>
                <td className="p-2">
                  <p>{record.publisher.name}</p>
                </td>
                <td className="p-2">
                  <p>{record.publishYear}</p>
                </td>
                <td className="p-2">
                  <p>{record.genres?.map(obj => obj.name).join(', ')}</p>
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

export default Books