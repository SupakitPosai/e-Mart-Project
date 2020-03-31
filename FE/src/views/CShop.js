import React, { Component } from 'react';
import p1 from '../img/photo.png';
// import React from 'react' 
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import ROOT_API from '../config/API'
// import '../css/App.css';
// import {Navbar ,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap';

// import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { Container, Row, Col, Image, Card, Button, Alert } from 'react-bootstrap';
import Cookies from 'universal-cookie';

class CShop extends Component {
  constructor() {
    super();
    this.state = {
      formData: { file: '' },
      imgSrc: [p1],
      name_shop: '',
      address_shop: '',
      tax_id: '',
      tel_shop: '',
      t1: '',
      t2: '',
      t3: '',
      t4: '',
      t5: '',
      t6: '',
      shops: [],
      disableDiv: false, disableDiv2: false, disableDiv3: false,
      disableDiv4: false, disableDiv5: false, disableDiv6: false,
      disableDiv7: false, disableDiv8: false, disableDiv9: false,
      disableDiv10: false, disableDiv11: false, disableDiv12: false, nameShopp: ''
    }
  }
  componentDidMount() {
    axios.get(ROOT_API + '/api/shop').then(response => {
      this.setState({
        shops: response.data
      });
    }).catch(error => {
       
    })

  }

