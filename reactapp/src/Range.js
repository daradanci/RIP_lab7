import React, {Component} from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import RangeType from "./RangeType";
class Range extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
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
        // console.log(res)
    }
    render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <p>ERROR</p>
        } else if (!isLoaded) {
            return <p>LOADING</p>
        } else {
            return (
                <div>

                    <div className={"assortment"}>Ассортимент</div>
                    <div className={"range_list"}>

                        {items.map(item=>(
                            <div className={"range"} key={"rangeId:"+item.rangeid}>
                                <Link to={`/range/${item.rangeid}/models/`}>{item.rangename}</Link>
                            </div>
                        ))}
                    </div>
                </div>


            );
        }
    }
}

export default Range;