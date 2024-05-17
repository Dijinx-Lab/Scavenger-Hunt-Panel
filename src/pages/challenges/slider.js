import React, { useState, useEffect } from "react";
import PlainNavbar from "../../components/navbar/navbar";
import { useNavigate } from "react-router";

function Slider() {

    const navigate = useNavigate();

    const goToMultiple = () => {
        navigate("/challenges/add-questions/multiple");
    };
    const goBack = () => {
        navigate("/challenges/add-questions");
    };
    const [sliderValue, setSliderValue] = useState(0);

    const handleSliderChange = (e) => {
        const newValue = parseInt(e.target.value);
        const clampedValue = Math.max(newValue, sliderMin2); // Ensure the value is not less than sliderMin
        setSliderValue(clampedValue);
    };
    const [sliderMin, setSliderMin] = useState(0);
    const [sliderMin2, setSliderMin2] = useState(0);
    const [sliderMax, setSliderMax] = useState(100);
    const [sliderMax2, setSliderMax2] = useState(100);
    // const handleMinChange = (e) => {
    //     const value = parseInt(e.target.value);
    //     if (isNaN(value) ) {
    //         setSliderMin2(0);
    //         setSliderValue(0);
    //         if (sliderValue < 0) {
    //             setSliderValue(0);
    //         }
    //     } else {
    //         setSliderMin2(value);
    //         console.log("1st",sliderMin2);
    //     }
    // };

    // const handleMaxChange = (e) => {
    //     const value = parseInt(e.target.value);
    //     if (isNaN(value)) {
    //         setSliderMax(0); // Set to 0 if NaN
    //     }  else {
    //         setSliderMax(value);
    //         setErrorMessage("");

    //     }
    // }
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");
    // const handleMinFieldClick = () => {

    //     if (setSliderMin2 > sliderMax  ) {
    //         setErrorMessage2("*Must be lesser than maximum*");
    //         setSliderMin(0); // Set to 0 if NaN
    //         setSliderValue(0); // Set to 0 if NaN

    //          // Set to sliderMin if value is less than sliderMin
    //     }
    //     else if (sliderValue < setSliderMin2) {

    //         setSliderMin(setSliderMin2);
    //         setSliderValue(setSliderMin);

    //     }
    //     // Clear error message when clicking on maximum field
    // };
    // const handleMaxFieldClick = () => {
    //     if (sliderMax < sliderMin) {
    //         setErrorMessage("*Must be greater than minimum*");
    //         setSliderMax(0); // Set to 0 if NaN
    //         setSliderValue(0); // Set to 0 if NaN

    //          // Set to sliderMin if value is less than sliderMin
    //     }
    //     else if (sliderValue > sliderMax) {
    //         setSliderValue(sliderMax);
    //     }
    //     // Clear error message when clicking on maximum field
    // };
    const handleMaxChange = (e) => {
        const value = (e.target.value);
        setSliderMax(value);
        if ((value=="")) {
            setSliderMax("");
            setErrorMessage("Field cannot be empty*");
            if (sliderMin == "") {
                 // Set to empty if NaN

                setSliderValue(0);
                setSliderMin2(0);
            }
            else {
                setSliderMin2(sliderMin);
                setSliderMax2(sliderMin);
            }
            setSliderMin(sliderMin); // Set to 0 if NaN
        }
         else {
            setErrorMessage("")
            if ((sliderMin=="")) {
                
                setSliderValue(0);
                setSliderMin2(0);
                setSliderMax2(value);
                setErrorMessage2("Field cannot be empty*");

        }else{
            if (value >parseInt(sliderMin)) {
                setErrorMessage2("")

               
                    setSliderValue(sliderMin);
                    setSliderMin2(sliderMin);
                    setSliderMax2(value);
                
            }
            else {
                setErrorMessage2("Must be lesser than maximum*");

                setErrorMessage("Must be greater than minimum*");
                setSliderValue(sliderMin);
                setSliderMax2(value); // Set to 0 if NaN
                setSliderMin2(sliderMin); // Set to 0 if NaN

            }
         

        }
           
          
            // if (sliderMin == "") {
            //     setErrorMessage("");

            //         setSliderValue(0);
            //         setSliderMin2(0);
            //         setSliderMax2(value);
            //     }
           
        }
    };
    // const handleMaxFieldClick = () => {
    //     if (sliderMax2 === "") {
    //         setSliderValue(0);
    //         setErrorMessage2("");
    //         setErrorMessage("Field cannot be empty*");
    //     }
    //     else if (sliderMin2 === "") {
    //         setSliderMin(0);
    //         setSliderValue(0);
    //         setErrorMessage("");
    //         setErrorMessage2("Field cannot be empty*");
    //     }
    //     else if (sliderMax2 <= sliderMin2) {
    //         setErrorMessage2("");
    //         setErrorMessage("Must be greater than minimum*");
    //         setSliderMax(sliderMax2);
    //         setSliderValue(0);
    //         setSliderMin(0);
    //     } else {
    //         setErrorMessage2("");
    //         setErrorMessage("");
    //         setSliderMin(sliderMin2);
    //         setSliderValue(sliderMin2);
    //         setSliderMax(sliderMax2);
    //     }
    // };


    const handleMinChange = (e) => {
        const value = (e.target.value);
        setSliderMin(value)
    
        if ((value=="")) {
        console.log("ab", value);

            setSliderMin(""); // Set to empty if NaN
            setErrorMessage2("Field cannot be empty*");
            if (sliderMax == "") {
                setErrorMessage("Field cannot be empty*");

            }
            else {
                setErrorMessage("");
            } // Set to empty if NaN
            setSliderMin2(0);
            // Set to 0 if NaN
            setSliderValue(0); // Set to 0 if NaN

        } else {


            setErrorMessage2("");
            if (parseInt(value) < sliderMax) {
               
                setSliderMin2(value);
                setSliderValue(value);
                setErrorMessage("");
                setErrorMessage2("");
            }
            else {
                console.log("b", value);
                if (sliderMax == "") {
                    setErrorMessage2("");
                }
                else {
                    setErrorMessage2("Must be lesser than maximum*");
                }
                setSliderMin2(value);
                setSliderValue(value);


            }

        }
    };




    // const handleMinFieldClick = () => {
    //     if (sliderMin2 === "") {
    //         setSliderMin(0);
    //         setSliderValue(0);
    //         setErrorMessage("");
    //         setErrorMessage2("Field cannot be empty*");
    //     }
    //     else if (sliderMax2 === "") {
    //         setSliderValue(0);
    //         setErrorMessage2("");
    //         setErrorMessage("Field cannot be empty*");
    //     }
    //     else if (sliderMin2 === 0) {
    //         setSliderValue(0);
    //         setSliderMin(0);
    //         setErrorMessage2(""); // Clear the error message if the input is '0'
    //         return; // Exit the function without further processing
    //     }

    //     else if (sliderMin2 >= sliderMax2) {
    //         setErrorMessage("");
    //         setErrorMessage2("Must be lesser than maximum*");
    //     } else if (sliderValue < sliderMin2) {
    //         setErrorMessage2("");
    //         setErrorMessage("");
    //         setSliderMin(sliderMin2);
    //         setSliderValue(sliderMin2);
    //     }
    // };


    const linearGradientBackground = `
    linear-gradient(to right,
      #8EB1FF ${((sliderValue - sliderMin2) / (sliderMax2 - sliderMin2) * 20).toFixed(2)}%,
      #3F6AC9 ${((sliderValue - sliderMin2) / (sliderMax2 - sliderMin2) * 100).toFixed(2)}%,
      #dfdcd7 0%
    )
  `;
    //   const handleMaxFieldClick = () => {
    //     setSliderMin(0);
    //     setSliderValue(0);
    //     // Clear minimum field when clicking on maximum field
    // };
    return (
        <div className="flex-col w-full overflow-x-hidden ">
            <PlainNavbar />

            <div className="w-full ">
                <div className="md:mt-20 xl:ml-[5%] ml-[8%] mt-16  flex items-start justify-start">
                    <span className="text-sa-maroon text-left font-bold text-2xl md:text-4xl">
                        Challenges
                    </span>
                </div>
                <div className="md:mt-4 xl:ml-[5%] ml-[8%] mt-5  flex items-start justify-start">
                    <span className="text-sa-maroon text-left  text-lg md:text-xl">
                        Here you can easily manage challenges.
                    </span>
                </div>

                <div className="mt-10 mb-10 xl:ml-[5%] ml-[8%] w-[80%] rounded-[20px] h-[41rem] lg:h-[38rem] xl:h-[30rem] bg-sh-cream">
                    <div className="text-sh-graph-black flex items-start justify-start pt-5 ml-10 font-bold text-xl">
                        Add New Question
                    </div>

                    <div className="grid md:ml-[25%] w-[50%] lg:grid-cols-1 md:grid-cols-1 gap-6 lg:gap-x-16 lg:gap-y-8 mt-10 ml-10 lg:text-xl text-lg text-black">
                        <div>
                            <label htmlFor="slider" className="xl:text-xl text-lg flex text-left">Slider Correct</label>
                            <div className="relative">
                                <input
                                    type="range"
                                    className="bg-gray-300 mt-2 h-[40px] w-full pointer-events-auto  cursor-pointer appearance-none border-transparent"
                                    id="customRange1"
                                    value={sliderValue}
                                    min={sliderMin2}
                                    max={sliderMax2}
                                    onChange={handleSliderChange}
                                    disabled={errorMessage !== "" || errorMessage2 !== ""}
                                    style={{ background: linearGradientBackground }}
                                />
                                <div
                                    className="absolute pointer-events-none cursor-pointer top-0.5 left-0 min-w-[48px] max-w-auto h-[48px] flex items-center justify-center bg-[#3F6AC9] text-lg text-white"

                                    style={{
                                        marginLeft: `calc(${((sliderValue - sliderMin2) / (sliderMax2 - sliderMin2)) * 100}% - 24px)`,

                                    }}



                                    draggable="true"
                                    onDrag={(e) => {
                                        const rect = e.currentTarget.parentElement.getBoundingClientRect();
                                        const offsetX = e.clientX - rect.left;
                                        let newValue = (offsetX / rect.width) * sliderMax2;
                                        newValue = Math.max(sliderMin2, Math.min(sliderMax2, Math.round(newValue))); // Ensure value is within sliderMin and sliderMax range
                                        setSliderValue(newValue);
                                    }}
                                    onDragEnd={(e) => {
                                        const rect = e.currentTarget.parentElement.getBoundingClientRect();
                                        const offsetX = e.clientX - rect.left;
                                        let newValue = (offsetX / rect.width) * sliderMax2;
                                        newValue = Math.max(sliderMin2, Math.min(sliderMax2, Math.round(newValue))); // Ensure value is within sliderMin and sliderMax range
                                        setSliderValue(newValue);
                                    }}
                                >     {sliderValue}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:ml-[25%] mb-14  w-[50%] lg:grid-cols-2 md:grid-cols-1 gap-6 lg:gap-x-16 lg:gap-y-8 mt-5 lg:mt-10 ml-10 lg:text-xl text-lg text-black">
                        <div>
                            <label htmlFor="answer3" className="xl:text-xl text-lg flex text-left">Slider Minimum</label>
                            <input
                                type="number"
                                id="min"
                                value={sliderMin}
                                //onBlur={handleMinFieldClick}
                                onChange={handleMinChange}
                                placeholder="25"

                                className="w-full flex-col text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                            />
                            <div className="text-left w-full  text-red-500 text-sm mt-1 flex">
                                {errorMessage2 && (
                                    <span>{errorMessage2}</span>
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="answer4" className="xl:text-xl text-lg flex text-left">Slider Maximum</label>
                            <input
                                type="number"
                                id="max"
                                placeholder="200"
                                value={sliderMax}
                                //onBlur={handleMaxFieldClick}
                                onChange={handleMaxChange}
                                className="w-full flex-col text-base bg-transparent mt-3 px-3 rounded-xl py-3 border border-gray-400 focus:border-sh-blue focus:outline-none focus:ring-primary-300"
                            />
                            <div className="w-full text-left text-red-500 text-sm  mt-1 flex">
                                {errorMessage && (
                                    <span>{errorMessage}</span>

                                )}
                            </div>

                        </div>

                    </div>

                    <div className="grid md:ml-[25%] w-[50%] xl:grid-cols-2 grid-cols-1 gap-2  xl:gap-x-8 xl:gap-y-8  ml-10 lg:text-xl text-lg text-black">

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

export default Slider;