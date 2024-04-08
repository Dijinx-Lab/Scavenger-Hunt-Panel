import { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const BarChart = () => {
  useEffect(() => {
    const chartConfig = {
      series: [
        {
          name: 'Sales',
          data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        },
      ],
      chart: {
        type: 'bar',
        height: 240,
        width:"100%",
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
          columnWidth: '20%',
          borderRadius: 2,
        },
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
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
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
        opacity: 0.8,
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
    <div className="xl:mx-10 ml-20 mt-10 w-[85%] xl:w-[45%]  relative flex flex-col rounded-xl bg-sh-cream shadow-md">
      <div className="mx-4 mt-4 flex flex-col gap-4 overflow-hidden bg-transparent md:flex-row md:items-center">
       
      <div>
          <h6 className="block  text-xl font-bold leading-relaxed tracking-normal text-sh-graph-black ">
            Teams Joined
          </h6>
          
        </div>
      </div>
      <div className="pt-6 px-2 pb-0">
        <div id="bar-chart"></div>
      </div>
    </div>
  );
};

export default BarChart;
