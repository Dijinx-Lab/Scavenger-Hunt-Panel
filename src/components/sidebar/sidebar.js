import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
// import SignoutManager from "../../models/admin/auth/https/signouthttp"; 

// import Dashboard from "../../assets/Dashboard Icon Sidebar (2).svg"
// import BlueDashboard from "../../assets/Dashboard Icon Sidebar.svg"
// import Teams from "../../assets/Teams Icon Sidebar.svg"
// import BlueTeams from "../../assets/Teams Blue Icon Sidebar.svg"
// import Challenges from "../../assets/Challenges Icon Sidebar.svg"
// import BlueChallenges from "../../assets/Challenges Blue Icon Sidebar.svg"
// import Location from "../../assets/Locations Icon Sidebar.svg"
// import BlueLocation from "../../assets/Location Blue Icon Sidebar.svg"
// import Upload from '../../assets/Uploads Icon Sidebar.svg';
// import BlueUpload from '../../assets/Upload Blue Icon Sidebar.svg';
// import SidebarLogo from '../../assets/Sidebar Logo.svg';
import PlainNavbar from "../navbar/navbar";
function Sidebar() {
const SidebarLogo = 'https://dk9gc53q2aga2.cloudfront.net/assets/Sidebar+Logo.svg';

  
  const navigate = useNavigate();
  const [open, setOpen] = useState(window.innerWidth >= 768);
  // const signoutManager = new SignoutManager();

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleSidebar = () => {
    setOpen(!open);
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const goToChallenges = () => {
    navigate("/challenges");
  };

  const goToTeams = () => {
    navigate("/teams");
  };

  const goToLocation = () => {
    navigate("/locations");
  };
  const goToUpload = () => {
    navigate("/uploads");
  };
  const [isSignout, setIsSignout] = useState(false);

  const closeSignOut = () => {


    setIsSignout(false);
  };
  const openSignOut = () => {
    setIsSignout(true);
  };
  const handleSignout = async () => {

    // const response = await signoutManager.signout();
    //   if (response.success) {
    //     navigate('/adboard/signin');
    //   } else {
    //     console.error("Invalid token", response);
    //   }

  }
  const isDashboard = window.location.pathname === '/dashboard';
  const imgSrc = "https://dk9gc53q2aga2.cloudfront.net/assets/Dashboard+Icon+Sidebar+(2).svg";
  const dashboardfilterStyle = isDashboard ? 'invert(34%) sepia(66%) saturate(1220%) hue-rotate(197deg) brightness(92%) contrast(83%)' : 'none';
  const textColor = isDashboard ? 'text-sh-blue' : 'text-black';

  const isTeamsPage = window.location.pathname === '/teams';
  const Teams = "https://dk9gc53q2aga2.cloudfront.net/assets/Teams+Icon+Sidebar.svg"
  // const BlueTeams = "https://dk9gc53q2aga2.cloudfront.net/assets/Teams+Blue+Icon+Sidebar.svg"
  const teamsfilterStyle = isTeamsPage ? 'invert(34%) sepia(66%) saturate(1220%) hue-rotate(197deg) brightness(92%) contrast(83%)' : 'none';

  const teamsImgSrc = Teams;
  const teamsTextColor = isTeamsPage ? 'text-sh-blue' : 'text-black';

  const isChallengesPage =
    window.location.pathname === '/challenges' ||
    window.location.pathname === '/challenges/create' ||
    window.location.pathname === '/challenges/manage' ||
    window.location.pathname === '/challenges/add-questions' ||
    window.location.pathname === '/challenges/add-questions/slider' ||
    window.location.pathname === '/challenges/add-questions/word-jumble' ||
    window.location.pathname === '/challenges/add-questions/photo' ||
    window.location.pathname === '/challenges/add-questions/multiple';
    const Challenges = "https://dk9gc53q2aga2.cloudfront.net/assets/Challenges+Icon+Sidebar.svg"
    // const BlueChallenges = "https://dk9gc53q2aga2.cloudfront.net/assets/Challenges+Blue+Icon+Sidebar.svg"
  const challengesImgSrc =  Challenges;
  const challengesfilterStyle = isChallengesPage ? 'invert(34%) sepia(66%) saturate(1220%) hue-rotate(197deg) brightness(92%) contrast(83%)' : 'none';

  const challengesTextColor = isChallengesPage ? 'text-sh-blue' : 'text-black';


  const isLocationsPage =
    window.location.pathname === '/locations' ||
    window.location.pathname === '/locations/add';
    const Location = "https://dk9gc53q2aga2.cloudfront.net/assets/Locations+Icon+Sidebar.svg"
    // const BlueLocation = "https://dk9gc53q2aga2.cloudfront.net/assets/Location+Blue+Icon Sidebar.svg"
  const locationsImgSrc =  Location;
  const locationfilterStyle = isLocationsPage ? 'invert(34%) sepia(66%) saturate(1220%) hue-rotate(197deg) brightness(92%) contrast(83%)' : 'none';

  const locationsTextColor = isLocationsPage ? 'text-sh-blue' : 'text-black';
  
  const isUploadsPage = window.location.pathname === '/uploads';
  const Upload = 'https://dk9gc53q2aga2.cloudfront.net/assets/Uploads+Icon+Sidebar.svg';
  // const BlueUpload = 'https://dk9gc53q2aga2.cloudfront.net/assets/Upload+Blue+Icon+Sidebar.svg';
const uploadsImgSrc = Upload;
const uploadsfilterStyle = isUploadsPage ? 'invert(34%) sepia(66%) saturate(1220%) hue-rotate(197deg) brightness(92%) contrast(83%)' : 'none';

const uploadsTextColor = isUploadsPage ? 'text-sh-blue' : 'text-black';
const [isClicked, setIsClicked] = useState(false);

const handleClick = () => {
  setIsClicked(!isClicked); // Toggle the clicked state
};
  return (
    <>
      {open && window.innerWidth < 768 && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 "
          onClick={handleToggleSidebar}
        ></div>
      )}
      {/* <PlainNavbar/> */}
      <div
        className={`flex md:w-72 md:relative fixed md:overflow-y-auto md:overflow-x-hidden bg-sh-cream h-screen pt-5 transition-transform duration-300 flex-shrink-0 z-50 ${open ? "translate-x-0 w-72 " : "-translate-x-full w-0"
          }`}
        style={{ maxHeight: "100vh" }}
      >

        {open ? (
          <div className="w-full">
            {window.innerWidth < 768 && (
              <span
                className="flex justify-end mr-5 cursor-pointer"
                onClick={handleToggleSidebar}
              >
                <CloseIcon style={{ color: "black", fontSize: 30 }} />
              </span>
            )}
            <div className="ml-8 flex justify-start items-start md:mt-9 mb-8 ">
              <img src={SidebarLogo} alt="Books" className="w-14 h-14 " />

            </div>
            <div className="ml-8 flex justify-start items-start ">

              <p className="text-black  font-HelveticaNowDisplay-ExtraBold text-xl md:text-2xl">
                General
              </p>
            </div>
            <div className="mx-4 mb-8 opacity-20"></div>

            <div
              className="hover:text-gray-300 hover:scale-105 transition-all duration-300 ease-in-out flex hover:opacity-80 px-8 pt-5 border-b-10 hover:cursor-pointer"
              onClick={goToDashboard}
            >

              {/* {window.location.pathname === '/dashboard' ? (
  <>
    <img src={BlueDashboard} alt="Books" className="w-8 h-8 " />
    <span className="text-sh-blue font-bold text-xl mt-0.5 ml-4">Dashboard</span>
  </>
) : (
  <>
    <img src={Dashboard} alt="Books" className="w-8 h-8 " />
    <span className="text-black font-bold text-xl mt-0.5 ml-4">Dashboard</span>
  </>
)} */}
           <img
  src={imgSrc}
  alt="Books"
  className="w-8 h-8"
  style={{ filter: dashboardfilterStyle }}
/>
              <span className={`${textColor} font-bold text-xl mt-0.5 ml-4`}>Dashboard</span>
            </div>
            <div className=" mx-4 my-8 opacity-20"></div>
            <div
              className="hover:text-gray-300 hover:scale-105 transition-all duration-300 ease-in-out flex  hover:opacity-80 px-8 border-b-10 hover:cursor-pointer"
              onClick={goToTeams}
            >
              {/* {window.location.pathname === '/teams' ? (
  <>
    <img src={BlueTeams} alt="Books" className="w-8 h-8 " />
    <span className="text-sh-blue font-bold text-xl mt-0.5 ml-4">Teams</span>
  </>
) : (
  <>
    <img src={Teams} alt="Books" className="w-8 h-8 " />
    <span className="text-black font-bold text-xl mt-0.5 ml-4">Teams</span>
  </>
)} */}
              <img src={teamsImgSrc} alt="Books" className="w-8 h-8"  style={{ filter: teamsfilterStyle }} />
              <span className={`${teamsTextColor} font-bold text-xl mt-0.5 ml-4`}>Teams</span>

            </div>

            <div className=" mx-4 my-8 opacity-20"></div>
            <div
              className="hover:text-gray-300 hover:scale-105 transition-all duration-300 ease-in-out flex  hover:opacity-80 px-8 border-b-10 hover:cursor-pointer"
              onClick={goToChallenges}
            >
              {/* {
window.location.pathname === '/challenges' || 
window.location.pathname === '/challenges/create' || 
  window.location.pathname === '/challenges/manage' ||
  window.location.pathname === '/challenges/add-questions'|| 
  window.location.pathname === '/challenges/add-questions/slider'|| 
  window.location.pathname === '/challenges/add-questions/word-jumble'|| 
  window.location.pathname === '/challenges/add-questions/photo'|| 
    window.location.pathname === '/challenges/add-questions/multiple' ?(
  <>
    <img src={BlueChallenges} alt="Books" className="w-8 h-8 " />
    <span className="text-sh-blue font-bold text-xl mt-0.5 ml-4">Challenges</span>
  </>
) : (
  <>
    <img src={Challenges} alt="Books" className="w-8 h-8 " />
    <span className="text-black font-bold text-xl mt-0.5 ml-4">Challenges</span>
  </>
)} */}
              <img src={challengesImgSrc} alt="Books" className="w-8 h-8" style={{ filter: challengesfilterStyle }} />
              <span className={`${challengesTextColor} font-bold text-xl mt-0.5 ml-4`}>Challenges</span>

            </div>
            <div className="mx-4 my-8 opacity-20"></div>
            <div
              className="hover:text-gray-300 hover:scale-105 transition-all duration-300 ease-in-out flex  hover:opacity-80 px-8 border-b-10 hover:cursor-pointer"
              onClick={goToLocation}
            >
              {/* <AutoStoriesOutlinedIcon style={{ width: 38, height: 38,marginLeft:7}} /> */}

              {/* {window.location.pathname === '/locations' ||
            window.location.pathname === '/locations/add' 
            ? (
  <>
    <img src={BlueLocation} alt="Books" className="w-8 h-8 " />
    <span className="text-sh-blue font-bold text-xl mt-0.5 ml-4">Locations</span>
  </>
) : (
  <>
    <img src={Location} alt="Books" className="w-8 h-8 " />
    <span className="text-black font-bold text-xl mt-0.5 ml-4">Locations</span>
  </>
)} */}
              <img src={locationsImgSrc} alt="Books" className="w-8 h-8" style={{ filter: locationfilterStyle }}/>
              <span className={`${locationsTextColor} font-bold text-xl mt-0.5 ml-4`}>Locations</span>

            </div>
            <div className=" mx-4 my-8 opacity-20"></div>
            <div className="hover:text-gray-300  hover:scale-105 transition-all duration-300 ease-in-out flex px-8 border-b-10 hover:cursor-pointer" onClick={goToUpload}>
              {/* <LogoutIcon className="text-white" style={{ width: 30, height: 32,marginLeft:7,marginBottom:8}} /> */}
              {/* {window.location.pathname === '/uploads' ? (
                <>
                  <img src={BlueUpload} alt="Books" className="w-8 h-8 " />
                  <span className="text-sh-blue font-bold text-xl mt-0.5 ml-4">Uploads</span>
                </>
              ) : (
                <>
                  <img src={Upload} alt="Books" className="w-8 h-8 " />
                  <span className="text-black font-bold text-xl mt-0.5 ml-4 mb-16">Uploads</span>
                </>
              )} */}
               <img src={uploadsImgSrc} alt="Books" className="w-8 h-8" style={{ filter: uploadsfilterStyle }}/>
    <span className={`${uploadsTextColor} font-bold text-xl mt-0.5 ml-4 ${isUploadsPage ? '' : 'mb-16'}`}>Uploads</span>

            </div>
          </div>
        ) : (
          <div className="px-4 py-4">
            <button className="text-black" onClick={handleToggleSidebar}>
              <MenuIcon className="absolute top-[-42px]" style={{ color: "#925454" }} />
            </button>
          </div>
        )}

      </div>

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
              <div className="flex justify-end mt-6">
                <button
                  onClick={closeSignOut}
                  className="text-filter-heading transition-opacity hover:opacity-70 mr-4 border-2 border-gray-400 rounded-[9px] border-filter-heading py-1 px-6"
                >
                  Cancel
                </button>
                <button className="bg-sa-maroon transition-opacity hover:opacity-70 text-white md:px-7 px-4 rounded-[9px] py-3 md:py-2 "
                onClick={handleSignout}>
                
                Sign Out
                </button>
              </div>
            </div>
          </div>
        )} */}
    </>
  );



  // return (
  //   <>
  //       {open && window.innerWidth < 768 && (
  //       <div
  //         className="fixed top-0 left-0 w-full h-full bg-black opacity-50 "
  //         onClick={handleToggleSidebar}
  //       ></div>
  //     )}
  //       {/* <PlainNavbar/> */}
  //       <div
  //   className={`relative md:w-72 md:overflow-y-auto md:overflow-x-hidden bg-sh-cream pt-5 transition-transform duration-300 flex-shrink-0 z-50 ${
  //     open ? "translate-x-0 w-72 min-h-screen max-h-screen" : "-translate-x-full w-0 min-h-0 max-h-0"
  //   }`}
  // >

  //       {open ? (
  //         <div className="w-full">
  //           {window.innerWidth < 768 && (
  //             <span
  //               className="flex justify-end mr-5 cursor-pointer"
  //               onClick={handleToggleSidebar}
  //             >
  //               <CloseIcon  style={{ color: "black", fontSize: 30 }} />
  //             </span>
  //           )}
  //           <div className="ml-8 flex justify-start items-start md:mt-[30px] mb-8 ">
  //           <img src={SidebarLogo} alt="Books" className="w-16 h-16 " />

  //             </div>
  //           <div className="ml-8 flex justify-start items-start ">

  //             <p className="text-black font-[800] text-xl md:text-3xl">
  //               General
  //             </p>
  //           </div>
  //           <div className="mx-4 mb-10 opacity-20"></div>

  //           <div
  //             className="hover:text-gray-300 hover:scale-105 transition-all duration-300 ease-in-out flex hover:opacity-80 px-8 pt-5 border-b-10 hover:cursor-pointer"
  //             onClick={goToDashboard}
  //           >
  //             {window.location.pathname === '/dashboard' ? (
  // <>
  //   <img src={BlueDashboard} alt="Books" className="w-8 h-8 " />
  //   <span className="text-sh-blue font-bold text-xl mt-0.5 ml-4">Dashboard</span>
  // </>
  // ) : (
  // <>
  //   <img src={Dashboard} alt="Books" className="w-8 h-8 " />
  //   <span className="text-black font-bold text-xl mt-0.5 ml-4">Dashboard</span>
  // </>
  // )}
  //           </div>
  //           <div className=" mx-4 my-8 opacity-20"></div>
  //           <div
  //             className="hover:text-gray-300 hover:scale-105 transition-all duration-300 ease-in-out flex  hover:opacity-80 px-8 border-b-10 hover:cursor-pointer"
  //             onClick={goToTeams}
  //           >
  //                {window.location.pathname === '/teams' ? (
  // <>
  //   <img src={BlueTeams} alt="Books" className="w-8 h-8 " />
  //   <span className="text-sh-blue font-bold text-xl mt-0.5 ml-4">Teams</span>
  // </>
  // ) : (
  // <>
  //   <img src={Teams} alt="Books" className="w-8 h-8 " />
  //   <span className="text-black font-bold text-xl mt-0.5 ml-4">Teams</span>
  // </>
  // )}

  //           </div>
  //           <div className=" mx-4 my-8 opacity-20"></div>
  //           <div
  //             className="hover:text-gray-300 hover:scale-105 transition-all duration-300 ease-in-out flex  hover:opacity-80 px-8 border-b-10 hover:cursor-pointer"
  //             onClick={goToChallenges}
  //           >
  // {window.location.pathname === '/challenges' ? (
  // <>
  //   <img src={BlueChallenges} alt="Books" className="w-8 h-8 " />
  //   <span className="text-sh-blue font-bold text-xl mt-0.5 ml-4">Challenges</span>
  // </>
  // ) : (
  // <>
  //   <img src={Challenges} alt="Books" className="w-8 h-8 " />
  //   <span className="text-black font-bold text-xl mt-0.5 ml-4">Challenges</span>
  // </>
  // )}

  //           </div>
  //           <div className="mx-4 my-8 opacity-20"></div>
  //           <div
  //             className="hover:text-gray-300 hover:scale-105 transition-all duration-300 ease-in-out flex  hover:opacity-80 px-8 border-b-10 hover:cursor-pointer"
  //             onClick={goToLocation}
  //           >
  //           {/* <AutoStoriesOutlinedIcon style={{ width: 38, height: 38,marginLeft:7}} /> */}
  //           {window.location.pathname === '/locations' ? (
  // <>
  //   <img src={BlueLocation} alt="Books" className="w-8 h-8 " />
  //   <span className="text-sh-blue font-bold text-xl mt-0.5 ml-4">Locations</span>
  // </>
  // ) : (
  // <>
  //   <img src={Location} alt="Books" className="w-8 h-8 " />
  //   <span className="text-black font-bold text-xl mt-0.5 ml-4">Locations</span>
  // </>
  // )}

  //           </div>
  //           <div className=" mx-4 my-8 opacity-20"></div>
  //           <div className="hover:text-gray-300  hover:scale-105 transition-all duration-300 ease-in-out flex px-8 border-b-10 hover:cursor-pointer" onClick={goToUpload}>
  //           {/* <LogoutIcon className="text-white" style={{ width: 30, height: 32,marginLeft:7,marginBottom:8}} /> */}
  //           {window.location.pathname === '/uploads' ? (
  // <>
  //   <img src={BlueUpload} alt="Books" className="w-8 h-8 " />
  //   <span className="text-sh-blue font-bold text-xl mt-0.5 ml-4">Uploads</span>
  // </>
  // ) : (
  // <>
  //   <img src={Upload} alt="Books" className="w-8 h-8 " />
  //   <span className="text-black font-bold text-xl mt-0.5 ml-4 mb-16">Uploads</span>
  // </>
  // )}

  //           </div>
  //         </div>
  //       ) : (
  //         <div className="px-4 py-4">
  //           <button className="text-black" onClick={handleToggleSidebar}>
  //             <MenuIcon className="absolute top-[-42px]" style={{ color: "#925454" }} />
  //           </button>
  //         </div>
  //       )}

  //     </div>


  //   </>
  // );
}

export default Sidebar;
