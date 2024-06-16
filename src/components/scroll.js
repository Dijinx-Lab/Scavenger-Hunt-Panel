import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This component doesn't render anything, it just handles scrolling
}

export default ScrollToTop;


// import { useEffect,useLayoutEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// const ScrollToTop = ({ children }) => {
//   const location = useLocation();
//   useLayoutEffect(() => {
//     document.documentElement.scrollTo(0, 0);
//   }, [location.pathname]);
//   return children;
// };

// export default ScrollToTop;

