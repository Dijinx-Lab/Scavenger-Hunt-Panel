import React,{ useState, useEffect } from "react";
import ChallengesLogo from '../../assets/Challenges_Icon_For_Dashboard.svg';
import Pagination from "../../components/pagination/pagination";

import PlainNavbar from '../../components/navbar/navbar';
import CurrentLocations from "./current_locations_table";
import UsePagination from "../../components/pagination/handle_page_change";
import ChallengesManager from "../../models/admin/challenges/challengeshttp/http";
import { useNavigate,useLocation } from "react-router";
import Spinner from "../../components/spinner/spinner";
import Toast from "../../components/toast/toast";
function LocationDashboard() {
  const location = useLocation();

  const [allChallenges,setAllChallenges]= useState("")
  const [toastMessages, setToastMessages] = useState(location.state?.toastMessages || []); // Set initial toastMessages from location state
  const [showLoading, setShowLoading] = useState(true);
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
  const challengesManager = new ChallengesManager();
  const fetchData = async () => {
    try {
      const response = await challengesManager.get();
      if (response.success) {
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

    const { currentPage: currentLocationPage, recordsPerPage: recordsLocationPerPage, handlePageChange: handleLocationPageChange } = UsePagination(1, 10);

  const navigate = useNavigate();

    const goToAddNewLocation = () => {
        navigate("/locations/add");
      };
    

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
                <div className="md:mt-20 xl:ml-[5%] ml-[8%] mt-16  flex items-start justify-start">
                    <span className="text-sa-maroon text-left font-bold text-2xl md:text-4xl">
                        Locations
                    </span>
                </div>
                <div className="md:mt-4 xl:ml-[5%] ml-[8%] mt-5  flex items-start justify-start">
                    <span className="text-sa-maroon text-left  text-lg md:text-xl">
                    Here you can manage location coordinates.
                    </span>
                </div>

               
                <div className='mt-8 mb-10 xl:ml-[5%] ml-[8%] w-[84%] xl:w-[90%]  h-auto rounded-[20px] bg-sh-cream  '>
                    <div className='flex justify-between'>
                        <span className='text-left flex items-start justify-start ml-8 pt-8 text-xl lg:text-[22ox] font-bold'>Current Location</span>
                        {/* <button onClick={goToAddNewLocation} className='text-left flex items-end justify-between rounded-[10px] bg-sh-blue mx-8 xl:px-24 px-4 lg:px-12 py-2 lg:py-3 mt-6 text-base font-medium hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white cursor-pointer '>ADD NEW</button> */}
                    </div>
                    <div className='mt-8 mx-8 pb-10'>
            <CurrentLocations currentPage={currentLocationPage} recordsPerPage={recordsLocationPerPage} allChallenges={allChallenges} />
          </div>
          <div className='mx-8 pb-10'>
            <Pagination
              totalRecords={totalChallengesRecords} // Set the total number of records
              recordsPerPage={recordsLocationPerPage}
              currentPage={currentLocationPage}
              onPageChange={handleLocationPageChange} // Pass the handlePageChange function
            />
          </div>
                </div>


            </div></div>
    )
}

export default LocationDashboard;
