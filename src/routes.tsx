import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import TeacherList from './pages/TeacherList'

function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Landing}/>
            <Route path="/study" component={TeacherList}/>
        </BrowserRouter>
    )
}

export default Routes