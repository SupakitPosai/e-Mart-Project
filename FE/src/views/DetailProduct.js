import React, { Component, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/Footer';
import axios from 'axios';
import ROOT_API from '../config/API'
import URL_img from '../config/URL_img'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import p1 from '../img/p1.jpg'
import '../css/debut.css'
import { BrowserRouter as Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Card, Button, Modal, Alert } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import {
    FacebookShareButton,
    LineShareButton,
    TwitterShareButton,
} from "react-share";
import {
    FacebookIcon,
    LineIcon,
    TwitterIcon
} from "react-share";
var idd = "";
function Example(prods) {
    let history = useHistory();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [path, setpath] = useState(prods.path);
    const [name_product, setname_product] = useState(prods.name);
    const [cost_product, setcost_product] = useState(prods.cost);
    const [price_product, setprice_product] = useState(prods.price);
    const [id_type_product, setid_type_product] = useState('');
    const [imgSrc, setimgSrc] = useState([prods.img]);
    const [formData1, setformData1] = useState({ file: '' });

    const handlename_productChange = (e) => {
        setname_product(e.target.value);
    }
    const handlecost_productChange = (e) => {
        setcost_product(e.target.value);
    }
    const handleprice_productChange = (e) => {
        setprice_product(e.target.value);
    }


    const onChange = (e) => {
        let files = e.target.files;

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (e) => {
            setformData1({ file: e.target.result })
            console.warn("img data ", e.target.result)
            //(formData1)
        }

        reader.onloadend = (e) => {
            setimgSrc([reader.result])
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        //('formData1', formData1)
        axios.put(ROOT_API + '/api/product/' + prods.id +
            '?name_product=' + name_product +
            '&cost_product=' + cost_product +
            '&price_product=' + price_product +
            '&img_product=' + path, formData1).then(Response => {
                //(Response);
                window.location.reload(false);
            }).then(error => {
                 
            });

    }
    const del = () => {
        setShow(false)
        confirmAlert({
            title: 'ยกเลิกสินค้าใช่หรือไม่',
            buttons: [
                {
                    label: 'ใช่',
                    onClick: () => {
                        axios.delete(ROOT_API + '/api/product/' + prods.id).then(Response => {
                            //(Response);
                            history.push("/MyShop?shop=" + prods.shop);
                        }).then(error => {
                             
                        });
                    }
                },
                {
                    label: 'ไม่',
                    onClick: () => alert('Click No')
                }
            ]
        })
    }

    return (
        <>
            <Button className="btnbuy" variant="primary" onClick={handleShow}>
                <FaEdit /> : แก้ไขข้อมูลสินค้า
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>แก้ไขข้อมูลสินค้า : </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="text-center" >
                        <Image src={imgSrc} height="200" width="200" /><br /><br />
                        <input type="file" name="file" onChange={onChange} /><br /><br />

                        <input className="form-control" type="text" name="name_product"
                            placeholder="name_product" defaultValue={prods.name}
                            onChange={handlename_productChange}
                        />
                        {/* <NumberFormat thousandSeparator={true} prefix={''} /> */}
                        <input className="form-control" type="text" name="cost_product"
                            placeholder="cost_product" defaultValue={prods.cost}
                            onChange={handlecost_productChange}
                        />
                        <input className="form-control" type="text" name="price_product"
                            placeholder="price_product" defaultValue={prods.price}
                            onChange={handleprice_productChange}
                        />
                        <Button className="btnbuy cancer" onClick={del}>ยกเลิกสินค้า </Button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btnbuy" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" className="btnbuy" onClick={handleSubmit}>
                        Save
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
function Dell(props) {
    const del = (e) => {
        const ee = e

        confirmAlert({
            title: 'ยืนยันการลบ',
            buttons: [
                {
                    label: 'ใช่',
                    onClick: () => {
                        axios.delete(ROOT_API + '/api/property/' + ee).then(response => {
                            window.location.reload(false);
                        }).catch(error => {});
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
        <Button className="btnbuy" value={props.id} onClick={() => del(props.id)} ><MdDelete /></Button>
    </>
    )
}
export default class DetailProduct extends Component {
    constructor(prods) {
        super(prods);
        this.state = {
            prods: [], disableDiv: false, disableDiv3: false,
            prodDiv: '', divedit: <></>,
            delis: [],
            deliDiv: '',
            redio: ' ', disableDivbuy: true,
            src: p1, show1: false, editid: '', editname: '',
            typepros: [], radio1: '', img_name: '', src1: '',
            property: [], divpro1: '', divpro2: '',
            divpro: '', tt: '', t1: 0, total: 0, num: 1, butadd: ''
        }
    }
    setradio(e) {
        this.setState({ disableDiv3: false })

        this.setState({
            redio: e.target.value
        })
    }

    componentWillMount() {
        const cookies = new Cookies();
        if (cookies.get('ID_Login') == undefined) {
            this.setState({
                butadd: <>

                    <Button className="btnbuy b1" href="/Signin" >Buy Now</Button>
                    <Button className="btnbuy b1" href="/Signin">Add to Cart</Button>

                </>
            })
        } else {
            this.setState({
                butadd: <>
                    <Button className="btnbuy b1" onClick={this.buynow.bind(this)}>Buy Now</Button>
                    <Button className="btnbuy b1" onClick={this.addtocart.bind(this)} >Add to Cart</Button>

                </>
            })
        }

        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const dt = params.get('dt'); // bar
        const ee = params.get('e'); // bar
        idd = params.get('dt');
        if (ee != null) {
            this.setState({
                disableDiv: true
            })
            var divStyle = {
                display: 'block'
            };
            this.setState({
                disableDivbuy: false
            })
        } else {

            var divStyle = {
                display: 'none'
            };
        }


        //(ee)
        axios.get(ROOT_API + "/api/product/" + dt).then(response => {
            this.setState({ prods: response.data[0] });
            this.setState({ total: this.state.prods.price_product })
            this.setState({
                src: URL_img + response.data[0].img_product
            })
            this.setState({
                divedit: <Example id={dt} img={this.state.src} name={this.state.prods.name_product}
                    path={this.state.prods.img_product} shop={this.state.prods.id_shop}
                    cost={this.state.prods.cost_product} price={this.state.prods.price_product} />
            })
            this.setState({ post: response.data });
        }).catch(error => {});
        axios.get(ROOT_API + "/api/typeproperty").then(response => {
            this.setState({ typepros: response.data })
            const typeid = this.state.typepros.map(typepro => typepro.id_type_property)
            const typename = this.state.typepros.map(typepro => typepro.name_type_property)
            for (let index = 0; index < typeid.length; index++) {

                axios.get(ROOT_API + "/api/property?id_product=" + dt + "&id_type_property=" + typeid[index]).then(response => {
                    this.setState({
                        property: response.data
                    })
                    const id = this.state.property.map(property => property.id_property)
                    const name = this.state.property.map(property => property.name_property)
                    const img_property = this.state.property.map(property => property.img_property)

                    for (let in1 = 0; in1 < name.length; in1++) {

                        if (img_property[in1] == null) {

                            this.setState({ t1: this.state.t1 + 1 })

                            if (in1 == 0) {
                                this.setState({
                                    divpro1: <>{this.state.divpro1}
                                        <Col sm={2}>
                                            <h3>{typename[index]} : </h3></Col> </>
                                })
                                //(typename[index])
                            }
                            //(name[in1])

                            this.setState({
                                divpro2: <>{this.state.divpro2}<Col>
                                    <div id={name[in1]}
                                        onClick={() => this.setradio1(name[in1])}>
                                        <Card >
                                            <h4>{name[in1]}</h4>
                                        </Card>
                                    </div>
                                    <div style={divStyle}>
                                        <Dell id={id[in1]} />
                                        {/* <Button className="btnbuy" value={id[in1]} onClick={this.del.bind(this)} ><MdDelete /></Button> */}
                                    </div>
                                    {/* <a href="##"> <img src={response.data} width='25px' onClick={this.fff.bind(this)}></img></a> */}
                                </Col>
                                </>
                            })

                            if (in1 == (name.length - 1)) {
                                this.setState({
                                    divpro: <>{this.state.divpro}<p>เลือก{typename[index]}</p><Row>{this.state.divpro1}{this.state.divpro2}</Row>
                                        <hr /> </>
                                })
                                this.setState({ divpro1: '', divpro2: '' })
                            }

                        } else {
                            this.setState({ t1: this.state.t1 + 1 })

                            if (in1 == 0) {
                                this.setState({
                                    divpro1: <>{this.state.divpro1}<Col sm={2}><h3>{typename[index]} : </h3></Col> </>
                                })
                                //(typename[index])
                            }
                            //(name[in1])

                            this.setState({
                                divpro2: <>{this.state.divpro2}<Col>

                                    <a class="imageAnchor" href="##" > <img className="imgbut" src={URL_img + img_property[in1]} name={name[in1]} id={img_property[in1]}
                                        width='50px' onClick={this.fff.bind(this)}></img></a>
                                    <div style={divStyle}>
                                        <Dell id={id[in1]} />
                                        {/* <Button className="btnbuy" id={img_property[in1]} value={id[in1]} onClick={this.del.bind(this)} ><MdDelete /></Button> */}
                                    </div>

                                </Col>
                                </>
                            })

                            if (in1 == (name.length - 1)) {
                                this.setState({
                                    divpro: <>{this.state.divpro}<p>เลือก{typename[index]}</p><Row>{this.state.divpro1}{this.state.divpro2}</Row>
                                        <hr /> </>
                                })
                                this.setState({ divpro1: '', divpro2: '' })
                            }

                        }

                    }



                }).catch(error => {});

            }

        }).catch(error => {});
    }
    fff(e) {
        this.setState({ disableDiv3: false })
        this.setState({ src: e.target.src, img_name: e.target.name, src1: e.target.id })

    }
    setradio1(e) {

        //(e)

        this.setState({ disableDiv3: false })
        this.setState({ radio1: e })
    }
    addtocart1(e) {
        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const dt = params.get('dt'); // bar
        const cookies = new Cookies();
        const date = new Date().getDate(); //Current Date
        const month = new Date().getMonth() + 1; //Current Month
        const year = new Date().getFullYear(); //Current Year
        const hours = new Date().getHours('00'); //Current Hours
        const min = new Date().getMinutes('00'); //Current Minutes
        const sec = new Date().getSeconds('00'); //Current Seconds
        const date_now = year + "-" + month + "-" + date + " " + hours + ":" + min + ":" + sec;
        if (this.state.src1 == '') {
            this.setState({
                src1: this.state.prods.img_product
            })
        }
        axios.post(ROOT_API + "/api/cart?id_user=" + cookies.get('ID_Login')
            + "&id_product=" + dt
            + "&price_product=" + this.state.prods.price_product
            + "&num_product=" + this.state.num + "&property=" + this.state.img_name + " , " + this.state.radio1
            + "&img_product=" + this.state.src1
            + "&date_cart=" + date_now).then(response => {

                alert("เพิ่มสินค้าเรียบร้อย")

            }).catch(error => {});
    }
    addtocart(e) {
        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const dt = params.get('dt'); // bar
        const rrr = this.state.img_name + " , " + this.state.radio1
        const cookies = new Cookies();
        if (this.state.img_name != '' && this.state.radio1 != '') {
            axios.put(ROOT_API + "/api/dePutCar/1?id_user=" + cookies.get('ID_Login')).then(response => {
                const ch = response.data
                //(ch)
                let l1 = ch.length
                let cart1 = 0;
                for (let b1 = 0; b1 < l1; b1++) {
                    if (cookies.get('ID_Login') == ch[b1].id_user && dt == ch[b1].id_product && rrr == ch[b1].property) {
                        cart1++;
                    }
                }
                if (cart1 == 0) {
                    this.addtocart1();
                    window.location.reload(false);
                } else {
                    alert("มีสินค้านี้แล้ว")
                }
            }).catch(error => {});

        } else {
            this.setState({ disableDiv3: true })
        }
    }
    buynow() {
        const search = this.props.location.search; // could be '?foo=bar'
        const params = new URLSearchParams(search);
        const dt = params.get('dt'); // bar
        const rrr = this.state.img_name + " , " + this.state.radio1
        const cookies = new Cookies();
        if (this.state.img_name != '' && this.state.radio1 != '') {
            axios.put(ROOT_API + "/api/dePutCar/1?id_user=" + cookies.get('ID_Login')).then(response => {
                const ch = response.data
                //(ch)
                let l1 = ch.length
                let cart1 = 0;
                for (let b1 = 0; b1 < l1; b1++) {
                    if (cookies.get('ID_Login') == ch[b1].id_user && dt == ch[b1].id_product && rrr == ch[b1].property) {
                        cart1++;
                    }
                }
                if (cart1 == 0) {
                    this.addtocart1();
                    this.props.history.push('/Cart')
                } else {
                    alert("มีสินค้านี้แล้ว")
                }
            }).catch(error => {});

        } else {
            this.setState({ disableDiv3: true })
        }

    }
    ccc(e) {

        this.setState({
            total: (this.state.prods.price_product * Number(e.target.value)) + ".00",
            num: e.target.value
        })

    }
    del(e) {
        const ee = e.target.value

        confirmAlert({
            title: 'ยืนยันการลบ',
            buttons: [
                {
                    label: 'ใช่',
                    onClick: () => {
                        axios.delete(ROOT_API + '/api/property/' + ee).then(response => {
                            window.location.reload(false);
                        }).catch(error => {});
                    }
                },
                {
                    label: 'ไม่',
                    onClick: () => alert('Click No')
                }
            ]
        })

    }
    render() {
        var divStyle = {
            display: this.state.disableDiv ? 'block' : 'none'

        };
        var divStyle3 = {
            display: this.state.disableDiv3 ? 'block' : 'none'
        }; var divStylebuy = {
            display: this.state.disableDivbuy ? 'block' : 'none'
        };
        return (
            <div>
                <Header />
                <Container><br />

                    <Row style={divStyle}><Col>{this.state.divedit} <hr /></Col></Row>
                    <Row>
                        <Col sm={3}>
                            <Image src={this.state.src} width='100%' style={{ marginBottom: '1rem' }}></Image>

                        </Col>
                        <Col sm={6}>
                            <Row>
                                <Col><h1>{this.state.prods.name_product} </h1>

                                    <FacebookShareButton
                                        url={"https://emart.patstudios.co.th/DTProduct?dt=" + idd}
                                    >
                                        <FacebookIcon size={32} round={true} />
                                    </FacebookShareButton>
                                    <LineShareButton
                                        url={"https://emart.patstudios.co.th/DTProduct?dt=" + idd}
                                    >
                                        <LineIcon size={32} round={true} />

                                    </LineShareButton>
                                    <TwitterShareButton url={"https://emart.patstudios.co.th/DTProduct?dt=" + idd}>
                                        < TwitterIcon size={32} round={true} />
                                    </TwitterShareButton>
                                    <hr />
                                </Col>
                            </Row>
                            <Row>
                                <Col><Row>
                                    <Col><h1>฿{this.state.total}</h1>
                                    </Col>
                                    <Col><input className="form-control" type='number' defaultValue="1"
                                        onChange={this.ccc.bind(this)}></input></Col>
                                </Row>
                                    <hr />
                                </Col>
                            </Row>

                            {this.state.divpro}
                            <Alert style={divStyle3} key='danger3' variant='danger'>
                                กรุณาเลือกรายละเอียด
                            </Alert>

                            <br />
                            <div style={divStylebuy} className="formb">
                                {this.state.butadd}
                            </div>
                        </Col>
                        <Col sm={3}>
                            {/* <h1>วิธีการจัดส่ง</h1><hr />
                            {this.state.deliDiv} */}
                        </Col>
                        {/* {this.state.prodDiv} */}



                    </Row>
                    <br /><br /><br />

                </Container>

                <Footer />
            </div>
        );
    }
}

