import React, { useState, useEffect } from "react";

import ApexCharts from 'apexcharts';

const LineChart = () => {
  const [isMedium, setisMedium] = useState(window.innerWidth < 1280);
  useEffect(() => {
    const handleResize = () => {
      setisMedium(window.innerWidth < 1280);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const chartWidth = isMedium ? 7 * 100 : 8 * 100; // Set chart width based on isMedium condition

  useEffect(() => {
  
    const chartConfig = {
      series: [
        {
          name: 'Sales',
          data: [50, 40, 300, 320, 500, 350, 200, 230, 500,200,400,300],

        },
      ],
      chart: {
        type: 'line',
        width: chartWidth,
        height: 240,
        toolbar: {
          show: false,
        },
      },
      title: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#0C4DA2'],
      stroke: {
        lineCap: 'round',
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: '#616161',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400,
          },
        },
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'],
      },
      yaxis: {
        labels: {
          style: {
            colors: '#616161',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400,
          },
        },
      },
      grid: {

        show: true,
        borderColor: '#dddddd',
        strokeDashArray: 1,
        xaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        colors: ['#F44336', '#E91E63', '#9C27B0'],
        opacity: 1,
      },
      tooltip: {
        theme: 'dark',
      },
    };

    const chart = new ApexCharts(document.querySelector('#line-chart'), chartConfig);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className="bg-sh-cream  w-[85%] lg:w-[41.5%] xl:w-[44%] overflow-x-auto overflow-y-hidden md:mt-10 xl:ml-[5%] ml-[8%] relative flex flex-col rounded-xl  text-gray-700 shadow-md">
      <div className="mx-4 mt-4 flex flex-col gap-4  bg-transparent text-gray-700 md:flex-row md:items-center">

        <div className='flex justify-between w-full '>
          <p className="flex items-start justify-start text-left   xl:text-xl text-lg font-bold   text-sh-graph-black ">
            Challenges Completed
          </p>


          {/* <div className='fixed top-[40.5%] ml-[26%]'>  */}
          
          
        <select className="border text-black border-gray-300 rounded-sm px-2 py-2 focus:outline-none bg-gray-300 focus:border-none">
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        {/* </div> */}
        </div>
      </div>
      <div className="pt-6 px-2    pb-0">
        <div className="overflow-x-auto overflow-y-hidden"  id="line-chart"></div>
      </div>
      <div className="mt-5"></div>
    </div>
  );
};

export default LineChart;
