import React, { useState, FormEvent, useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'
import { getTokenData } from '../../utilities/auth'
import Toast from '../../components/Toast'
import './styles.css'

function TeacherForm() {
    const [name, setName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [bio, setBio] = useState("")
    const [subject, setSubject] = useState("")
    const [cost, setCost] = useState("")
    const [scheduleItems, setScheduleItems] = useState([{ week_day: 1, from: '', to:''}])
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const { id } = getTokenData()
    const history = useHistory()

    useEffect(() => {
        api.get(`users/${id}`)
            .then(response => {
                const { user } = response.data
                setName(user.name)
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

    function addNewScheduleItem() {
        setScheduleItems([...scheduleItems, { week_day: 1, from: '', to:''}])
    }

    function handleCreateClass(event: FormEvent) {
        event.preventDefault()

        api.post('/classes', {
            name, avatar, whatsapp, bio, subject, cost: Number(cost), schedule: scheduleItems
        }).then(() => history.replace('/'))
        .catch(() => alert('Erro ao cadastrar.'))
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((item, index) => {
            if (index === position) {
                return { ...item, [field]: value }
            }
            return item
        })
        setScheduleItems(updatedScheduleItems)
    }

    return (
        <div id="page-teacher-form" className="container">
            <Toast visible={error} text={errorMessage} />
            <PageHeader 
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <div className="user-data-grid">
                            <div className="user">
                                <img src={avatar || "https://api.adorable.io/avatars/220/abott@adorable.png"} alt="Avatar" />
                                <h1>{name}</h1>
                            </div>
                            <Input 
                                name="whatsapp" 
                                label="Whatsapp"
                                value={whatsapp || "(  ) _ ____ ____"}
                                disabled
                            />
                        </div>
                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio}
                            disabled
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select 
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={event => setSubject(event.target.value)}
                            options={[
                                { value: "Artes", label: "Artes" },
                                { value: "Biologia", label: "Biologia" },
                                { value: "Química", label: "Química" },
                                { value: "Educação Física", label: "Educação Física" },
                                { value: "Geografia", label: "Geografia" },
                                { value: "História", label: "História" },
                                { value: "Português", label: "Português" },
                                { value: "Física", label: "Física" },
                                { value: "Matemática", label: "Matemática" }
                            ]}    
                        />
                        <Input 
                            name="cost" 
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={event => setCost(event.target.value)}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>
                        { scheduleItems.map((item, index) => (
                            <div className="schedule-item" key={item.week_day}>
                                <Select 
                                    name="week_day"
                                    label="Dia da semana"
                                    value={item.week_day}
                                    onChange={event => setScheduleItemValue(index, 'week_day', event.target.value)}
                                    options={[
                                        { value: "0", label: "Domingo" },
                                        { value: "1", label: "Segunda-feira" },
                                        { value: "2", label: "Terça-feira" },
                                        { value: "3", label: "Quarta-feira" },
                                        { value: "4", label: "Quinta-feira" },
                                        { value: "5", label: "Sexta-feira" },
                                        { value: "6", label: "Sábado" }
                                    ]}    
                                />
                                <Input 
                                    type="time"
                                    name="from"
                                    label="Das"
                                    value={item.from}
                                    onChange={event => setScheduleItemValue(index, 'from', event.target.value)}
                                />
                                <Input 
                                    type="time"
                                    name="to"
                                    label="Até"
                                    value={item.to}
                                    onChange={event => setScheduleItemValue(index, 'to', event.target.value)}
                                />
                            </div>
                        ))}
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
            </main>
        </div>
    )
}

export default TeacherForm