import React, { useState, useEffect } from "react";
import PlainNavbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router";

function AddLocation() {

    const navigate = useNavigate();

    const goToQuestionType = () => {
      
    };
    return (
        <div className="flex-col w-full overflow-x-hidden ">
            <PlainNavbar />

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
                
<div className="mt-10 mb-10 md:ml-20 w-[80%] rounded-[20px] h-[40rem] lg:h-[35rem] bg-sh-cream">
    <div className="flex items-start justify-start pt-5 ml-10 font-bold text-xl">
        Add New Question
    </div>

    <div className="text-left md:ml-[25%] mt-8 lg:text-xl text-lg text-black">Latitude</div>
                    <input
                        type="text"
                        placeholder="Latitude"
                        className="w-[50%] flex-col  text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                    />
                      <div className="text-left md:ml-[25%] mt-6 lg:text-xl text-lg text-black">Longitude</div>
                    <input
                        type="text"
                        placeholder="Longitude"
                        className="w-[50%] flex-col  text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400  focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                    />

    <div className="grid md:ml-[25%] w-[50%] lg:grid-cols-[0.56fr,0.44fr] md:grid-cols-1 gap-6 mt-5 lg:mt-6 ml-10 lg:text-xl text-lg text-black">

        <div>
            <label htmlFor="locstatus" className="flex text-left">Location Status</label>
            <select
    id="locstatus"
    placeholder="Location Status"
    required
    
    className="w-full flex-col  bg-sh-cream text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
>
<option value="" disabled selected hidden  >Location Status</option>
    <option value="start" className="bg-sh-cream  " >Start</option>
    <option value="finsih" className="bg-sh-cream">Finish</option>
</select>
        </div>
        <div>
            <label htmlFor="totaltime"  className="flex text-left">Total Time</label>
            <input
                type="text"
                id="totaltime"
                placeholder="Total Time"
                className="w-full flex-col text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
            />
        </div>
    </div>

    <div class="flex items-center justify-center mt-10 mb-10 lg:mt-16">
        <button onClick={goToQuestionType} class="w-[50%]  hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md px-5 py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            ADD LOCATION
        </button>
    </div>
</div>

            </div>

        </div>
    )
}

export default AddLocation;