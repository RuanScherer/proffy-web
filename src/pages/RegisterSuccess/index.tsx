import React from 'react'
import { Link } from 'react-router-dom'
import successIcon from '../../assets/images/icons/success-check-icon.svg'
import successBg from '../../assets/images/success-background.svg'
import './styles.css'

function RegisterSuccess() {
    return (
        <div id="page-register-success" style={{ backgroundImage: `url(${successBg})` }}>
            <div id="page-register-success-content" className="container" >
                <img src={successIcon} alt="Sucesso"/>
                <h1>Cadastro concluído</h1>
                <p>Agora você faz parte da plataforma da Proffy.</p>
                <p>Tenha uma ótima experiência.</p>
                <Link to="/home">
                    <button>Continuar para a plataforma</button>
                </Link>
            </div>
        </div>
    )
}

export default RegisterSuccess