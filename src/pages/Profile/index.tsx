import React, { useState, useEffect } from 'react'
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
    const [loadError, setLoadError] = useState(false)

    useEffect(() => {
        const { id } = getTokenData()
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
                setLoadError(true)
            })
    }, [])
    
    return (
        <div id="page-profile">
            <Toast visible={loadError} text="Erro ao carregar as informações do seu perfil, tente novamente."/>
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
                        <h1>Ruan Scherer</h1>
                        <h2>Matemática</h2>
                    </div>
                </section>
                <form className="container">
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input 
                            name="name" 
                            label="Nome completo"
                            value={name}
                        />
                        <Input 
                            name="email" 
                            label="E-mail"
                            value={email}
                        />
                        <Input 
                            name="whatsapp" 
                            label="Whatsapp"
                            value={whatsapp}
                        />
                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio}
                        />
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default Profile