import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.sass';

const MibileMenu = (props) => {

  let navigate = useNavigate();
  return(
    <nav className="navbar">
      <ul className="nav">
        <li className="submenu"><p>Menu</p>
          <ul className='dropdown'>
            {props.menuData.map(menu => {
              return (
                <li key={menu.name}//style={{zIndex: menu.zIndex}}
                  onClick={() => { navigate(menu.path) }}>
                  <p className='li_text'>{menu.name}</p>
                </li>
              )
            })}
          </ul>
        </li>
      </ul>
    </nav>	
  )
}
export default MibileMenu;