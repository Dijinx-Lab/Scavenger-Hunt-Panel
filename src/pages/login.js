import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Group 4.svg";
import LogoBG from "../assets/Ellipse 57.svg";

function Login() {

  const navigate = useNavigate();
  const goToDashboard = (idx) => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-[100vh]">
    <div>
    <section class="bg-white">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
      <div class="w-full  rounded-lg shadow border border-sh-black md:mt-0 sm:max-w-md xl:p-0 bg-sh-cream">
      <a href="#" class="flex justify-center mt-10 items-center mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
      <div class="relative">
    <img class="w-20 h-20 " src={LogoBG} alt="logo background"/>
    <img class="absolute top-6 left-6 w-8 h-8 z-10 " src={Logo} alt="logo"/>
</div>
      </a>
          <div class="mb-3 p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-sh-black md:text-2xl ">
                  LOG IN
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-left text-md font-medium text-sh-black">Email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 focus:outline-none focus:ring-0 focus:border-sh-blue peer " placeholder="Email" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-left text-md font-medium text-sh-black">Password</label>
                      <input type="password" name="password" id="password" placeholder="Password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 focus:outline-none focus:ring-0  dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                          </div>
                          <div class="ml-3 mb-4 text-sm">
                            <label for="remember" class="text-sh-black ">Remember me</label>
                          </div>
                      </div>
                      
                  </div>
                  <button onClick={goToDashboard} class="mb-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 w-full text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">LOG IN</button>
                
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
    </div>
  );
}

export default Login;
