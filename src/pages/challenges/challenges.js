import React,{ useState, useEffect } from "react";
import ChallengesLogo from '../../assets/Challenges_Icon_For_Dashboard.svg';
import CurrentChallenges from './table';
import Pagination from "../../components/pagination/pagination";
import { Blurhash } from 'react-blurhash';
import PlainNavbar from '../../components/navbar/navbar';
import { useNavigate,useLocation } from "react-router";
import UsePagination from "../../components/pagination/handle_page_change";
import ChallengesManager from "../../models/admin/challenges/challengeshttp/http";
import Spinner from "../../components/spinner/spinner";
import Toast from "../../components/toast/toast";
function Challenges() {
  const location = useLocation();

    const challengesManager = new ChallengesManager();
    const [showLoading, setShowLoading] = useState(true);
    const { currentPage: currentChallengePage, recordsPerPage: recordsChallengesPerPage, handlePageChange: handleChallengesPageChange } = UsePagination(1, 10);
    const [completeChallenges,setCompletedChallenges]= useState("")
    const [uncompleteChallenges,setUncompletedChallenges]= useState("")
    const [totalChallenges,setTotalChallenges]= useState("")
    const [allChallenges,setAllChallenges]= useState("")
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
  // useEffect(() => {
  //   // Check if there are toast messages in the location state
  //   if (location.state?.toastMessages) {
  //     // Display the toast message
  //     const toastMessage = location.state.toastMessages[0]; // Assuming there's only one toast message
  //     setToastMessages([toastMessage]);

  //     // Clear the location state after showing the toast message
  //     setTimeout(() => {
  //       window.history.replaceState({}, document.title, window.location.pathname);
  //     }, 0);
  //   }
  // }, [location.state]);
    
    const fetchData = async () => {
        try {
          const response = await challengesManager.get();
          if (response.success) {
            setCompletedChallenges(response.data.completed_challenges);
            setUncompletedChallenges(response.data.uncompleted_challenges);
            setTotalChallenges(response.data.total_challenges);
            setAllChallenges(response.data.challenges);
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
  const totalChallengesRecords = allChallenges.length;

  const navigate = useNavigate();

    const goToCreate = () => {
        navigate("/challenges/create");
      };
    
      const cdnImageUrl = 'https://dk9gc53q2aga2.cloudfront.net/assets/Challenges_Icon_For_Dashboard.svg'; 
    return (
        <div className="flex-col w-full overflow-x-hidden ">
           {showLoading && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Spinner size={50} stroke={3} speed={1} color="black" />
      </div>
    )}

<PlainNavbar/>
            
            <div className="w-full ">
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
                <div className="md:mt-20 xl:ml-[5%] ml-[8%]  mt-16  flex items-start justify-start">
                    <span className="text-sa-maroon text-left font-bold text-2xl md:text-4xl">
                        Challenges
                    </span>
                </div>
                <div className="md:mt-4 xl:ml-[5%] ml-[8%]  mt-5 flex items-start justify-start">
                    <span className="text-sh-gray text-left  text-lg md:text-xl">
                        Here you can easily manage challenges.
                    </span>
                </div>

                <div class="w-full xl:ml-[5%] ml-[8%]  md:mt-10 mt-10 grid md:grid-cols-1 lg:ml-[4%] lg:grid-cols-2 xl:grid-cols-[28%,28%,28%] xl:gap-x-[3%] xl:gap-y-0 gap-x-0 gap-y-10">
                    <div className="bg-sh-cream h-32  lg:ml-[8%] xl:ml-0 w-72 lg:w-[80%]  xl:w-[100%] rounded-[20px]">
                        <div className='flex'>
                            <img src={cdnImageUrl} className='mt-[-7px]' />

                            <div className="text-sh-graph-black">
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-10px]'>TOTAL</span>
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-10px]'>{totalChallenges}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-sh-cream  xl:mx-0  h-32 w-72  lg:w-[80%] xl:w-[100%] rounded-[20px]">
                        <div className='flex'>
                            <img  src={cdnImageUrl} className='mt-[-7px]' />

                            <div className="text-sh-graph-black">
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-10px]'>COMPLETED</span>
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-10px]'>{completeChallenges}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-sh-cream xl:ml-0 lg:ml-[8%]  h-32 w-72 lg:w-[80%] xl:w-[100%] rounded-[20px]">
                        <div className='flex'>
                            <img src={cdnImageUrl} className='mt-[-7px]' />

                            <div className="text-sh-graph-black">
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-15px]'>UNCOMPLETED</span>
                                <span className='flex mt-5 xl:text-xl text-lg font-bold ml-[-15px]'>{uncompleteChallenges}</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='mt-8 mb-10  xl:ml-[5%] ml-[8%] w-[84%] lg:w-[86%] xl:w-[90%] mx-[5%] h-auto rounded-[20px] bg-sh-cream  '>
                    <div className='flex justify-between'>
                        <span className='text-sh-graph-black text-left flex items-start justify-start ml-8 pt-8 text-lg lg:text-[22px] font-bold'>Current Challenges</span>
                        <button onClick={goToCreate} className='text-left flex items-end justify-between rounded-[10px] bg-sh-blue mx-8 xl:px-24 px-[5%] lg:px-12 py-2 lg:py-3 mt-6 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white cursor-pointer '>ADD NEW</button>
                    </div>
                    <div className='mt-8 mx-8 pb-10'>
            <CurrentChallenges currentPage={currentChallengePage} recordsPerPage={recordsChallengesPerPage}  allChallenges={allChallenges}/>
          </div>
          <div className='mx-8 pb-10'>
            <Pagination
              totalRecords={totalChallengesRecords} // Set the total number of records
              recordsPerPage={recordsChallengesPerPage}
              currentPage={currentChallengePage}
              onPageChange={handleChallengesPageChange} // Pass the handlePageChange function
            />
          </div>
                </div>


            </div></div>
    )
}

export default Challenges;
