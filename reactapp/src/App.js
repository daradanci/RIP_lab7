import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import React, {Component} from "react";
import './App.css';
import DocumentTitle from 'react-document-title'
import BackButton from "./BackButton";
import Home from "./Home";
import Range from "./Range";
import RangeType from "./RangeType";
import Model from "./Model"
import Bag from "./Bag"
import Registration from "./Registration"

function App() {
    return (
        <DocumentTitle title = 'Shop100'>
        <BrowserRouter basename="/" >
            <div>
                <div className={"navbar"}>
                    <div className={"nav-tabs"}>
                        <Link to="/">Дом</Link>
                    </div>
                    <div className={"nav-tabs"}>
                        <Link to="/range">Ассортимент</Link>
                    </div>
                    <div className={"nav-tabs"}>
                        <Link to="/bag">Корзина</Link>
                    </div>
                    <div className={"nav-tabs"}>
                        <Link to="/reg">Регистрация</Link>
                    </div>
                    <div className={"nav-tabs"}>
                        <Link to="/auth">Вход</Link>
                    </div>
                </div>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route exact path="/range">
                        <Range/>
                        <BackButton/>
                    </Route>
                    <Route exact path={`/range/:rangeId/models`}>
                        <RangeType/>
                        <BackButton/>
                    </Route>
                    <Route exact path={'/range/:rangeId/models/:modelId'}>
                        <Model/>
                        <BackButton/>
                    </Route>
                    <Route exact path={'/bag'}>
                        <Bag/>
                        <BackButton/>
                    </Route>
                    <Route exact path={'/reg'}>
                        <Registration/>
                        <BackButton/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>

    </DocumentTitle>
    );
}


export default App;