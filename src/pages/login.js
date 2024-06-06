import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Logo from "../assets/Group 4.svg";
import LogoBG from "../assets/Ellipse 57.svg";
import HttpManager from "../models/admin/auth/https/signinhttp";
import Toast from "../components/toast/toast";
import { RotatingLines } from 'react-loader-spinner'
import Spinner from "../components/spinner/spinner";
function Login() {
  const location = useLocation();  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [toastMessages, setToastMessages] = useState(location.state?.toastMessages || []); // Set initial toastMessages from location state

  useEffect(() => {
    // Check if there are toast messages in the location state
    if (location.state?.toastMessages) {
      // Display the toast message
      const toastMessage = location.state.toastMessages[0]; // Assuming there's only one toast message
      setToastMessages([toastMessage]);

      // Clear the location state after showing the toast message
      setTimeout(() => {
        window.history.replaceState({}, document.title, window.location.pathname);
      }, 0);
    }
  }, [location.state]);
  const navigate = useNavigate();
  const goToDashboard = (idx) => {
    navigate("/dashboard");
  };
  const handleEmailChange = (e) => {
    setUsername(e.target.value);
  };
  const [rememberMe, setRememberMe] = useState(false);

  const handleCheckboxChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  // const isValidEmail = (email) => {
  //   // Regular expression for validating email format
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };
  const httpManager = new HttpManager();
  const handleLogIn = async (e) => {
    // navigate("/dashboard");
    e.preventDefault();
    try {
     setShowLoading(true);

      if (!username.trim()) {
        // If subject is empty or contains only whitespace
        setToastMessages([
          ...toastMessages,
          {
            type: "invalid",
            title: "Invalid Email",
            body: "Username cannot be empty",
          },
        ]);

        return; // Prevent form submission
      }
      // if (!isValidEmail(email)) {
      //   setToastMessages([
      //     ...toastMessages,
      //     {
      //       type: "invalid",
      //       title: "Invalid Email",
      //       body: "Enter valid email address",
      //     },
      //   ]);
      //   return;
      // }
      if (!password.trim()) {
        // If subject is empty or contains only whitespace
        setToastMessages([
          ...toastMessages,
          {
            type: "invalid",
            title: "Invalid Password",
            body: "Password cannot be empty",
          },
        ]);
        return; // Prevent form submission
      }
      const response = await httpManager.login(username, password);
      if(response.success){
      handleSignInResponse(response);}
      else{
        handleSignInError(response.message);
      }
    } catch (error) {
      
      handleSignInError("Enter valid email and password");
    }
    finally {
      setShowLoading(false); // Stop loading
    }

  };
  const handleSignInResponse = (response) => {
     setShowLoading(false);

    if (!response.error) {
      const baseResponse = response.success;

      if (baseResponse === true) {
        const adminToken = response.data.token;
        const image = response.data.admin.image;
        const name = response.data.admin.username;
        //const isEmailSubscribed = response.data.is_email_subscribed;

        if (adminToken != null) {
          if (rememberMe) {
            localStorage.setItem('adminToken', `${adminToken}`);
            localStorage.setItem('adminImage', image);
            localStorage.setItem('adminName', name);
          } else {
            sessionStorage.setItem('adminToken', `${adminToken}`);
            sessionStorage.setItem('adminImage', image);
            sessionStorage.setItem('adminName', name);
          }
          navigate("/dashboard");
          } 
        } else {
          handleSignInError(response.message);
        }
      } else {
        handleSignInError(response.message);
      }
    };
  const handleSignInError = (errorMessage) => {
    setShowLoading(false);
    setToastMessages([
      ...toastMessages,
      {
        type: "invalid",
        title: "Error",
        body: errorMessage,
      },
    ]);
  };

  return (
    <div className="flex flex-col min-h-[100vh]">
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
                      <input 
                      type="text" 
                      name="email" 
                      id="email" 
                      className="bg-transparent border text-black border-gray-500  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 focus:outline-none focus:ring-0 focus:border-sh-blue peer " 
                      placeholder="Email" 
                      value={username}
                      onChange={handleEmailChange}
                      style={{ color: 'black' }} 
                      />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-left text-md font-medium text-sh-black">Password</label>
                      <input 
                      type="password"
                       name="password" 
                       id="password" 
                       placeholder="Password" 
                       value={password}
                       onChange={handlePasswordChange}
                       class="bg-transparent border border-gray-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 focus:outline-none focus:ring-0  dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                       />
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input 
                            id="remember" 
                            aria-describedby="remember" 
                            type="checkbox" 
                            onChange={handleCheckboxChange}
                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            />
                          </div>
                          <div class="ml-3   mb-4 text-sm">
                            <label for="remember" class="text-sh-black ">Remember me</label>
                          </div>
                      </div>
                      
                  </div>
                  <button  onClick={handleLogIn} class="mb-5 hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-90 w-full text-white bg-sh-blue focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-base px-5 py-3.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  {showLoading ? <Spinner /> : "LOG IN"}
                   
                    </button>
                
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
