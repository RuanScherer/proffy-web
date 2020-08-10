import React, { useState, useEffect, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import background from '../../assets/images/vertical-background.svg'
import backIcon from '../../assets/images/icons/back.svg'
import logo from '../../assets/images/logo.svg'
import warningIcon from '../../assets/images/icons/warning.svg'
import cameraIcon from '../../assets/images/icons/camera.svg'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import api from '../../services/api'
import { getTokenData } from '../../utilities/auth'
import './styles.css'
import Toast from '../../components/Toast'

function Profile() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [avatar, setAvatar] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [bio, setBio] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const { id } = getTokenData()

    useEffect(() => {
        api.get(`users/${id}`)
            .then(response => {
                const { user } = response.data
                setName(user.name)
                setEmail(user.email)
                setAvatar(user.avatar)
                setWhatsapp(user.whatsapp)
                setBio(user.bio)
            })
            .catch(err => {
                console.log(err)
                setError(true)
                setErrorMessage("Erro ao carregar as informações do seu perfil, tente novamente.")
            })
    }, [])

    function handleSaveProfileChanges(event: FormEvent) {
        event.preventDefault()
        api.put(`users/${id}`, {
            name,
            email,
            avatar,
            whatsapp,
            bio
        }).then(response => {
            localStorage.setItem("accessToken", response.data.token)
            window.location.replace('/home')
        }).catch(err => {
            console.log(err)
            setError(true)
            setErrorMessage("Erro ao salvar as informações do seu perfil, tente novamente.")
        })
    }
    
    return (
        <div id="page-profile">
            <Toast visible={error} text={errorMessage} />
            <div id="page-profile-content">
                <header>
                    <div className="header-content">
                        <Link to="/home">
                            <img src={backIcon} alt="Voltar"/>
                        </Link>
                        <h3>Meu perfil</h3>
                        <img src={logo} alt="Logo" className="logo"/>
                    </div>
                </header>
                <section className="top-content" style={{ backgroundImage: `url(${background})` }}>
                    <div className="container">
                        <div className="avatar">
                            <img src={ avatar ? avatar : "https://api.adorable.io/avatars/220/abott@adorable.png" } alt="Avatar" />
                            <button>
                                <img src={cameraIcon} alt="Camẽra"/>
                            </button>
                        </div>
                        <h1>{name}</h1>
                        <h2>Matemática</h2>
                    </div>
                </section>
                <form className="container" onSubmit={handleSaveProfileChanges}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input 
                            name="name" 
                            label="Nome completo"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                        <Input 
                            name="email" 
                            label="E-mail"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                        <Input 
                            name="whatsapp" 
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={event => setWhatsapp(event.target.value)}
                        />
                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio}
                            onChange={event => setBio(event.target.value)}
                        />
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados corretamente
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default Profile