  img(e) {
    this.setState({
      disableDiv10: false
    })
    let files = e.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      console.warn("img data ", e.target.result)
      this.state.formData.file = e.target.result
      console.warn("formdata", this.state.formData)
    }
    reader.onloadend = (e) => {
      this.setState({
        imgSrc: [reader.result]
      })
    }
  }
  handlename_shopChange(e) {
    this.setState({
      disableDiv3: false
    })
    const name1 = this.state.shops.map(shop => shop.name_shop)
    let i = 0;


    for (let t1 = 0; t1 < name1.length; t1++) {

      if (name1[t1] == e.target.value) {
        i++;
      }

    }
    if (i >= 1) {
      this.setState({
        disableDiv: false,
        disableDiv2: true,
        nameShopp: 'name'
      })

    } else {
      this.setState({
        disableDiv: true,
        disableDiv2: false,
        nameShopp: ''
      })

    }
    if (e.target.value == '') {
      this.setState({
        disableDiv: false,
        disableDiv2: false
      })

    }

    this.setState({
      name_shop: e.target.value
    })
  }
  t1(e) {
    this.setState({
      disableDiv4: false
    })
    this.setState({

      t1: e.target.value
    });
  }
  t2(e) {
    this.setState({
      disableDiv5: false
    })
    this.setState({
      t2: e.target.value
    });

  }
  t3(e) {
    this.setState({
      disableDiv6: false
    })
    this.setState({
      t3: e.target.value
    });

  }
  t4(e) {
    this.setState({
      disableDiv7: false
    })
    this.setState({
      t4: e.target.value
    });

  }
  t5(e) {
    this.setState({
      disableDiv8: false
    })
    this.setState({
      t5: e.target.value
    });

  }
  handleaddress_shopChange(e) {
    this.setState({
      disableDiv9: false
    })
    this.setState({
      address_shop: this.state.t1 + " หมู่ " +
        this.state.t2 + " ตำบล " +
        this.state.t3 + " อำเภอ " +
        this.state.t4 + " จังหวัด " +
        this.state.t5 + " " +
        e.target.value
    });

  }
  handletax_idChange(e) {
    this.setState({
      disableDiv11: false
    })
    this.setState({
      tax_id: e.target.value
    });
  }
  handletel_shopChange(e) {
    this.setState({
      disableDiv12: false
    })
    this.setState({
      tel_shop: e.target.value
    });   
  }
  handleSubmit(e) {

    // + '&address_shop=' +
    //   + '&tax_id=' + this.state.tax_id
    //   + '&tel_shop=' + this.state.tel_shop
    let ii = 0;
    if (this.state.name_shop == '') {
      ii++;
      this.setState({
        disableDiv3: true
      })
    }
    if (this.state.t1 == '') {
      ii++;
      this.setState({
        disableDiv4: true
      })
    }
    if (this.state.t2 == '') {
      ii++;
      this.setState({
        disableDiv5: true
      })
    }
    if (this.state.t3 == '') {
      ii++;
      this.setState({
        disableDiv6: true
      })
    }
    if (this.state.t4 == '') {
      ii++;
      this.setState({
        disableDiv7: true
      })
    }
    if (this.state.t5 == '') {
      ii++;
      this.setState({
        disableDiv8: true
      })
    }


    if (this.state.address_shop == (this.state.t1 + " หมู่ " +
      this.state.t2 + " ตำบล " +
      this.state.t3 + " อำเภอ " +
      this.state.t4 + " จังหวัด " +
      this.state.t5 + " ") || this.state.address_shop == '') {
      ii++;
      this.setState({
        disableDiv9: true
      })
    }
    if (this.state.formData.file == '') {
      ii++;
      this.setState({
        disableDiv10: true
      })
    }
    if (this.state.tax_id == '') {
      ii++;
      this.setState({
        disableDiv11: true
      })
    }
    if (this.state.tel_shop == '') {
      ii++;
      this.setState({
        disableDiv12: true
      })
    }
    if (this.state.nameShopp == 'name') {
      ii++;
    }
    if (ii == 0) {
      const cookies = new Cookies();
      e.preventDefault();
      //(this.state.address_shop)
      axios.post(ROOT_API + '/api/shop?name_shop=' + this.state.name_shop
        + '&address_shop=' + this.state.address_shop
        + '&tax_id=' + this.state.tax_id
        + '&tel_shop=' + this.state.tel_shop
        + '&id_user=' + cookies.get('ID_Login'), this.state.formData).then(Response => {
          //(Response);
          alert('insert sucsess !!');
          this.props.history.push('/')
        }).then(error => {
           
        });

    }


  }
  render() {

    var divStyle = {
      display: this.state.disableDiv ? 'block' : 'none'
    }; var divStyle2 = {
      display: this.state.disableDiv2 ? 'block' : 'none'
    }; var divStyle3 = {
      display: this.state.disableDiv3 ? 'block' : 'none'
    }; var divStyle4 = {
      display: this.state.disableDiv4 ? 'block' : 'none'
    }; var divStyle5 = {
      display: this.state.disableDiv5 ? 'block' : 'none'
    }; var divStyle6 = {
      display: this.state.disableDiv6 ? 'block' : 'none'
    }; var divStyle7 = {
      display: this.state.disableDiv7 ? 'block' : 'none'
    }; var divStyle8 = {
      display: this.state.disableDiv8 ? 'block' : 'none'
    }; var divStyle9 = {
      display: this.state.disableDiv9 ? 'block' : 'none'
    }; var divStyle10 = {
      display: this.state.disableDiv10 ? 'block' : 'none'
    }; var divStyle11 = {
      display: this.state.disableDiv11 ? 'block' : 'none'
    }; var divStyle12 = {
      display: this.state.disableDiv12 ? 'block' : 'none'
    };
    return (
      <div>


        <Container className="text-center">
          <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
              <Card>
                <Container>
                  <h1>Create Shop</h1>
                  <Image src={this.state.imgSrc} height="100" width="100" /><br />
                  <input type="file" name="file" onChange={this.img.bind(this)} />
                  <Alert style={divStyle10} key='danger10' variant='danger'>
                    กรุณาเพิ่มรูป
                    </Alert>
                  <hr />
                  <form  >
                    <input className="form-control" placeholder="ชื่อร้านค้า"
                      onChange={this.handlename_shopChange.bind(this)} value={this.state.name_shop} maxLength="100" ></input>
                    <Alert style={divStyle} key='success' variant='success'>
                      สามารถใช้ชื้อนี้ได้
                    </Alert>
                    <Alert style={divStyle2} key='danger2' variant='danger'>
                      มีร้านค้านี้อยู่แล้ว
                    </Alert>
                    <Alert style={divStyle3} key='danger3' variant='danger'>
                      กรุณากรอกชื่อร้าน
                    </Alert>
                    <Row>
                      <Col>
                        <input className="form-control" placeholder="บ้านเลขที่" maxLength="10"
                          onChange={this.t1.bind(this)}  ></input>
                        <Alert style={divStyle4} key='danger4' variant='danger'>
                          กรุณากรอกบ้านเลขที่
                    </Alert>
                      </Col>
                      <Col>
                        <input className="form-control" placeholder="หมู่ที่" maxLength="10"
                          onChange={this.t2.bind(this)} ></input>
                        <Alert style={divStyle5} key='danger5' variant='danger'>
                          กรุณากรอกหมู่
                    </Alert>
                      </Col>
                      <Col>
                        <input className="form-control" placeholder="ตำบล" maxLength="50"
                          onChange={this.t3.bind(this)} ></input>
                        <Alert style={divStyle6} key='danger6' variant='danger'>
                          กรุณากรอกตำบล
                    </Alert>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <input className="form-control" placeholder="อำเภอ" maxLength="50"
                          onChange={this.t4.bind(this)} ></input>
                        <Alert style={divStyle7} key='danger7' variant='danger'>
                          กรุณากรอกอำเภอ
                    </Alert>
                      </Col>
                      <Col>
                        <input className="form-control" placeholder="จังหวัด" maxLength="50"
                          onChange={this.t5.bind(this)} ></input>
                        <Alert style={divStyle8} key='danger8' variant='danger'>
                          กรุณากรอกจังหวัด
                    </Alert>
                      </Col>
                      <Col>
                        <NumberFormat format="#####" className="form-control" placeholder="รหัสไปษณีย์"
                          onChange={this.handleaddress_shopChange.bind(this)} />
                        <Alert style={divStyle9} key='danger9' variant='danger'>
                          กรุณากรอกรหัสไปษณีย์
                    </Alert>
                      </Col>
                    </Row>


                    {/* <textarea className="form-control" rows="5" id="comment" placeholder="Address Shop"
                    onChange={this.handleaddress_shopChange.bind(this)} value={this.state.address_shop}></textarea> */}
                    <input className="form-control" placeholder="เลขที่เสียภาษี" maxLength="15"
                      onChange={this.handletax_idChange.bind(this)} value={this.state.tax_id}></input>
                    <Alert style={divStyle11} key='danger11' variant='danger'>
                      กรุณากรอกรหัสไปษณีย์
                    </Alert>
                    <NumberFormat placeholder="เบอร์โทร" format="###-###-####" className="form-control"
                      onChange={this.handletel_shopChange.bind(this)} />
                    <Alert style={divStyle12} key='danger12' variant='danger'>
                      กรุณากรอกเบอร์โทร
                    </Alert><br />
                    {/* <input className="form-control" placeholder="Tel Shop"
                    onChange={this.handletel_shopChange.bind(this)} value={this.state.tel_shop}></input> */}

                    <Button onClick={this.handleSubmit.bind(this)}>บันทึก</Button>
                  </form>
                </Container>
              </Card>
            </Col>
            <Col sm={2}></Col>

          </Row>



        </Container>

      </div>
    )
  }
}
export default CShop
