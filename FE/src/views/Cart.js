import React, { Component } from 'react';
import Header from '../components/header';
import Footer from '../components/Footer';
import ReactDOM from 'react-dom';
import p1 from '../img/p1.jpg'
import Cookies from 'universal-cookie';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import ROOT_API from '../config/API'
import GatewayUrl from '../config/GatewayUrl'
import URL_img from '../config/URL_img'
import { confirmAlert } from 'react-confirm-alert'; // Import
import '../css/cart.css'
import { Container, Row, Col, Image, Nav, Card, Button, Modal, Carousel, Alert } from 'react-bootstrap';

function Dell(props) {
    const del = (e) => {
        const ee = e

        confirmAlert({
            title: 'ยืนยันการลบ',
            buttons: [
                {
                    label: 'ใช่',
                    onClick: () => {
                        axios.post(ROOT_API + '/api/dePutCar?id_product='
                            + props.id + '&date_cart=' + props.name).then(response => {
                                window.location.reload(false);
                            }).catch(error => { });
                    }
                },
                {
                    label: 'ไม่',
                    onClick: () => alert('Click No')
                }
            ]
        })

    }
    return (<>
        <Button className="btnbuy" style={{ height: '40px' }} onClick={() => del()} ><MdDelete style={{ verticalAlign: 'text-top' }} /></Button>
    </>
    )
}

