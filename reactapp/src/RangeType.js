import React, {Component, useState} from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import ReactSlider from "react-slider";
class RangeType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            range: [],
            models: [],
            search_input: '',
            isOpen: true,
            minPrice:0, maxPrice:0
        }
        this.rangeId=1;
        this.minBorder=this.state.minPrice;
        this.maxBorder=this.state.maxPrice;


    }
    componentDidMount(){
        this.load_range();
        this.load_prices();
        this.load_models();
    }
    load_range(){
        let combo=window.location.pathname.split('/');
        this.rangeId=combo[2]
        const res = fetch(`http://127.0.0.1:8000/range/${this.rangeId}/`)
        .then (res => res.json())
        .then(

            (result) =>{
                this.setState({
                    isLoaded:true,
                    range: result,
                });
                // this.range=result;

            },
            (error) =>{
            this.setState({
                isLoaded:false,
                error});
            }
        )
    }
    load_models(){
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ minPrice: this.state.minPrice, maxPrice:this.state.maxPrice,
                search_input:this.state.search_input })
        };
        const res = fetch(`http://127.0.0.1:8000/range/${this.rangeId}/models/`)
        .then (res => res.json())
        .then(

            (result) =>{
                this.setState({
                    isLoaded:true,
                    models: result,
                });
                // this.models=result;

            },
            (error) =>{
            this.setState({
                isLoaded:false,
                error});
            }
        )
    }
    load_prices(){
        const res=fetch(`http://127.0.0.1:8000/range/${this.rangeId}/min_max_price/`)
        // const res=fetch(`http://127.0.0.1:8000/date/${DATE}/sum/`)
            .then (res => res.json())
            .then(
                (result)=>{
                    this.setState({
                        maxPrice:result[0].max.price__max,
                        minPrice:result[0].min.price__min
                });
                    this.maxBorder=result[0].max.price__max;
                    this.minBorder=result[0].min.price__min;
                }
            )
        // console.log(res);
    }



    render() {
        const {error, isLoaded, range, models, search_input, isOpen, minPrice, maxPrice} = this.state;
        console.log(maxPrice)
        console.log(minPrice)
        // let lowPoint=this.state.minPrice;
        // let highPoint=this.state.maxPrice;
        const filteredModels = models.filter(models=>{
            return models.modelname.toLowerCase().includes(search_input.toLowerCase())
        })
        const update_search_value=(new_search_value)=>{
            this.setState({search_input:new_search_value});
            console.log(new_search_value);
        }
        const itemCLickHandler=(event)=>{
            update_search_value(event.target.textContent);
            setIsOpen(!isOpen);
        }
        // const [isOpen, setIsOpen]=useState(true);
        const setIsOpen=(isOpened)=>{
            this.setState({isOpen:isOpened});
        }
        const InputClickHandler=()=>{
            setIsOpen(true);
        }
        return (
            <div>
                <div className={"assortment"}>{range.rangename}</div>
                <form className={"search_form"}>
                    <input type={"text"} placeholder={"Поиск"} className={"search_input"}
                           value={search_input} onClick={InputClickHandler}
                           onChange={(event)=>update_search_value(event.target.value)}/>
                    <ul className={"autocomplete"}>{
                        search_input && isOpen
                            ?
                                filteredModels.map(model => (
                                    <li className={"autocomplete_item"} onClick={itemCLickHandler}
                                        key={"modelId:" + model.modelid}>{model.modelname}</li>

                                ))

                            : null
                    }</ul>
                    <div className={'container'}>
                    <ReactSlider
                                 // defaultValue={[minPrice, maxPrice]}
                                 value={[minPrice, maxPrice]}
                                 className={'slider'} trackClassName={'tacker'}
                                 min={this.minBorder} max={this.maxBorder}
                                 step={100}
                                 withTracks={true} pearling={true}
                                 renderThumb={(props)=>{
                                     return <div {...props} className={'thumb'}></div>
                                 }}
                                 renderTrack={(props)=>{
                                     return <div {...props} className={'track'}></div>
                                 }}
                                 onChange={([min, max])=>{
                                     // console.log(this.state.maxPrice);

                                     this.setState({
                                         minPrice: min,
                                         maxPrice: max
                                     })
                                 }}
                    />

                    <div className={'values-wrapper'}>
                        <p>
                            Min:
                            <span>{minPrice} руб.</span>
                        </p>
                        <p>
                            Max:
                            <span>{maxPrice} руб.</span>
                        </p>
                    </div>
                </div>
                </form>


                <div className={"models_list"}>

                {filteredModels.map(model=>(


                    <li key={"modelId:"+model.modelid}>
                        {model.price >= minPrice && model.price <= maxPrice &&
                            <div className={"model_info"}>

                                <div className={"model_name"}>
                                    <Link
                                        to={`/range/${this.rangeId}/models/${model.modelid}/`}>{model.modelname}</Link>
                                </div>
                                {/*<div className={"producer"}>Производитель: {model.producer}</div>*/}
                                <div className={"price"}>Цена: {model.price} руб.</div>
                                <Link to={`/range/${this.rangeId}/models/${model.modelid}/`}>
                                    <img src={"/images/" + model.image} alt={"model_image:" + model.image}
                                         width={"200px"} className={"image"}/>
                                </Link>
                            </div>
                        }
                    </li>


                ))}
                </div>




            </div>
        );
    }
}

export default RangeType;