import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import NavbarUserImage from "../../assets/navbar_user_image.svg"
import NavbarDropdownIcon from "../../assets/navbar_dropdown_icon.svg"
import SignoutManager from "../../models/admin/auth/https/signouthttp";
import Spinner from "../spinner/spinner";
function PlainNavbar() {
  const [toastMessages, setToastMessages] = useState([]);
  const [deleteShowLoading, setDeleteShowLoading] = useState(false);

  const name = sessionStorage.getItem("adminName") || localStorage.getItem("adminName");
  const image = sessionStorage.getItem("adminImage") || localStorage.getItem("adminImage");

  const navigate = useNavigate();
  const signoutManager = new SignoutManager();
  const [isDelete, setIsDelete] = useState(false);

  const closeIsDelete = () => {
    setIsDelete(false);
  };
  const openIsDelete = () => {
    setIsDelete(true);
  };
const handleSignOut = async () =>{
  const response = await signoutManager.signout();
  if(response.success){
    const updatedToastMessages = [
      {
          type: "success",
          title: "Success",
          body: response.message,
      },
  ];
    setToastMessages(updatedToastMessages);
    navigate("/", { state: { toastMessages: updatedToastMessages } });

  }

}
  return <div className="bg-sh-cream w-full h-16 flex items-center px-10 relative">


    <div className="flex items-end">
      {/* <div
          onClick={() => setOpen(!open)}
          className="text-clue-gray text-3xl absolute right-8 top-3 cursor-pointer md:hidden mt-3.5"
        >
          {open ? (
            <CloseIcon style={{ color: "white", fontSize: 30 }} />
          ) : (
            <MenuIcon style={{ color: "white", fontSize: 30 }} />
          )}
        </div> */}

      <div className="absolute top-0 left-50 right-40 bg-sa-maroon z-10 pt-2 pb-4 px-4">


        {/* {courseMenuOpen && (
              <div className="bg-sa-maroon py-2 px-4 mt-2">

                <span
                  onClick={handleCourseRegisterClick}
                  className="block text-white font-bold text-xl py-2 mb-2 cursor-pointer "
                >
                  Register Courses
                </span>
                <span
                  onClick={handleAssignCourseClick}
                  className="block text-white font-bold text-xl py-2 mb-2 cursor-pointer "
                >
                  Assign Courses
                </span>
              </div>
            )} */}
        <div onClick={openIsDelete} className="border cursor-pointer grid-cols-3 h-12 rounded-md w-[250%] border-black py-2  bg-sh-nav-gray md:block hidden">

          <div
            // onMouseEnter={toggleAccountMenu}
            className=" w-full transition-opacity hover:opacity-60 text-xl text-sh-blue font-bold mx-5 hover:cursor-pointer"
          >
            <img src={image} className="h-8 w-8 rounded-full"></img>
            {/* <img src={NavbarUserImage} ></img> */}

          </div>
          {/* <div className="w-full mt-[-12%]">John Black</div> */}
          <div className="w-full mt-[-11%]">{name}</div>
          <div className="w-full mt-[-5%] mb-3 ml-[85%] "><img src={NavbarDropdownIcon}></img></div>

        </div>
      </div>
      {isDelete && (
            <div
              className=" fixed inset-0 flex items-center justify-center z-50"
              onClick={closeIsDelete}
            >
              <div className=" bg-black opacity-50 absolute inset-0"></div>
              <div
                className=" bg-white rounded-3xl md:w-auto w-80  p-8 px-12 relative z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-black font-semibold text-lg md:w-auto w-60 text-left mb-4">
                  Confirm
                </h2>
                <p className="text-black text-filter-heading md:w-auto w-60 text-left">
                  Are you sure you want to Sign out?
                </p>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={closeIsDelete}
                    className="text-filter-heading hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-1 px-6"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-sh-red hover:scale-105 transition-all duration-300 ease-in-out hover:opacity-70 text-white md:px-7 px-5 rounded-[9px] py-1 "
                    onClick={handleSignOut}
                  >
                    {deleteShowLoading ? <Spinner /> : <span>Sign Out</span>}
                  </button>
                </div>
              </div>
            </div>
          )}
      {/* <div className="md:block hidden">
          <span
            onClick={handleHomeClick}
            onMouseEnter={toggleHomeMenu}
            className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer"
          >
            Home
          </span>
          {isStudentAdvisor && ( 
          <span
          onMouseEnter={toggleCourseMenu}
          className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer"
            // onClick={handleCourseClick}
            // className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer"
          >
            Course
          </span>
           )} 
           
          
          <span
            onMouseEnter={toggleAccountMenu}
            className="transition-opacity hover:opacity-60 text-xl text-white font-bold mx-5 hover:cursor-pointer"
          >
            Account
          </span>
          {courseMenuOpen && (
            <div className="bg-white absolute border z-50 border-sa-grey top-full right-44 mt-1 py-2 px-4 rounded-xl shadow-xl w-64"
              onMouseLeave={handleMouseLeave}>
              <span
                onClick={handleCourseRegisterClick}
                className="block border-b-2 border-sa-maroon text-sa-maroon font-bold text-lg py-2 mb-2 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hover:bg-gray-200"
              >
                Register Courses
              </span>
              <span
                onClick={handleAssignCourseClick}
                className="block hover:scale-105 transition-all duration-300 ease-in-out text-sa-maroon font-bold text-lg py-2  cursor-pointer hover:bg-gray-200"
              >
                Assign Courses
              </span>
            </div>
          )}
         
          

        </div> */}
      {/* {isSignout && (
          <div
            className=" fixed inset-0 flex items-center justify-center z-50"
            onClick={closeSignOut}
          >
            <div className=" bg-black opacity-50 absolute inset-0"></div>
            <div
              className=" bg-white rounded-3xl md:w-auto w-80  p-8 px-12 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-black font-semibold md:w-auto w-60 text-left mb-4">
                Confirm
              </h2>
              <p className="text-black text-filter-heading md:w-auto w-60 text-left">
                Are you sure you want to sign out of your account?
              </p>
              <div className="flex justify-end mt-5">
                <button
                  onClick={closeSignOut}
                  className="text-filter-heading transition-opacity hover:opacity-70 mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-1 px-6"
                >
                  Cancel
                </button>
                <button
                  className="bg-sa-maroon transition-opacity hover:opacity-70 text-white md:px-7 px-4  rounded-[9px] md:py-2 py-3 "
                  onClick={handleSignout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )} */}
    </div>


  </div>;
}

export default PlainNavbar;
