import React, { useState, useEffect } from "react";
import PlainNavbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router";

function AddQuestions() {

    const navigate = useNavigate();

    const goToQuestionType = () => {
        const questionType = document.getElementById("questionType").value;
        if (questionType === "multiple") {
            navigate("/challenges/add-questions/multiple");
        } else if (questionType === "slider") {
            navigate("/challenges/add-questions/slider");
        } else if (questionType === "photo") {
            navigate("/challenges/add-questions/photo");
        } else if (questionType === "wordjumble") {
            navigate("/challenges/add-questions/word-jumble");
        }
    };
    const goBack = () => {
        navigate("/challenges/create");
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
                
<div className="mt-10 mb-10 md:ml-20 w-[80%] rounded-[20px] h-[51rem] lg:h-[49rem] xl:h-[38rem] bg-sh-cream">
    <div className="flex items-start justify-start pt-5 ml-10 font-bold text-xl">
        Add New Question
    </div>

    <div className="text-left  md:ml-[25%] mt-10 lg:text-xl text-lg text-black">
                        Question</div>
                        
                        <textarea
    placeholder="How many years passed between the construction of Fort Howell and its transfer of ownership to the Hilto Head Island Land Trust?"
    className="w-[50%] resize-none py-4 lg:h-32 h-40 flex-col items-start justify-start text-base bg-transparent mt-3 px-3 rounded-xl  border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
></textarea>

    <div className="grid md:ml-[25%] w-[50%] xl:grid-cols-[0.63fr,0.4fr] grid-cols-1 gap-6 mt-5 xl:mt-10 ml-10 lg:text-xl text-lg text-black">

        <div className="order-2 xl:order-1">
            <label htmlFor="questionType" className="flex text-left">Question Type</label>
            <select
    id="questionType"
    placeholder="Question Type"
    required
    
    className="w-full flex-col  bg-sh-cream text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
>
<option value="" disabled selected hidden  >Question Type</option>
    <option value="slider" className="bg-sh-cream  " >Slider</option>
    <option value="multiple" className="bg-sh-cream">Multiple</option>
    <option value="photo" className="bg-sh-cream">Photo</option>
    <option value="wordjumble" className="bg-sh-cream">Word Jumble</option>
</select>
        </div>
        <div className="order-1 xl:order-2">
            <label htmlFor="points"  className="flex text-left">Points</label>
            <input
                type="text"
                id="points"
                placeholder="Points"
                className="w-full flex-col text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
            />
        </div>
    </div>
    <div className="grid md:ml-[25%] w-[50%] xl:grid-cols-2 mt-28 grid-cols-1 gap-1 xl:gap-5 xl:gap-x-8 xl:gap-y-8   ml-10 lg:text-xl text-lg text-black">

<div className=" flex-col order-2 xl:order-1">
    <button onClick={goBack} class="text-sm lg:text-base  w-full mb-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90  text-white bg-sh-red focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md  px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        GO BACK
    </button></div>
<div className=" flex-col order-1 xl:order-2">
    <button onClick={goToQuestionType} class="text-sm lg:text-base   w-full mb-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90  text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md  px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        ADD QUESTION
    </button></div>
</div>
</div>

            </div>

        </div>
    )
}

export default AddQuestions;