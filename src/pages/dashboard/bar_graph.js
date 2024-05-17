import { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const BarChart = () => {
  
  useEffect(() => {
  
    const chartConfig = {
      series: [
        {
          name: 'Sales',
          data: [50, 40, 300, 320, 500, 350, 200, 230, 500,400,200,100],
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
        categories: [
          'Jn',
          'Fb',
          'Mc',
          'Ap',
          'My',
          'Jn',
          'Ju',
          'Au',
          'Sp',
          'Oc',
          'Nv',
          'Dc',
        ],
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
  }, []);

  return (
    <div className="mx-[3%] md:ml-[8%] lg:ml-5 xl:ml-10   mt-10    w-[85%] lg:w-[41.5%] xl:w-[44%] relative flex flex-col rounded-xl bg-sh-cream shadow-md">
      <div className="mx-4 mt-4 flex flex-col gap-4 bg-transparent md:flex-row md:items-center">
        <div>
          <h6 className="block xl:text-xl text-lg font-bold leading-relaxed tracking-normal text-sh-graph-black">
            Teams Joined
          </h6>
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
