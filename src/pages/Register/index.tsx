import React, { useState, FormEvent, useEffect } from 'react'
import Toast from '../../components/Toast'
import logoImg from '../../assets/images/logo.svg'
import backgroundImg from '../../assets/images/auth-background.svg'
import backIcon from '../../assets/images/icons/back.svg'
import api from '../../services/api'
import './styles.css'
import { Link } from 'react-router-dom'

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isValid, setIsValid] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!name || !email || !password) {
            setIsValid(false)
        }
        else if (email && password) {
            setIsValid(true)
        }
    }, [name, email, password])

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        api.post('/users', { name, email, password })
            .then(response => {
                localStorage.setItem("accessToken", response.data.token)
                window.location.replace("/home")
            })
            .catch(err => {
                console.log(err)
                setError(true)
                setTimeout(() => setError(false), 5000)
            })
    }

    return (
        <div id="page-register">
            <Toast text="Erro ao cadastrar-se na plataforma, confira seus dados e tente novamente." visible={error}/>
            <div id="page-register-content">
                <div className="register-container">
                    <Link to="/" className="back-icon">
                        <img src={backIcon} alt="Voltar" />
                    </Link>
                    <h1>Cadastro</h1>
                    <h2>Preencha os dados abaixo <br/> para começar.</h2>
                    <form>
                        <div className="input-block">
                            <label htmlFor="name">Nome completo</label>
                            <input 
                                type="text" 
                                id="name"
                                className="first-input"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="text" 
                                id="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="password">Senha</label>
                            <input 
                                type="password" 
                                id="password"
                                className="last-input"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                        </div>
                        <button 
                            type="submit"
                            disabled={!isValid}
                            onClick={handleSubmit}>
                            Concluir cadastro
                        </button>
                    </form>
                </div>
                <div className="logo-container">
                    <main style={{ backgroundImage: `url(${backgroundImg})` }}>
                        <div>
                            <img src={logoImg} alt="Logo do Proffy" />
                            <h2>Sua plataforma de estudos online</h2>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Register