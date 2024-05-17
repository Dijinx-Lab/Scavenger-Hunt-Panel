import React, { useState, useEffect } from "react";
import PlainNavbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router";

function CreateChallenges() {

    const navigate = useNavigate();

    const goToManageQuestions = () => {
        navigate("/challenges/manage");
    };
    const goBack = () => {
        navigate("/challenges");
    };
    return (
        <div className="flex-col w-full overflow-x-hidden ">
            <PlainNavbar />

            <div className="w-full ">
                <div className="md:mt-20 xl:ml-[5%] ml-[8%] mt-16 flex items-start justify-start">
                    <span className="text-sa-maroon text-left font-bold text-2xl md:text-4xl">
                        Challenges
                    </span>
                </div>
                <div className="md:mt-4 xl:ml-[5%] ml-[8%] mt-5  flex items-start justify-start">
                    <span className="text-sa-maroon text-left  text-lg md:text-xl">
                        Here you can easily manage challenges.
                    </span>
                </div>
                <div className="  mt-10 mb-10  xl:ml-[5%] ml-[8%]  w-[80%] rounded-[20px] h-[41rem] xl:h-[36rem] bg-sh-cream">
                    <div className="text-sh-graph-black flex items-start justify-start pt-5 ml-10 font-bold text-xl"> Add New Challenge</div>


                    <div className="text-left md:ml-[25%] mt-10 lg:text-xl text-lg text-black">Challenge Name</div>
                    <input
                        type="text"
                        placeholder="Challenge Name"
                        className="w-[50%] flex-col  text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue  focus:outline-none focus:ring-primary-300"
                    />
                    <div className="text-left md:ml-[25%] mt-8 lg:text-xl text-lg text-black">Latitude</div>
                    <input
                        type="text"
                        placeholder="Latitude"
                        className="w-[50%] flex-col  text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                    />
                    <div className="text-left md:ml-[25%] mt-8 lg:text-xl text-lg text-black">Longitude</div>
                    <input
                        type="text"
                        placeholder="Longitude"
                        className="w-[50%] flex-col  text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400  focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                    />
                    <div className="grid md:ml-[25%] w-[50%] xl:grid-cols-2 grid-cols-1 gap-1 xl:gap-5 xl:gap-x-8 xl:gap-y-8 mt-10 ml-10 lg:text-xl text-lg text-black">

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

export default CreateChallenges;