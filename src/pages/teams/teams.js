import React, { useState, useEffect } from "react";
import TeamLogo from '../../assets/Teams_Logo_For_Dashboard.svg';
import UsersLogo from '../../assets/Total Users Logo.svg';
import ChallengesLogo from '../../assets/Challenges_Icon_For_Dashboard.svg';
import Logo1 from '../../assets/1.svg';
import Logo2 from '../../assets/2.svg';
import Logo3 from '../../assets/3.svg';
import CreatedAccounts from './accounts_table';
import Pagination from "../../components/pagination/pagination";
import UsePagination from "../../components/pagination/handle_page_change";
import CreatedTeams from './created_teams_table';
import PlainNavbar from "../../components/navbar/navbar";
import TeamsManager from '../../models/admin/teams/teamshttp/http';
import Toast from "../../components/toast/toast";
import Spinner from "../../components/spinner/spinner";
import { useNavigate,useLocation } from "react-router-dom";
function Teams() {
  const navigate = useNavigate();

  const location = useLocation();  
  const [showLoading, setShowLoading] = useState(true);
  const [showImageLoading, setShowImageLoading] = useState(true);
  const [showCreateLoading, setShowCreateLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const teamsManager = new TeamsManager();
  const [allTeams, setAllTeams] = useState([]);
  const [totalTeams,setTotalTeams]= useState("")
  const [toastMessages, setToastMessages] = useState(location.state?.toastMessages || []); // Set initial toastMessages from location state
  useEffect(() => {
    // Retrieve toastMessages from location.state
    if (location.state && location.state.toastMessages) {
      setToastMessages(location.state.toastMessages);
    }
  
    // Preserve other URL parameters while updating toastMessages
    setTimeout(() => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const idParam = urlSearchParams.get('_id');
      if (idParam) {
        const newUrl = `${window.location.pathname}?_id=${idParam}`;
        window.history.replaceState({}, document.title, newUrl);
      }
      else{
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }, 0);
  }, [location]);
  
  const handleImageLoad = () => {
    setShowImageLoading(false); // Set showLoading to false when the image is loaded
  };
  const fetchData = async () => {
    try {
      const response = await teamsManager.getAll();
      if (response.success) {
        setTotalTeams(response.data.total_teams);
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
  const totalRecords = allTeams.length;
  useEffect(() => {
    fetchData();
  }, []);
  const handleCreateTeam = async () => {
    if (!teamName){
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Error",
          body: "Team name is required",
        },
      ]);
      return;
    }
    setShowCreateLoading(true);

    try {
      const response = await teamsManager.create(teamName);

      if (response.success) {
    

        navigate("/teams/details?code="+response.data.team.team_code);
      }
      else {
        setToastMessages([
          ...toastMessages,
          {
            type: "invalid",
            title: "Error",
            body: response.message,
          },
        ]);
      }
    }
    catch (error) {
      setToastMessages([
        ...toastMessages,
        {
          type: "invalid",
          title: "Error",
          body: error.message,
        },
      ]);
    }
    finally{
      setShowCreateLoading(false);
    }
  }
  const navigateToTeamDetails=(team_code)=>{
    navigate("/teams/details?code="+team_code);
  }
  const { currentPage: teamsPage, recordsPerPage: teamsPerPage, handlePageChange: handleTeamsPageChange } = UsePagination(1, 10);
  const uploadImgUrl = "https://dk9gc53q2aga2.cloudfront.net/assets/Teams_Logo_For_Dashboard.svg";
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="flex overflow-x-hidden">
    {showLoading && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Spinner size={50} stroke={3} speed={1} color="black" />
      </div>
    )}

      <div className="w-full">
      {toastMessages.map((toast, index) => (
        <Toast
          className="mb-0"
          key={index}
          toasts={[toast]}
          onClose={() => {
            // Remove the toast message when it's closed
            const updatedToasts = [...toastMessages];
            updatedToasts.splice(index, 1);
            setToastMessages(updatedToasts);
          }}
        />
      ))}
        <PlainNavbar />
      
        <div className="md:mt-20 xl:ml-[5%] ml-[8%] mt-16  flex items-start justify-start">
          <span className="text-sa-maroon  font-bold text-2xl lg:text-4xl">
            Teams
          </span>
        </div>
        <div className="md:mt-4 xl:ml-[5.4%] ml-[8%]  mt-5 flex items-start justify-start">
          <span className="text-sh-gray text-left   text-lg lg:text-xl">
            Here effortlessly manage and view teams with intuitive dashboard controls.
          </span>
        </div>


        <div class="w-full mx-40 mb-10 xl:ml-[5%] ml-[8%]  md:mt-10 mt-10 grid md:grid-cols-[84%]  lg:grid-cols-[40%,40%] xl:grid-cols-[34%,40%] gap-2"  >
          <div className="bg-sh-cream h-[26rem]    w-[100%] xl:w-[100%] rounded-[20px]">
            <div className='flex'>
            {showImageLoading && 
            <div className="absolute ml-14 mt-10">
           </div>
            }
        <img
          src={uploadImgUrl}
          className='w-40 h-40 lg:w-48 lg:h-48 mt-[-20px] lg:mt-[-28px]'
          onLoad={handleImageLoad}
        />
              <div className="text-sh-graph-black">
                <span className='flex mt-5 lg:text-2xl text-xl font-bold ml-[-10px]'>TEAMS</span>
                <span className='flex mt-5 lg:text-2xl text-xl font-bold ml-[-10px]'>{totalTeams}</span>
              </div>

            </div>
            <div className='flex mt-[-5px] ml-10  text-sh-graph-black opacity-80 text-lg lg:text-2xl  font-medium'>
              Teams Leaderboard
            </div>
            {/* <div className='flex mt-3 bg-sh-cream ml-10 text-sh-graph-black text-lg lg:text-xl font-medium'>
              <div className=' flex bg-sh-cream-light bg-opacity-40 w-[92%] h-14'>
                <img src={Logo1} className='ml-4 mt-2 w-8 h-8' />
                <input placeholder='Team Unicorn' readOnly className='bg-sh-cream-light bg-opacity-10  ml-6 border-none outline-none h-12 text-black text-opacity-50 placeholder-opacity-100' />
              </div>
            </div>
            <div className='flex mt-3 ml-10 text-sh-graph-black text-lg lg:text-xl font-medium'>
              <div className=' flex bg-sh-cream-light bg-opacity-40 w-[92%] h-14'>
                <img src={Logo2} className='ml-4 mt-2 w-8 h-8' />
                <input placeholder='Team Knight' readOnly className='bg-sh-cream-light bg-opacity-10  ml-6 border-none outline-none h-12 text-black text-opacity-50 placeholder-opacity-100' />
              </div>
            </div>
            <div className='flex mt-3 ml-10 text-sh-graph-black text-lg lg:text-xl font-medium'>
              <div className=' flex bg-sh-cream-light bg-opacity-40 w-[92%] h-14 border border-sh-cream-light'>
                <img src={Logo3} className='ml-4 mt-2 w-8 h-8' />
                <input placeholder='Team Blue' readOnly className='bg-sh-cream-light bg-opacity-10  ml-6 border-none outline-none h-12 text-black text-opacity-50 placeholder-opacity-100' />
              </div>
            </div> */}
         {/* {showLoading ? (
  <div className="mt-16 w-full h-full">
   <Spinner size={40} stroke={3} speed={1} color="black" />
  </div>
) : (
  leaderboardTeams.slice(0, 3).map((team, index) => (
    <div key={team._id} className='flex mt-3 ml-10 text-sh-graph-black text-lg lg:text-xl font-medium'>
      <div className='flex bg-sh-cream-light bg-opacity-40 w-[92%] h-14'>
        <img src={index === 0 ? Logo1 : index === 1 ? Logo2 : Logo3} className='ml-4 mt-2 w-8 h-8' alt="team logo" />
        <input
          placeholder={team.name}
          readOnly
          className='bg-sh-cream-light bg-opacity-10 ml-6 border-none outline-none h-12 text-black text-opacity-50 placeholder-opacity-100'
        />
      </div>
    </div>
  ))
)} */}
{allTeams.slice(0, 3).map((team, index) => (
    <div key={team._id} className='flex mt-3 ml-10 text-sh-graph-black text-lg lg:text-xl font-medium'>
      <div className='flex bg-sh-cream-light bg-opacity-40 w-[92%] h-14'>
        <img src={index === 0 ? Logo1 : index === 1 ? Logo2 : Logo3} className='ml-4 mt-2 w-8 h-8' alt="team logo" />
        <input
          onClick={() => navigateToTeamDetails(team.team_code)}
          placeholder={team.name}
          readOnly
          className='bg-sh-cream-light cursor-pointer bg-opacity-10 ml-6  border-none outline-none h-12 text-black text-opacity-50 placeholder-opacity-100'
        />
      </div>
    </div>
  ))}
          </div>


          {/* <div className='row-span-3 xl:mt-[-2px] mt-8 mb-10  xl:ml-5   xl:w-[100%]   rounded-[20px] bg-sh-cream w-[84%] '>
            <div className='flex justify-between'>
              <span className='text-sh-graph-black text-left flex items-start justify-start ml-8 pt-6 text-xl lg:text-[22px] font-bold'>Created Accounts</span>
            </div>
            <div className='mt-8 mx-8 pb-6'>
            <CreatedAccounts currentPage={accountsPage} recordsPerPage={accountsPerPage} />
          </div>
          <div className='mx-8 pb-4'>
            <Pagination
              totalRecords={100} // Set the total number of records
              recordsPerPage={accountsPerPage}
              currentPage={accountsPage}
              onPageChange={handleAccountsPageChange} // Pass the handlePageChange function
            />
          </div>

          </div> */}

          <div className="bg-sh-cream  xl:mt-0 mt-10  lg:ml-[8%] h-72 w-[100%] xl:w-[100%] rounded-[20px]">
            <div className='flex justify-center items-center text-xl lg:text-2xl font-bold mt-5 text-sh-graph-black '>CREATE TEAM</div>
            <div className='flex justify-start items-start text-base lg:text-lg font-medium mt-5 ml-[5%]  '>Team Name</div>
            <input
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-[90%] text-base bg-transparent mt-3 px-3 rounded-lg py-3 border border-gray-400  focus:outline-none focus:ring-primary-300"
            />
            <button onClick={handleCreateTeam} class="mb-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 w-[90%] mt-8 text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm lg:text-base px-5 py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            {showCreateLoading ? <Spinner  color="white"  /> : "CREATE"}
            </button>

            {/* <div className='flex'>
              <img src={ChallengesLogo} className='mt-[-7px]' />

              <div>
                <span className='flex mt-5 text-xl font-bold ml-[-10px]'>CHALLENGES</span>
                <span className='flex mt-5 text-xl font-bold ml-[-10px]'>500</span>
              </div>
            </div> */}
          </div>

        </div>

        <div className='mt-8 mb-10 xl:ml-[5%] ml-[8%] w-[84%] xl:w-[90%] h-auto rounded-[20px] bg-sh-cream  '>
          <div className='flex justify-between'>
            <span className='text-left flex items-start justify-start ml-8 pt-8 text-lg lg:text-xl font-bold text-sh-graph-black'>Created Teams</span>
            <div className="flex items-center mr-8 pt-6">
              <div class="w-full ">
                <div class="relative h-10 w-full ">
                  <div class="absolute grid w-5 h-5 top-2/4 right-3 cursor-pointer -translate-y-2/4 place-items-center text-blue-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" aria-hidden="true" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                    </svg>
                  </div>
                  <input
                    class="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  <label
                    class="before:content[' ']  after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Search
                  </label>
                </div>
              </div>

            </div>


          </div>
          <div className='mt-8  mx-8 pb-6'>
            <CreatedTeams currentPage={teamsPage} recordsPerPage={teamsPerPage} AllTeams={allTeams} searchTerm={searchTerm}/>
          </div>
          <div className='mx-8 pb-6'>
          <Pagination
          totalRecords={totalRecords} // Set the total number of records
          recordsPerPage={teamsPerPage}
          currentPage={teamsPage}
          onPageChange={handleTeamsPageChange} // Pass the handlePageChange function
        />
          </div>

        </div>
      </div></div>
  )
}

export default Teams;
