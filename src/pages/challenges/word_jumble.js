import React, { useState, useEffect } from "react";
import PlainNavbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router";

function WordJumble() {

    const navigate = useNavigate();

    const goToManageQuestions = () => {
        navigate("/challenges/manage");
      };
      const goBack = () => {
        navigate("/challenges/add-questions");
    };
    return (
        <div className="flex-col w-full overflow-x-hidden ">
            <PlainNavbar />

            <div className="w-full ">
                <div className="md:mt-20 md:ml-20 mt-16 ml-10 flex items-start justify-start">
                    <span className="text-sa-maroon text-left font-bold text-2xl md:text-4xl">
                        Challenges
                    </span>
                </div>
                <div className="md:mt-4 md:ml-20 mt-5 ml-10 flex items-start justify-start">
                    <span className="text-sa-maroon text-left  text-lg md:text-xl">
                        Here you can easily manage challenges.
                    </span>
                </div>
                <div className="  mt-10 mb-10  md:ml-20  w-[80%] rounded-[20px] h-[33rem] lg:h-[34rem] xl:h-[28rem]  bg-sh-cream">
                    <div className="flex items-start justify-start pt-5 ml-10 font-bold text-xl"> Add New Question</div>


                    <div className="text-left md:ml-[25%] mt-10 lg:text-xl text-lg text-black">Answer</div>
                    <input
                        type="text"
                        placeholder="Answer"
                        className="w-[50%] flex-col  text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue  focus:outline-none focus:ring-primary-300"
                    />
                      <div className="text-left md:ml-[25%] mt-5 lg:text-xl text-lg text-black">Letter Count</div>
                    <input
                        type="text"
                        placeholder="Letter Count"
                        className="w-[50%] flex-col  text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                    />
                        <div className="grid md:ml-[25%] w-[50%] xl:grid-cols-2 grid-cols-1 gap-2  xl:gap-x-8 xl:gap-y-8 mt-12 ml-10 lg:text-xl text-lg text-black">

<div className=" flex-col order-2 xl:order-1">
    <button onClick={goBack} class="text-sm lg:text-base  w-full mb-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90  text-white bg-sh-red focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md  px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        GO BACK
    </button></div>
<div className=" flex-col order-1 xl:order-2">
    <button onClick={goToManageQuestions} class="text-sm lg:text-base   w-full mb-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90  text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md  px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        ADD QUESTION
    </button></div>
</div>  
                    

                    
                </div>

            </div>

        </div>
    )
}

export default WordJumble;