import './App.css';
import Menu from './components/Menu/Menu';
import MibileMenu from './components/mobile-menu/Menu.jsx'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Conus from './containers/Conus-front/Conus-front';
import ConusB from './containers/Conus-back/Conus-back';
import React, { useEffect, useState } from 'react';


function App() {
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    if (window.innerWidth <= 900) {
      setMobile(true)
    } else (
      setMobile(false)
    )
  }, [window.innerWidth])

  function MenuIf({ mobile }) {
    if (mobile) {
      return (
        <MibileMenu
          menuData={[
            {
              zIndex: "1",
              name: "React",
              path: "/react"
            },
            {
              zIndex: "2",
              name: "Server",
              path: "/server"
            },
          ]}
        />
      )
    }
    else {
      return (
        <Menu
          menuData={[
            {
              zIndex: "1",
              name: "React",
              path: "/react"
            },
            {
              zIndex: "2",
              name: "Server",
              path: "/server"
            },
          ]}
        />
      )
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Conus />} />
          <Route path="/" element={<Conus />} />
          <Route path="/react" element={<Conus />} />
          <Route path="/server" element={<ConusB />} />
        </Routes>

        <div className="menu" /*onClick={()=>setLocation(window.location.pathname)}*/>
          <MenuIf mobile={mobile} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
