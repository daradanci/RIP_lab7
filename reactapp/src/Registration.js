import React, {Component} from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            username:null,
            email:null,
            password:null
        }
    }
    componentDidMount(){
        const res = fetch("http://127.0.0.1:8000/range/")
        .then (res => res.json())
        .then(

            (result) =>{
                this.setState({
                    isLoaded:true,
                    items: result,
                });
                console.log(this.state.items)
            },
            (error) =>{
            this.setState({
                isLoaded:false,
                error});
            }
        )
        console.log(res)
    }
    render() {
        const {error, isLoaded, items, username, email, password} = this.state;
        const reg=()=>{
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ username: this.state.username, email:this.state.email,
            //     password:this.state.password })
                body: JSON.stringify({ hello:"privet" })
            };
            fetch(`http://127.0.0.1:8000/add_user`, requestOptions)

                // const requestOptions1 = {
                // method: 'POST',
                // headers: { 'Content-Type': 'application/json' },
                // // body: JSON.stringify({ quantity:1, idbag:this.state.client.current_bag, idstock:item.itemid })
                // body: JSON.stringify({ quantity:1, idbag:1, idstock:1 })
                // };
                // fetch(`http://127.0.0.1:8000/purchase/`, requestOptions1)

            console.log(this.state)
        }
        const update_username_value=(new_username_value)=>{
            this.setState({username:new_username_value});
            console.log(new_username_value);
        }
        const update_email_value=(new_email_value)=>{
            this.setState({email:new_email_value});
            console.log(new_email_value);
        }
        const update_password_value=(new_password_value)=>{
            this.setState({password:new_password_value});
            console.log(new_password_value);
        }
            return (
                <div>
                    <div className={"assortment"}>
                        Регистрация
                    </div>
                    <form className={"reg_form"}>
                        <input type={"text"} placeholder={"username"} className={"username_input"}
                           value={username}
                           onChange={(event)=>update_username_value(event.target.value)}/>
                        <input type={"text"} placeholder={"email"} className={"email_input"}
                           value={email}
                           onChange={(event)=>update_email_value(event.target.value)}/>
                        <input type={"text"} placeholder={"password"} className={"password_input"}
                           value={password}
                           onChange={(event)=>update_password_value(event.target.value)}/>
                    </form>
                    <input id="buy_button" className="buy_button" type="submit" value="Рег" onClick={()=>{reg()}}/>


                </div>
            );
    }
}

export default Registration;