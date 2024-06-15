import React, { useState, useEffect } from "react";
import PlainNavbar from '../../components/navbar/navbar';
import { useNavigate,useLocation } from "react-router";
import TeamsChallenges from './teams_challenges_table';
import UsePagination from '../../components/pagination/handle_page_change';
import Pagination from '../../components/pagination/pagination';
import TeamsManager from '../../models/admin/teams/teamshttp/http';
import Spinner from "../../components/spinner/spinner";
function TeamDetails() {  
  const [showLoading, setShowLoading] = useState(true);
  const [toastMessages, setToastMessages] = useState([]); // Set initial toastMessages from location state  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teamCode = searchParams.get("code");
  const teamsManager = new TeamsManager();
  const [teamData, setTeamData] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [deleteShowLoading, setDeleteShowLoading] = useState(false);

  const { currentPage: teamsDetailsPage, recordsPerPage: teamsDetailPerPage, handlePageChange: handleTeamsDetailPageChange } = UsePagination(1, 10);

    const navigate = useNavigate();
    const challengeName = "Wild Cats"
    const coords = "(09102)"
    const message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque condimentum luctus mollis. Curabitur tempor gravida quam non rhoncus. Ut mattis mi et turpis cursus, ac interdum erat porta. Ut porta pretium condimentum. Integer a quam erat. Vivamus consectetur purus tortor"
    const convertDateFormat = (startDate) => {
      const parsedDate = new Date(startDate);
  
      if (isNaN(parsedDate)) {
        console.error("Invalid date format");
        return "";
      }
  
      // Use toLocaleDateString to format the date as "Nov 05, 2023"
      const options = { year: "numeric", month: "short", day: "numeric" };
      const formattedStartDate = parsedDate.toLocaleDateString("en-US", options);
      return formattedStartDate;
    };
    const fetchData = async () => {
      if(!teamCode){
        const updatedToastMessages = [
          {
              type: "invalid",
              title: "Error",
              body: "Team Code is required",
          },
      ];
        setToastMessages(updatedToastMessages);
        navigate("/teams", { state: { toastMessages: updatedToastMessages } });
      }
      try {
        const response = await teamsManager.getAll(teamCode);
        if (response.success) {
          setTeamData(response.data.team);
        setAllQuestions(response.data.answer)

          // setTotalTeams(response.data.total_teams);
          // setAllTeams(response.data.teams);
        } else {
          const updatedToastMessages = [
            {
                type: "invalid",
                title: "Error",
                body: response.message,
            },
        ];
          setToastMessages(updatedToastMessages);
          navigate("/teams", { state: { toastMessages: updatedToastMessages } });
      
          // navigate("/teams")
        }
      } catch (e) {
        const updatedToastMessages = [
          {
              type: "invalid",
              title: "Error",
              body: e.message,
          },
      ];
        setToastMessages(updatedToastMessages);
        navigate("/teams", { state: { toastMessages: updatedToastMessages } });
    
      } finally {
        setShowLoading(false);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
  const totalRecords = allQuestions.length;
  const [isDelete, setIsDelete] = useState(false);

  const closeIsDelete = () => {
    setIsDelete(false);
  };
  const openIsDelete = () => {
    setIsDelete(true);
  };

  const handleDelete = async () => {
    setDeleteShowLoading(true);
    try {
      const response = await teamsManager.delete(teamCode);
      if (response.success) {
        closeIsDelete();
        // setTableData(allQuestions.filter(question => question._id !== deleteIdx));
        const updatedToastMessages = [
          {
            type: "success",
            title: "Success",
            body: response.message,
          },
        ];
        const state = {
          toastMessages: updatedToastMessages,
        };
        navigate("/teams", { state });

      }
      else {
        const updatedToastMessages = [
          {
            type: "invalid",
            title: "Error",
            body: response.message,
          },
        ];
        const state = {
          toastMessages: updatedToastMessages,
        };
        navigate("/challenges", { state });
      }
    }
    catch (error) {
      const updatedToastMessages = [
        {
          type: "invalid",
          title: "Error",
          body: error.message,
        },
      ];
      const state = {
        toastMessages: updatedToastMessages,
      };
      navigate("/challenges", { state });

    }
    finally {
      setDeleteShowLoading(false);
    }
  };
  
    return (
    <div className="flex-col w-full overflow-x-hidden ">
      {showLoading && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Spinner size={50} stroke={3} speed={1} color="black" />
      </div>
    )}
      <PlainNavbar />

      <div className="w-full "></div>
      <div className=" xl:ml-[5%] ml-[8%]  grid lg:grid-cols-[60%,22%] xl:grid-cols-[70%,17%]">
        <div>
          <div className="md:mt-20  mt-16  flex items-start justify-start">
            <span className=" text-left font-bold text-2xl md:text-4xl">
              {teamData.name}
            </span>
          </div>
          <div className="md:mt-4  mt-5  flex items-start justify-start">
            <span className=" text-left font-bold text-lg md:text-xl">
              {teamData.team_code}
            </span>
          </div>
          {/* <div className="md:mt-4  mt-5  flex items-start justify-start">
            <span className="text-sh-gray text-left text-lg md:text-xl">
              {message}
            </span>
          </div> */}
        </div>
        <div >
          {/* <div>
          <button  className='xl:mt-14 lg:ml-[40%] w-full mt-16    rounded-md bg-sh-blue text-center py-2 lg:py-4 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white cursor-pointer '>ADD QUESTION</button>
          </div>
          <div>
          <button  className='md:mt-5 lg:ml-[40%] w-full mt-16    rounded-md bg-white text-sh-blue text-center py-2 lg:py-4 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 cursor-pointer border border-sh-blue '>Edit Details</button>
          </div> */}
          <div>
          <button 
          onClick={openIsDelete}
          className='xl:mt-20 lg:ml-[40%] w-full mt-16    rounded-md bg-white text text-center py-2 lg:py-4 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-sh-red border border-sh-red cursor-pointer  '>
            Delete Team</button>
          </div>
          {isDelete && (
            <div
              className=" fixed inset-0 flex items-center justify-center z-50"
              onClick={closeIsDelete}
            >
              <div className=" bg-black opacity-50 absolute inset-0"></div>
              <div
                className=" bg-white rounded-3xl md:w-auto w-80  p-8 px-12 relative z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-black font-semibold text-lg md:w-auto w-60 text-left mb-4">
                  Confirm
                </h2>
                <p className="text-black text-filter-heading md:w-auto w-60 text-left">
                  Are you sure you want to delete this team?
                </p>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={closeIsDelete}
                    className="text-filter-heading hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-1 px-6"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-sh-red hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 text-white md:px-7 px-5 rounded-[9px] py-1 "
                    onClick={handleDelete}
                  >
                    {deleteShowLoading ? <Spinner /> : <span>Delete</span>}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
<div className="xl:ml-[5%] text-left grid md:grid-cols-3 lg:grid-cols-[20%,25%,25%,25%] xl:grid-cols-[15%,15%,15%,15%,15%,15%] ml-[8%] md:mt-12">
<div>
<span className="text-left text-xl  font-bold">Status</span>
<div className="text-left text-xl mt-3  font-bold">{teamData.status}</div>
</div>
<div>
<span className="text-left text-xl  lg:ml-[10%] xl:ml-0 font-bold">Points Scored</span>
<div className="text-left text-xl lg:ml-[10%] xl:ml-0 mt-3 font-bold">{teamData.points_scored}</div>

</div>
<div>
<span className="text-left text-xl  ml-[10%] font-bold">Answered</span>
<div className="text-left text-xl mt-3 ml-[10%] font-bold">{teamData.answered}</div>

</div>
<div className='lg:mt-0 mt-8'>

<span className="text-left text-xl lg:ml-[10%] font-bold">Route Started</span>
<div className="text-left text-xl mt-3  lg:ml-[10%] font-bold">{teamData.route_started ? convertDateFormat(teamData.route_started): "N/A"}</div>

</div>
<div className='xl:mt-0 mt-8'>

<span className="text-left text-xl xl:ml-[10%] font-bold">Time Taken</span>
<div className="text-left text-xl mt-3 xl:ml-[10%] font-bold">{teamData.time_taken ? teamData.time_taken : "N/A"}</div>

</div>
<div className='xl:mt-0 mt-8'>
<span className="text-left text-xl ml-[10%] font-bold">Leaderboards</span>
<div className="text-left text-xl mt-3 ml-[10%] font-bold">{teamData.leaderboard}</div>

</div>
</div>
{/* <div className="xl:ml-[5%] text-left grid  lg:grid-cols-[20%,25%,25%,20%] xl:grid-cols-[15%,15%,15%,15%,15%,15%] ml-[8%] md:mt-4">
<span className="text-left text-xl   font-bold">ACTIVE</span>
<span className="text-left text-xl   font-bold">1043</span>
<span className="text-left text-xl  ml-[10%] font-bold">10</span>
<span className="text-left text-xl  ml-[10%] font-bold ">22/01/2024</span>
<span className="text-left text-xl  ml-[10%] font-bold">55 mins</span>
<span className="text-left text-xl  ml-[10%] font-bold">22</span>

</div>   */}
<div className='mt-16 mb-20 xl:ml-[5%] ml-[8%] w-[84%] xl:w-[90%] h-auto rounded-[20px] bg-sh-cream  '>
<div className='mt-8  w-full  pb-6 pt-16 px-10'>
            <TeamsChallenges currentPage={teamsDetailsPage} recordsPerPage={teamsDetailPerPage} allQuestions={allQuestions} />
          </div>
          <div className='xl:ml-[5%] w-[90%] pb-6 '>
            <Pagination
              totalRecords={totalRecords} // Set the total number of records
              recordsPerPage={teamsDetailPerPage}
              currentPage={teamsDetailsPage}
              onPageChange={handleTeamsDetailPageChange} // Pass the handlePageChange function
            />
          </div></div>
          
 </div>
)
}

export default TeamDetails;