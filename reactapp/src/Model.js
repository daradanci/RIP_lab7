import React, {Component} from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";
import {isVisible} from "@testing-library/user-event/dist/utils";

class Model extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            model:[],
            sizes:[],
            producer:[],
            bag:{},
            client:{}
        }
        this.rangeId=1;
        this.modelId=1;
        this.producerId=1;
        this.count=1;
    }
    componentDidMount(){
        this.load_client()
        this.load_bag();
        this.load_model();
        this.load_sizes();
        this.load_producer();
    }

    load_client(){
        const res = fetch(`http://127.0.0.1:8000/client/1`)
        .then (res => res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoaded:true,
                    client: result,
                });
            }
        )
    }

    load_bag(){
        const res = fetch(`http://127.0.0.1:8000/client/1/bag/`)
        .then (res => res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoaded:true,
                    bag: result[0],
                });
            }
        )
    }

    load_model(){
        let combo=window.location.pathname.split('/');
        this.rangeId=combo[2];
        this.modelId=combo[4];
        const res = fetch(`http://127.0.0.1:8000/range/${this.rangeId}/models/${this.modelId}`)
        .then (res => res.json())
        .then(

            (result) =>{
                this.setState({
                    isLoaded:true,
                    model: result,
                });
                // this.range=result;
                this.producerId=result.idProducer;

            },
            (error) =>{
            this.setState({
                isLoaded:false,
                error});
            }
        )
    }
    load_sizes(){
        const res2 = fetch(`http://127.0.0.1:8000/range/${this.rangeId}/models/${this.modelId}/stock/`)
        .then (res2 => res2.json())
        .then(

            (result) =>{
                this.setState({
                    isLoaded:true,
                    sizes: result,
                });
                // this.models=result;
                console.log(this.state.sizes)
            },
            (error) =>{
            this.setState({
                isLoaded:false,
                error});
            }
        )
    }
    load_producer(){
        const res3 = fetch(`http://127.0.0.1:8000/producer/${this.producerId}`)
        .then (res3 => res3.json())
        .then(

            (result) =>{
                this.setState({
                    isLoaded:true,
                    producer: result,
                });
                this.producerId=result.producerid;
                console.log(this.state.producer)
            },
            (error) =>{
            this.setState({
                isLoaded:false,
                error});
            }
        )
    }


    render() {
        const {error, isLoaded, model, sizes, producer, bag} = this.state;
        console.log(model.modelname)
        console.log(bag)
        const buy=(bag)=> {
            let item=JSON.parse(document.getElementById('size_list').value)
            console.log(item)
            if(item) {
                let combo=window.location.pathname.split('/');
                let rangeId=combo[2];
                let modelId=combo[4];
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ itemid:item.itemid, idmodel:item.idmodel, size: item.size, amount: item.amount-1 })
                };
                fetch(`http://127.0.0.1:8000/range/${rangeId}/models/${modelId}/stock/${item.itemid}/`, requestOptions)
                    // .then(response => response.json())
                    .then(response=>this.load_sizes())

                const requestOptions1 = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ quantity:1, idbag:this.state.client.current_bag, idstock:item.itemid })
                body: JSON.stringify({ quantity:1, idbag:bag.bagid, idstock:item.itemid })
                };
                fetch(`http://127.0.0.1:8000/purchase/`, requestOptions1)
                    .then(()=>{this.load_bag()})

                // const requestOptions2 = {
                // method: 'GET',
                // headers: { 'Content-Type': 'application/json' },
                // };
                // fetch(`http://127.0.0.1:8000/client/1/bag/`, requestOptions2)
                //     .then(response => response.json())
                //     .then(response=>{
                //         console.log(123)
                //         console.log(response)
                //     })

                alert(`Добавлено в корзину: ${ model.modelname } - ${item.size}`)
                        }
                    }
        return (
            <div>
                <div className={"models_list"}>

                <div className={"model_info"}>

                    <div className={"model_name"}>{model.modelname}</div>
                    <div className={"producer"}>Производитель: {producer.producername}</div>
                    <div className={"price"}>Цена: {model.price} руб.</div>
                    <img src={"/images/"+model.image} alt={"model_image:"+model.image} width={"250px"} className={"image"}/>

                    {sizes.length > 0 &&
                        <div>

                        <select name="size_list" id="size_list">
                            <option value="">Выберите размер</option>
                            {sizes.map(item => {
                                return <option key={"size:" + item.size}
                                               value={JSON.stringify(item)}>{item.size} ({item.amount} шт.)</option>
                            })}
                        </select>
                        <input id="buy_button" className="buy_button" type="submit" value="В корзину" onClick={()=>{buy(bag)}}/>
                        </div>
                    }
                    {!sizes.length &&
                        <div className={"error_message"} id={"error_message"}>
                            Размеров нет!
                        </div>

                    }
                </div>


                </div>


            </div>
        );
    }
}

export default Model;