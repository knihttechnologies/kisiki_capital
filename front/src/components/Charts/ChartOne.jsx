import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { userOrderFetch } from '../../hooks/useFetch';

const ChartOne = () => {
  const auth = useAuthContext()
 // const location = useLocation();
  const id = auth?.user?.user_id
  const urls = {
    ordersurl: `/api/users/oneorder/${id}`
  }
  const {userOrder, userOrderLoading, orderErrMsg} = userOrderFetch(urls?.ordersurl)
  // for debugging purpose
  // console.log(orders)
  if (userOrder === null || !userOrder || userOrder === undefined) return <p>No order has been registered yet</p> 
  if (userOrderLoading) {
      return <p>Loading...</p>;
  }
  if (orderErrMsg) {
      return <p className={"bg-red-500 text-white rounded-2xl mb-5 p-2 text-center "} >{orderErrMsg}</p>;
  }
  const divisionClass = "p-2 mt-4 mb-4 flex flex-wrap"
  return (
    <div className="col-span-12 rounded-md border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <div className="" >Current orders</div>
      {userOrder.map((order) => (
              <div key={order?.order_id}>
                <div className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {order?.entity_type}
                  </h5>
                </div>
                <div className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {order?.package_title}
                  </h5>
                </div>
                <div className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {order?.trading_currency}
                  </p>
                </div>
                <div className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {order?.account_balance}
                  </p>
                </div>
                <div className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {order?.platform}
                  </p>
                </div>
                <div className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {order?.type}
                  </p>
                </div>
                <div className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      order?.status === 'Paid'
                        ? 'bg-success text-success'
                        : order.status === 'Unpaid'
                        ? 'bg-danger text-danger'
                        : 'bg-warning text-warning'
                    }`}
                  >
                    {order?.status}
                  </p>
                </div>
                
              </div>
            ))}
    </div>
  );
};

export default ChartOne;

// import { ApexOptions } from 'apexcharts';
// import React, { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// const options = {
//   legend: {
//     show: false,
//     position: 'top',
//     horizontalAlign: 'left',
//   },
//   colors: ['#3C50E0', '#80CAEE'],
//   chart: {
//     fontFamily: 'Satoshi, sans-serif',
//     height: 335,
//     type: 'area',
//     dropShadow: {
//       enabled: true,
//       color: '#623CEA14',
//       top: 10,
//       blur: 4,
//       left: 0,
//       opacity: 0.1,
//     },

//     toolbar: {
//       show: false,
//     },
//   },
//   responsive: [
//     {
//       breakpoint: 1024,
//       options: {
//         chart: {
//           height: 300,
//         },
//       },
//     },
//     {
//       breakpoint: 1366,
//       options: {
//         chart: {
//           height: 350,
//         },
//       },
//     },
//   ],
//   stroke: {
//     width: [2, 2],
//     curve: 'straight',
//   },
//   // labels: {
//   //   show: false,
//   //   position: "top",
//   // },
//   grid: {
//     xaxis: {
//       lines: {
//         show: true,
//       },
//     },
//     yaxis: {
//       lines: {
//         show: true,
//       },
//     },
//   },
//   dataLabels: {
//     enabled: false,
//   },
//   markers: {
//     size: 4,
//     colors: '#fff',
//     strokeColors: ['#3056D3', '#80CAEE'],
//     strokeWidth: 3,
//     strokeOpacity: 0.9,
//     strokeDashArray: 0,
//     fillOpacity: 1,
//     discrete: [],
//     hover: {
//       size: undefined,
//       sizeOffset: 5,
//     },
//   },
//   xaxis: {
//     type: 'category',
//     categories: [
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec',
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//     ],
//     axisBorder: {
//       show: false,
//     },
//     axisTicks: {
//       show: false,
//     },
//   },
//   yaxis: {
//     title: {
//       style: {
//         fontSize: '0px',
//       },
//     },
//     min: 0,
//     max: 100,
//   },
// };


// const ChartOne= () => {
//   const [state, setState] = useState({
//     series: [
//       {
//         name: 'Product One',
//         data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
//       },

//       {
//         name: 'Product Two',
//         data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
//       },
//     ],
//   });

//   const handleReset = () => {
//     setState((prevState) => ({
//       ...prevState,
//     }));
//   };
//   handleReset;

//   return (
//     <div className="col-span-12 rounded-md border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
//       <div className='' >Current orders</div>
//     </div>
//   );
// };

// export default ChartOne;
