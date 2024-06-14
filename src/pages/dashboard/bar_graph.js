import { useState,useEffect } from 'react';
import ApexCharts from 'apexcharts';
const BarChart = ({ teamsChartdata, onDropdownChange }) => {

// const BarChart = () => {
  const [data,setData]= useState(teamsChartdata)
  useEffect(() => {
    if (teamsChartdata && teamsChartdata.data && teamsChartdata.keys) {
      setData(teamsChartdata);
    }
  }, [teamsChartdata]);

  useEffect(() => {
    if (data && data.data && data.keys) {
    const chartConfig = {
      series: [
        {
          name: 'Sales',
          // data: [50, 40, 300, 320, 500, 350, 200, 230, 500,400,200,100],
          data: data.data,
        
        },
      ],
      
      chart: {
        type: 'bar',
        height: 240,
        width: 7* 100,
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
      plotOptions: {
        bar: {
          columnWidth: '10%',
          borderRadius: 3,
        },
      },
      xaxis: {
        type: 'category', // Specify x-axis as category type
        // categories: [
        //   'Jn',
        //   'Fb',
        //   'Mc',
        //   'Ap',
        //   'My',
        //   'Jn',
        //   'Ju',
        //   'Au',
        //   'Sp',
        //   'Oc',
        //   'Nv',
        //   'Dc',
        // ],
        categories: data.keys,

        scrollbar: {
          enabled: true, // Enable scrollbar for x-axis
        },
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
        opacity: 1,
      },
      tooltip: {
        theme: 'dark',
      },
    };

    const chart = new ApexCharts(document.querySelector('#bar-chart'), chartConfig);
    chart.render();

    return () => {
      chart.destroy();
    };
}}, [data]);
  return (
    <div className="mx-[3%] md:ml-[8%] lg:ml-5 xl:ml-10   mt-10    w-[85%] lg:w-[41.5%] xl:w-[44%] relative flex flex-col rounded-xl bg-sh-cream shadow-md">
      <div className="mx-4 mt-4 flex flex-col gap-4 bg-transparent md:flex-row md:items-center">
        <div className='flex justify-between w-full'>
          <h6 className="block xl:text-xl text-lg font-bold leading-relaxed tracking-normal text-sh-graph-black">
            Teams Joined
          </h6>
          <div className="relative inline-block  w-[9rem]">
      <select
       onChange={(e)=>onDropdownChange(e.target.value)}
      // onChange={handleDropdownChange}
       className="border text-black border-gray-300  rounded-sm px-2 py-2 focus:outline-none bg-gray-300 appearance-none w-full">
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
        <option value="daily">Daily</option>
      </select>
      <div className="pointer-events-none  absolute inset-y-0 right-0 flex items-center pr-1 text-black">
        <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
        </div>
     
      </div>
      <div className="pt-6 px-2 pb-0">
        <div className='overflow-x-auto overflow-y-hidden' id="bar-chart"></div>
      </div>
      <div className='mt-5'></div>
    </div>
  );
};

export default BarChart;
