import React from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from 'router/data/routes';
import ScrollToTop from 'router/route/ScrollToTop';

import NavBar from 'components/nav/NavBar';

function App() {
  return (
    <div className="font-container">
      <BrowserRouter>
        <ScrollToTop />
        <NavBar />
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
