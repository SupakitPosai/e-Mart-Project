import React, { Component } from 'react'
// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/header.css'
import ROOT_API from '../config/API'
import URL_img from '../config/URL_img'
import {
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Dropdown,
  DropdownButton, Image, Badge
} from 'react-bootstrap'
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { TiShoppingCart } from 'react-icons/ti'
import { MdKeyboardBackspace } from 'react-icons/md'
import { FaRegUser, FaHome, FaSearch } from 'react-icons/fa'
import { IoMdArrowDropdown } from "react-icons/io";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import axios from 'axios';
import LoadingScreen from 'react-loading-screen';
import Cookies from 'universal-cookie';
import logo_D from '../img/logo_D.png'
import logo_m from '../img/logo_m.png'
const cookies = new Cookies();
export default class Header1 extends Component {
  constructor() {
    super();
    this.state = {
      Name_user: "",
      post: {},
      types: [],
      shops: [],
      s1s: [],
      s2s: [],
      s3s: [],
      tess: '',
      tes2s: '',
      tes3s: '',
      divShop: '', divShop2: '',
      idsh: '',
      idsh1: '',
      prices: '',
      total: 0, Loading: true,
      src: '', Cpay: 0, Cor: 0, CCart: 0, disableDiv2: false,
      searchtxt: '', disableDiv: true
    }
  }

