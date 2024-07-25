import React from 'react'
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
  Slider,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "../widgets/layout";
import { FeatureCard, TeamCard } from "../widgets/cards";
import { featuresData, teamData, contactData } from "../data";
import HomeStepForm from '../components/Tabs/HomeStepForm';
import GooglePay from '../api/GooglePay';
import { whyData } from './WhyUs';
import {
  FaInstagram, FaTelegram
} from "react-icons/fa";
import Chart from './Dashboard/Chart';
import { useTableContext } from '../context/TableContext';
import { useAuthContext } from '../context/AuthContext';
import SignIn from './Authentication/SignIn';
import { PropFirm } from '../components/Timers/PropFirm';
import axios from 'axios';

const LandingPage = () => {
  const auth = useAuthContext()
  const table = useTableContext()
  setTimeout(() => {
    table?.setTableErr()
    table?.setTableEmailMsg()
  }, 20000);
  let circleClasses = "inline-block p-5 rounded-full w-15 h-15";
  let iconStyles = { color: "white", fontSize: "20px" };
  const handleSubmit = async ()=>{
    const res = await axios.post('/api/payments/pesapalpay')
    console.log(res)
  }
  return (
    <>
    {table.tableModal &&
      <div className="bg-black/100 md:w-full h-screen">
        <div className="relative flex h-screen content-center items-center justify-center pt-20 pb-32 bg-black/100">
          <div className="absolute top-0 h-full w-full bg-[url('/image/kisiki-trading.jpg')] bg-cover bg-center" />
          <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
          <div className="max-w-8xl container relative mx-auto">
            <div className="flex flex-wrap items-center">
              <div className="mt-40 ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                {/* <GooglePay />  */}
                <button className='text-white' onclick={handleSubmit}>Pesa pal</button>
                <PropFirm />
                {table?.tableErr && <p className="bg-red-500 mb-5 text-white rounded-md text-sm p-3">{table?.tableErr}</p> }
                {table?.tableMsg && <p className="bg-green-500 mb-5 text-white rounded-md text-sm p-3">{table?.tableMsg}</p> }
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-6 font-black"
                >
                  Your story starts with us.
                </Typography>
                <Typography variant="lead" color="white" className="opacity-80">
                  Unlock Your Trading Potential with a Reputable Assessment Company
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <section className="transition duration-1000 ease-in=out -mt-10 bg-black/100 px-4 pb-20 pt-2">
          <div className="container mx-auto">
            <div className="transition duration-3000 ease-in=out flex flex-row flex-wrap gap-5 items-center">
              {featuresData.map(({ color, title, icon, description }) => (
                <FeatureCard
                  key={title}
                  color={color}
                  title={title}
                  icon={React.createElement(icon, {
                    className: "w-5 h-5 text-white",
                  })}
                  description={description}
                />
              ))}
            </div>
            {/* <div className="mt-40 mb-20 flex flex-wrap items-center">
              <Slider />
            </div> */}
            <div className="mt-40 flex flex-wrap items-center">
              <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                  {/* <FingerPrintIcon className="h-8 w-8 text-white " /> */}
                </div>
                <Typography
                  variant="h3"
                  className="mb-3 font-bold"
                  color="white"
                >
                  Trade Reporting
                </Typography>
                <Typography className="mb-8 font-normal text-white">
                  Unlock your trading potential with the Kisiki Capital dashboard. 
                  Effortlessly track your trades and delve deep into your trading statistics for unparalleled insights, 
                  all through our user-friendly interface.
                  <br />
                  <br />
                  <img
                      alt="Card Image"
                      src="/image/kisiki-capital-3d-chart.png"
                      className="h-full w-full animate-pulse"
                    />
                </Typography>
                {/* <Button variant="filled">read more</Button> */}
              </div>
              <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
                <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                  <CardHeader floated={false} className="relative h-56">
                    <img
                      alt="Card Image"
                      src="/image/confidence.png"
                      className="h-full w-full"
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="small" color="blue-gray" className="font-normal">Enterprise</Typography>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mb-3 mt-2 font-bold"
                    >
                      Top Notch Services
                    </Typography>
                    <Typography className="font-normal text-blue-gray-500">
                      Trade with confidence knowing that 
                      we are ensuring your peace of mind as you navigate the markets.
                    </Typography>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[url('/image/whyus.gif')] bg-pink bg-no-repeat bg-cover pt-20 pb-20 ">
          <div className="flex flex-row opacity-80 flex-wrap gap-6 py-16 p-10 justify-center border border-transparent shadow-md rounded-md">
            <div className=" ">
                <div className="rounded-md relative opacity-20 mt-10 w-100 h-90 bg-warning"></div>
                <div className="rounded-md relative opacity-60 -mt-95 w-95 h-95 bg-primary"></div>
                <div className="flex flex-col relative rounded-md -mt-100 w-90 h-100 bg-slate-300 items-center ">
                  <div className="bg-[url('/image/3dbg.jpg')] w-auto m-5 rounded-md">
                    <div className="w-auto p-8 text-center bg-slate-400 opacity-90 m-2 rounded-md">
                      <h1 className="mt-2 mb-2 text-md text-white">
                        payout certificate
                      </h1>
                      <div className="border border-1 border-white"></div>
                      <div className="border backdrop-blur-sm text-xl text-cyan-300 mt-5 shadown-md mb-5">
                        <p className="">
                          $ 5218.38
                        </p>
                      </div>
                      <p className="text-white text-xs/[10px] mb-2 mt-16">proudly presented to:</p>
                      <h2 className="text-white text-lg">John Doe</h2>
                      <div className="border border-1 border-white"></div>
                      <div className="flex flex-row">
                        <div className="mt-2">
                          <p className="text-white text-xs/[10px] mb-2 mt-2">Sign</p>
                          <p className="text-white text-xs/[10px] mb-2 mt-2">Baraka Aquilla</p>
                          <p className="text-white text-xs/[10px] mb-2 mt-2">Kisiki Capital</p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div className="">
              <h3 className="text-center text-white dark:text-white mt-4 mb-2 font-bold">
                Unlock Kisiki Capital Prime with just 4 successful withdrawals! Enjoy 100% profit share and 7 day withdrawals.
              </h3>
            </div>
          </div>
        </section>
        <section className="w-full pt-20 pb-20 flex items-center bg-black/100">
          <div className="m-6 px-2 opacity-80 gap-6 py-16 justify-center border border-transparent shadow-md rounded-md  sm:w-full md:w-full">
            <div className="p-2">
              <h1 className="text-center text-white dark:text-white mt-4 mb-2 font-bold">
                Why Choose Kisiki Capital?
              </h1>
              <h3 className="text-center text-white dark:text-white mt-4 mb-2 w-full">
              At Kisiki Capital, we are dedicated to providing our clients with a premier trading experience tailored to their unique needs. Our state-of-the-art trading platform is packed with powerful tools to help you make informed decisions. Access real-time market data, advanced charting capabilities, customizable alerts, and sophisticated order execution features all in one seamless interface. Join the Kisiki Capital community and experience the difference. Start trading with us today and unlock your full potential in the financial markets.
              </h3>
            </div>
            <div className="flex flex-wrap gap-5">
                {whyData.map(({ icon, desc, index}) => (
                  <>
                    <div 
                      className="flex flex-row flex-wrap mt-5 mb-5 p-2 w-60 h-10 text-center items-center bg-warning font-10 text-white gap-1 rounded-lg " key={index}
                    >
                      {React.createElement(icon, {
                        className: "w-6 h-6 text-white dark:text-white",
                      })}
                      {desc}
                    </div>
                  </>
                ))}
            </div>
          </div>
        </section>
        <section className="bg-[url('/image/kisiki-capital-fund.gif')] p-20 bg-contain bg-no-repeat bg-center overflow-visible overflow-x-auto items-center bg-black/100">
          <div className="rounded-lg p-2 bg-slate-800 w-full h-500 opacity-95 pb-4 pt-4">
            <PageTitle section="" heading="Trusted by many"></PageTitle>
            <div className="mt-10 justify-center w-full">
              {teamData.map(({ img, position }, key) => (
                <TeamCard
                  key={key}
                  img={img}
                  position={position}
                  socials={
                    <div className="flex flex-row flex-wrap items-center gap-2">
                      <Link to="https://t.me/kisiki_capital">
                      <span style={{ background: "#3B5998" }} className={circleClasses}>
                        <FaTelegram style={iconStyles} />
                      </span>
                      </Link>
                      <Link to="https://instagram.com/kisiki_capital">
                      <span style={{ background: "#c13584" }} className={circleClasses}>
                        <FaInstagram style={iconStyles} />
                      </span>
                      </Link>
                      <Link to="https://x.com/kisiki_capital">
                        <span style={{ background: "#1da1f2" }} className={circleClasses}>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>
                        </span>
                      </Link>
                    </div>
                  }
                />
              ))}
            </div>
          </div>
        </section>
        <section className="relative py-40 px-4 bg-black/100">
          <div className=" ">
            <Chart/>
          </div>
        </section>
        <section className="bg-[url('/image/kisiki-capital-trading-live.gif')] bg-black/100 bg-no-repeat bg-cover bg-center">
          <div className="backdrop-blur-sm p-10 items-center">
            <div className=" "></div>
            <PageTitle section="Packages" heading="Getting Started"></PageTitle>
            <div className="mt-10 mb-10 w-full overflow-visible overflow-x-auto">
              <HomeStepForm />
            </div> 
          </div>
        </section>
        <section className="backdrop-blur-md bg-black/100 py-10 p-5">
          <div className="lg:container bg-warning p-5 rounded-lg opacity-[85%] shadow-lg">
            <PageTitle section="Unmatched" heading="Revolutionary Trading Experience">
              Experience our bleeding-edge platform, making trading easier than ever, enabling you to be a better trader!
            </PageTitle>
            <div className="mx-auto mt-20 mb-15 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
              {contactData.map(({ title, icon, description }) => (
                <Card
                  key={title}
                  color="transparent"
                  shadow={false}
                  className="text-center text-blue-gray-900"
                >
                  <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-slate-900 shadow-lg shadow-gray-500/20">
                    {React.createElement(icon, {
                      className: "w-5 h-5 text-white",
                    })}
                  </div>
                  <Typography variant="h5" color="white" className="mb-2">
                    {title}
                  </Typography>
                  <Typography className="font-normal text-white">
                    {description}
                  </Typography>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <div className="bg-black/100">
          <Footer />
        </div>
      </div>
    }
    {auth.openSignIn &&
      <div className="bg-black/100 w-full h-screen">
          <section className="bg-black/100 bg-no-repeat pt-10 pb-10 bg-cover bg-center">
            <div className="backdrop-blur-sm p-10 items-center">
              <div className=" "></div>
              <PageTitle section="Packages" heading="Getting Started"></PageTitle>
              <div className="mt-10 mb-10 w-full overflow-x-auto">
                <div className="dark:border-strokedark dark:bg-boxdark">
                  <SignIn />
                </div>
              </div> 
            </div>
          </section>
          <div className="bg-black/100">
            <Footer />
          </div>
      </div>
    }
  </>
  )
}

export default LandingPage

// import React from 'react'
// import { Link } from 'react-router-dom';
// import {
//   Card,
//   CardBody,
//   CardHeader,
//   Typography,
//   Button,
//   IconButton,
//   Input,
//   Textarea,
//   Checkbox,
//   Slider,
// } from "@material-tailwind/react";
// import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
// import { PageTitle, Footer } from "../widgets/layout";
// import { FeatureCard, TeamCard } from "../widgets/cards";
// import { featuresData, teamData, contactData } from "../data";
// import HomeStepForm from '../components/Tabs/HomeStepForm';
// import { whyData } from './WhyUs';
// import {
//   FaInstagram, FaTelegram
// } from "react-icons/fa";
// import CheckOut from './CheckOut';
// import Chart from './Dashboard/Chart';
// const LandingPage = () => {
//   let circleClasses = "inline-block p-5 rounded-full w-15 h-15";
//   let iconStyles = { color: "white", fontSize: "20px" };
//   return (
//     <div className="bg-[url('/image/kisiki-trading.jpg')] bg-cover lg:container bg-center lg:w-full h-full ">
//       <div className="backdrop-blur-md w-full">
//         <div className="content-center p-10 lg:container">
//           <CheckOut />
//         </div>
//         <section className="backdrop-blur-md py-10 p-5">
//           <div className="lg:container bg-warning p-5 rounded-lg opacity-[85%] shadow-lg">
//             <PageTitle section="Unmatched" heading="Revolutionary Trading Experience">
//               Experience our bleeding-edge platform, making trading easier than ever, enabling you to be a better trader!
//             </PageTitle>
//             <div className="mx-auto mt-20 mb-15 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
//               {contactData.map(({ title, icon, description }) => (
//                 <Card
//                   key={title}
//                   color="transparent"
//                   shadow={false}
//                   className="text-center text-blue-gray-900"
//                 >
//                   <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-slate-900 shadow-lg shadow-gray-500/20">
//                     {React.createElement(icon, {
//                       className: "w-5 h-5 text-white",
//                     })}
//                   </div>
//                   <Typography variant="h5" color="white" className="mb-2">
//                     {title}
//                   </Typography>
//                   <Typography className="font-normal text-white">
//                     {description}
//                   </Typography>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>
//         <div className=" p-5 backdrop-blur-md">
//           <Footer />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LandingPage