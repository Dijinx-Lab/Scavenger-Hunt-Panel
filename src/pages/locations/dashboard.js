import React,{ useState, useEffect } from "react";
import ChallengesLogo from '../../assets/Challenges_Icon_For_Dashboard.svg';
import Pagination from "../../components/pagination/pagination";

import PlainNavbar from '../../components/navbar/navbar';
import { useNavigate } from "react-router";
import CurrentLocations from "./current_locations_table";
import UsePagination from "../../components/pagination/handle_page_change";
function LocationDashboard() {
    const { currentPage, recordsPerPage, handlePageChange } = UsePagination(1, 5);

  const navigate = useNavigate();

    const goToAddNewLocation = () => {
        navigate("/locations/add");
      };
    

    return (
        <div className="flex-col w-full overflow-x-hidden ">
<PlainNavbar/>
            
            <div className="w-full ">
                <div className="md:mt-20 md:ml-20 mt-16 ml-10 flex items-start justify-start">
                    <span className="text-sa-maroon text-left font-bold text-2xl md:text-4xl">
                        Locations
                    </span>
                </div>
                <div className="md:mt-4 md:ml-20 mt-5 ml-10 flex items-start justify-start">
                    <span className="text-sa-maroon text-left  text-lg md:text-xl">
                    Here you can manage location coordinates.
                    </span>
                </div>

               
                <div className='mt-8 mb-10 ml-10 md:ml-20 w-[86%] xl:w-[92%] mx-10 h-auto rounded-[20px] bg-sh-cream  '>
                    <div className='flex justify-between'>
                        <span className='text-left flex items-start justify-start ml-8 pt-7 text-xl lg:text-2xl font-bold'>Current Location</span>
                        <button onClick={goToAddNewLocation} className='text-left flex items-end justify-between rounded-[10px] bg-sh-blue mx-8 xl:px-24 px-4 lg:px-12 py-2 lg:py-3 mt-6 text-base font-semibold hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white cursor-pointer '>ADD NEW</button>
                    </div>
                    <div className='mt-8 mx-8 pb-10'>
            <CurrentLocations currentPage={currentPage} recordsPerPage={recordsPerPage} />
          </div>
          <div className='mx-8 pb-10'>
            <Pagination
              totalRecords={100} // Set the total number of records
              recordsPerPage={recordsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange} // Pass the handlePageChange function
            />
          </div>
                </div>


            </div></div>
    )
}

export default LocationDashboard;
