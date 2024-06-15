import React, { useState, useEffect } from "react";
import Pagination from "../../components/pagination/pagination";
import PlainNavbar from '../../components/navbar/navbar';
import { useNavigate,useLocation } from "react-router";
import ManageChallengesTable from './manage_challenges_table';
import UsePagination from "../../components/pagination/handle_page_change";
import Toast from "../../components/toast/toast";
import ChallengesManager from "../../models/admin/challenges/challengeshttp/http";
import Spinner from "../../components/spinner/spinner";
function ManageChallenges() {
  const location = useLocation();
  const challengesManager = new ChallengesManager();
  const [showLoading, setShowLoading] = useState(true);
  const [challengeData, setChallengeData] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [deleteShowLoading, setDeleteShowLoading] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState();

  const [toastMessages, setToastMessages] = useState([]);
  const searchParams = new URLSearchParams(location.search);
  const challengeId = searchParams.get("_id");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve toastMessages from location.state
    if (location.state && location.state.toastMessages) {
      setToastMessages(location.state.toastMessages);
    }
  
    // Preserve other URL parameters while updating toastMessages
    setTimeout(() => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const idParam = urlSearchParams.get('_id');
      const newUrl = `${window.location.pathname}?_id=${idParam}`;
      window.history.replaceState({}, document.title, newUrl);
    }, 0);
  }, [location]);

  useEffect(() => {
    // Retrieve toastMessages from session storage
    const storedToastMessages = sessionStorage.getItem('toastMessages');
    if (storedToastMessages) {
      const parsedToastMessages = JSON.parse(storedToastMessages);
      setToastMessages(parsedToastMessages);

      // Optionally, clear the toastMessages from session storage after using them
      sessionStorage.removeItem('toastMessages');
    }
  }, [location]);
  const fetchData = async () => {
    if(!challengeId){
      const updatedToastMessages = [
        {
            type: "invalid",
            title: "Error",
            body: "Challenge ID is required",
        },
    ];
      setToastMessages(updatedToastMessages);
      navigate("/challenges", { state: { toastMessages: updatedToastMessages } });
    }
    try {
      const response = await challengesManager.get(challengeId);
      if (response.success) {
        setChallengeData(response.data.challenge);
        setAllQuestions(response.data.questions);
        setVideoUrl(response.data.challenge.intro_url);
        // setCompletedChallenges(response.data.completed_challenges);
        // setUncompletedChallenges(response.data.uncompleted_challenges);
        // setTotalChallenges(response.data.total_challenges);
        // setAllChallenges(response.data.challenges);
      } else {
        const updatedToastMessages = [
          {
              type: "invalid",
              title: "Error",
              body: response.message,
          },
      ];
        setToastMessages(updatedToastMessages);
        navigate("/challenges", { state: { toastMessages: updatedToastMessages } });
    
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
      navigate("/challenges", { state: { toastMessages: updatedToastMessages } });
  
    } finally {
      setShowLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [isDelete, setIsDelete] = useState(false);

  const closeIsDelete = () => {
    setIsDelete(false);
  };
  const openIsDelete = () => {
    setIsDelete(true);
  };
  const totalChallengesRecords = allQuestions.length;

  const { currentPage, recordsPerPage, handlePageChange } = UsePagination(1, 10);


  const goToAddQuestions = () => {
    const isFromManageChallenge = true;
    const managechallengeId = challengeId;
    const state = {
      isFromManageChallenge,
      managechallengeId
  };
    navigate("/challenges/add-questions?_id="+challengeId,{state});
  };
  const goToEditChallenge = () => {
    const isEditChallenge = true;
    const state = {
      isEditChallenge,
      challengeId
  };
    navigate("/challenges/edit?_id="+challengeId,{state});
  };

  const handleDelete = async () => {
    setDeleteShowLoading(true);
    try {
      const response = await challengesManager.delete(challengeId);
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
        navigate("/challenges", { state });

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
  const challengeName = challengeData.name;
  const coords = "("+challengeData.latitude+", "+challengeData.longitude+")"
  const message = challengeData.description;

  return (
    <div className="flex-col w-full overflow-x-hidden ">
       {showLoading && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Spinner size={50} stroke={3} speed={1} color="black" />
      </div>
    )}
      <PlainNavbar />

      <div className="w-full "></div>
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
      <div className=" xl:ml-[5%] ml-[8%]  grid lg:grid-cols-[60%,22%] xl:grid-cols-[70%,17%]">
        <div>
          <div className="md:mt-20  mt-16  flex items-start justify-start">
            <span className=" text-left font-bold text-2xl md:text-4xl">
              {challengeName}
            </span>
          </div>
          <div className="md:mt-4  mt-5  flex items-start justify-start">
            <span className=" text-left font-bold text-lg md:text-xl">
              {coords}
            </span>
          </div>
          <div className="md:mt-4  mt-5  flex items-start justify-start">
            <span className="text-sh-gray text-left text-lg md:text-xl">
              {message}
            </span>
          </div>
        </div>
        <div >
          <div>
          <button onClick={goToAddQuestions} className='xl:mt-14 lg:ml-[40%] w-full mt-16 rounded-md bg-sh-blue text-center py-2 lg:py-4 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white cursor-pointer '>
            ADD QUESTION
            </button>
          </div>
          <div>
          <button onClick={goToEditChallenge} className='md:mt-5 lg:ml-[40%] w-full mt-16 rounded-md bg-white text-sh-blue text-center py-2 lg:py-4 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 cursor-pointer border border-sh-blue '>
            Edit Details
            </button>
          </div>
          <div>
          <button onClick={openIsDelete} className='md:mt-5 lg:ml-[40%] w-full mt-16 rounded-md bg-white text text-center py-2 lg:py-4 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-sh-red border border-sh-red cursor-pointer  '>
            Delete Challenge
            </button>
          </div>
        </div>
      </div>
<div className="xl:ml-[5%] text-left grid lg:grid-cols-[20%,25%,25%,20%] xl:grid-cols-[20%,20%,20%,20%] ml-[8%] md:mt-12">
<span className="text-left text-xl  font-bold">Difficulty</span>
<span className="text-left text-xl  ml-[10%] font-bold">Total Points</span>
<span className="text-left text-xl  ml-[10%] font-bold">Total Questions</span>
<span className="text-left text-xl ml-[10%] font-bold">Intro Video</span>
</div>
<div className="xl:ml-[5%] text-left grid  lg:grid-cols-[20%,25%,25%,20%] xl:grid-cols-[20%,20%,20%,20%] ml-[8%] md:mt-4">
<span className="text-left text-xl   font-bold">{challengeData.difficulty}</span>
<span className="text-left text-xl  ml-[10%] font-bold">{challengeData.total_score}</span>
<span className="text-left text-xl  ml-[10%] font-bold">{challengeData.questions}</span>
<span  onClick={() => window.open(videoUrl, '_blank')} className="text-left text-xl  ml-[10%] underline  font-bold text-sh-blue cursor-pointer">VIEW</span>

</div>
      <div className='mt-16 mb-10 xl:ml-[5%] ml-[8%] w-[84%]  xl:w-[90%] mx-[5%] h-auto rounded-[20px] bg-sh-cream  '>
        {/* <div className='flex justify-between'>
                        <span className='text-sh-graph-black text-left flex items-start justify-start ml-8 pt-7 text-xl lg:text-[22px] font-bold'>Ft. Howell</span>
                        <button onClick={goToAddQuestions} className='text-left flex items-end justify-between rounded-[10px] bg-sh-blue mx-8 xl:px-24 px-4 lg:px-12 py-2 lg:py-3 mt-6 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white cursor-pointer '>ADD QUESTION</button>
                    </div> */}
        <div className='mt-8 pt-10 mx-8 pb-10'>
          <ManageChallengesTable currentPage={currentPage} recordsPerPage={recordsPerPage} allQuestions={allQuestions} newChallengeId={challengeId}/>
        </div>
        <div className='mx-8 pb-10'>
          <Pagination
            totalRecords={totalChallengesRecords} // Set the total number of records
            recordsPerPage={recordsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange} // Pass the handlePageChange function
          />
        </div>

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
                  Are you sure you want to delete this challenge?
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
  )
}

export default ManageChallenges;