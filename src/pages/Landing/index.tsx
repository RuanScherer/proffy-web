import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import logoutIcon from '../../assets/images/icons/logout.svg'
import api from '../../services/api'
import { getTokenData, logout } from '../../utilities/auth'
import './styles.css'

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0)
    const { name, avatar } = getTokenData()

    useEffect(() => {
        api.get('/connections')
            .then(response => setTotalConnections(response.data.total))
            .catch(err => console.log(err))
    })

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <header>
                    <div className="user">
                        <img src={avatar ? avatar : "https://api.adorable.io/avatars/220/abott@adorable.png"} />
                        <Link to="/profile">{name}</Link>
                    </div>
                    <button onClick={() => logout()}>
                        <img src={logoutIcon} alt="Encerrar sessão"/>
                    </button>
                </header>

                <section id="banner" className="landing-grid">
                    <div className="logo-container">
                        <img src={logoImg} alt="Logo do Proffy"/>
                        <h2>Sua plataforma de <br/> estudos online</h2>
                    </div>

                    <img 
                        src={landingImg} 
                        alt="Plataforma de estudos" 
                        className="hero-image"
                    />
                </section>

                <section id="info" className="landing-grid">
                    <div className="buttons-container">
                        <Link to="study" className="study">
                            <img src={studyIcon} alt="Estudar"/>
                            Estudar
                        </Link>
                        <Link to="give-classes" className="give-classes">
                            <img src={giveClassesIcon} alt="Dar aulas"/>
                            Dar aulas
                        </Link>
                    </div>
                    
                    <div className="welcome">
                        <span>
                            Seja bem-vindo. <br/>
                            <strong>O que deseja fazer?</strong>
                        </span>
                        <span className="total-connections">
                            Total de {totalConnections} conexões <br/> já realizadas <img src={purpleHeartIcon} alt="Coração roxo"/>
                        </span>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Landing