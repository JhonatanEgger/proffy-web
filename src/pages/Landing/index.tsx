import React, { useState, useEffect } from 'react';

import './styles.css';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';


import studyIcon from '../../assets/images/icons/study.svg';
import giveClassIcon from '../../assets/images/icons/give-classes.svg';

import purpleHearthIcon from '../../assets/images/icons/purple-heart.svg';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function Landing() {

  const [totalConections, setTotalConections] = useState(0);

  useEffect(() => {
    api.get('connections').then(resp => {
      const { total } = resp.data;
      setTotalConections(total);
    });
  }, [])

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img src={landingImg} alt="Plataforma de estudos" className="hero-image" />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassIcon} alt="Dar Aulas" />
            Dar Aulas
          </Link>
        </div>
        <span className="total-connections">
          Total de {totalConections} conexões já realizadads
          <img src={purpleHearthIcon} alt="Coração roxo" />
        </span>

      </div>
    </div>
  );
}

export default Landing;