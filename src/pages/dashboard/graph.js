import React,{ useState, useEffect } from "react";

import ApexCharts from 'apexcharts';

const LineChart = () => {
  useEffect(() => {
    const chartConfig = {
      series: [
        {
          name: 'Sales',
          data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
          
        },
      ],
      chart: {
        type: 'line',
        width:"100%",
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
        categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        colors: ['#F44336', '#E91E63', '#9C27B0'],
        opacity: 0.8,
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
    <div className="bg-sh-cream w-[85%] xl:w-[45%] md:mt-10 md:ml-20 relative flex flex-col rounded-xl  text-gray-700 shadow-md">
      <div className="mx-4 mt-4 flex flex-col gap-4 overflow-hidden bg-transparent text-gray-700 md:flex-row md:items-center">
       
        <div className='flex justify-between w-full '>
          <p className="flex items-start justify-start text-left  text-xl font-bold   text-sh-graph-black ">
            Challenges Completed
          </p>
          
      
        <div className='flex items-end justify-between '>  </div></div>
      <select className="border text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none bg-gray-300 focus:border-none">
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    
      </div>
      <div className="pt-6 px-2 pb-0">
        <div id="line-chart"></div>
      </div>
    </div>
  );
};

export default LineChart;
