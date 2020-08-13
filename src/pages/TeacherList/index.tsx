import React, { useState, FormEvent, useEffect } from 'react'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import api from '../../services/api'
import './styles.css'

function TeacherList() {
    const [teachers, setTeachers] = useState([])
    const [pages, setPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(0)
    const [subject, setSubject] = useState("")
    const [week_day, setWeekDay] = useState("")
    const [time, setTime] = useState("")

    useEffect(() => {
        updateTeachers()
    }, [currentPage])

    function handleSearchTeachers(event: FormEvent) {
        event.preventDefault()
        setCurrentPage(1)
        updateTeachers()
    }

    function previousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function nextPage() {
        if (currentPage < pages) {
            setCurrentPage(currentPage + 1)
        }
    }

    async function updateTeachers() {
        if (currentPage !== 0) {
            const response = await api.get('/classes', {
                params: {
                    subject,
                    week_day,
                    time,
                    page: currentPage
                }
            })

            if (response) {
                const { classes, pages } = response.data
                setTeachers(classes)
                setPages(pages)
                window.scrollTo(0, 0)
            }
            else {
                // exibir toast
            }
        }
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={handleSearchTeachers}>
                    <Select 
                        name="suvject"
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
                    <Select 
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={event => setWeekDay(event.target.value)}
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
                        label="Hora"
                        name="time"
                        value={time}
                        onChange={event => setTime(event.target.value)}
                    />

                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>

            <main>
                { teachers.map((teacher: Teacher, index: number) => (
                    <TeacherItem teacher={teacher} key={index}/>
                ))}
                <div className="page-actions">
                    { currentPage !== 0 &&
                        <>
                            <button 
                                disabled={currentPage === 1}
                                onClick={previousPage}>Anterior</button>
                            <button 
                                disabled={currentPage === pages}
                                onClick={nextPage}>Próximo</button>
                        </>
                    }
                </div>
            </main>
        </div>
    )
}

export default TeacherList