import React from 'react';
import { Layout, Button } from 'antd';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedinIn,
  faTwitter,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

const FooterComp = () => {
  const { Footer } = Layout;

  return (
    <Footer className='footer'>
      <Button
        type='link'
        href='https://tarkanmansuroglu.netlify.app/'
        target='_blank'
        rel='noopener noreferrer'
        className='footerName'
      >
        Created by Tarkan Mansuroğlu
      </Button>
      <a
        href='https://github.com/tmansuroglu'
        target='_blank'
        rel='noopener noreferrer'
        className='iconAnchor'
      >
        <FontAwesomeIcon
          icon={faGithub}
          className='footerIcon'
          style={{ color: '#333' }}
        />
      </a>
      <a
        href='https://www.linkedin.com/in/tarkanmansuroglu/'
        target='_blank'
        rel='noopener noreferrer'
        className='iconAnchor'
      >
        <FontAwesomeIcon
          icon={faLinkedinIn}
          className='footerIcon'
          style={{ color: '#0e76a8' }}
        />
      </a>
      <a
        href='https://twitter.com/T_Mansuroglu'
        target='_blank'
        rel='noopener noreferrer'
        className='iconAnchor'
      >
        <FontAwesomeIcon
          icon={faTwitter}
          className='footerIcon'
          style={{ color: '#1da1f2' }}
        />
      </a>
      <a
        href='https://www.instagram.com/tarkanmansuroglu/'
        target='_blank'
        rel='noopener noreferrer'
        className='iconAnchor'
      >
        <FontAwesomeIcon
          icon={faInstagram}
          className='footerIcon'
          style={{ color: '#e1306c' }}
        />
      </a>
    </Footer>
  );
};

export default FooterComp;
