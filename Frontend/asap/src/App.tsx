import React from 'react';
import TopButton from 'components/common/TopButton'; // 경로는 알맞게 조정해주세요.
import './App.scss';
import { Routes, Route, useLocation, BrowserRouter } from 'react-router-dom';
import routes from 'router/data/routes';
import ScrollToTop from 'router/route/ScrollToTop';

import NavBar from 'components/nav/NavBar';
import Footer from 'components/common/Footer';

function AppBody() {
  const location = useLocation();
  const showFooter = !location.pathname.includes('admin');

  return (
    <div>
      <ScrollToTop />
      <NavBar />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
      {showFooter && <Footer />}
      <TopButton />
    </div>
  );
}

function App() {
  return (
    <div className="font-container">
      <BrowserRouter>
        <AppBody />
      </BrowserRouter>
    </div>
  );
}

export default App;

// import React, { useEffect, useState } from 'react';
// import './App.scss';
// import { Routes, Route, useLocation, BrowserRouter } from 'react-router-dom';
// import routes from 'router/data/routes';
// import ScrollToTop from 'router/route/ScrollToTop';

// import NavBar from 'components/nav/NavBar';
// import Footer from 'components/common/Footer';

// // import { ReactComponent as TopBtn } from 'assets/icons/TopBtn.svg';
// import { IconButton } from '@material-tailwind/react';

// function AppBody() {
//   /* Footer 나타내기 위해 현재 나의 위치 불러오는 부분 */
//   const location = useLocation();
//   const showFooter = !location.pathname.includes('admin');

//   /* 맨 위로 올리는 버튼 handler */
//   const onScrollUpHandler = () => {
//     if (!window.scrollY) return;

//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   /* 스크롤의 위치 파악 */
//   const [isScrolled, setIsScrolled] = useState(false);
//   const scrollPositionHandler = () => {
//     if (window.scrollY > 0) {
//       setIsScrolled(true);
//     } else {
//       setIsScrolled(false);
//     }
//   };
//   useEffect(() => {
//     window.addEventListener('scroll', scrollPositionHandler);
//     return () => {
//       window.removeEventListener('scroll', scrollPositionHandler);
//     };
//   }, []);
//   return (
//     <div>
//       <ScrollToTop />
//       <NavBar />
//       <Routes>
//         {routes.map((route) => (
//           <Route key={route.path} path={route.path} element={route.element} />
//         ))}
//       </Routes>
//       {showFooter && <Footer />}

//       {/* 오른쪽 하단 페이지 위로 올리는 버튼 */}
//       <div className="fixed bottom-4 right-4">
//         {isScrolled && (
//           <IconButton
//             style={{
//               backgroundColor: '#ffffff',
//               boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
//             }}
//             size="lg"
//             className="rounded-full topBtn customIconButton flex justify-center"
//             type="button"
//             onClick={onScrollUpHandler}
//           >
//             <div
//               className="h-full w-full transition-transform group-hover:rotate-45"
//               style={{ color: 'black', fontWeight: 'bold' }}
//             >
//               TOP
//             </div>
//             {/* <TopBtn className="h-5 w-5 transition-transform group-hover:rotate-45" /> */}
//           </IconButton>
//         )}
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <div className="font-container">
//       <BrowserRouter>
//         <AppBody />
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