  componentWillMount() {

    const cookies = new Cookies();
    // cookies.set('Language', 'en', { path: '/' });
    axios.get(ROOT_API + '/api/count?id_user=' + cookies.get('ID_Login')).then(response => {
      this.setState({ Cpay: response.data })
    }).catch(error => {});
    axios.get(ROOT_API + '/api/count/1?id_user=' + cookies.get('ID_Login')).then(response => {
      this.setState({ CCart: response.data })
    }).catch(error => {});
    axios.get(ROOT_API + '/api/users/' + cookies.get('ID_Login')).then(response => {
      this.setState({ post: response.data });
      // axios.get("/api/users/" + cookies.get('ID_Login')).then(response => {
      // }).catch(error => {});
      var img1 = response.data.img_path
      var imgname = img1.substring(0, 4)

      if (imgname == 'http') {
        this.setState({ src: img1, Loading: false })
      } else {
        this.setState({ src: URL_img + img1, Loading: false })
      }

    }).catch(error => {});

    this.setState({
      Name_user: this.state.post.name_user
    });
    this.setState({
      divShop: <Dropdown.Item className="Drop" href="/CShop">

        {cookies.get('Language') == undefined && 'สร้างร้านค้า'}
        {cookies.get('Language') == 'th' && 'สร้างร้านค้า'}
        {cookies.get('Language') == 'en' && 'Create SHOP'}

      </Dropdown.Item >,
      divShop2: <Nav.Link className="navbar2"><Link to="/CShop">
        CREATE SHOP
        </Link></Nav.Link>

    })

    axios.get(ROOT_API + '/api/shop').then(response => {
      this.setState({
        shops: response.data
      });
      const id_user1 = this.state.shops.map(shop => shop.id_user);
      const id_shop1 = this.state.shops.map(shop => shop.id_shop);

      for (let index = 0; index < id_user1.length; index++) {
        if (cookies.get('ID_Login') == id_user1[index]) {
          cookies.set('ID_Shop', id_shop1[index], { path: '/' });

          axios.post(ROOT_API + '/api/count?id_shop=' + cookies.get('ID_Shop')).then(response => {
            this.setState({ Cor: response.data })

            this.setState({
              idsh: "/MyShop"

            })
            if (response.data != 0) {
              this.setState({
                divShop: <><Dropdown.Item className="Drop" href={this.state.idsh} >

                  {cookies.get('Language') == undefined && 'ร้านค้าของฉัน'}
                  {cookies.get('Language') == 'th' && 'ร้านค้าของฉัน'}
                  {cookies.get('Language') == 'en' && 'My SHOP'}

                </Dropdown.Item>
                  <Dropdown.Item className="Drop" href="/Order" >

                    {cookies.get('Language') == undefined && 'ออเดอร์สินค้า'}
                    {cookies.get('Language') == 'th' && 'ออเดอร์สินค้า'}
                    {cookies.get('Language') == 'en' && 'ORDER'}

                    <Badge pill variant="danger">
                      {response.data}
                    </Badge>
                  </Dropdown.Item>
                </>,
                divShop2: <><Nav.Link className="navbar2" href={this.state.idsh}>MY SHOP</Nav.Link>
                  <Nav.Link className="navbar2" href="/Order">ORDER</Nav.Link></>,

              })
            } else {
              this.setState({
                divShop: <><Dropdown.Item className="Drop" href={this.state.idsh} >

                  {cookies.get('Language') == undefined && 'ร้านค้าของฉัน'}
                  {cookies.get('Language') == 'th' && 'ร้านค้าของฉัน'}
                  {cookies.get('Language') == 'en' && 'My SHOP'}

                </Dropdown.Item>
                  <Dropdown.Item className="Drop" href="/Order">

                    {cookies.get('Language') == undefined && 'ออเดอร์สินค้า'}
                    {cookies.get('Language') == 'th' && 'ออเดอร์สินค้า'}
                    {cookies.get('Language') == 'en' && 'ORDER'}

                  </Dropdown.Item>
                </>,
                divShop2: <><Nav.Link className="navbar2" href={this.state.idsh}>MY SHOP</Nav.Link>
                  <Nav.Link className="navbar2" href="/Order">ORDER</Nav.Link></>,

              })
            }

          }).catch(error => {});

        }

      }

     
    }).catch(error => {
       
    })
    axios.put(ROOT_API + '/api/dePutCar/1?id_user=' + cookies.get('ID_Login')).then(response => {
      this.setState({ prices: response.data });
      const price = this.state.prices.map(price => price.price_product)
      const num = this.state.prices.map(price => price.num_product)
      for (let index = 0; index < price.length; index++) {
        this.setState({
          total: this.state.total + (Number(price[index]) * Number(num[index]))
        })

      }

    }).catch(error => {});
    axios.get(ROOT_API + '/api/type_product').then(response => {
      this.setState({
        types: response.data
      });

      const level_type1 = this.state.types.map(type => type.level_type);
      const id_type1 = this.state.types.map(type => type.id_type);
      const name_type1 = this.state.types.map(type => type.name_type);
      const status_type1 = this.state.types.map(type => type.status_type);


     
      for (let index = 1; index < level_type1.length; index++) {
        if (level_type1[index] == 1) {
          this.setState({
            s2s: [],
            s3s: [],
            tes2s: '',
            tes3s: ''

          })

          for (let index1 = 0; index1 < level_type1.length; index1++) {
            if (id_type1[index] == level_type1[index1]) {
              this.setState({
                s3s: [],
                tes3s: ''
              })
              for (let index2 = 0; index2 < level_type1.length; index2++) {
                if (id_type1[index1] == level_type1[index2]) {
                  this.setState({

                    s3s: [...this.state.s3s, {
                      'id': id_type1[index2],
                      'value': '----------------------------' + name_type1[index2],
                      'status': status_type1[index2]
                    }],
                    tes3s: <>{this.state.tes3s}<Dropdown.Item className="dropdown-item1" href={"/ShowProduct?product=" + id_type1[index2]} >

                      {name_type1[index2]}

                    </Dropdown.Item></>
                  });
                }

              }
              this.setState({
                s2s: [...this.state.s2s, {
                  'id': id_type1[index1],
                  'value': '--------------' + name_type1[index1],
                  'status': status_type1[index1],
                  ...this.state.s3s
                }],
                tes2s: <>{this.state.tes2s}<DropdownButton drop='right' variant="secondary" title={name_type1[index1]}
                  id='dropdown-button-drop-right' key='right'>
                  {this.state.tes3s}
                </DropdownButton></>
              });

            }

          }
          this.setState({
            s1s: [...this.state.s1s, {
              'id': id_type1[index],
              'value': '------' + name_type1[index],
              'status': status_type1[index],
              ...this.state.s2s
            }],
            tess: <>{this.state.tess} <DropdownButton
              drop='right' variant="secondary" title={name_type1[index]}
              id='dropdown-button-drop-right' key='right' >
              {this.state.tes2s}
            </DropdownButton></>
          });


        }
      }

     
    }).catch(error => {
       
    })



  }
  chsearch(e) {
    this.setState({ searchtxt: e.target.value })
  }
  showsearch() {
    this.setState({ disableDiv: true })
  }
  th() {
   
    cookies.set('Language', 'th', { path: '/' });
    window.location.reload(false);
  }
  en() {
   
    cookies.set('Language', 'en', { path: '/' });
    window.location.reload(false);
  }
  Sre() {
    this.setState({
      disableDiv: false,
      disableDiv2: true
    })
  }
  BSre() {
    this.setState({
      disableDiv: true,
      disableDiv2: false
    })
  }
  render() {
    var divStyleh1 = {
      display: this.state.disableDiv ? 'block' : 'none',
      marginBottom: "0"
    };
    var divStyle = {
      display: this.state.disableDiv ? 'block' : 'none'
    };
    var divStyle2 = {
      display: this.state.disableDiv2 ? 'block' : 'none'
    }; var divStyle2icon = {
      display: this.state.disableDiv2 ? 'block' : 'none',
      alignSelf: 'center', marginRight: '7'
    }; var divStyle2But = {
      display: this.state.disableDiv2 ? 'block' : 'none',
      padding: "5"
    };
    let container = {
      height: '5px',
      width: '100px',
    }
    const cookies = new Cookies();
    let shop, cat, le, dd;
    if (cookies.get('Language') == undefined) {
      shop = 'ร้านค้า'
      cat = 'หมวดหมู่'
      dd = 'ค้นหา....'
      le = 'TH/EN'
    } else if (cookies.get('Language') == 'th') {
      shop = 'ร้านค้า'
      cat = 'หมวดหมู่'
      dd = 'ค้นหา....'
      le = 'TH/EN'
    } else if (cookies.get('Language') == 'en') {
      shop = 'SHOP'
      cat = 'CATEGORY'
      dd = 'Search.....'
      le = 'TH/EN'
    }
    if (cookies.get('ID_Login') != undefined && this.state.post.name_user != "") {

      return (

        <div className="header">
          <LoadingScreen
            loading={this.state.Loading}
            bgColor='#f1f1f1'
            spinnerColor='#3c6a15'
            textColor='#676767'
            // logoSrc='/logo.png'
            text='Loading...'
          ></LoadingScreen>
          <div className="namedropm1 he ">
            <div className="he " >
              <Container className="navh1 " >
                <Row >

                  <Col className="navlogo namedropm1" style={{ alignSelf: 'center' }} sm={2}>

                    <Link to="/">
                      <Image src={logo_D} width="60px" />
                    </Link>
                  </Col>
                  <Col className="navsearch namedropm1" sm={7}>
                    <InputGroup >
                      <FormControl placeholder={dd} className="inpg" onChange={this.chsearch.bind(this)} />
                      <InputGroup.Append>
                        <Button variant="outline-secondary" className="btnSearch" href={"/ShowProduct?s=" + this.state.searchtxt}>

                          {cookies.get('Language') == undefined && 'ค้นหา'}
                          {cookies.get('Language') == 'th' && 'ค้นหา'}
                          {cookies.get('Language') == 'en' && 'Search'}

                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>
                  <Col sm={3} style={{ alignSelf: "center" }} >
                    <Row>
                      <Col className="tuser">
                        <Dropdown >
                          <Dropdown.Toggle variant="success" id="dropdown-basic" className="Drop dropname">
                            <Row className="itemsdrop ">
                              <Col sm={3}> <Image src={this.state.src} width="35px" style={{ border: '2px solid #2222' }} roundedCircle />
                              </Col>
                              <Col sm={7}  ><h4 >{this.state.post.name_user}</h4>
                              </Col>
                              <Col sm={2} className="drop1"><IoMdArrowDropdown /></Col>
                            </Row>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="menu1">
                            {this.state.divShop}
                            <Dropdown.Item className="Drop" href="/Profile" >

                              {cookies.get('Language') == undefined && 'ข้อมูลส่วนตัว'}
                              {cookies.get('Language') == 'th' && 'ข้อมูลส่วนตัว'}
                              {cookies.get('Language') == 'en' && 'Profile'}

                            </Dropdown.Item>
                            <Dropdown.Item className="Drop" href="/Signin">

                              {cookies.get('Language') == undefined && 'ออกจากระบบ'}
                              {cookies.get('Language') == 'th' && 'ออกจากระบบ'}
                              {cookies.get('Language') == 'en' && 'Log out'}

                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col className="navlogo namedropm" style={{ alignSelf: 'center' }}>
                    {/* <h1 className="navh">EMART</h1> */}
                    <Link to="/">
                      <Image src={logo_D} width="60px" />
                    </Link>

                  </Col>

                  <Col className="navsearch namedropm" >
                    <InputGroup >
                      <FormControl placeholder={dd} className="inpg" onChange={this.chsearch.bind(this)} />
                      <InputGroup.Append>
                        <Button variant="outline-secondary" className="btnSearch" href={"/ShowProduct?s=" + this.state.searchtxt}>

                          Search

                      </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>

                </Row>
              </Container>
            </div>
          </div>
          <div className="navd">
            <Navbar expand="lg" className="navbar1">
              <Navbar.Toggle />
              <Navbar.Collapse id="basic-navbar-nav">
                <Container>
                  <Nav className="mr-auto">
                    <Nav.Link href="/" className="navbar2" active>
                      <FaHome />
                    </Nav.Link>
                    <NavDropdown title={shop} id="basic-nav-dropdown">
                      {this.state.shops.map(shop =>
                        <NavDropdown.Item className="navbar2 dropdown-item1" href={"/Shop?n=" + shop.id_shop} >

                          {shop.name_shop}

                        </NavDropdown.Item>
                      )}
                    </NavDropdown>
                    <NavDropdown title={cat}
                      id="basic-nav-dropdown">
                      {this.state.tess}
                    </NavDropdown>
                    <div style={container}>
                      <Nav.Link className="navbar2" href='/Payment' >

                        <NotificationBadge count={this.state.Cpay} effect={Effect.SCALE} />

                        {cookies.get('Language') == undefined && 'แจ้งชำระเงิน'}
                        {cookies.get('Language') == 'th' && 'แจ้งชำระเงิน'}
                        {cookies.get('Language') == 'en' && 'PAYMENT'}

                      </Nav.Link>
                    </div>


                    <Nav.Link className="navbar2" href='/Tracking' >
                      {cookies.get('Language') == undefined && 'ตรวจสอบสถานะ'}
                      {cookies.get('Language') == 'th' && 'ตรวจสอบสถานะ'}
                      {cookies.get('Language') == 'en' && 'TRACKING'}
                    </Nav.Link>
                    <NavDropdown title={le} id="basic-nav-dropdown">
                      <NavDropdown.Item className="navbar2 dropdown-item1" onClick={this.th.bind(this)} >
                        TH
                        </NavDropdown.Item>
                      <NavDropdown.Item className="navbar2 dropdown-item1" onClick={this.en.bind(this)} >
                        EN
                        </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Row className="cartt1" >
                    <Col className="carti">
                      <div >
                        <NotificationBadge count={this.state.CCart} effect={Effect.SCALE} />
                        <Link to="/Cart" className="cartt"><TiShoppingCart />    </Link>
                      </div>

                    </Col>
                    <Col ><h4 className="h4_1">
                      {cookies.get('Language') == undefined && 'ตะกร้า'}
                      {cookies.get('Language') == 'th' && 'ตะกร้า'}
                      {cookies.get('Language') == 'en' && 'Cart'}
                    </h4> <h4 className="h4_2"> {this.state.total} THB</h4></Col>
                  </Row>
                </Container>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <div className="navm" >
            <Navbar expand="lg" className="navbar1" variant="dark" fixed="top">



              <Navbar.Toggle style={divStyle} />
              <div className="iti1"></div>
              <Link style={divStyleh1} to="/">
                <Image src={logo_m} width="60px" />
              </Link>

              <Col className="iti"></Col>
              <div className="iti1"></div>
              <FaSearch style={divStyle} className=" btnS" onClick={this.Sre.bind(this)} />
              <div className="iti1"></div>
              <div className="cartim " style={divStyle} >
                <NotificationBadge count={this.state.CCart} effect={Effect.SCALE} />
                <Link to="/Cart" className="cartt"><TiShoppingCart />    </Link>
              </div>
              <div className="iti1"></div>
              <Dropdown style={divStyle} >
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="Drop dropname">
                  <div className="itemsdrop ">
                    <Image src={this.state.src} width="38px" style={{ border: '2px solid #2222' }} roundedCircle />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="menu1">
                  {this.state.divShop}
                  <Dropdown.Item className="Drop" href="/Profile">
                    {cookies.get('Language') == undefined && 'ข้อมูลส่วนตัว'}
                    {cookies.get('Language') == 'th' && 'ข้อมูลส่วนตัว'}
                    {cookies.get('Language') == 'en' && 'Profile'}
                  </Dropdown.Item>
                  <Dropdown.Item className="Drop" href="/Signin">
                    {cookies.get('Language') == undefined && 'ออกจากระบบ'}
                    {cookies.get('Language') == 'th' && 'ออกจากระบบ'}
                    {cookies.get('Language') == 'en' && 'Log out'}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>


              <InputGroup >
                <MdKeyboardBackspace style={divStyle2icon} onClick={this.BSre.bind(this)} />
                <FormControl style={divStyle2} placeholder={dd} className="inpg" onChange={this.chsearch.bind(this)} />
                <InputGroup.Append >
                  <Button variant="outline-secondary" style={divStyle2But} className="btnSearch" href={"/ShowProduct?s=" + this.state.searchtxt}>
                    <FaSearch />
                  </Button>
                </InputGroup.Append>
              </InputGroup>


              {/* <Row className="cartt1" >
                <Col><Navbar.Toggle />
                </Col>
                <Col><h1 >EMART</h1>
                </Col>
                <Col className="cartim"> <div >
                  <NotificationBadge count={this.state.CCart} effect={Effect.SCALE} />
                  <Link to="/Cart" className="cartt"><TiShoppingCart />    </Link>
                </div>
                </Col>
                <Col className="tuser">
                  <Dropdown >
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="Drop dropname">
                      <Row className="itemsdrop ">
                        <Col sm={3} > <Image src={this.state.src} width="35px" roundedCircle />
                        </Col>
                      </Row>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="menu1">
                      {this.state.divShop}
                      <Dropdown.Item className="Drop" href="/Profile">
                        {cookies.get('Language') == undefined && 'ข้อมูลส่วนตัว'}
                        {cookies.get('Language') == 'th' && 'ข้อมูลส่วนตัว'}
                        {cookies.get('Language') == 'en' && 'Profile'}
                      </Dropdown.Item>
                      <Dropdown.Item className="Drop" href="/Signin">
                        {cookies.get('Language') == undefined && 'ออกจากระบบ'}
                        {cookies.get('Language') == 'th' && 'ออกจากระบบ'}
                        {cookies.get('Language') == 'en' && 'Log out'}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

              </Row> */}
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/" className="navbar2" active>
                    <FaHome />
                  </Nav.Link>
                  <NavDropdown title={shop} id="basic-nav-dropdown">
                    {this.state.shops.map(shop =>
                      <NavDropdown.Item className="navbar2 dropdown-item1" href={"/Shop?n=" + shop.id_shop}>
                        {shop.name_shop}
                      </NavDropdown.Item>
                    )}
                  </NavDropdown>
                  <NavDropdown title={cat} id="basic-nav-dropdown">
                    {this.state.tess}
                  </NavDropdown>
                  <Nav.Link className="navbar2" href='/Payment'>
                    <div style={{ width: 90 }} >
                      <NotificationBadge count={this.state.Cpay} effect={Effect.SCALE} />
                      {cookies.get('Language') == undefined && 'แจ้งชำระเงิน'}
                      {cookies.get('Language') == 'th' && 'แจ้งชำระเงิน'}
                      {cookies.get('Language') == 'en' && 'PAYMENT'}
                    </div></Nav.Link>
                  <Nav.Link className="navbar2" href="/Tracking">
                    {cookies.get('Language') == undefined && 'ตรวจสอบสถานะ'}
                    {cookies.get('Language') == 'th' && 'ตรวจสอบสถานะ'}
                    {cookies.get('Language') == 'en' && 'TRACKING'}
                  </Nav.Link>
                  <NavDropdown title={le} id="basic-nav-dropdown">
                    <NavDropdown.Item className="navbar2 dropdown-item1" onClick={this.th.bind(this)} >
                      TH
                        </NavDropdown.Item>
                    <NavDropdown.Item className="navbar2 dropdown-item1" onClick={this.en.bind(this)}>
                      EN
                        </NavDropdown.Item>
                  </NavDropdown>
                </Nav>


              </Navbar.Collapse>
            </Navbar>
            <div className="ccc"></div>


          </div>
        </div>
      )
    } else {
      return (
        <div className="header">
          <div className="offD">
            <div className="he">
              <Container className="navh1">
                <Row>
                  <Col sm={2} style={{ alignSelf: 'center' }}>
                    {/* <h1 className="navh">EMART</h1> */}
                    <Link to="/">
                      <Image src={logo_D} width="60px" />
                    </Link>

                  </Col>
                  <Col sm={7}>
                    <InputGroup className="mb-3 ">
                      <FormControl placeholder={dd} className="inpg" onChange={this.chsearch.bind(this)} />
                      <InputGroup.Append>
                        <Button variant="outline-secondary" className="btnSearch" href={"/ShowProduct?s=" + this.state.searchtxt}>
                          {cookies.get('Language') == undefined && 'ค้นหา'}
                          {cookies.get('Language') == 'th' && 'ค้นหา'}
                          {cookies.get('Language') == 'en' && 'Search'}
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Col>
                  <Col sm={3}>
                    <Row>
                      <Col className="text-right iuser">
                        <FaRegUser />
                      </Col>
                      <Col className="tuser">
                        <Link className="link1" to="/Signin">
                          <h4 className="regis">

                            {cookies.get('Language') == undefined && 'เข้าสู่ระบบ'}
                            {cookies.get('Language') == 'th' && 'เข้าสู่ระบบ'}
                            {cookies.get('Language') == 'en' && 'SIGN IN'}
                          </h4>
                        </Link>
                        <Link className="link1" to="/Register">
                          <h4 className="regis">

                            {cookies.get('Language') == undefined && 'สมัครสมาชิก'}
                            {cookies.get('Language') == 'th' && 'สมัครสมาชิก'}
                            {cookies.get('Language') == 'en' && 'REGISTER'}
                          </h4>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </div>
            <Navbar expand="lg" className="navbar1" sticky="top">
              <Navbar.Brand href="#home"></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <div className="ttt"></div>
                <Nav className="mr-auto">
                  <Nav.Link href="/" className="navbar2" active>
                    <FaHome />
                  </Nav.Link>
                  <NavDropdown title={shop} id="basic-nav-dropdown">
                    {this.state.shops.map(shop =>
                      <NavDropdown.Item className="navbar2 dropdown-item1" href={"/Shop?n=" + shop.id_shop}>
                        {shop.name_shop}
                      </NavDropdown.Item>

                    )}

                  </NavDropdown>
                  <NavDropdown title={cat} id="basic-nav-dropdown">
                    {this.state.tess}
                  </NavDropdown>
                  <Nav.Link className="navbar2" href="/Signin">
                    {cookies.get('Language') == undefined && 'แจ้งชำระเงิน'}
                    {cookies.get('Language') == 'th' && 'แจ้งชำระเงิน'}
                    {cookies.get('Language') == 'en' && 'PAYMENT'}
                  </Nav.Link>
                  <Nav.Link className="navbar2" href="/Signin">
                    {cookies.get('Language') == undefined && 'ตรวจสอบสถานะ'}
                    {cookies.get('Language') == 'th' && 'ตรวจสอบสถานะ'}
                    {cookies.get('Language') == 'en' && 'TRACKING'}
                  </Nav.Link>
                  <NavDropdown title={le} id="basic-nav-dropdown">
                    <NavDropdown.Item className="navbar2 dropdown-item1" onClick={this.th.bind(this)} >
                      TH
                        </NavDropdown.Item>
                    <NavDropdown.Item className="navbar2 dropdown-item1" onClick={this.en.bind(this)} >
                      EN
                        </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Row className="cartt1" >
                  <Col className="carti"><TiShoppingCart />
                  </Col>
                  <Col >
                    <h4 className="h4_1">
                      {cookies.get('Language') == undefined && 'ตะกร้า'}
                      {cookies.get('Language') == 'th' && 'ตะกร้า'}
                      {cookies.get('Language') == 'en' && 'Cart'}
                    </h4> <h4 className="h4_2"> 0.00 THB</h4></Col>
                </Row>

                <div className="ttt"></div>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <div className="offM">

            <Navbar expand="lg" className="navbar1" variant="dark" fixed="top">
              <Navbar.Toggle style={divStyle} />
              <div className="iti1"></div>
              <Link style={divStyleh1} to="/">
                <Image src={logo_m} width="60px" />
              </Link>
              {/* <h1  >EMART</h1> */}
              <Col className="iti"></Col>
              <div className="iti1"></div>
              <FaSearch style={divStyle} className=" btnS" onClick={this.Sre.bind(this)} />
              <div className="iti1"></div>
              <Link to="/Signin" style={divStyle} className="cartt cartim"><TiShoppingCart />    </Link>
              <div className="iti1"></div>
              <Dropdown style={divStyle}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="Drop dropname">
                  <Row className="itemsdrop ">
                    <FaRegUser className="usericon" />
                  </Row>
                </Dropdown.Toggle>
                <Dropdown.Menu className="menu1">
                  <Dropdown.Item className="Drop" href="/Signin">
                    {cookies.get('Language') == undefined && 'เข้าสู่ระบบ'}
                    {cookies.get('Language') == 'th' && 'เข้าสู่ระบบ'}
                    {cookies.get('Language') == 'en' && 'SIGN IN'}
                  </Dropdown.Item>
                  <Dropdown.Item className="Drop" href="/Register">
                    {cookies.get('Language') == undefined && 'สมัครสมาชิก'}
                    {cookies.get('Language') == 'th' && 'สมัครสมาชิก'}
                    {cookies.get('Language') == 'en' && 'REGISTER'}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <div className="iti11"></div>
              <InputGroup >
                <MdKeyboardBackspace style={divStyle2icon} onClick={this.BSre.bind(this)} />
                <FormControl style={divStyle2} placeholder={dd} className="inpg" onChange={this.chsearch.bind(this)} />
                <InputGroup.Append >
                  <Button variant="outline-secondary" style={divStyle2But} className="btnSearch" href={"/ShowProduct?s=" + this.state.searchtxt}>
                    <FaSearch />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="mr-auto">
                  <Nav.Link href="/" className="navbar2" active>
                    <FaHome />
                  </Nav.Link>
                  <NavDropdown title={shop} id="basic-nav-dropdown">
                    {this.state.shops.map(shop =>
                      <NavDropdown.Item className="navbar2 dropdown-item1" href={"/Shop?n=" + shop.id_shop}>
                        {shop.name_shop}
                      </NavDropdown.Item>
                    )}
                  </NavDropdown>
                  <NavDropdown title={cat} id="basic-nav-dropdown">
                    {this.state.tess}
                  </NavDropdown>
                  <Nav.Link className="navbar2" href='/Signin'>

                    {cookies.get('Language') == undefined && 'แจ้งชำระเงิน'}
                    {cookies.get('Language') == 'th' && 'แจ้งชำระเงิน'}
                    {cookies.get('Language') == 'en' && 'PAYMENT'}
                  </Nav.Link>
                  <Nav.Link className="navbar2" href="/Signin">
                    {cookies.get('Language') == undefined && 'ตรวจสอบสถานะ'}
                    {cookies.get('Language') == 'th' && 'ตรวจสอบสถานะ'}
                    {cookies.get('Language') == 'en' && 'TRACKING'}
                  </Nav.Link>
                  <NavDropdown title={le} id="basic-nav-dropdown">
                    <NavDropdown.Item className="navbar2 dropdown-item1" onClick={this.th.bind(this)} >
                      TH
                        </NavDropdown.Item>
                    <NavDropdown.Item className="navbar2 dropdown-item1" onClick={this.en.bind(this)}>
                      EN
                        </NavDropdown.Item>
                  </NavDropdown>
                </Nav>


              </Navbar.Collapse>
            </Navbar><div className="ccc"></div>




          </div>
        </div>
      )
    }

  }
}
