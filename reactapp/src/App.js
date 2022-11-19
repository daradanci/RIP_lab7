import { BrowserRouter, Route, Link, Switch, Redirect} from "react-router-dom";
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
import Auth from "./Auth"
import Logout from "./Logout"
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('./Auth'));
const Register = lazy(() => import('./Registration'));

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
                    {/*<div className={"nav-tabs"}>*/}
                    {/*    <Link to="/logout">Выход</Link>*/}
                    {/*</div>*/}
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
                     <Route exact path={'/auth'}>
                        <Auth/>
                    </Route>
                    <Route exact path={'/logout'}>
                        <Logout/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>

    </DocumentTitle>
    );
}


// const App = () => {
//   const isAuthenticated = getToken();
//
//   return (
//     <Router>
//       <Suspense fallback={<Loader />}>
//         <Switch>
//           <PublicRoute
//             path="/login"
//             isAuthenticated={isAuthenticated}
//           >
//             <LoginPage />
//           </PublicRoute>
//           <PublicRoute
//             path="/register"
//             isAuthenticated={isAuthenticated}
//           >
//             <Register />
//           </PublicRoute>
//           <PublicRoute
//             path="/forgot-password"
//             isAuthenticated={isAuthenticated}
//           >
//           </PublicRoute>
//           <PrivateRoute
//             path="/"
//             isAuthenticated={isAuthenticated}
//           >
//           </PrivateRoute>
//         </Switch>
//       </Suspense>
//     </Router>
//   );
// };

export default App;