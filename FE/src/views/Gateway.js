import React, { Component } from 'react'
import axios from 'axios';
import ROOT_API from '../config/API'
import Cookies from 'universal-cookie';
import { Container, Row, Col, Image, Nav, Card, Button, Modal, Carousel } from 'react-bootstrap';
export default class Gateway extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "", name1: "", prices1: [], idorders: [], prod1s: [], rrr: [],
            disableDiv2: false, disableDiv3: false, disableDiv4: false, disableDiv5: false,
            disableDiv6: false, disableDiv11: false, disableDiv12: false, disableDiv13: false, disableDiv14: false,
        }
    }

    componentWillMount() {

        const search =  this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const par = params.get('date_order'); // bar 
        const date_now = params.get('date_order'); // bar 
        const add_send = params.get('add_send'); // bar 
        const id_payment_method = params.get('id_payment_method'); // bar 
        const cookies = new Cookies();


        if (par != undefined) {
            //('props', this.props.location.search)
            //('date_now', date_now)
            //('add_send', add_send)
            axios.put(ROOT_API+"/api/dePutCar/1?id_user=" + cookies.get('ID_Login')).then(response => {
                this.setState({ prices1: response.data });

                axios.post(ROOT_API+"/api/orderProduct" + this.props.location.search).then(response => {
                    axios.get(ROOT_API+"/api/orderProduct?id_user=" + cookies.get('ID_Login') + "&date_order=" + date_now).then(response => {
                        this.setState({ idorders: response.data })
                        //('eeee', this.state.prices1)
                        const idproduct1 = this.state.prices1.map(price => price.id_product)
                        const price1 = this.state.prices1.map(price => price.price_product)
                        const num_product1 = this.state.prices1.map(price => price.num_product)
                        const id_order1 = this.state.idorders.map(idorder => idorder.id_order)
                        const property1 = this.state.prices1.map(price => price.property)
                        const img_product1 = this.state.prices1.map(price => price.img_product)
                        const delivery_method1 = this.state.prices1.map(price => price.delivery_method)
                        let nnn = 0;

                        for (let index = 0; index < idproduct1.length; index++) {
                            axios.get(ROOT_API+"/api/product/" + idproduct1[index]).then(response => {
                                this.setState({
                                    prod1s: response.data[0]
                                })
                                const id_shop = this.state.prod1s.id_shop
                                axios.post(ROOT_API+"/api/orderProductDetail?id_order=" + id_order1[0]
                                    + "&id_product=" + idproduct1[index]
                                    + "&id_shop=" + id_shop
                                    + "&price_product=" + price1[index]
                                    + "&num=" + num_product1[index]
                                    + "&total=" + (Number(price1[index]) * Number(num_product1[index])) + ".00"
                                    + "&delivery_method=" + delivery_method1[index]
                                    + "&property=" + property1[index]
                                    + "&img_product1=" + img_product1[index]
                                    + "&date_order=" + date_now
                                    + "&add_send=" + add_send
                                ).then(response => {
                                    nnn = nnn + 1;
                                    //('object')
                                }).catch(error => {});
                            }).catch(error => {});
                        }
                        axios.put(ROOT_API+"/api/dePutCar/1?id_user=" + cookies.get('ID_Login')
                        ).then(response => {
                            this.setState({ rrr: response.data })
                            const date_cart = this.state.rrr.map(rrr => rrr.date_cart)
                            let ii = 0;
                            for (let index = 0; index < date_cart.length; index++) {
                                axios.put(ROOT_API+"/api/cart/" + date_cart[index]
                                ).then(response => {
                                    ii++;
                                    if (ii == date_cart.length) {
                                        // alert("บันทึกสินค้าสำเร็จ")
                                        //   alert("บันทึกสินค้าสำเร็จ")

                                    }
                                }).catch(error => {});
                            }
                            axios.post(ROOT_API+'/api/notifyPayment?date_notify_pay=' + date_now +
                                '&id_payment_method=' + id_payment_method + '&id_order=' + id_order1[0]
                                + '&file=').then(Response => {
                                    //(Response);
                                    axios.put(ROOT_API+'/api/orderProduct/' + id_order1[0]).then(Response => {
                                        //(Response);
                                        // alert('insert sucsess !!')
                                    }).then(error => {   });
                                }).then(error => {   });

                            axios.put(ROOT_API+'/api/orderProductDetail/' + id_order1[0]).then(Response => {
                                //(Response);
                                axios.put(ROOT_API+'/api/putOrder/' + id_order1[0]).then(Response => {
                                    //(Response);
                                    this.props.history.push('/Tracking')
                                    // alert("ยืนยันการชำระสำเร็จ")
                                    // window.location.reload(false);
                                }).then(error => {
                                     
                                });
                            }).then(error => {
                                 
                            });

                        }).catch(error => {});
                        if (nnn == idproduct1.length) {
                            let bboaat = 0

                            

                        }



                    }).catch(error => {});
                }).catch(error => {});

                
            }).catch(error => {});
        }
    }
    test() {
        this.setState({ name: '7000', name1: 'รองเท้าจ้า' })
    }
    render() {
        var divStyle2 = {
            display: this.state.disableDiv2 ? 'block' : 'none'
        }; var divStyle3 = {
            display: this.state.disableDiv3 ? 'block' : 'none'
        }; var divStyle4 = {
            display: this.state.disableDiv4 ? 'block' : 'none'
        }; var divStyle5 = {
            display: this.state.disableDiv5 ? 'block' : 'none'
        }; var divStyle6 = {
            display: this.state.disableDiv6 ? 'block' : 'none'
        }; var divStyle11 = {
            display: this.state.disableDiv11 ? 'block' : 'none'
        }; var divStyle12 = {
            display: this.state.disableDiv12 ? 'block' : 'none'
        }; var divStyle13 = {
            display: this.state.disableDiv13 ? 'block' : 'none'
        }; var divStyle14 = {
            display: this.state.disableDiv14 ? 'block' : 'none'
        };
        return (
            <div>
                {/* <button onClick={this.test.bind(this)}>tet</button> */}
                {/* <form method="post" action="https://www.thaiepay.com/epaylink/payment.aspx">
                    <input style={divStyle2} type="text" name="refno" value="99999" />
                    <input style={divStyle2} type="text" name="merchantid" value="86716274" />
                    <input style={divStyle2} type="text" name="customeremail" value="boatbububa@gmail.com" />
                    <input style={divStyle2} type="text" name="cc" value="00" />
                    <input style={divStyle2} type="text" name="productdetail" value={this.state.name1} />
                    <input style={divStyle2} type="text" name="total" value={this.state.name} />
                    <input style={divStyle2} type="text" name="returnurl" value="http://localhost:8082/Gateway?rid=9999" />

                    <br />
                    <input type="submit" name="Submit" value="Comfirm Order" />
                </form> */}
                <h1 style={{textAlignLast:'center'}} >รอสักครู่ .........</h1>

            </div>
        )
    }
}
