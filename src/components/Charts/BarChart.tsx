import { ApexOptions } from 'apexcharts';

interface BarChartState {
  series: {
    name: string;
    data: number[];
  }[];
}
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface BarChartProps {
  result_data: {
    data: {
      title: string;
      nominees: {
        title:string;
        votes: number;
        full_name: string;
      }[];
    };
  };
}

const BarChart: React.FC<BarChartProps> = ({ result_data }) => {
  const nominees = result_data?.data?.nominees || [];
  const votesArray = nominees.map((nominee: any) => nominee.votes ? nominee.votes.count : 0);
  const fullNamesArray = nominees.map((nominee: any) => nominee.full_name);


  const options: ApexOptions = {
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
      categories: fullNamesArray, 
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontFamily: 'Satoshi',
      fontWeight: 500,
      fontSize: '14px',

      markers: {
        // Removed the radius property
      },
    },
    fill: {
      opacity: 1,
    },
  };

  const [state, setState] = useState<BarChartState>({
    series: [
      {
        name: 'Nominee',
        data: votesArray,
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
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4"> 
      <div className="mb-4 justify-between gap-4 sm:flex"> 
        <div> 
          <h4 className="text-xl font-semibold text-black dark:text-white"> 
           {result_data?.data?.title}
          </h4> 
        </div> 
        <div> 
        </div> 
      </div> 
      <div>
        {!result_data ? ( <p className="w-full text-center text-gray-500 text-3xl font-bold h-39 grid place-items-center">Select a category to view results</p>):( 
          (nominees.length === 0) ? ( <p className="w-full text-center text-gray-500 text-3xl font-bold h-39 grid place-items-center">No data available</p> ) : ( <div id="BarChart" className="-ml-5 -mb-9">
            <ReactApexChart
              options={options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>)
         )}
       
      </div>
    </div>
  );
};

export default BarChart;