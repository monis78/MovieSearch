import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../utils/app-constant';
import { getNavigationPropsFromPathName } from '../../utils/common-method';
import './Navbar.css';
import SearchButton from './SearchButton';


const Navbar = ({ pageTitle }) => {
  const location = useLocation();
  const homeScreenProps = getNavigationPropsFromPathName(location.pathname);
  const navigate = useNavigate();

  return (
    <div className="sticky">
      <div className="header">
        {homeScreenProps.backButton && (
          <button
            className="back-button"
            onClick={() => {
              navigate('/');
            }}
          >
            <img height={'16px'} width="16px" src={API_ENDPOINTS.BACK_ICON} alt="Back button" />
          </button>
        )}
        <div>{pageTitle}</div>
        {homeScreenProps.searchButton && <SearchButton />}
      </div>
    </div>
  );
};

export default Navbar;
