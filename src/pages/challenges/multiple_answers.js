import React, { useState, useEffect } from "react";
import PlainNavbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router";

function MultipleType() {

    const navigate = useNavigate();

    const goToMultiple = () => {
        navigate("/challenges/add-questions/multiple");
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
                
<div className="mt-10 mb-10 md:ml-20 w-[80%] rounded-[20px] md:h-[58rem] lg:h-[46rem] xl:h-[40rem] bg-sh-cream">
    <div className="flex items-start justify-start pt-5 ml-10 font-bold text-xl">
        Add New Question
    </div>

    {/* <div className="text-left  md:ml-[25%] mt-10 lg:text-xl text-lg text-black">
                        Question</div>
                        
                        <textarea
    placeholder="How many years passed between the construction of Fort Howell and its transfer of ownership to the Hilto Head Island Land Trust?"
    className="w-[50%] resize-none py-4 lg:h-32 h-40 flex-col items-start justify-start text-base bg-transparent mt-3 px-3 rounded-xl  border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
></textarea> */}

    <div className="grid md:ml-[25%] w-[50%] lg:grid-cols-2 md:grid-cols-1 gap-6 lg:gap-x-16 lg:gap-y-8 mt-10 ml-10 lg:text-xl text-lg text-black">

    <div>
            <label htmlFor="answer1"  className="flex text-left">Answer 1</label>
            <input
                type="text"
                id="answer1"
                placeholder="Answer 1"
                className="w-full flex-col text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
            />
        </div>
        <div>
            <label htmlFor="answer2"  className="flex text-left">Answer 2</label>
            <input
                type="text"
                id="answer2"
                placeholder="Answer 2"
                className="w-full flex-col text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
            />
        </div>
        <div>
            <label htmlFor="answer3"  className="flex text-left">Answer 3</label>
            <input
                type="text"
                id="answer3"
                placeholder="Answer 3"
                className="w-full flex-col text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
            />
        </div>
        <div>
            <label htmlFor="answer4"  className="flex text-left">Answer 4</label>
            <input
                type="text"
                id="answer4"
                placeholder="Answer 4"
                className="w-full flex-col text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
            />
        </div>
        </div>
    <div className="grid md:ml-[25%] w-[50%] lg:grid-cols-1 md:grid-cols-1 gap-8 lg:gap-12 lg:mt-10 mt-6 ml-10 lg:text-xl text-lg text-black">

        <div className="lg:w-[50%] w-full  lg:justify-self-center ">
            <label htmlFor="questionType" className="flex text-left">Correct Answer</label>
            <select
    id="questionType"
    placeholder="Question Type"
    required
    
    className="w-full flex-col  bg-sh-cream text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
>
<option value="" disabled selected hidden  >Correct Answer</option>
    <option value="slider" className="bg-sh-cream  " >1</option>
    <option value="multiple" className="bg-sh-cream">2</option>
    <option value="photo" className="bg-sh-cream">3</option>
    <option value="photo" className="bg-sh-cream">4</option>
</select>
        </div></div>
   
        <div className="grid md:ml-[25%] w-[50%] xl:grid-cols-2 grid-cols-1 gap-2  xl:gap-x-8 xl:gap-y-8 mt-28 ml-10 lg:text-xl text-lg text-black">

<div className=" flex-col order-2 xl:order-1">
    <button onClick={goBack} class="text-sm lg:text-base  w-full mb-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90  text-white bg-sh-red focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md  px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        GO BACK
    </button></div>
<div className=" flex-col order-1 xl:order-2">
    <button onClick={goToMultiple} class="text-sm lg:text-base   w-full mb-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90  text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md  px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        ADD QUESTION
    </button></div>
</div>
</div>

            </div>

        </div>
    )
}

export default MultipleType;