import axios from 'axios'
import React, {useState, useEffect} from 'react'
//import { useGameContext } from '@/context/Game'

export const PropFirm = ({}) => {
  const [expiryTime, setExpiryTime] = useState("07 aug 2024 18:00:00");
  const [countdownTime, setCountdownTime] = useState({
    countdownDays: "",
    countdownHours: "",
    countdownMinutes: "",
    countdownSeconds: "",
  });

  const countdownTimer = () => {
    const timeInterval = setInterval(() => {
      const countdownDateTime = new Date(expiryTime).getTime();
      const currentTime = new Date().getTime();
      const remainingDayTime = countdownDateTime - currentTime;
      const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(
        (remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const totalMinutes = Math.floor(
        (remainingDayTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const totalSeconds = Math.floor(
        (remainingDayTime % (1000 * 60)) / 1000
      );

      const runningCountdownTime = {
        countdownDays: totalDays,
        countdownHours: totalHours,
        countdownMinutes: totalMinutes,
        countdownSeconds: totalSeconds,
      };

      setCountdownTime(runningCountdownTime);

      if (remainingDayTime < 0) {
        clearInterval(timeInterval);
        setExpiryTime(false);
      }
    }, 1000);
  };

  useEffect(() => {
    countdownTimer();
  });
  //
  // useEffect(()=>{
  //   const time = axios.get('/api/')
  // })
  // const [seconds, setSeconds] = useState(60)
  // const [minutes, setMinutes] = useState(60)
  // const [hours, setHours] = useState(23)
  // const [days, setDays] = useState(3)
  // let timer;
  
  // useEffect(()=>{
  //   timer = setInterval(()=>{
  //     setSeconds(seconds-1)
  //     if(seconds === 0 || seconds == 0){
  //       setMinutes(minutes-1)
  //       setSeconds(60)
  //     }
  //     if(minutes === 0 || minutes == 0){
  //       setHours(hours - 1)
  //       setMinutes(60)
  //     }
  //     if(hours === 0 || hours == 0){
  //       setDays(days - 1)
  //       setHours(24)
  //     }

  //   }, 1000)
  //   return () => clearInterval(timer)
  // })

  // if(days === 0 && hours === 0 && minutes === 0 && seconds === 0){
  //   //if(path){return onPageChange(path)}
  // }

  return (
    <div className='mb-2 mt-5 p-3 shadow-xl rounded-lg text-center'>
      <h1 className="shadow-xl text-warning font-bold text-lg mt-2 mb-4 rounded-md">Count down to Prop Firm: </h1>
      {/* <p className="text-white shadow-xl text-md mb-2">{days<10 ? `0${days}`: `${days}`} days : {hours<10 ? `0${hours}`: `${hours}`} hrs : {minutes<10 ? `0${minutes}`: `${minutes}`} mins : {seconds<10 ? `0${seconds}`: `${seconds}`} secs</p> */}
      <p className="text-white shadow-xl text-md mb-2">{countdownTime?.countdownDays<10 ? `0${countdownTime?.countdownDays}`: `${countdownTime?.countdownDays}`} days : {countdownTime?.countdownHours<10 ? `0${countdownTime?.countdownHours}`: `${countdownTime?.countdownHours}`} hrs : {countdownTime?.countdownMinutes<10 ? `0${countdownTime?.countdownMinutes}`: `${countdownTime?.countdownMinutes}`} mins : {countdownTime?.countdownSeconds<10 ? `0${countdownTime?.countdownSeconds}`: `${countdownTime?.countdownSeconds}`} secs</p>
    </div>
  )
}

export const InstTimer = ({onPageChange, path, handleTimerEnd}) => {
  const {showInstructions, setShowInstructions, instSeconds, setInstSeconds, instMinutes, setInstMinutes} = useGameContext()
  let timer;
  useEffect(()=>{
    timer = setInterval(()=>{
      setInstSeconds(instSeconds-1)
      if(instSeconds === 0){
        setInstMinutes(instMinutes-1)
        setInstSeconds(60)
      }
    }, 1000)
    return () => clearInterval(timer)
  })
  if(instMinutes === 0 && instSeconds === 0){
    if(path){return onPageChange(path)}
  }

  return (
    <div className="p-10 text-center shadow-lg h-30 bg-white rounded-lg w-50">
      <h1>Game starts in: </h1>
      <p>{instMinutes<10 ? `0${instMinutes}`: `${instMinutes}`} : {instSeconds < 10 ? `0${instSeconds}`: `${instSeconds}`}</p>
    </div>
  )
}