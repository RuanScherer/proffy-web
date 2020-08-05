import React from 'react'
import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import './styles.css'

const TeacherItem = () => {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars0.githubusercontent.com/u/50061559?s=460&u=c852aeac2cf92ba5f8335515be54da3d5d68ffeb&v=4" alt="Ruan Scherer"/>
                <div>
                    <strong>Ruan Scherer</strong>
                    <span>Matemática</span>
                </div>
            </header>
            <p>
                Faço uns cálculos malucos.
                <br/><br/>
                Não me pergunte de onde vem os resultados, eles apenas aparecem.
            </p>
            <footer>
                <p>
                    Preço/Hora
                    <strong>R$80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem