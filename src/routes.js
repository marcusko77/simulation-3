import React from 'react'
import {Switch, Route } from 'react-router-dom'
import  Login  from './components/Login'
import Dashboard from './components/Dashboard'

export default (
    <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/dashboard' component={Dashboard}/>     
    </Switch>
)


