import React, { useEffect, useState } from 'react';
import './style.css';
import { FiSearch } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';
import logo from '../../assets/movix-logo.svg';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import { Link, useNavigate } from 'react-router-dom';
function Header() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [mobileview, setMobileView] = useState(false);
  const [showCross, setShowCross] = useState(false);
  const handleMobileView = () => {
    setShowCross(!showCross);
    showCross ? setMobileView(true) : setMobileView(false);
  };
  const handleNavigation = (type) => {
    if ((type = 'movie')) {
      navigate(`/explore/${type}`);
    } else if ((type = 'tv')) {
      navigate(`/explore/${type}`);
    }
  };

  const [query, setQuery] = useState('');
  const handleSearchQuery = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`search/${query}`);
    }
  };

  return (
    <>
      <header className={`header ${showCross ? `mobileview` : ``}`}>
        <Link to={'/'} className='logo'>
          <img src={logo} alt='logo' className='logo_image' />
        </Link>
        <ul className='menuItems '>
          <li onClick={() => handleNavigation('movie')}>Movies</li>
          <li onClick={() => handleNavigation('tv')}>TV Shows</li>
          <li>
            <FiSearch size='30px' onClick={() => setShowSearch(!showSearch)} />
          </li>
        </ul>

        <div className='mobileMenuItems'>
          <div>
            <FiSearch size='30px' onClick={() => setShowSearch(!showSearch)} />
          </div>
          <div>
            {showCross ? (
              <RxCross2 size='28px' onClick={handleMobileView} />
            ) : (
              <GiHamburgerMenu size='30px' onClick={handleMobileView} />
            )}
          </div>
        </div>
      </header>
      {showSearch ? (
        <div className='searchBar'>
          <input
            type='text'
            placeholder='Search for a movie of TV show here...'
            onKeyUp={handleSearchQuery}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className='cross' onClick={() => setShowSearch(false)}>
            <RxCross2 size='28px' />
          </div>
        </div>
      ) : (
        <></>
      )}

      {showCross ? (
        <div className='mobileDropMenu'>
          <div onClick={() => handleNavigation('movie')}>Movies</div>
          <div onClick={() => handleNavigation('tv')}>TV shows</div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Header;
