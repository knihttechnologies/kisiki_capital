//import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import ReactApexChart from 'react-apexcharts';
import { PlusIcon } from "@heroicons/react/24/solid"
const options = {
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%',
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last',
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

const ChartTwo = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Sales',
        data: [44, 55, 41, 67, 22, 43, 65],
      },
      {
        name: 'Revenue',
        data: [13, 23, 20, 8, 13, 27, 15],
      },
    ],
  });
  
  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;  

  return (
    <div className="col-span-12 rounded-md border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className='' >Challenges</div>
      <div className='h-100' >
        <Link to="/new-challenge">
          <div  className=' flex flex-col p-15 items-center border-dotted border-2'>
              <div className="h-10 w-10"><PlusIcon /></div>
              <h3>Add new challenge</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChartTwo;
