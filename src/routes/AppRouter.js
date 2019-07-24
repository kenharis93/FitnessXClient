import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './../components/App';
import Excercises from './../components/Excercises';
import Header from './../components/Header';
import Register from './../components/Register';
import Login from './../components/Login';
import PrivateRoute from './../components/PrivateRoute';
import TokenContext from './../contexts/TokenContext';
import CompleteExercise from './../components/CompleteExercise';
import Dashboard from './../components/Dashboard';


const AppRouter = () => {
    const initalValue = sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token')) : '';
    const [token, setToken] = useState(initalValue);
    useEffect(() => {
        sessionStorage.setItem('token', JSON.stringify(token));
    }, [token]);
    return (
    <TokenContext.Provider value={{token: token, setToken: setToken}}>
    <BrowserRouter>
    <div>
        <Header />
    </div>
    <Switch>
    <Route path="/" exact component={App}/> 
    <Route path="/excercises" exact component={Excercises} /> 
    <Route path="/register" exact component={Register}/> 
    <Route path="/login" exact render={(props) => <Login {...props} />} />
    <PrivateRoute path="/dashboard" exact component={Dashboard}/>
    <PrivateRoute path="/completed" exact component={CompleteExercise}/>
    {/* <Route path="/logout" exact component={Logout}/>  */}
    {/* <Route path="/about/:id" component={About}/>
    <Route path="/contact" component={Contact}/>
    <Route path="/posts" component={Posts}/>
    <Route component={FileNotFound}/> */}
    </Switch>
    </BrowserRouter>
    </TokenContext.Provider>
    )
}


export default AppRouter;