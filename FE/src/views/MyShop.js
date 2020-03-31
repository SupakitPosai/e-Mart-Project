import React, { Component, useState } from 'react';
import p1 from '../img/photo.png';
import axios from 'axios';
import ROOT_API from '../config/API'
import URL_img from '../config/URL_img'
import { FaEdit } from 'react-icons/fa';
import { FiSave } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../components/header';
import Footer from '../components/Footer';
import { default as NumberFormat } from 'react-number-format';
import Cookies from 'universal-cookie';
import CardProductEdit from '../components/CardProductEdit';
// import { useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Nav, Card, Button, Modal, Alert } from 'react-bootstrap';



function Example(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name_product, setname_product] = useState('');
  const [cost_product, setcost_product] = useState('');
  const [price_product, setprice_product] = useState('');
  const [id_type_product, setid_type_product] = useState('');
  const [imgSrc, setimgSrc] = useState([p1]);
  const [formData1, setformData1] = useState({ file: '' });
  const [disableDiv1, setdisableDiv1] = useState(false);
  var divStyle1 = {
    display: disableDiv1 ? 'block' : 'none'
  };
  const handlename_productChange = (e) => {
    setname_product(e.target.value);

  }
  const handlecost_productChange = (e) => {
    setcost_product(e.target.value);

  }
  const handleprice_productChange = (e) => {
    setprice_product(e.target.value);

  }
  const onSelect = (e) => {
    setid_type_product(e.target.value);

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
    const cookies = new Cookies();
    cookies.get('ID_Shop')
    //('formData1', formData1)
    if (name_product != '' &&
      cost_product != '' &&
      price_product != '' &&
      id_type_product != '' &&
      imgSrc != '' &&
      formData1.file != '') {
      setdisableDiv1(false)
      axios.post(ROOT_API + '/api/product?id_shop=' + cookies.get('ID_Shop') +
        '&name_product=' + name_product +
        '&cost_product=' + cost_product + ".00" +
        '&price_product=' + price_product + ".00" +
        '&status_product=มีสินค้า' +
        '&id_type_product=' + id_type_product, formData1).then(Response => {
          //(Response);

          alert('insert sucsess !!')
          setShow(false);
          window.location.reload(false);
        }).then(error => {
           
        });
    } else {
      setdisableDiv1(true)
    }


  }
  return (
    <>
      <Button className='btnbuy' variant="primary" onClick={handleShow}>
        เพิ่มสินค้า
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มสินค้า : </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="text-center" >
            <Image src={imgSrc} height="200" width="200" /><br /><br />
            <input className="form-control" type="file" name="file" onChange={onChange} /><br /><br />
            <select class="form-control" id="sel1" name="sellist1" onChange={onSelect}>
              <option >เลือกประเภท</option>
              {props.s3s.map(s3 => <option value={s3.id}>{s3.value}</option>)}
            </select>
            <input className="form-control" type="text" name="name_product"
              placeholder="ชื่อสินค้า" maxLength="100"
              onChange={handlename_productChange}
            />
            {/* <NumberFormat thousandSeparator={true} prefix={''} /> */}
            <input className="form-control" name="cost_product"
              placeholder="ราคาต้นทุน" type="number"
              onChange={handlecost_productChange}
            />
            <input className="form-control" name="price_product"
              placeholder="ราคาขาย" type="number"
              onChange={handleprice_productChange}
            />
          </form>
          <Alert style={divStyle1} key='danger33' variant='danger'>
            กรุณากรอกข้อมูลให้ครบ
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btnbuy' onClick={handleClose}>
            Close
          </Button>
          <Button className='btnbuy' variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function DeliveryM() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name_delivery_method, setname_delivery_method] = useState('');
  const [value_delivery_method, setvalue_delivery_method] = useState('');
  const handlename_delivery_methodChange = (e) => {
    setname_delivery_method(e.target.value);
  }
  const handlevalue_delivery_methodChange = (e) => {
    setvalue_delivery_method(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    if (name_delivery_method != '' && value_delivery_method != '') {
      axios.post(ROOT_API + '/api/deliveryMethod?name_delivery_method=' + name_delivery_method +
        '&value_delivery_method=' + value_delivery_method +
        '&id_shop=' + cookies.get('ID_Shop')).then(Response => {
          //(Response);
          alert('insert sucsess !!')
          setShow(false);
          window.location.reload(false);
        }).then(error => {
           
        });
    } else {
      alert("กรอกข้อมูลให้ครบ")
    }


  }
  return (
    <>
      <Button className='btnbuy' variant="primary" onClick={handleShow}>
        เพิ่มวิธีการจัดส่ง
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มวิธีการจัดส่ง : </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="text-center" >

            <input className="form-control" type="text" name="name_delivery_method"
              placeholder="รายละเอียดการจัดส่ง" maxLength="100"
              onChange={handlename_delivery_methodChange}
            />
            <NumberFormat thousandSeparator={true} prefix={''} className="form-control"
              name="value_delivery_method" placeholder="ค่าบริการ"
              onChange={handlevalue_delivery_methodChange} />
            {/* <input 
            /> */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btnbuy' onClick={handleClose}>
            Close
          </Button>
          <Button className='btnbuy' variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}, key: 0, disableDiv: true, disableDiv2: false, disableDiv3: false,
      s2s: [], s3s: [], tes2s: '', tes3s: '', products: [], typeps: '', typep1s: [],
      pros1: {}, prosDiv: '', delis: [], deliDiv: '', src: '', disableDiv11: false,
      disableDiv12: false, disableDiv41: false, disableDiv42: false, disableDiv43: false, disableDiv44: false,
      shops: [], disableDivtel: true, i1: 0, i2: 0, i3: 0, i4: 0, disableDivname: true, disableDivadd: true, disableDivtax: true,
      name1: '', add1: '', tax1: '', tel1: '',
      show1: false, imgSrc: [p1], formData1: { file: '' }
    };
    this.disableDiv = this.disableDiv.bind(this);
    this.disableDiv2 = this.disableDiv2.bind(this);
    this.disableDiv3 = this.disableDiv3.bind(this);
  }

  componentWillMount() {
    const cookies = new Cookies();
    const shop = cookies.get('ID_Shop') // bar
    //(shop)
    axios.get(ROOT_API + '/api/shop').then(response => {
      this.setState({
        shops: response.data
      });
    }).catch(error => {
       
    })
    axios.get(ROOT_API + "/api/shop/" + shop).then(response => {

      this.setState({
        src: URL_img + response.data.img_shop
      })


      this.setState({ post: response.data });
      this.setState({
        name1: response.data.name_shop,
        add1: response.data.address_shop,
        tax1: response.data.tax_id,
        tel1: response.data.tel_shop,
      })

    }).catch(error => {});

    axios.get(ROOT_API + "/api/deliveryMethod").then(response => {
      this.setState({ delis: response.data });
      const cookies = new Cookies();
      const id_shop2 = this.state.delis.map(deli => deli.id_shop);
      const id_delivery_method2 = this.state.delis.map(deli => deli.id_delivery_method);
      const name_delivery_method2 = this.state.delis.map(deli => deli.name_delivery_method);
      const value_delivery_method2 = this.state.delis.map(deli => deli.value_delivery_method);
      for (let index = 0; index < id_shop2.length; index++) {

        if (id_shop2[index] == cookies.get('ID_Shop')) {
          //('delivery', name_delivery_method2[index])
          this.setState({
            deliDiv: <>{this.state.deliDiv}<Col sm={4}><Card style={{ border: '1px solid #2222', padding: '0.7rem' }}>
              <h2>รายละเอียด : {name_delivery_method2[index]}</h2>
              <h3>ค่าบริการ : {value_delivery_method2[index]}</h3>
              <Button  className='btnbuy' name={id_delivery_method2[index]}
                onClick={this.deldeli.bind(this)}>ลบ</Button></Card></Col><br /></>
          })
        }

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


      //(id_type1.length)
      for (let index = 1; index < level_type1.length; index++) {
        if (level_type1[index] == 1) {


          for (let index1 = 0; index1 < level_type1.length; index1++) {
            if (id_type1[index] == level_type1[index1]) {

              for (let index2 = 0; index2 < level_type1.length; index2++) {
                if (id_type1[index1] == level_type1[index2]) {
                  this.setState({

                    s3s: [...this.state.s3s, {
                      'id': id_type1[index2],
                      'value': name_type1[index2],
                      'status': status_type1[index2]
                    }]
                  });
                }

              }


            }

          }

        }
      }

      //('s3s', this.state.s3s);
    }).catch(error => {
       
    })

  }
  nav(key) {
    //('selected ' + key);
    this.setState({ key });
  }
  disableDiv() {
    this.setState({
      disableDiv: true,
      disableDiv2: false,
      disableDiv3: false
    });

  }
  disableDiv2() {

    this.setState({
      disableDiv: false,
      disableDiv2: true,
      disableDiv3: false
    });

  }
  disableDiv3() {
    this.setState({
      disableDiv: false,
      disableDiv2: false,
      disableDiv3: true
    });
  }
  nameedit(e) {
    const name1 = this.state.shops.map(shop => shop.name_shop)
    let i = 0;


    for (let t1 = 0; t1 < name1.length; t1++) {

      if (name1[t1] == e.target.value) {
        i++;
      }

    }
    if (i >= 1) {
      this.setState({
        disableDiv11: false,
        disableDiv12: true
      })

    } else {
      this.setState({
        disableDiv11: true,
        disableDiv12: false
      })

    }
    if (e.target.value == '') {
      this.setState({
        disableDiv11: false,
        disableDiv12: false
      })

    }

    this.setState({
      name1: e.target.value
    })
  }
  taxedit(e) {
    this.setState({
      tax1: e.target.value
    })
  }
  addedit(e) {
    this.setState({
      add1: e.target.value
    })
  }
  teledit(e) {
    this.setState({
      tel1: e.target.value
    })
  }
  b1() {

    if (this.state.i1 == 0) {
      this.setState({
        disableDiv41: true,
        disableDivname: false,
        i1: this.state.i1 + 1
      })
    } else {
      this.setState({
        disableDiv41: false,
        disableDivname: true,
        disableDiv11: false,
        disableDiv12: false,
        i1: 0
      })
    }
  }
  b2() {
    if (this.state.i2 == 0) {
      this.setState({
        disableDiv42: true,
        disableDivtax: false,
        i2: this.state.i2 + 1
      })
    } else {
      this.setState({
        disableDiv42: false,
        disableDivtax: true,
        i2: 0
      })
    }
  }
  b3() {
    if (this.state.i3 == 0) {
      this.setState({
        disableDiv43: true,
        disableDivadd: false,
        i3: this.state.i3 + 1
      })
    } else {
      this.setState({
        disableDiv43: false,
        disableDivadd: true,
        i3: 0
      })
    }
  }
  b4() {
    if (this.state.i4 == 0) {
      this.setState({
        disableDiv44: true,
        disableDivtel: false,
        i4: this.state.i4 + 1
      })
    } else {
      this.setState({
        disableDiv44: false,
        disableDivtel: true,
        i4: 0
      })
    }

  }
  t1() {
    const cookies = new Cookies();
    axios.get(ROOT_API + '/api/editshop?id_shop=' + cookies.get('ID_Shop') + '&name_shop=' + this.state.name1).then(Response => {
      //(Response);

      this.componentWillMount();
      this.setState({
        disableDiv41: false,
        disableDivname: true,
        disableDiv11: false,
        disableDiv12: false,
        i1: 0
      })
    }).then(error => {
       
    });
  }
  t2() {
    const cookies = new Cookies();
    axios.get(ROOT_API + '/api/editshop/' + cookies.get('ID_Shop') + '?tax_id=' + this.state.tax1).then(Response => {
      //(Response);
      this.componentWillMount();
      this.setState({
        disableDiv42: false,
        disableDivtax: true,
        i2: 0
      })
    }).then(error => {
       
    });
  }
  t3() {
    const cookies = new Cookies();
    axios.post(ROOT_API + '/api/editshop?id_shop=' + cookies.get('ID_Shop') + '&address_shop=' + this.state.add1).then(Response => {
      //(Response);
      this.componentWillMount();
      this.setState({
        disableDiv43: false,
        disableDivadd: true,
        i3: 0
      })
    }).then(error => {
       
    });
  }
  t4() {
    const cookies = new Cookies();
    axios.put(ROOT_API + '/api/editshop/' + cookies.get('ID_Shop') + '?tel_shop=' + this.state.tel1).then(Response => {
      //(Response);
      this.componentWillMount();
      this.setState({
        disableDiv44: false,
        disableDivtel: true,
        i4: 0
      })
    }).then(error => {
       
    });
  }
  handleClose() { this.setState({ show1: false }) }
  www() {
    this.setState({
      show1: true
    })
  }
  handleShow() {
    this.setState({
      show1: true
    })
  }
  onChange(e) {
    let files = e.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {

      this.state.formData1.file = e.target.result
      console.warn("img data ", e.target.result)
      //(this.state.formData1)
    }

    reader.onloadend = (e) => {
      this.setState({
        imgSrc: [reader.result]
      })
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    // const cookies = new Cookies();
    // cookies.get('ID_Shop')
    //('formData1', this.state.formData1)
    if (this.state.formData1.file != '') {
      axios.post(ROOT_API + '/api/storage?nameimg=' + this.state.post.img_shop, this.state.formData1).then(response => {
        //(response);
        alert('insert sucsess !!')

        this.setState({ show1: false })
        window.location.reload(false);
        // history.push("/Admin");
      }).catch(error => {});
    } else {
      alert("กรุณาเพิ่มรูปภาพ");
    }


  }
  deldeli(e) {
    axios.delete(ROOT_API + '/api/deliveryMethod/' + e.target.name).then(response => {
      window.location.reload(false);
    }).catch(error => {});
  }
  render() {
    var divStyle = {
      display: this.state.disableDiv ? 'block' : 'none'
    }; var divStyle2 = {
      display: this.state.disableDiv2 ? 'block' : 'none'
    }; var divStyle3 = {
      display: this.state.disableDiv3 ? 'block' : 'none'
    }; var divStyle11 = {
      display: this.state.disableDiv11 ? 'block' : 'none'
    }; var divStyle12 = {
      display: this.state.disableDiv12 ? 'block' : 'none'
    }; var divStyle41 = {
      display: this.state.disableDiv41 ? 'block' : 'none'
    }; var divStyle42 = {
      display: this.state.disableDiv42 ? 'block' : 'none'
    }; var divStyle43 = {
      display: this.state.disableDiv43 ? 'block' : 'none'
    }; var divStyle44 = {
      display: this.state.disableDiv44 ? 'block' : 'none'
    }; var divStyletel = {
      display: this.state.disableDivtel ? 'block' : 'none'
    }; var divStylename = {
      display: this.state.disableDivname ? 'block' : 'none'
    }; var divStyleadd = {
      display: this.state.disableDivadd ? 'block' : 'none'
    }; var divStyletax = {
      display: this.state.disableDivtax ? 'block' : 'none'
    };
    return (
      <div>

        <Header />
        <Container>
          <br />


          <Nav variant="tabs" activeKey={this.state.key} onSelect={this.nav.bind(this)}>
            <Nav.Item>
              <Nav.Link className='aa a1' eventKey={0} onClick={this.disableDiv}>หน้าร้าน</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className='aa a1' eventKey={1} onClick={this.disableDiv2}>สินค้างทั้งหมด</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className='aa a1' eventKey={2} onClick={this.disableDiv3}>วิธีจัดส่ง</Nav.Link>
            </Nav.Item>
          </Nav>
          <Row style={{ backgroundColor: '#fff' }}>
            {/* {this.state.post.img_shop} */}
            <Col sm={2}></Col>
            <Col sm={8} style={divStyle}>
              <br />

              {/* ///////////// */}


              <Modal show={this.state.show1} onHide={this.handleClose.bind(this)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>เพิ่มสินค้า : </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="text-center" >
                    <Image src={this.state.imgSrc} height="200" width="200" /><br /><br />
                    <input type="file" name="file" onChange={this.onChange.bind(this)} /><br /><br />

                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button className='btnbuy' onClick={this.handleClose.bind(this)}>
                    Close
                    </Button>
                  <Button className='btnbuy' variant="primary" onClick={this.handleSubmit.bind(this)}>
                    Save
                    </Button>
                </Modal.Footer>
              </Modal>
              {/* ///////////// */}
              <Container>
                <Row >
                  <Col >
                    <Row>
                      <Col sm={3} style={{ textAlign: 'center' }}>
                        <Image style={{ height: 100, width: 100, marginBottom: '10px' }} src={this.state.src} roundedCircle />
                        &nbsp; <Button className='btnbuy' variant="primary" onClick={this.www.bind(this)}><FaEdit /></Button>
                      </Col>
                      <Col className="nameshop">
                        <h2>
                          {this.state.post.name_shop} &nbsp;
                        <Button className='btnbuy' onClick={this.b1.bind(this)}><FaEdit /></Button>
                        </h2>
                      </Col>
                    </Row>

                    {/* <h2 style={divStylename}><Image style={{ height: 100, width: 100 }} src={this.state.src} roundedCircle />
                      &nbsp; <Button className='btnbuy' variant="primary" onClick={this.www.bind(this)}><FaEdit /></Button>
                      &nbsp;&nbsp; : {this.state.post.name_shop}&nbsp;
                        <Button className='btnbuy' onClick={this.b1.bind(this)}><FaEdit /></Button></h2> */}
                    <Row>
                      <Col style={divStyle41} sm={8}><input class="form-control" placeholder="ชื่อร้านค้า"
                        defaultValue={this.state.post.name_shop}
                        onChange={this.nameedit.bind(this)} maxLength="100"  ></input>
                      </Col>
                      <Col style={divStyle41} sm={4}><Button className='btnbuy' onClick={this.t1.bind(this)} ><FiSave /></Button>
                        <Button className='btnbuy' onClick={this.b1.bind(this)}><MdClose /></Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Alert style={divStyle11} key='success' variant='success'>
                          สามารถใช้ชื้อนี้ได้
                        </Alert>
                        <Alert style={divStyle12} key='danger2' variant='danger'>
                          มีร้านค้านี้อยู่แล้ว
                        </Alert>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col ><h3 style={divStyletax}>เลขที่ผู้เสียภาษี : {this.state.post.tax_id}&nbsp;
                    <Button className='btnbuy' onClick={this.b2.bind(this)}><FaEdit /></Button></h3>
                    <Row >
                      <Col style={divStyle42} sm={8}><input class="form-control" placeholder="เลขที่เสียภาษี" maxLength="15"
                        onChange={this.taxedit.bind(this)} defaultValue={this.state.post.tax_id}></input>
                      </Col>
                      <Col style={divStyle42} sm={4}><Button className='btnbuy' onClick={this.t2.bind(this)}><FiSave /></Button>
                        <Button className='btnbuy' onClick={this.b2.bind(this)}><MdClose /></Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col ><h3 style={divStyleadd}>ที่อยู่ร้านค้า : {this.state.post.address_shop}&nbsp;
                    <Button className='btnbuy' onClick={this.b3.bind(this)}><FaEdit /></Button></h3>
                    <Row >
                      <Col style={divStyle43} sm={8}><textarea class="form-control" rows="3" id="comment" placeholder="ที่อยู่ร้านค้า"
                        onChange={this.addedit.bind(this)} defaultValue={this.state.post.address_shop} ></textarea>
                      </Col>
                      <Col style={divStyle43} sm={4}><Button className='btnbuy' onClick={this.t3.bind(this)}><FiSave /></Button>
                        <Button className='btnbuy' onClick={this.b3.bind(this)}><MdClose /></Button>
                      </Col>
                    </Row>
                  </Col>

                </Row>
                <Row>
                  <Col ><h3 style={divStyletel}>โทร : {this.state.post.tel_shop}&nbsp;
                    <Button className='btnbuy' onClick={this.b4.bind(this)}><FaEdit /></Button></h3>
                    <Row>
                      <Col style={divStyle44} sm={8}><NumberFormat
                        defaultValue={this.state.post.tel_shop} placeholder="เบอร์โทร" format="###-###-####" class="form-control"
                        onChange={this.teledit.bind(this)} /></Col>
                      <Col style={divStyle44} sm={4}><Button className='btnbuy' onClick={this.t4.bind(this)}><FiSave /></Button>
                        <Button className='btnbuy' onClick={this.b4.bind(this)}><MdClose /></Button></Col>
                    </Row>
                  </Col>

                </Row>




                {/* <input type="text" className="form-control" placeholder="" onChange={this.nameedit.bind(this)} 
                value={this.state.post.name_shop} />
                <textarea class="form-control" rows="5" id="comment" value={this.state.post.address_shop}></textarea> */}
              </Container>


            </Col>
            <Col sm={2}></Col>
          </Row>
          <Row style={{ backgroundColor: '#fff' }}>
            <Col style={divStyle2}>
              <Container> <br /><Example s3s={this.state.s3s} /><hr />
                <Row>

                  {/* {this.state.typeps} */}


                </Row>
                <Row>
                  {/* {this.state.prosDiv} */}
                  <CardProductEdit />

                </Row>

              </Container>


            </Col>
          </Row>
          <Row style={{ backgroundColor: '#fff' }}>
            <Col style={divStyle3}>
              {/* <Card >
                <h2></h2>
                <h3></h3>
              </Card> */}
              <br />
              <DeliveryM />
              <hr />
              <br />
              <Row>
                {this.state.deliDiv}
              </Row>





            </Col>
          </Row>


        </Container>

        <Footer />
      </div>
    )
  }
}
export default Shop
