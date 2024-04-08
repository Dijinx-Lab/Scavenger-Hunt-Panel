import TeamLogo from '../../assets/Teams_Logo_For_Dashboard.svg';
import UsersLogo from '../../assets/Total Users Logo.svg';
import ChallengesLogo from '../../assets/Challenges_Icon_For_Dashboard.svg';
import React,{ useState, useEffect } from "react";
import ApexCharts from 'apexcharts';
import LineChart from './graph';
import BarChart from './bar_graph';
import RecentCreatedTeams from './table';
import PlainNavbar from '../../components/navbar/navbar';
import Pagination from '../../components/pagination/pagination';
import UsePagination from '../../components/pagination/handle_page_change';
function DashBoard() {
    // const [currentPage, setCurrentPage] = useState(1);
    // const recordsPerPage = 5; 
    // const handlePageChange = (page) => {
    //     setCurrentPage(page);
    //   };
    const { currentPage, recordsPerPage, handlePageChange } = UsePagination(1, 5);
    const totalRecords = 6;
    return (
        <div className="flex-col w-full overflow-x-hidden ">
<PlainNavbar/>
            <div className="w-full ">
                <div className="md:mt-20 md:ml-20 mt-16 ml-10 flex items-start justify-start">
                    <span className="text-sa-maroon text-left font-bold text-2xl md:text-4xl">
                        Dashboard
                    </span>
                </div>
                <div className="md:mt-4 md:ml-20 mt-5 ml-10 flex items-start justify-start">
                    <span className="text-sa-maroon text-left  text-lg md:text-xl">
                        Here you can track app performance effortlessly.
                    </span>
                </div>

                <div class="w-full md:ml-20 ml-10 md:mt-10 mt-10 grid md:grid-cols-1 lg:mx-10 lg:grid-cols-2 xl:grid-cols-[0.33fr,0.33fr,0.33fr] xl:gap-0 gap-8">
                    <div className="bg-sh-cream h-32 w-72  lg:ml-10 lg:w-[80%]  xl:w-[89%] rounded-[20px]">
                        <div className='flex'>
                            <img src={TeamLogo} className='mt-[-7px]' />

                            <div>
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-10px]'>TEAMS</span>
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-10px]'>308</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-sh-cream    xl:ml-5 h-32 w-72 lg:w-[80%] xl:w-[89%] rounded-[20px]">
                        <div className='flex'>
                            <img src={UsersLogo} className='mt-[-7px]' />

                            <div>
                                <span className='flex mt-5 xl:text-xl text-lg text-left w-full font-bold ml-[-9%]'>TOTAL USERS</span>
                                <span className='flex mt-5 xl:text-xl text-lg w-full font-bold ml-[-9%]'>1542</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-sh-cream  xl:ml-0 lg:ml-10 h-32 w-72 lg:w-[80%]  xl:w-[89%] rounded-[20px]">
                        <div className='flex'>
                            <img src={ChallengesLogo} className='mt-[-7px]' />

                            <div>
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-10px]'>CHALLENGES</span>
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-10px]'>500</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='flex xl:flex-row flex-col '>

                    <LineChart/>
                    <BarChart/>
</div>
<div className='mt-8 mb-10 ml-20 xl:w-[92.8%] h-auto rounded-[20px] bg-sh-cream w-[85%] '>
<div className='flex justify-between'>
<span className='text-left flex items-start justify-start ml-8 pt-6 text-2xl font-bold'>Recently Created Teams</span>
<span className='text-left flex items-end justify-between mx-8 pt-6 text-base font-medium text-sh-gray cursor-pointer '>View All Teams</span>
</div>
<div className='mt-8 mx-8 pb-10'>
        <RecentCreatedTeams currentPage={currentPage} recordsPerPage={recordsPerPage}  totalRecords={totalRecords} />
      </div>
      <div className='mx-8 pb-10'>
        <Pagination
          totalRecords={totalRecords} // Set the total number of records
          recordsPerPage={recordsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange} // Pass the handlePageChange function
        />
      </div>
    </div>
    
                

            </div></div>
    )
}

export default DashBoard;
