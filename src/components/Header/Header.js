import './header.css';
import Switch from '@mui/material/Switch';
import React, { useContext } from "react"
import { alpha, styled } from '@mui/material/styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import logo from '../../assets/images/devjobs.png';
import ThemeContext from "../../contexts/ThemeContext";

const CustomSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: '#FFFF',
      '&:hover': {
        backgroundColor: alpha('#FFFF', theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#FFFF',
    },
  }));
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };
function Header() {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <div className="header_container">
        <div className='triangle1'></div>
        <div className='triangle2'></div>
        <div className='triangle3'></div>
        <div className='container  '>
            <div className='row align-items-center '>
                <div className='col-md-6 z-1000  '>
                    <div className='img_container'>
                      <img src={logo} alt='logo' className='img-fluid' />
                    </div>
                    
                </div>
                <div className='col-md-6 d-flex justify-content-end align-items-center z-1000  '>
                        <WbSunnyIcon sx={{color:'white'}} fontSize="small" />
                        <CustomSwitch {...label} onClick={() => setTheme(theme === "dark" ? "light" : "dark")} />
                        <DarkModeIcon  sx={{color:'white'}} fontSize="small" />
                    
                </div>
            </div>
        </div>

    </div>
  );
}

export default Header;
