import React, { useState, FormEvent, useEffect } from 'react'
import Toast from '../../components/Toast'
import logoImg from '../../assets/images/logo.svg'
import backgroundImg from '../../assets/images/auth-background.svg'
import heartIcon from '../../assets/images/icons/purple-heart.svg'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import './styles.css'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isValid, setIsValid] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!email || !password) {
            setIsValid(false)
        }
        else if (email && password) {
            setIsValid(true)
        }
    }, [email, password])

    function handleSubmit(event: FormEvent) {
        event.preventDefault()
        api.post('/users/auth', { email, password })
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
        <div id="page-login">
            <Toast text="Erro ao entrar na plataforma, confira seus dados e tente novamente." visible={error}/>
            <div id="page-login-content">
                <div className="logo-container">
                    <main style={{ backgroundImage: `url(${backgroundImg})` }}>
                        <div>
                            <img src={logoImg} alt="Logo do Proffy" />
                            <h2>Sua plataforma de estudos online</h2>
                        </div>
                    </main>
                </div>
                <div className="login-container">
                    <h1>Fazer login</h1>
                    <form>
                        <div className="input-block">
                        <label htmlFor="email">E-mail</label>
                            <input 
                                type="text" 
                                id="email"
                                className="first-input"
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
                        <div className="form-actions">
                            <div className="input-check">
                                <input 
                                    type="checkbox"
                                    id="remember"
                                />
                                <label htmlFor="remember">Lembrar-me</label>
                            </div>
                            <a href="#">
                                Esqueci minha senha
                            </a>
                        </div>
                        <button 
                            type="submit"
                            disabled={!isValid}
                            onClick={handleSubmit}>
                            Entrar
                        </button>
                    </form>
                    <footer>
                        <div className="left-side">
                            <span>Não tem conta?</span>
                            <br/>
                            <Link to="/register">Cadastre-se</Link>
                        </div>
                        <span>
                            É de graça {' '}
                            <img src={heartIcon} alt="Coração roxo"/>
                        </span>
                    </footer>
                </div>
            </div>
        </div>
    )
}

export default Login