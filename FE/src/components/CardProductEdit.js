import React, { Component } from 'react';
import p1 from '../img/photo.png';
import { FaEdit } from 'react-icons/fa';
import { FiSave } from 'react-icons/fi';
import axios from 'axios';
import ROOT_API from '../config/API'
import URL_img from '../config/URL_img'
import { MdClose } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css'

import { default as NumberFormat } from 'react-number-format';
import Cookies from 'universal-cookie';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Nav, Card, Button, Modal, Carousel, Alert } from 'react-bootstrap';
import CardProduct from '../components/CardProduct';


class CardProductEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: {}, key: 0, disableDiv: true, disableDiv2: false, disableDiv3: false, prosDiv1: [], divtype: [],
            s2s: [], s3s: [], tes2s: '', tes3s: '', products: [], typeps: '', typep1s: [],
            pros1: {}, prosDiv: '', delis: [], deliDiv: '', src: '', disableDiv11: false,
            disableDiv12: false, disableDiv41: false, disableDiv42: false, disableDiv43: false, disableDiv44: false,
            shops: [], disableDivtel: true, i1: 0, i2: 0, i3: 0, i4: 0, disableDivname: true, disableDivadd: true, disableDivtax: true,
            name1: '', add1: '', tax1: '', tel1: '', typeprops: [], id_product_p: '', name_p: '', id_type_p: '',
            show1: false, imgSrc2: [p1], formData2: { file: '' }, property: [], divpro: '', divpro1: '', divpro2: ''
        };

    }
    componentWillMount() {
        axios.get(ROOT_API + '/api/product').then(response => {
            this.setState({
                products: response.data
            });

            const id_shop1 = this.state.products.map(product => product.id_shop);
            const id_product1 = this.state.products.map(product => product.id_product);
            const id_type_product = this.state.products.map(product => product.id_type_product);
            const cookies = new Cookies();
            for (let index5 = 0; index5 < id_shop1.length; index5++) {

                if (id_shop1[index5] == cookies.get('ID_Shop')) {
                    axios.get(ROOT_API + '/api/product/' + id_product1[index5]).then(response => {
                        this.setState({
                            pros1: response.data[0]
                        });
                        const name1 = this.state.pros1.name_product
                        const price1 = this.state.pros1.price_product
                       
                        this.setState({
                            prosDiv: <>{this.state.prosDiv}

                                <Col sm={3}>
                                    <Card style={{ border: '1px solid #2222', padding: '0' }}>
                                        <Card.Img variant="top" src={URL_img + response.data[0].img_product} />
                                        <div style={{ padding: '0.7rem' }}>
                                            <h3 className="nameCut namePro"> {name1}</h3>
                                            <h2 className="titlecart pricePro nameCut">{price1} THB</h2>
                                        </div>
                                        <Button className="btnbuy" style={{ margin: '5px' }} name={id_product1[index5]}
                                            onClick={this.handleShow.bind(this)}>เพิ่มรายละเอียด</Button>

                                        <Button className="btnbuy" style={{ margin: '5px' }} ><Link to={'/DTProduct?dt=' + id_product1[index5] + '&e=e'} >
                                            แก้ไขข้อมูล</Link></Button>
                                    </Card>
                                </Col></>,
                            prosDiv2: <>{this.state.prosDiv2}
                                <Col sm={3}>
                                    <Card style={{ border: '1px solid #2222', padding: '0' }}>
                                        <Card.Img variant="top" src={URL_img + response.data[0].img_product} />
                                        <div style={{ padding: '0.7rem' }}>
                                            <h3 className="nameCut namePro"> {name1}</h3>
                                            <h2 className="titlecart pricePro nameCut">{price1} THB</h2>
                                        </div>
                                        <Button className="btnbuy" style={{ margin: '5px' }} name={id_product1[index5]}
                                            onClick={this.handleShow.bind(this)}>เพิ่มรายละเอียด</Button>

                                        <Button className="btnbuy" style={{ margin: '5px' }} ><Link to={'/DTProduct?dt=' + id_product1[index5] + '&e=e'} >
                                            แก้ไขข้อมูล</Link></Button>
                                    </Card>
                                </Col>
                                {/* <Col sm={3}>
                                    <Card>
                                        <Card.Img variant="top" src={URL_img + response.data[0].img_product} />
                                        <Card.Body>

                                            <Card.Text>
                                                {name1}
                                            </Card.Text>
                                            <Card.Title className="titlecart">{price1} THB</Card.Title>
                                            {this.state.divpro}
                                            <Button className="btnbuy" name={id_product1[index5]}
                                                onClick={this.handleShow.bind(this)}>เพิ่มรายละเอียด</Button>

                                            <Button className="btnbuy" ><Link to={'/DTProduct?dt=' + id_product1[index5] + '&e=e'} >
                                                แก้ไขข้อมูล</Link></Button>

                                        </Card.Body>
                                    </Card>
                                </Col> */}

                            </>,
                            prosDiv3: <>{this.state.prosDiv3}
                                <Col >
                                    <Card style={{ border: '1px solid #2222', padding: '0', width: '8.8rem' }}>
                                        <Card.Img variant="top" src={URL_img + response.data[0].img_product} />
                                        <div style={{ padding: '0.7rem' }}>
                                            <h3 className="nameCut namePro"> {name1}</h3>
                                            <h2 className="titlecart pricePro nameCut">{price1} THB</h2>
                                        </div>
                                        <Button className="btnbuy" style={{ margin: '5px' }} name={id_product1[index5]}
                                            onClick={this.handleShow.bind(this)}>เพิ่มรายละเอียด</Button>
                                        <Button className="btnbuy" style={{ margin: '5px' }} ><Link to={'/DTProduct?dt=' + id_product1[index5] + '&e=e'} >
                                            แก้ไขข้อมูล</Link></Button>
                                    </Card>
                                </Col>
                            </>,
                            prosDiv4: <>{this.state.prosDiv4}
                                <Col style={{ paddingRight: '0', paddingLeft: '10px' }}>
                                    <Card style={{ border: '1px solid #2222', padding: '0', width: '8rem' }}>
                                        <Card.Img variant="top" src={URL_img + response.data[0].img_product} />
                                        <div style={{ padding: '0.7rem' }}>
                                            <h3 className="nameCut namePro"> {name1}</h3>
                                            <h2 className="titlecart pricePro nameCut">{price1} THB</h2>
                                        </div>
                                        <Button className="btnbuy" style={{ margin: '5px' }} name={id_product1[index5]}
                                            onClick={this.handleShow.bind(this)}>เพิ่มรายละเอียด</Button>
                                        <Button className="btnbuy" style={{ margin: '5px' }} ><Link to={'/DTProduct?dt=' + id_product1[index5] + '&e=e'} >
                                            แก้ไขข้อมูล</Link></Button>
                                    </Card>
                                </Col>
                            </>

                        });
                    }).catch(error => {
                         
                    })
                }
            }

        }).catch(error => {   })
        axios.get(ROOT_API + '/api/typeproperty/').then(response => {
            this.setState({ typeprops: response.data })
        }).catch(error => {});
        const cookies = new Cookies();
        axios.put(ROOT_API + '/api/search/1?id_shop=' + cookies.get('ID_Shop')).then(response => {
            this.setState({ typep1s: response.data });
            let dd = this.state.typep1s.length
            for (let ii1 = 0; ii1 < dd; ii1++) {
                this.setState({
                    divtype: [...this.state.divtype, {
                        "id": this.state.typep1s[ii1].id_type,
                        "name": this.state.typep1s[ii1].name_type,
                        "src": URL_img + response.data[ii1].img_type
                    }]
                })
            }

        }).catch(error => {
             
        });

    }
    test() {
      
    }
    handleShow(e) {
        this.setState({
            show1: true,
            id_product_p: e.target.name
        })
    }
    handleClose() { this.setState({ show1: false }) }
    handleSubmit() {
        if (this.state.i1 == 1 && this.state.formData2.file != '' && this.state.name_p != '') {
            axios.post(ROOT_API + '/api/property?name_property=' + this.state.name_p
                + '&id_product=' + this.state.id_product_p
                + '&id_type_property=' + this.state.id_type_p, this.state.formData2
            ).then(Response => {
               
                alert('insert sucsess !!');
                this.setState({ show1: false })

            }).then(error => {   });
        } else {
            this.setState({ disableDiv43: true })
        }

        if (this.state.i1 == 0 && this.state.name_p != '') {
            axios.post(ROOT_API + '/api/property?name_property=' + this.state.name_p
                + '&id_product=' + this.state.id_product_p
                + '&id_type_property=' + this.state.id_type_p, this.state.formData2
            ).then(Response => {
               
                alert('insert sucsess !!');
                this.setState({ show1: false })

            }).then(error => {   });
        } else {
            this.setState({ disableDiv43: true })
        }


    }
    selecttype(e) {
        this.setState({ disableDiv43: false })
        if (e.target.value == 'sea9686f197e9t503e9fa3205070403894w') {
            this.setState({ disableDiv41: true, disableDiv42: true, i1: 1 })
        } else if (e.target.value == 'sdsadsad3234234dasdas') {
            this.state.formData2.file = ''
            this.setState({ disableDiv41: true, disableDiv42: false, i1: 0 })
        } else if (e.target.value == 'dsfdf34r2d23d2d3d23d3df') {
            this.setState({ disableDiv41: true, disableDiv42: true, i1: 1 })
        }
        this.setState({ id_type_p: e.target.value })
    }
    input(e) {
        this.setState({ name_p: e.target.value })
        this.setState({ disableDiv43: false })
    }
    img(e) {
        this.setState({ disableDiv43: false })
        let files = e.target.files;

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (e) => {
            console.warn("img data ", e.target.result)
            this.state.formData2.file = e.target.result
            console.warn("formdata", this.state.formData2)
        }
        reader.onloadend = (e) => {
            this.setState({
                imgSrc2: [reader.result]
            })
        }
    }
    clicktype(e) {

        const cookies = new Cookies();
        axios.delete(ROOT_API + '/api/search/1?id_shop=' + cookies.get('ID_Shop') + '&id_type=' + e).then(response => {
            this.setState({ prosDiv1: response.data });
            let dd = this.state.prosDiv1.length
            this.setState({ prosDiv: [],prosDiv2: [],prosDiv3: [],prosDiv4: [] })
            for (let ii1 = 0; ii1 < dd; ii1++) {
                this.setState({
                    prosDiv: <>{this.state.prosDiv}

                        <Col sm={3}>
                            <Card style={{ border: '1px solid #2222', padding: '0' }}>
                                <Card.Img variant="top" src={URL_img + response.data[ii1].img_product} />
                                <div style={{ padding: '0.7rem' }}>
                                    <h3 className="nameCut namePro"> {this.state.prosDiv1[ii1].name_product}</h3>
                                    <h2 className="titlecart pricePro nameCut">{this.state.prosDiv1[ii1].price_product} THB</h2>
                                </div>
                                <Button className="btnbuy" style={{ margin: '5px' }} name={this.state.prosDiv1[ii1].id_product}
                                    onClick={this.handleShow.bind(this)}>เพิ่มรายละเอียด</Button>
                                <Button className="btnbuy" style={{ margin: '5px' }} ><Link  to={'/DTProduct?dt=' + this.state.prosDiv1[ii1].id_product + '&e=e'} >
                                    แก้ไขข้อมูล</Link></Button>
                            </Card>
                        </Col></>,
                    prosDiv2: <>{this.state.prosDiv2}
                        <Col sm={3}>
                            <Card style={{ border: '1px solid #2222', padding: '0' }}>
                                <Card.Img variant="top" src={URL_img + response.data[ii1].img_product} />
                                <div style={{ padding: '0.7rem' }}>
                                    <h3 className="nameCut namePro"> {this.state.prosDiv1[ii1].name_product}</h3>
                                    <h2 className="titlecart pricePro nameCut">{this.state.prosDiv1[ii1].price_product} THB</h2>
                                </div>
                                <Button className="btnbuy" style={{ margin: '5px' }} name={this.state.prosDiv1[ii1].id_product}
                                    onClick={this.handleShow.bind(this)}>เพิ่มรายละเอียด</Button>
                                <Button className="btnbuy" style={{ margin: '5px' }} > <Link to={'/DTProduct?dt=' + this.state.prosDiv1[ii1].id_product + '&e=e'} >
                                    แก้ไขข้อมูล</Link></Button>
                            </Card>
                        </Col>
                    </>,
                    prosDiv3: <>{this.state.prosDiv3}
                        <Col >
                            <Card style={{ border: '1px solid #2222', padding: '0', width: '8.8rem' }}>
                                <Card.Img variant="top" src={URL_img + response.data[ii1].img_product} />
                                <div style={{ padding: '0.7rem' }}>
                                    <h3 className="nameCut namePro"> {this.state.prosDiv1[ii1].name_product}</h3>
                                    <h2 className="titlecart pricePro nameCut">{this.state.prosDiv1[ii1].price_product} THB</h2>
                                </div>
                                <Button className="btnbuy" style={{ margin: '5px' }} name={this.state.prosDiv1[ii1].id_product}
                                    onClick={this.handleShow.bind(this)}>เพิ่มรายละเอียด</Button>
                                <Button className="btnbuy" style={{ margin: '5px' }} > <Link to={'/DTProduct?dt=' + this.state.prosDiv1[ii1].id_product + '&e=e'} >
                                    แก้ไขข้อมูล</Link></Button>
                            </Card>
                        </Col>
                    </>,
                    prosDiv4: <>{this.state.prosDiv4}
                        <Col style={{ paddingRight: '0', paddingLeft: '10px' }}>
                            <Card key={this.state.prosDiv1[ii1].id_product} style={{ border: '1px solid #2222', padding: '0', width: '8rem' }}>
                                <Card.Img variant="top" src={URL_img + response.data[ii1].img_product} />
                                <div style={{ padding: '0.7rem' }}>
                                    <h3 className="nameCut namePro"> {this.state.prosDiv1[ii1].name_product}</h3>
                                    <h2 className="titlecart pricePro nameCut">{this.state.prosDiv1[ii1].price_product} THB</h2>
                                </div>
                                <Button className="btnbuy" style={{ margin: '5px' }} name={this.state.prosDiv1[ii1].id_product}
                                    onClick={this.handleShow.bind(this)}>เพิ่มรายละเอียด</Button>
                                <Button className="btnbuy" style={{ margin: '5px' }} ><Link  to={'/DTProduct?dt=' + this.state.prosDiv1[ii1].id_product + '&e=e'} >
                                    แก้ไขข้อมูล</Link></Button>
                            </Card>
                        </Col>
                    </>

                });
            

            }

        }).catch(error => {
             
        });

    }
    render() {
        var divStyle41 = {
            display: this.state.disableDiv41 ? 'block' : 'none'
        }; var divStyle42 = {
            display: this.state.disableDiv42 ? 'block' : 'none'
        }; var divStyle43 = {
            display: this.state.disableDiv43 ? 'block' : 'none'
        };
        return (
            <div>
                <Container>

                    <div className="CPro">
                        <Row className="TypeCardD" >
                            {this.state.divtype.map(ty =>
                                <Col sm={2} style={{ width: '30%' }} >
                                    <a href="##" className="aa" >
                                        <div id={ty.id} onClick={() => { this.clicktype(ty.id) }} >
                                            <Card key={ty.id} style={{ border: '.5px solid #2222' }}>
                                                <h5 className="nameCut">{ty.name}</h5>
                                            </Card>
                                        </div>

                                    </a>
                                </Col>
                            )}
                        </Row>
                        <Row className="TypeCardM" >
                            {this.state.divtype.map(ty =>
                                <Col sm={2} style={{ width: '40%' }} >
                                    <a href="##" className="aa" >
                                        <div id={ty.id} onClick={() => { this.clicktype(ty.id) }} >
                                            <Card key={ty.id} style={{ border: '.5px solid #2222' }}>
                                                <h5 className="nameCut">{ty.name}</h5>
                                            </Card>
                                        </div>

                                    </a>
                                </Col>
                            )}
                        </Row>
                        <Row className="TypeCardMm">
                            {this.state.divtype.map(ty =>
                                <Col sm={2} style={{ width: '50%' }} >
                                    <a href="##" className="aa" >
                                        <div id={ty.id} onClick={() => { this.clicktype(ty.id) }} >
                                            <Card key={ty.id} style={{ border: '.5px solid #2222' }}>
                                                <h5 className="nameCut">{ty.name}</h5>
                                            </Card>
                                        </div>

                                    </a>
                                </Col>
                            )}
                        </Row>
                    </div>


                    <Modal show={this.state.show1} onHide={this.handleClose.bind(this)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>เพิ่มรายละเอียด : </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form className="text-center" >
                                <select className="form-control" onChange={this.selecttype.bind(this)} >
                                    <option value="เลือกประเภทรายละเอียด">เลือกประเภทรายละเอียด</option>
                                    {this.state.typeprops.map(typeprop =>
                                        <option value={typeprop.id_type_property}>
                                            {typeprop.name_type_property}</option>
                                    )}
                                </select>

                                <input style={divStyle41} className="form-control" onChange={this.input.bind(this)}
                                    placeholder="กรอกชื่อรายละเอียด" ></input>
                                <img style={divStyle42} src={this.state.imgSrc2} width="50px"></img>
                                <input style={divStyle42} type="file" name="file" onChange={this.img.bind(this)}></input>
                                <Alert style={divStyle43} key='danger2' variant='danger'>
                                    กรุณากรอกข้อมูลให้ครบ
                                    </Alert>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="btnbuy" onClick={this.handleClose.bind(this)}>
                                Close
                                </Button>
                            <Button className="btnbuy"variant="primary" onClick={this.handleSubmit.bind(this)}>
                                Save
                                </Button>
                        </Modal.Footer>
                    </Modal>
                    <Row className="showPD">
                        {this.state.prosDiv}
                    </Row>
                    <Row className="reshowPM">
                        {this.state.prosDiv2}
                    </Row>
                    <Row className="reshowPMS">
                        {this.state.prosDiv3}
                    </Row>
                    <Row className="reshowPMSS">
                        {this.state.prosDiv4}
                    </Row>

                </Container>

            </div>
        )
    }
}
export default CardProductEdit
