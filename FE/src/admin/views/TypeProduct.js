import React, { Component, useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import Navbar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Addtype from '../components/addType';
import '../css/type.css';
import p1 from '../img/type-2019-12-11_12-28-13.jpg'
import { useHistory } from "react-router-dom";
import photo from '../img/photo.png';
// import '../css/App.css';
import axios from 'axios';
import ROOT_API from '../../config/API'
import URL_img from '../../config/URL_img'
import {
  Image, Container, Row, Col, Table, Button, Modal, ButtonToolbar,
  Card, ListGroup, Dropdown, DropdownButton, SplitButton, Alert
} from 'react-bootstrap';


function Example1(props) {
  let history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name_type, setName_type] = useState('');
  const [status_type, setstatus_type] = useState('');
  const [disableDiv1, setdisableDiv1] = useState(false);
  const [disableDiv2, setdisableDiv2] = useState(false);
  const [disableButton, setdisableButton] = useState(false);

  var divStyle1 = {
    display: disableDiv1 ? 'block' : 'none'
  };
  var divStyle2 = {
    display: disableDiv2 ? 'block' : 'none'
  };
  var divStyleButton = {
    display: disableButton ? 'block' : 'none'
  };
  const handleName_typeChange = (e) => {
    const name1 = props.t3ts.map(t3t => t3t.name_type)
    let i = 0;


    for (let t1 = 0; t1 < name1.length; t1++) {

      if (name1[t1] == e.target.value) {
        i++;
      }

    }
    if (i >= 1) {
      setdisableDiv2(true)
      setdisableDiv1(false)
      setdisableButton(false)
    } else {
      setdisableButton(true)
      setdisableDiv1(true)
      setdisableDiv2(false)
    }
    if (e.target.value == '') {
      setdisableButton(false)
      setdisableDiv1(false)
      setdisableDiv2(false)
    }
    setName_type(e.target.value);
    setstatus_type("ขาย");
  }
  // const handlestatus_typeChange = (e) => {

  // }
  const handleSubmit = (e) => {
    e.preventDefault();

    // alert();
    axios.put(ROOT_API + '/api/type_product/' + props.id + '?name_type=' + name_type + '&status_type=' + status_type).then(Response => {
      
      // alert('insert sucsess !!')
      history.push("/Admin");
    }).then(error => {
     
    });

  }
  return (
    <>
      <Button className='btnbuy' variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Type ID : {props.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="text-center" >
            <input className="form-control" type="text" name="name_type"
              defaultValue={props.value}
              onChange={handleName_typeChange} maxLength="100"
            />
            <Alert style={divStyle1} key='success' variant='success'>
              สามารถใช้ชื้อนี้ได้
            </Alert>
            <Alert style={divStyle2} key='danger' variant='danger'>
              รายการประเภทนี้มีอยู่แล้ว
            </Alert>
          </form>


        </Modal.Body>
        <Modal.Footer>
          <Button className='btnbuy' onClick={handleClose}>
            Close
          </Button>
          <Button className='btnbuy' style={divStyleButton} variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Example(props) {
  let history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name_type, setName_type] = useState('');
  const [status_type, setstatus_type] = useState('');
  const [src, setsrc] = useState(photo);
  const [formData1, setformData1] = useState({ file: '' });

  // const handlestatus_typeChange = (e) => {

  // }
  const handleSubmit = (e) => {
    if (formData1.file != '') {
      axios.post(ROOT_API + '/api/storage?nameimg=' + props.img, formData1).then(response => {
       
        // alert('insert sucsess !!')
        history.push("/Admin");
      }).catch(error => {});
    } else {
      alert("กรุณาเพิ่มรูปภาพ");
    }
    e.preventDefault();

    // 



  }
  const onChange = (e) => {
    let files = e.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      console.warn("img data ", e.target.result)
      setformData1({ file: e.target.result })

    }
    reader.onloadend = (e) => {
      setsrc([reader.result])
    }
  }
  return (
    <>
      <Button className='btnbuy' variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Type ID : {props.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="text-center" >

            <img width="100px" height="100px" src={src} />
            <input type="file" name="file" onChange={onChange} />

            {/* <input className="form-control" type="text" name="status_type"
              placeholder={props.status}
              onChange={handlestatus_typeChange}

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
function MyVerticallyCenteredModal(props) {
  let history = useHistory();
  const [name_type, setName_type] = useState('');
  const [status_type, setstatus_type] = useState('');
  const [level_type, setlevel_type] = useState('');
  const [formData1, setformData1] = useState({ file: '' });
  const [src, setsrc] = useState(photo);
  const [disableDiv, setdisableDiv] = useState(false);
  const [disableDiv1, setdisableDiv1] = useState(false);
  const [disableDiv2, setdisableDiv2] = useState(false);
  const [disableButton, setdisableButton] = useState(false);

  var divStyle = {
    display: disableDiv ? 'block' : 'none'
  };
  var divStyle1 = {
    display: disableDiv1 ? 'block' : 'none'
  };
  var divStyle2 = {
    display: disableDiv2 ? 'block' : 'none'
  };
  var divStyleButton = {
    display: disableButton ? 'block' : 'none'
  };

  const handleName_typeChange = (e) => {

    const name1 = props.t3ts.map(t3t => t3t.name_type)
    let i = 0;


    for (let t1 = 0; t1 < name1.length; t1++) {

      if (name1[t1] == e.target.value) {
        i++;
      }

    }
    if (i >= 1) {
      setdisableDiv2(true)
      setdisableDiv1(false)
      setdisableButton(false)
    } else {
      setdisableButton(true)
      setdisableDiv1(true)
      setdisableDiv2(false)
    }
    if (e.target.value == '') {
      setdisableButton(false)
      setdisableDiv1(false)
      setdisableDiv2(false)
    }

    setName_type(e.target.value);
    setstatus_type("ขาย");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // alert();
    if (level_type == '' || level_type == "---เลือกหมวดหมู่---") {
      alert("กรุณาเลือกหมวดหมู่")
    } else if (disableDiv == true && formData1.file == "") {
      alert("กรุณาเพิ่มรูปภาพ")
    } else {
     

      axios.post(ROOT_API + '/api/type_product?name_type=' + name_type + '&status_type=' + status_type +
        '&level_type=' + level_type, formData1).then(Response => {
         
          // alert('insert sucsess !!')
          history.push("/Admin");
        }).then(error => {
         
        });
    }


  }
  const onSelect = (e) => {
   
    const eee = e.target.value
    const id1 = props.ss4ss.map(ss4s => ss4s.id)
    const id2 = props.ss5ss.map(ss5s => ss5s.id)
    for (let index = 0; index < id1.length; index++) {

      if (id1[index] == eee) {
        setdisableDiv(true)
      }

    }
    for (let index1 = 0; index1 < id2.length; index1++) {

      if (id2[index1] == eee || eee == 1 || eee == '---เลือกหมวดหมู่---') {
        setdisableDiv(false)
      }

    }
    setlevel_type(e.target.value)
  }
  const onChange = (e) => {
    let files = e.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      console.warn("img data ", e.target.result)
      setformData1({ file: e.target.result })

    }
    reader.onloadend = (e) => {
      setsrc([reader.result])
    }
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Type Product
          </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <form className="text-center" >
          <select class="form-control" id="sel1" name="sellist1" onChange={onSelect}>
            <option>---เลือกหมวดหมู่---</option>
            {props.s2s.map(s2 => <option value={s2.id}>{s2.value}</option>)}

          </select>

          <img style={divStyle} width="100px" height="100px" src={src} />
          <input style={divStyle} type="file" name="file" onChange={onChange} />

          <input className="form-control" type="text" name="name_type"
            placeholder="Enter name"
            onChange={handleName_typeChange}
            value={name_type} maxLength="100" />
          <Alert style={divStyle1} key='success' variant='success'>
            สามารถใช้ชื้อนี้ได้
          </Alert>
          <Alert style={divStyle2} key='danger' variant='danger'>
            รายการประเภทนี้มีอยู่แล้ว
          </Alert>






        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button style={divStyleButton} className="btn" onClick={handleSubmit} >submit</Button>
        <Button className='btnbuy' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <ButtonToolbar>
      <Button className='btnbuy' variant="primary" onClick={() => setModalShow(true)}>
        Add Type Product
        </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        s2s={props.s2s}
        ss4ss={props.ss4ss}
        ss5ss={props.ss5ss}
        t3ts={props.t3ts}
      />
    </ButtonToolbar>
  );
}
function axiosTest(ii) {
  return axios.get(ROOT_API + '/api/storage?nameimg=' + ii).then(response => {
    // returning the data here allows the caller to get it through another .then(...)
    return response.data
  })
}


export default class TypeProduct extends Component {


  constructor() {
    super();
    var img11 = ''
    this.state = {
      types: [],
      modalShow: false,
      image: '',
      s1s: [],
      s2s: [],
      tes3s: '',
      id: '',
      value: '',
      status: '',
      s33s: [],
      s44s: [],
      id2: '',
      value2: '',
      status2: '',
      disableDiv: false,
      disableDiv2: false,
      ss4ss: [],
      ss5ss: [],
      t3ts: []

    }


  }
  componentDidMount() {



    ///////////////////////////////
    axios.get(ROOT_API + '/api/type_product').then(response => {
      this.setState({
        types: response.data
      });

      const level_type1 = this.state.types.map(type => type.level_type);
      const id_type1 = this.state.types.map(type => type.id_type);
      const name_type1 = this.state.types.map(type => type.name_type);
      const status_type1 = this.state.types.map(type => type.status_type);
      const img1 = this.state.types.map(type => type.img_type);

      this.setState({
        s1s: [...this.state.s1s, {
          'id': id_type1[0],
          'value': name_type1[0],
          'status': status_type1[0],

        }],
        ss4ss: [],
        t3ts: []
      })

     
      for (let index = 1; index < level_type1.length; index++) {
        if (level_type1[index] == '1') {
          this.setState({
            t3ts: [...this.state.t3ts, {
              'id': id_type1[index],
              'value': name_type1[index],
              'status': status_type1[index],
            }],
            s2s: [...this.state.s2s, {
              'id': id_type1[index],
              'value': name_type1[index],
              'status': status_type1[index],
            }],
            s3s: [],
            tes2s: '',
            tes3s: '',
            s1s: [...this.state.s1s, {
              'id': id_type1[index],
              'value': '------' + name_type1[index],
              'status': status_type1[index],

            }],
            ss5ss: [...this.state.ss5ss, {
              'id': id_type1[index],
              'value': '------' + name_type1[index],
              'status': status_type1[index],

            }]
          })
          for (let index1 = 0; index1 < level_type1.length; index1++) {
            if (id_type1[index] == level_type1[index1]) {
              this.setState({
                s3s: [],
                t3ts: [...this.state.t3ts, {
                  'id': id_type1[index1],
                  'value': name_type1[index1],
                  'status': status_type1[index1],
                }],
                tes3s: '',
                s1s: [...this.state.s1s, {
                  'id': id_type1[index1],
                  'value': '--------------' + name_type1[index1],
                  'status': status_type1[index1],

                }],
                ss4ss: [...this.state.ss4ss, {
                  'id': id_type1[index1],
                  'value': '--------------' + name_type1[index1],
                  'status': status_type1[index1],

                }]
              })
              for (let index2 = 0; index2 < level_type1.length; index2++) {
                if (id_type1[index1] == level_type1[index2]) {
                  this.setState({
                    t3ts: [...this.state.t3ts, {
                      'id': id_type1[index2],
                      'value': name_type1[index2],
                      'status': status_type1[index2],
                    }]
                  })
                }
              }
            }
          }
        }
      }

     
    }).catch(error => {
     
    })

  }



  delete(e) {
    e.preventDefault();

    const level1 = this.state.types.map(type => type.level_type)
   
    let ii = 0;
    for (let index = 0; index < level1.length; index++) {


      if (level1[index] == e.target.value) {
        ii++;
      }

    }
    if (ii == 0) {
      axios.delete(ROOT_API + '/api/type_product/' + e.target.value).then(Response => {
      
        this.props.history.push('/Admin')
      }).then(error => {
       
      });
    } else {
      alert("มีหมวดหมู่ย่อยอยู่ ไม่สามารถลบได้")
    }

    //  alert(e.target.value);


  }
  delete1(e) {
    e.preventDefault();
    const eee = e.target.value
    axios.get(ROOT_API + "/api/product/").then(response => {

      const id_product1 = response.data.map(respons => respons.id_product)
     
      let ii = 0;
      for (let index = 0; index < id_product1.length; index++) {


        if (id_product1[index] == eee) {
          ii++;
        }

      }
      if (ii == 0) {
        axios.delete(ROOT_API + '/api/type_product/' + eee).then(Response => {
        
          this.props.history.push('/Admin')
        }).then(error => {
         
        });
      } else {
        alert("มีสินค้าอยู่ ไม่สามารถลบได้")
      }
    }).then(error => {
     
    });


    //  alert(e.target.value);


  }
  select1(e) {
    this.setState({
      disableDiv: true,
    })
    const eee = e.target.value;
    axios.get(ROOT_API + "/api/type_product/" + eee).then(response => {
      this.setState({
        id: response.data.id_type,
        value: response.data.name_type,
        status: response.data.status_type
      });
    }).catch(error =>{});

    axios.get(ROOT_API + '/api/type_product').then(response => {
      this.setState({
        types: response.data
      });
      const level_type1 = this.state.types.map(type => type.level_type);
      const id_type1 = this.state.types.map(type => type.id_type);
      const name_type1 = this.state.types.map(type => type.name_type);
      const status_type1 = this.state.types.map(type => type.status_type);
      const img1 = this.state.types.map(type => type.img_type);
     
      this.setState({
        s33s: [],
        s44s: []
      })
      for (let index1 = 0; index1 < level_type1.length; index1++) {
        if (eee == level_type1[index1]) {
          this.setState({
            s33s: [...this.state.s33s, {
              'id': id_type1[index1],
              'value': name_type1[index1],
              'status': status_type1[index1],

            }]

          })


        }

      }

    }).catch(error => {
     
    })
  }
  select2(e) {
    const eee = e.target.value;
    this.setState({
      disableDiv2: true
    })
    axios.get(ROOT_API + "/api/type_product/" + eee).then(response => {
      this.setState({
        id2: response.data.id_type,
        value2: response.data.name_type,
        status2: response.data.status_type
      });
    }).catch(error => {});
    axios.get(ROOT_API + '/api/type_product').then(response => {
      this.setState({
        types: response.data
      });
      const level_type1 = this.state.types.map(type => type.level_type);
      const id_type1 = this.state.types.map(type => type.id_type);
      const name_type1 = this.state.types.map(type => type.name_type);
      const status_type1 = this.state.types.map(type => type.status_type);
      const img1 = this.state.types.map(type => type.img_type);
     
      this.setState({
        s44s: []
      })
      for (let index1 = 0; index1 < level_type1.length; index1++) {
        if (eee == level_type1[index1]) {
          this.setState({
            s44s: [...this.state.s44s, {

              'id': id_type1[index1],
              'value': name_type1[index1],
              'status': status_type1[index1],
              'img': URL_img + img1[index1],
              'nameimg': img1[index1]
            }]

          })


        }

      }

    }).catch(error => {
     
    })

  }

  render() {
    var divStyle = {
      display: this.state.disableDiv ? 'block' : 'none'
    };
    var divStyle2 = {
      display: this.state.disableDiv2 ? 'block' : 'none'
    };


    return (
      <div>



        <Row>
          <Col sm={3}><Navbar /></Col>
          <Col sm={9}>
            <Container>
              <Row>
                <Col>
                  <h1 className="text-center">Add Type Product</h1>
                  <hr />
                  <Row>
                    <Col><App s2s={this.state.s1s} ss4ss={this.state.ss4ss} ss5ss={this.state.ss5ss} t3ts={this.state.types} />
                    </Col>
                  </Row>

                  <Row>
                    <Col> <select class="form-control" id="sel1" name="sellist1" onChange={this.select1.bind(this)} >
                      <option>---เลือกหมวดหมู่---</option>
                      {this.state.s2s.map(s2 => <option value={s2.id}>
                        {s2.value}
                      </option>
                      )}
                    </select>
                    </Col>
                    <Col><div style={divStyle}><Example1 id={this.state.id}
                      value={this.state.value} status={this.state.status}
                      t3ts={this.state.types}
                    />
                      <Button className='btnbuy' value={this.state.id} onClick={this.delete.bind(this)}>Delete</Button></div>
                    </Col>
                  </Row>
                  <Row>
                    <Col> <select style={divStyle} class="form-control" id="s33s" name="s33s" onChange={this.select2.bind(this)}  >
                      <option>---เลือกหมวดหมู่---</option>
                      {this.state.s33s.map(s33 => <option value={s33.id}>
                        {s33.value}
                      </option>
                      )}
                    </select>
                    </Col>
                    <Col>  <div style={divStyle2}><Example1 t3ts={this.state.types} id={this.state.id2}
                      value={this.state.value2} status={this.state.status2} />
                      <Button className='btnbuy' value={this.state.id2} onClick={this.delete.bind(this)}>Delete</Button></div>
                    </Col>
                  </Row>



                  <Table responsive style={{ fontSize: '22px' }}>
                    <thead>

                    </thead>
                    <tbody>
                      {this.state.s44s.map(s44 =>

                        <tr>
                          <td><img width="100px" height="100px" src={s44.img} />
                            <Example id={s44.id} value={s44.value} status={s44.status} img={s44.nameimg} /></td>
                          <td>{s44.value}</td>
                          <td>{s44.status}</td>
                          <td>
                            <Example1 t3ts={this.state.types} id={s44.id} value={s44.value} status={s44.status} />
                            <Button className='btnbuy' value={s44.id} onClick={this.delete1.bind(this)}>Delete</Button>
                          </td>


                        </tr>

                      )}

                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>

            {/* <img src={this.state.img11} /> */}
            {/* {this.state.tess} */}
          </Col>
        </Row>

      </div>
    );
  }
}
