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
import DashboardManager from '../../models/admin/dashboard/dashboardhttp/http';
import Spinner from '../../components/spinner/spinner';
import { useNavigate } from "react-router";

function DashBoard() {
  const navigate = useNavigate();

    const dashboardManager = new DashboardManager();
    const [showLoading, setShowLoading] = useState(true);
    const [toastMessages, setToastMessages] = useState([]); // Set initial toastMessages from location state  

    // const [currentPage, setCurrentPage] = useState(1);
    // const recordsPerPage = 5; 
    // const handlePageChange = (page) => {
    //     setCurrentPage(page);
    //   };
    const [totalTeams,setTotalTeams]= useState("")
    const [allTeams,setAllTeams]= useState("")
    const [totalChallenges,setTotalChallenges]= useState("")
    const fetchData = async () => {
        try {
          const response = await dashboardManager.get();
          if (response.success) {
            setTotalTeams(response.data.total_teams);
            setTotalChallenges(response.data.total_challenges);
            setAllTeams(response.data.teams);
          } else {
            setToastMessages([
              ...toastMessages,
              {
                type: "invalid",
                title: "Error",
                body: response.message,
              },
            ]);
          }
        } catch (error) {
          setToastMessages([
            ...toastMessages,
            {
              type: "invalid",
              title: "Error",
              body: error.message,
            },
          ]);
        } finally {
          setShowLoading(false);
        }
      };
      useEffect(() => {
        fetchData();
      }, []);
      const navigateToTeams = () =>{
        navigate("/teams");
        
      }
    const { currentPage, recordsPerPage, handlePageChange } = UsePagination(1, 10);
    const totalRecords = allTeams.length;
    return (
        <div className="flex-col w-full overflow-x-hidden ">
  {showLoading && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Spinner size={50} stroke={3} speed={1} color="black" />
      </div>
    )}

<PlainNavbar/>
            <div className="w-full ">
                <div className="md:mt-20 xl:ml-[5%] ml-[8%] mt-16 flex items-start justify-start">
                    <span className="text-sa-maroon text-left font-bold text-3xl lg:text-[34px]">
                        Dashboard
                    </span>
                </div>
                <div className="md:mt-4 xl:ml-[5%] ml-[8%] mt-5  flex items-start justify-start">
                    <span className="text-sh-gray text-left font-medium  text-lg lg:text-xl">
                        Here you can track app performance effortlessly.
                    </span>
                </div>

                <div class="w-full xl:ml-[5%] ml-[8%] lg:ml-[4%] md:mt-10 mt-10 grid md:grid-cols-1  lg:grid-cols-2 xl:grid-cols-[27.8%,28%,27.8%] xl:gap-x-[3.5%] xl:gap-y-0 gap-x-0 gap-y-10 ">
                    <div className="bg-sh-cream h-32 w-72 xl:ml-0 lg:ml-[8%] lg:w-[80%]  xl:w-[100%] rounded-[20px]">
                        <div className='flex'>
                            <img src="https://dk9gc53q2aga2.cloudfront.net/assets/Teams_Logo_For_Dashboard.svg" className='mt-[-7px]' />

                            <div className='text-sh-graph-black'>
                                <span className='flex mt-5 xl:text-xl text-lg  font-bold ml-[-10px]'>TEAMS</span>
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-10px]'>{totalTeams}</span>
                            </div>
                        </div>
                    </div>
                    {/* <div className="bg-sh-cream    xl:ml-0 h-32 w-72 lg:w-[80%] xl:w-[100%] rounded-[20px]">
                        <div className='flex'>
                            <img src="https://dk9gc53q2aga2.cloudfront.net/assets/Total+Users+Logo.svg" className='mt-[-7px]' />

                            <div className='text-sh-graph-black'>
                                <span className='flex mt-5 xl:text-xl text-lg text-left w-full font-bold ml-[-9%]'>TOTAL USERS</span>
                                <span className='flex mt-5 xl:text-xl text-lg w-full font-bold ml-[-9%]'>1542</span>
                            </div>
                        </div>
                    </div> */}
                    <div className="bg-sh-cream  xl:ml-0  h-32 w-72 lg:w-[80%]  xl:w-[100%] rounded-[20px]">
                        <div className='flex'>
                            <img src="https://dk9gc53q2aga2.cloudfront.net/assets/Challenges_Icon_For_Dashboard.svg" className='mt-[-7px]' />

                            <div className='text-sh-graph-black'>
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-10px]'>CHALLENGES</span>
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-10px]'>{totalChallenges}</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='flex lg:flex-row flex-col '>

                    <LineChart/>
                    <BarChart/>
</div>
<div className='mt-8 mb-10 xl:ml-[5%] ml-[8%] xl:w-[91%] h-auto rounded-[20px] bg-sh-cream w-[85%] '>
<div className='flex justify-between'>
<span className='text-left flex items-start text-sh-graph-black justify-start ml-8 pt-6 text-lg lg:text-xl font-bold'>
  Recently Created Teams
  </span>
<span onClick={navigateToTeams} className='text-left flex items-end justify-between mx-8 pt-6 text-base font-medium underline  hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-sh-gray cursor-pointer '>
  View All Teams
  </span>
</div>
<div className='mt-8 mx-8 pb-10'>
        <RecentCreatedTeams currentPage={currentPage} recordsPerPage={recordsPerPage}  AllTeams={allTeams} />
      </div>
      {/* <div className='mx-8 pb-10'>
        <Pagination
          totalRecords={totalRecords} // Set the total number of records
          recordsPerPage={recordsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange} // Pass the handlePageChange function
        />
      </div> */}
    </div>
    
                

            </div></div>
    )
}

export default DashBoard;
