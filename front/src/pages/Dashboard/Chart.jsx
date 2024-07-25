import React, {useState, useEffect}from 'react';
import ChartThree from '../../components/Charts/ChartThree';
import { PageTitle, Footer } from "../../widgets/layout";


const Chart = () => {
  const [showLeftDiv, setShowLeftDiv] = useState(false);
  const [showRightDiv, setShowRightDiv] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const leftDivPosition = document.getElementById('left-div')?.offsetTop;
      const rightDivPosition = document.getElementById('right-div')?.offsetTop;

      if (scrollPosition + windowHeight > leftDivPosition) {
        setShowLeftDiv(true);
      }

      if (scrollPosition + windowHeight > rightDivPosition) {
        setShowRightDiv(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="flex flex-row flex-wrap gap-10 justify-center">
      <div
        id="left-div"
        className={`w-80 bg-slate-600 shadow-lg p-8 rounded-lg transition-all duration-1000 ${
          showLeftDiv ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }`} 
      >
        <h1 className="mt-2 mb-5 text-lg font-bold text-white"> Granular Trade Reporting </h1>
        <p className="text-white ">Uncover your trading potential with Kisiki Capital. Easily track your trades and delve deep into your trading statistics for unparalleled insights, all through our user-friendly interface
        </p>
      </div>
      <div 
        id="right-div"
        className={`bg-white shadow-lg p-8 rounded-lg transition-all duration-1000 ${
          showRightDiv ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <ChartThree />
      </div>
    </div>
  );
};

export default Chart;
