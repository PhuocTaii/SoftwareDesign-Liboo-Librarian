// Dashboard page
import React, { useState } from 'react'
import { 
  Card, 
  CardBody, 
  Typography,
  Input,
} from '@material-tailwind/react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 1],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Number of books borrowed per month',
    },
  },
};

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState(new Date());
  
  return (
    <div className="flex w-full h-full flex-col">
      <div className='flex gap-5 mb-8 w-full'>
        <Card className="w-fit">
          <CardBody className='flex flex-col items-center'>
            <Typography variant="paragraph" color="blue-gray" className="mb-2">
              Total books being borrowed
            </Typography>
            <Typography variant="h4">
              10
            </Typography>
          </CardBody>
        </Card>

        <Card className="w-fit">
          <CardBody className='flex flex-col items-center'>
            <Typography variant="paragraph" color="blue-gray" className="mb-2">
              Total pending reservations
            </Typography>
            <Typography variant="h4">
              10
            </Typography>
          </CardBody>
        </Card>

        <Card className="w-fit">
          <CardBody className='flex flex-col items-center'>
            <Typography variant="paragraph" color="blue-gray" className="mb-2">
              Total active borrowers
            </Typography>
            <Typography variant="h4">
              10
            </Typography>
          </CardBody>
        </Card>
      </div>

      <div className='mb-4 w-full'>
        <div className='flex justify-between w-full'>
          <p className='font-semibold text-2xl'>Borrowing Trend</p>
          <div className="flex gap-2 items-center">
            <p>Year: </p>
            <DatePicker
              id="year-picker"
              className="text-primary text-center h-8 border-[1.5px] border-gray-900 rounded-md hover:cursor-pointer w-32"
              selected={selectedYear}
              onChange={(year) => setSelectedYear(year)}
              showYearPicker
              dateFormat="yyyy"
              yearItemNumber={8}
              maxDate={new Date()}
              required
            />
          </div>
        </div>
        <div className='w-[984px] mx-auto'>
          <Bar className='w-full' options={options} data={data} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
