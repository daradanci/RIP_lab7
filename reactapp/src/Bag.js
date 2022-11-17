import React, {Component} from 'react';
import {Link} from "react-router-dom";
import DocumentTitle from 'react-document-title'

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

class Bag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            client:{},
            purchases:[],
            sum: 0,
            bag:{},
            toDelete:null
        }
        this.bagId=0;
    }
    componentDidMount() {
        this.load_client();
        this.load_bag();
        this.load_purchases();
        // this.load_sum();
    }
    load_bag(){
        const res = fetch(`http://127.0.0.1:8000/client/1/bag/`)
        .then (res => res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoaded:true,
                    bag: result[0],
                    sum:result[0]['sum']
                });
            }
        ).then(()=>{
            // if (!this.state.bag){
            //     this.setState({
            //         bag:{'sum':0}
            //     })
            // }

                // this.setState((state) > ({
                //     isLoaded: true,
                //     sum: 0
                // }))
            })

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
    load_purchases(){
        const res = fetch(`http://127.0.0.1:8000/client/1/current_bag/`)
        .then (res => res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoaded:true,
                    purchases: result,
                });
            }
        )


    }
    load_sum(){
        const res = fetch(`http://127.0.0.1:8000/client/1/bag/1/sum/`)
        .then (res => res.json())
        .then(
            (result) =>{
                // this.setState((state) > ({
                //     isLoaded: true,
                //     sum: state.sum =
                // }))
                this.setState({
                    isLoaded:true,
                    sum: Number(result[0].price__sum),
                });
                console.log(this.state.sum);
            }
        )

    }
    render() {
        const {error, isLoaded,bag, purchases, sum} = this.state;
        // console.log(purchases);
        const decline=(purchase)=>{
            let item=purchase.idstock;
            const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ itemid:item.itemid, idmodel:item.idmodel.modelid, size: item.size, amount: item.amount+1 })
                };
            fetch(`http://127.0.0.1:8000/stock/${item.itemid}/`, requestOptions)
            this.setState({
                sum:this.state.sum-purchase.idstock.idmodel.price*purchase.quantity
            })
            const deleteOptions = {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                };
            fetch(`http://127.0.0.1:8000/purchase/${purchase.purchaseid}/`, deleteOptions)
                .then(response=> {
                    this.load_purchases();
                })
            alert(`Удалено из корзины: ${ purchase.idstock.idmodel.modelname } - ${purchase.idstock.size}`)
        }
        const buy=()=>{
            fetch(`http://127.0.0.1:8000/client/1/bag/1/buy/`)
                .then(response=>{
                    this.load_purchases();
                    this.load_bag();
                    this.setState({sum:0})
                    // this.load_sum();
                    // this.setState({
                    //     bag:{}
                    // })

                    alert(`Покупки оплачены!`)
                })

        }

        return (
            <DocumentTitle title = 'Корзина'>
            <div>
                <div className={"bag_title"}>Корзина</div>
                <div className={'bag'}>
                {purchases.map((purchase)=>(
                    <div key={"purchaseId:"+purchase.purchaseid} className={'purchase'}>
                            <img src={"/images/"+purchase.idstock.idmodel.image} align={'top'}
                                     alt={"model_image:"+purchase.idstock.idmodel.image} height={'100px'} className={"small_image"}/>
                        <div className={'purchase_description'}>

                        <div className={'purchase_name'} align={'center'}>
                        {purchase.idstock.idmodel.modelname} {purchase.idstock.size} - {purchase.quantity} шт.
                        </div>

                        <div className={'purchase_price'}>
                            Цена: {purchase.idstock.idmodel.price} руб.
                        </div>
                        </div>

                        <input id="delete_purchase_button" className={'delete_purchase_button'}
                               type="submit" value="X" onClick={()=>{
                                   decline(purchase)
                        }}/>

                    </div>
                ))}
                </div>
                {sum>0&&<div>Итого: {sum} руб.</div>}

                {sum>0 &&
                    <input id="buy_bag_button" className={'buy_bag_button'}
                               type="submit" value="Оплатить" onClick={buy}/>
                }
                {!sum&&
                <div className={'error_message'}>Корзина пуста.</div>
                }
            </div>
            </DocumentTitle>
        );


    }
}


export default Bag;