export default class Cart extends Component {
    constructor() {
        super();
        this.state = {
            prods: [],
            prod1s: [],
            prodDiv: '', orno: (Math.floor(1000000000 + Math.random() * 9000000000)),
            prices: [], customeremail: '', productdetail: '', totalp: '', merchantid: '', urlre: '',
            prices1: [], disableDiv21: false, disableDiv22: false, disableDiv23: true, disableDiv24: true,
            payments: [], disableDiv: false, disableDiv2: false, disableDiv3: false,
            redio: '', add: '', nameS: '', telS: '', selectedOption: null, dellli: { d1: '' },
            total: 0, totalde: 0, totalall: 0, de: [], idde: '', totalde1: 0, totalall1: 0,
            idorders: [], rrr: [], num: 0, deli: [], divdeli: [], prodDiv2: '',
        }
    }
    payment() {
        const cookies = new Cookies();
        const date = new Date().getDate(); //Current Date
        const month = new Date().getMonth() + 1; //Current Month
        const year = new Date().getFullYear(); //Current Year
        const hours = new Date().getHours('00'); //Current Hours
        const min = new Date().getMinutes('00'); //Current Minutes
        const sec = new Date().getSeconds('00'); //Current Seconds
        const date_now = year + "-" + month + "-" + date + " " + hours + ":" + min + ":" + sec;

        let tt = this.state.idde.length
        let ff = 0;
        let nn1 = 0;
        for (let dex1 = 0; dex1 < tt; dex1++) {
            if (this.state.idde[dex1].name == '') {
                ff++;
            }
        }
        if (ff != 0) {

        } else {
            nn1++

        }
        if (this.state.redio == '') {

        } else {
            nn1++

        }
        if (this.state.add == '' || this.state.nameS == '' || this.state.telS == '') {

        } else {
            nn1++

        }
        if (nn1 == 3) {
            if (this.state.redio == 'dvcxvfv123413') {
                this.setState({ disableDiv22: true, disableDiv23: false, disableDiv24: false })
            } else {
                this.setState({ disableDiv22: false, disableDiv23: true, disableDiv24: true })
            }
        } else {
            this.setState({ disableDiv22: false, disableDiv23: true, disableDiv24: true })
        }

    }
    payment1(ttt) {
        // const cookies = new Cookies();
        // const date = new Date().getDate(); //Current Date
        // const month = new Date().getMonth() + 1; //Current Month
        // const year = new Date().getFullYear(); //Current Year
        // const hours = new Date().getHours('00'); //Current Hours
        // const min = new Date().getMinutes('00'); //Current Minutes
        // const sec = new Date().getSeconds('00'); //Current Seconds
        // const date_now = year + "-" + month + "-" + date + " " + hours + ":" + min + ":" + sec;
        // this.setState({
        //     productdetail: "ยอดรวม(จำนวน" + this.state.num + "ชิ้น)" + this.state.total + " บาท ค่าจัดส่ง" + this.state.totalde + " บาท"
        //         + " ยอดรวมทั้งสิ้น " + this.state.totalall + " บาท",
        //     urlre: GatewayUrl+"/Gateway?date_order=" + date_now + "&total_order=" +
        //         this.state.total + ".00" + "&id_payment_method=" +
        //         this.state.redio + "&num_id=" + this.state.orno + "&id_user=" +
        //         cookies.get('ID_Login') + "&status=รอการชำระเงิน"+
        //         "&add_send=" + this.state.nameS + " " + this.state.telS + " " + this.state.add
        // })
        let tt = this.state.idde.length
        let ff = 0;
        let nn1 = 0;
        for (let dex1 = 0; dex1 < tt; dex1++) {
            if (this.state.idde[dex1].name == '') {
                ff++;
            }
        }
        if (ff != 0) {

        } else {
            nn1++

        }
        if (this.state.redio == '') {

        } else {
            nn1++

        }
        if (this.state.add == '' || this.state.nameS == '' || this.state.telS == '') {

        } else {
            nn1++

        }
        if (nn1 == 3) {
            if (ttt == 'dvcxvfv123413') {
                this.setState({ disableDiv22: true, disableDiv23: false, disableDiv24: false })
            } else {
                this.setState({ disableDiv22: false, disableDiv23: true, disableDiv24: true })
            }
        } else {
            this.setState({ disableDiv22: false, disableDiv23: true, disableDiv24: true })
        }

    }
    componentWillMount() {


        const cookies = new Cookies();
        axios.get(ROOT_API + "/api/users/" + cookies.get('ID_Login')).then(response => {
            this.setState({ customeremail: response.data.email_user })
        }).catch(error => { });
        axios.get(ROOT_API + "/api/cart?id_user=" + cookies.get('ID_Login')).then(response => {
            this.setState({ prices: response.data });

            this.setState({
                prodDiv: '', prodDiv2: '',
                total: 0,
                num: 0,
                totalde: 0
            })
            const id_shop = this.state.prices.map(price => price.id_shop)
            const name_shop = this.state.prices.map(price => price.name_shop)
            let length1 = id_shop.length
            for (let index = 0; index < length1; index++) {
                axios.put(ROOT_API + "/api/deliveryMethod/1?id_shop=" + id_shop[index]).then(response => {
                    this.setState({ deli: response.data })

                    const id_delivery_method = this.state.deli.map(deli => deli.id_delivery_method)
                    const name_delivery_method = this.state.deli.map(deli => deli.name_delivery_method)
                    const value_delivery_method = this.state.deli.map(deli => deli.value_delivery_method)
                    this.setState({
                        idde: [...this.state.idde, {
                            'id': id_shop[index],
                            'name': '',
                            'value': 0,

                        }]
                    })
                    axios.get(ROOT_API + "/api/dePutCar/1?id_user=" + cookies.get('ID_Login')
                        + "&id_shop=" + id_shop[index]).then(response => {
                            this.setState({ prods: response.data })
                            const id_product = this.state.prods.map(prod => prod.id_product)
                            const name_product = this.state.prods.map(prod => prod.name_product)
                            const price_product = this.state.prods.map(prod => prod.price_product)
                            const img_product = this.state.prods.map(prod => prod.img_product)
                            const num_product = this.state.prods.map(prod => prod.num_product)
                            const property = this.state.prods.map(prod => prod.property)
                            const date_cart = this.state.prods.map(prod => prod.date_cart)
                            let length3 = id_product.length
                            for (let index1 = 0; index1 < length3; index1++) {

                                if (index1 == 0) {
                                    this.setState({ divdeli: [] })
                                    let length2 = id_delivery_method.length
                                    for (let in1 = 0; in1 < length2; in1++) {

                                        this.setState({
                                            divdeli: [...this.state.divdeli, {
                                                'value': value_delivery_method[in1] + "," + name_delivery_method[in1],
                                                'label': name_delivery_method[in1] + " " + value_delivery_method[in1] + " บาท"
                                            }]

                                        })
                                    }
                                    this.setState({
                                        prodDiv2: <>{this.state.prodDiv2}<Row><Col>

                                            <Row>
                                                <Col sm={6}><h1 className="nameCut">ชื่อร้าน : {name_shop[index]}</h1></Col>
                                                <Col sm={6}> <Select name={date_cart[index1] + "," + id_shop[index]}
                                                    onChange={this.dei.bind(this)}
                                                    options={this.state.divdeli}
                                                /> </Col>
                                            </Row>

                                        </Col></Row><hr />
                                        </>
                                    });
                                }
                                this.setState({
                                    prodDiv2: <>{this.state.prodDiv2}<Row><Col>
                                        <Row >
                                            <Col><Image className="imgcart" src={URL_img + img_product[index1]} style={{ paddingBottom: '10px' }}></Image></Col>

                                            {/* <Col sm={4} ><Link className="aa" to={"/DTProduct?dt=" + id_product[index1]}>
                                                <h3>{name_product[index1]}</h3><h4>{property[index1]}</h4></Link></Col> */}
                                            <Col ><Link className="aa" to={"/DTProduct?dt=" + id_product[index1]}>
                                                <h3 className="nameCut">{name_product[index1]}</h3>
                                                <h4 className="nameCut" style={{ marginBottom: '10px' }}>{property[index1]}</h4></Link>
                                                <div className="itemcart">
                                                    <h3>
                                                        <NumberFormat value={Number(num_product[index1]) * price_product[index1]} displayType={'text'} thousandSeparator={true} />
                                                    </h3>
                                                    <input width="50px" type="number" id={id_product[index1]}
                                                        name={date_cart[index1]}
                                                        class="form-control" Value={num_product[index1]}
                                                        onChange={this.updatemun.bind(this)}
                                                        style={{ margin: ' 0 6px 0 6px', height: '40px' }}></input>
                                                    <Dell id={id_product[index1]} name={date_cart[index1]} />
                                                </div>
                                            </Col>

                                            {/* <h3>{price_product[index1]}</h3> */}

                                            <div className="Decart">
                                                <Col  >
                                                    <h3>
                                                        <NumberFormat value={Number(num_product[index1]) * price_product[index1]} displayType={'text'} thousandSeparator={true} />
                                                    </h3>
                                                </Col>
                                                <Col >
                                                    <input width="50px" type="number" id={id_product[index1]}
                                                        name={date_cart[index1]}
                                                        class="form-control Decart" Value={num_product[index1]}
                                                        onChange={this.updatemun.bind(this)}
                                                        style={{ margin: ' 0 6px 0 6px', height: '40px' }}></input>
                                                </Col>
                                                <Col >
                                                    <div className="Decart"> <Dell id={id_product[index1]} name={date_cart[index1]} /></div>
                                                    {/*   <Button 
                                                id={id_product[index1]} name={date_cart[index1]}
                                                onClick={this.del.bind(this)}><MdDelete /></Button> */}
                                                </Col>
                                            </div>
                                        </Row>
                                    </Col></Row></>
                                });
                                if (index1 == length3 - 1) {
                                    this.setState({
                                        prodDiv: <>{this.state.prodDiv}<Card>{this.state.prodDiv2}</Card></>
                                    })
                                    this.setState({
                                        prodDiv2: <></>
                                    })
                                }
                                this.setState({
                                    total: this.state.total + (Number(num_product[index1]) * price_product[index1]),
                                    totalall: this.state.total + (Number(num_product[index1]) * price_product[index1])
                                })
                                this.setState({
                                    num: this.state.num + Number(num_product[index1])
                                })


                            }

                        }).catch(error => { });

                }).catch(error => { });

            }

        }).catch(error => { });

        axios.get(ROOT_API + "/api/paymentMethod").then(response => {
            this.setState({ payments: response.data })
            let tt = this.state.payments.length
            for (let it3 = 0; it3 < tt; it3++) {
                if (this.state.payments[it3].key_payment_method != null) {

                    this.setState({ merchantid: this.state.payments[it3].key_payment_method })
                }
            }

        }).catch(error => { });
        axios.put(ROOT_API + "/api/dePutCar/1?id_user=" + cookies.get('ID_Login')).then(response => {
            this.setState({ prices1: response.data });
        }).catch(error => { });
        this.payment()
    }
    updatemun(e) {

        const cookies = new Cookies();
        if (e.target.value != '') {
            axios.get(ROOT_API + '/api/cart/' + cookies.get('ID_Login') +
                '?id_product=' + e.target.id + '&date_cart=' + e.target.name + '&num_product=' + e.target.value).then(response => {
                    this.componentWillMount();
                }).catch(error => { });
        }
        this.payment()

    }
    del(e) {
        axios.post(ROOT_API + '/api/dePutCar?id_product='
            + e.target.id + '&date_cart=' + e.target.name).then(response => {
                this.componentWillMount();
            }).catch(error => { });
    }
    setradio(e) {
        const cookies = new Cookies();
        const date = new Date().getDate(); //Current Date
        const month = new Date().getMonth() + 1; //Current Month
        const year = new Date().getFullYear(); //Current Year
        const hours = new Date().getHours('00'); //Current Hours
        const min = new Date().getMinutes('00'); //Current Minutes
        const sec = new Date().getSeconds('00'); //Current Seconds
        const date_now = year + "-" + month + "-" + date + " " + hours + ":" + min + ":" + sec;

        this.setState({
            productdetail: "ยอดรวม(จำนวน" + this.state.num + "ชิ้น)" + this.state.total + " บาท ค่าจัดส่ง" + this.state.totalde + " บาท"
                + " ยอดรวมทั้งสิ้น " + this.state.totalall + " บาท",
            urlre: GatewayUrl + "/Gateway?date_order=" + date_now + "&total_order=" +
                this.state.totalall + ".00" + "&id_payment_method=" +
                e + "&num_id=" + this.state.orno + "&id_user=" +
                cookies.get('ID_Login') + "&status=รอการชำระเงิน" +
                "&add_send=" + this.state.nameS + " " + this.state.telS + " " + this.state.add
        })
        this.setState({
            redio: e
        })
        this.payment1(e)
    }
    submit() {
        let tt = this.state.idde.length
        let ff = 0;
        let nn1 = 0;
        for (let dex1 = 0; dex1 < tt; dex1++) {
            if (this.state.idde[dex1].name == '') {
                ff++;
            }
        }
        if (ff != 0) {
            this.setState({ disableDiv: true })
        } else {
            nn1++
            this.setState({ disableDiv: false })
        }
        if (this.state.redio == '') {
            this.setState({ disableDiv2: true })
        } else {
            nn1++
            this.setState({ disableDiv2: false })
        }
        if (this.state.add == '' || this.state.nameS == '' || this.state.telS == '') {
            this.setState({ disableDiv3: true })
        } else {
            nn1++
            this.setState({ disableDiv3: false })
        }
        if (nn1 == 3) {
            const cookies = new Cookies();
            const date = new Date().getDate(); //Current Date
            const month = new Date().getMonth() + 1; //Current Month
            const year = new Date().getFullYear(); //Current Year
            const hours = new Date().getHours('00'); //Current Hours
            const min = new Date().getMinutes('00'); //Current Minutes
            const sec = new Date().getSeconds('00'); //Current Seconds
            const date_now = year + "-" + month + "-" + date + " " + hours + ":" + min + ":" + sec;
            const numid = year.toString() + month.toString() + date.toString() + hours.toString() + min.toString() + sec.toString();

            axios.post(ROOT_API + "/api/orderProduct?date_order=" + date_now + "&total_order=" +
                this.state.totalall + ".00" + "&id_payment_method=" +
                this.state.redio + "&num_id=" + this.state.orno + "&id_user=" +
                cookies.get('ID_Login') + "&status=รอการชำระเงิน").then(response => {
                    axios.get(ROOT_API + "/api/orderProduct?id_user=" + cookies.get('ID_Login') + "&date_order=" + date_now).then(response => {
                        this.setState({ idorders: response.data })

                        const idproduct1 = this.state.prices1.map(price => price.id_product)
                        const price1 = this.state.prices1.map(price => price.price_product)
                        const num_product1 = this.state.prices1.map(price => price.num_product)
                        const id_order1 = this.state.idorders.map(idorder => idorder.id_order)
                        const property1 = this.state.prices1.map(price => price.property)
                        const img_product1 = this.state.prices1.map(price => price.img_product)
                        let nnn = 0;
                        for (let index = 0; index < idproduct1.length; index++) {
                            axios.get(ROOT_API + "/api/product/" + idproduct1[index]).then(response => {
                                this.setState({
                                    prod1s: response.data[0]
                                })
                                const id_shop = this.state.prod1s.id_shop
                                let dd = this.state.idde.length
                                for (let inn1 = 0; inn1 < dd; inn1++) {
                                    if (id_shop == this.state.idde[inn1].id) {
                                        this.state.dellli.d1 = this.state.idde[inn1].name
                                    }
                                }

                                axios.post(ROOT_API + "/api/orderProductDetail?id_order=" + id_order1[0]
                                    + "&id_product=" + idproduct1[index]
                                    + "&id_shop=" + id_shop
                                    + "&price_product=" + price1[index]
                                    + "&num=" + num_product1[index]
                                    + "&total=" + (Number(price1[index]) * Number(num_product1[index])) + ".00"
                                    + "&delivery_method=" + this.state.dellli.d1
                                    + "&property=" + property1[index]
                                    + "&img_product1=" + img_product1[index]
                                    + "&date_order=" + date_now
                                    + "&add_send=" + this.state.nameS + " " + this.state.telS + " " + this.state.add
                                ).then(response => {
                                    nnn = nnn + 1;
                                }).catch(error => { });
                            }).catch(error => { });
                        }
                        axios.put(ROOT_API + "/api/dePutCar/1?id_user=" + cookies.get('ID_Login')
                        ).then(response => {
                            this.setState({ rrr: response.data })
                            const date_cart = this.state.rrr.map(rrr => rrr.date_cart)
                            let ii = 0;
                            for (let index = 0; index < date_cart.length; index++) {
                                axios.put(ROOT_API + "/api/cart/" + date_cart[index]
                                ).then(response => {
                                    ii++;
                                    if (ii == date_cart.length) {
                                        alert("บันทึกสินค้าสำเร็จ")
                                        this.props.history.push('/Payment')
                                    }
                                }).catch(error => { });
                            }
                        }).catch(error => { });
                        if (nnn == idproduct1.length) {
                            alert("บันทึกสินค้าสำเร็จ")
                            this.props.history.push('/Payment')
                        }
                    }).catch(error => { });
                }).catch(error => { });
        }


        if (this.state.redio == '2') {

        } else {

        }

    }
    dei(value, name) {
        const cookies = new Cookies();
        const date = new Date().getDate(); //Current Date
        const month = new Date().getMonth() + 1; //Current Month
        const year = new Date().getFullYear(); //Current Year
        const hours = new Date().getHours('00'); //Current Hours
        const min = new Date().getMinutes('00'); //Current Minutes
        const sec = new Date().getSeconds('00'); //Current Seconds
        const date_now = year + "-" + month + "-" + date + " " + hours + ":" + min + ":" + sec;
        var p = name.name.split(",");
        var a = value.value.split(",");

        var id1 = p[1]
        var value1 = a[0]
        var label1 = value.label

        if (value1 != "เลือกการจัดส่ง") {
            let dd = this.state.idde.length
            for (let index = 0; index < dd; index++) {
                if (id1 == this.state.idde[index].id) {
                    this.setState({ totalde: (this.state.totalde + Number(value1)) - this.state.idde[index].value })
                    this.setState({ totalall: (Number(value1) + this.state.totalall) - this.state.idde[index].value })
                    this.state.idde[index].value = value1
                    this.state.idde[index].name = label1
                    axios.put(ROOT_API + "/api/count/1?id_user=" + cookies.get('ID_Login') +
                        "&id_shop=" + id1 + "&delivery_method=" + label1).then(response => {

                        }).catch(error => { });
                    this.setState({
                        productdetail: "ยอดรวม(จำนวน" + this.state.num + "ชิ้น)" + this.state.total + " บาท ค่าจัดส่ง" + ((this.state.totalde + Number(value1)) - this.state.idde[index].value) + " บาท"
                            + " ยอดรวมทั้งสิ้น " + ((Number(value1) + this.state.totalall) - this.state.idde[index].value) + " บาท",
                        urlre: GatewayUrl + "/Gateway?date_order=" + date_now + "&total_order=" +
                            ((Number(value1) + this.state.totalall) - this.state.idde[index].value) + ".00" + "&id_payment_method=" +
                            this.state.redio + "&num_id=" + this.state.orno + "&id_user=" +
                            cookies.get('ID_Login') + "&status=รอการชำระเงิน" +
                            "&add_send=" + this.state.nameS + " " + this.state.telS + " " + this.state.add
                    })
                }

            }
        } else {
            let dd = this.state.idde.length
            for (let index = 0; index < dd; index++) {
                if (id1 == this.state.idde[index].id) {
                    this.setState({ totalde: (this.state.totalde + 0) - this.state.idde[index].value })
                    this.setState({ totalall: (0 + this.state.totalall) - this.state.idde[index].value })
                    this.state.idde[index].value = 0
                }

            }
        }


        this.payment()

    }
    add(e) {
        const cookies = new Cookies();
        const date = new Date().getDate(); //Current Date
        const month = new Date().getMonth() + 1; //Current Month
        const year = new Date().getFullYear(); //Current Year
        const hours = new Date().getHours('00'); //Current Hours
        const min = new Date().getMinutes('00'); //Current Minutes
        const sec = new Date().getSeconds('00'); //Current Seconds
        const date_now = year + "-" + month + "-" + date + " " + hours + ":" + min + ":" + sec;

        if (e == "1") {
            axios.get(ROOT_API + "/api/users/" + cookies.get('ID_Login')).then(response => {
                this.setState({
                    add: response.data.address_user,
                    productdetail: "ยอดรวม(จำนวน" + this.state.num + "ชิ้น)" + this.state.total +
                        " บาท ค่าจัดส่ง" + this.state.totalde + " บาท"
                        + " ยอดรวมทั้งสิ้น " + this.state.totalall + " บาท",
                    urlre: GatewayUrl + "/Gateway?date_order=" + date_now + "&total_order=" +
                        this.state.totalall + ".00" + "&id_payment_method=" +
                        this.state.redio + "&num_id=" + this.state.orno + "&id_user=" +
                        cookies.get('ID_Login') + "&status=รอการชำระเงิน" +
                        "&add_send=" + this.state.nameS + " " + this.state.telS + " " + response.data.address_user
                })


            }).catch(error => { });
        } else {
            this.setState({ add: '' })
        }
        this.payment()
    }
    add1(e) {
        const cookies = new Cookies();
        const date = new Date().getDate(); //Current Date
        const month = new Date().getMonth() + 1; //Current Month
        const year = new Date().getFullYear(); //Current Year
        const hours = new Date().getHours('00'); //Current Hours
        const min = new Date().getMinutes('00'); //Current Minutes
        const sec = new Date().getSeconds('00'); //Current Seconds
        const date_now = year + "-" + month + "-" + date + " " + hours + ":" + min + ":" + sec;
        this.setState({ add: e.target.value })
        this.setState({
            productdetail: "ยอดรวม(จำนวน" + this.state.num + "ชิ้น)" + this.state.total +
                " บาท ค่าจัดส่ง" + this.state.totalde + " บาท"
                + " ยอดรวมทั้งสิ้น " + this.state.totalall + " บาท",
            urlre: GatewayUrl + "/Gateway?date_order=" + date_now + "&total_order=" +
                this.state.totalall + ".00" + "&id_payment_method=" +
                this.state.redio + "&num_id=" + this.state.orno + "&id_user=" +
                cookies.get('ID_Login') + "&status=รอการชำระเงิน" +
                "&add_send=" + this.state.nameS + " " + this.state.telS + " " + e.target.value
        })
        this.payment()
    }
    names(e) {
        const cookies = new Cookies();
        const date = new Date().getDate(); //Current Date
        const month = new Date().getMonth() + 1; //Current Month
        const year = new Date().getFullYear(); //Current Year
        const hours = new Date().getHours('00'); //Current Hours
        const min = new Date().getMinutes('00'); //Current Minutes
        const sec = new Date().getSeconds('00'); //Current Seconds
        const date_now = year + "-" + month + "-" + date + " " + hours + ":" + min + ":" + sec;
        this.setState({
            productdetail: "ยอดรวม(จำนวน" + this.state.num + "ชิ้น)" + this.state.total + " บาท ค่าจัดส่ง" + this.state.totalde + " บาท"
                + " ยอดรวมทั้งสิ้น " + this.state.totalall + " บาท",
            urlre: GatewayUrl + "/Gateway?date_order=" + date_now + "&total_order=" +
                this.state.totalall + ".00" + "&id_payment_method=" +
                this.state.redio + "&num_id=" + this.state.orno + "&id_user=" +
                cookies.get('ID_Login') + "&status=รอการชำระเงิน" +
                "&add_send=" + e.target.value + " " + this.state.telS + " " + this.state.add
        })
        this.setState({ nameS: e.target.value })
        this.payment()
    }
    tels(e) {
        const cookies = new Cookies();
        const date = new Date().getDate(); //Current Date
        const month = new Date().getMonth() + 1; //Current Month
        const year = new Date().getFullYear(); //Current Year
        const hours = new Date().getHours('00'); //Current Hours
        const min = new Date().getMinutes('00'); //Current Minutes
        const sec = new Date().getSeconds('00'); //Current Seconds
        const date_now = year + "-" + month + "-" + date + " " + hours + ":" + min + ":" + sec;
        this.setState({
            productdetail: "ยอดรวม(จำนวน" + this.state.num + "ชิ้น)" + this.state.total + " บาท ค่าจัดส่ง" + this.state.totalde + " บาท"
                + " ยอดรวมทั้งสิ้น " + this.state.totalall + " บาท",
            urlre: GatewayUrl + "/Gateway?date_order=" + date_now + "&total_order=" +
                this.state.totalall + ".00" + "&id_payment_method=" +
                this.state.redio + "&num_id=" + this.state.orno + "&id_user=" +
                cookies.get('ID_Login') + "&status=รอการชำระเงิน" +
                "&add_send=" + this.state.nameS + " " + e.target.value + " " + this.state.add
        })
        this.setState({ telS: e.target.value })
        this.payment()
    }
    // rrr() {
    //   
    // }
    render() {
        var divStyle = {
            display: this.state.disableDiv ? 'block' : 'none'
        }; var divStyle2 = {
            display: this.state.disableDiv2 ? 'block' : 'none'
        }; var divStyle3 = {
            display: this.state.disableDiv3 ? 'block' : 'none'
        }; var divStyle21 = {
            display: this.state.disableDiv21 ? 'block' : 'none'
        }; var divStyle22 = {
            display: this.state.disableDiv22 ? 'block' : 'none'
        }; var divStyle23 = {
            display: this.state.disableDiv23 ? 'block' : 'none'
        }; var divStyle24 = {
            display: this.state.disableDiv24 ? 'block' : 'none'
        };
        return (
            <div>
                <Header />
                <Container>
                    <hr />
                    <Row>
                        <Col>
                            {this.state.prodDiv}
                            <Row><Col>
                                <Alert style={divStyle} key='danger' variant='danger'>
                                    กรุณาเลือกวิธีจัดส่ง
                                </Alert>
                            </Col></Row>
                            <Row>
                                <Col sm={6}>
                                    <Card>
                                        <h2>วิธีการชำระเงิน : </h2>

                                        {this.state.payments.map(payment =>
                                            <div id={payment.id_payment_method} onClick={() => this.setradio(payment.id_payment_method)}>
                                                <a href="##" className="aa">
                                                    <Card style={{ border: '.5px solid #2222' }}>
                                                        <h2>{payment.name_payment_method}</h2>
                                                    </Card></a></div>
                                        )}
                                        <Alert style={divStyle2} key='danger2' variant='danger'>
                                            กรุณาเลือกวิธีการชำระเงิน
                                        </Alert>

                                    </Card>
                                </Col>

                                <Col sm={6}>
                                    <Card>
                                        <Container>
                                            <h2>ที่อยู่จัดส่ง : </h2>
                                            <input type="text" className="form-control" placeholder="ชื่อ-สกุล"
                                                onChange={this.names.bind(this)}></input>
                                            <input type="text" className="form-control" placeholder="เบอร์โทร"
                                                onChange={this.tels.bind(this)}></input>
                                            <div className='addcart'>
                                                <div style={{ width: '50%' }} onClick={() => this.add('1')}>
                                                    <a className="aa" href="##"> <Card style={{ border: '.5px solid #2222' }}>
                                                        <h3>ที่อยู่ของฉัน</h3>
                                                    </Card></a></div>
                                                <div style={{ width: '50%' }} onClick={() => this.add('2')}>
                                                    <a className="aa" href="##">  <Card style={{ border: '.5px solid #2222' }} >
                                                        <h3>ที่อยู่ใหม่</h3>
                                                    </Card></a> </div>
                                            </div>


                                            <textarea className="form-control" rows="4" id="comment"
                                                onChange={this.add1.bind(this)} value={this.state.add}
                                                placeholder="ที่อยู่"></textarea>
                                            <Alert style={divStyle3} key='danger3' variant='danger'>
                                                กรุณากรอกที่อยู่
                                            </Alert>
                                        </Container>

                                    </Card>
                                </Col>

                            </Row>
                        </Col>
                        <Col sm={3}>

                            <Card><Row><Col><h3>ยอดรวม (จำนวน {this.state.num} ชิ้น)
                            {' '}<NumberFormat value={this.state.total} displayType={'text'} thousandSeparator={true} />
                                {' '}
                                บาท</h3></Col></Row>
                                <Row><Col><h3>ค่าจัดส่ง {this.state.totalde} บาท</h3></Col></Row>
                                <Row><Col>
                                    <h3>ยอดรวมทั้งสิ้น
                                        {' '}<NumberFormat value={this.state.totalall} displayType={'text'} thousandSeparator={true} />
                                        {' '} บาท</h3>

                                </Col></Row>
                                <Row>
                                    <Col>
                                        <form method="post" action="https://www.thaiepay.com/epaylink/payment.aspx">
                                            <input style={divStyle21} type="text" name="refno" value={this.state.orno} />
                                            <input style={divStyle21} type="text" name="merchantid" value={this.state.merchantid} />
                                            <input style={divStyle21} type="text" name="customeremail" value={this.state.customeremail} />
                                            <input style={divStyle21} type="text" name="cc" value="00" />
                                            <input style={divStyle21} type="text" name="productdetail" value={this.state.productdetail} />
                                            <input style={divStyle21} type="text" name="total" value={this.state.totalall} />
                                            <input style={divStyle21} type="text" name="returnurl" value={this.state.urlre} />
                                            <Button className="btnbuy" style={divStyle22}
                                                type="submit" name="Submit"   >ยืนยันการสั่งซื้อสินค้า1</Button>
                                        </form>
                                        <Button style={divStyle23} className="btnbuy" onClick={this.submit.bind(this)} >ยืนยันการสั่งซื้อสินค้า</Button>
                                        <h4 style={divStyle24}>กรุณาตรวจสอบข้อมูล</h4>
                                    </Col>
                                </Row>

                            </Card>


                        </Col>
                    </Row>

                    {/* <Button onClick={this.rrr.bind(this)}>rrr</Button> */}
                </Container>
                <Footer />
            </div >
        );
    }
}