import React, { Component, useState } from 'react';
import Cookies from 'universal-cookie';
import Navbar from '../components/navbar';
import photo from '../img/photo.png';
import axios from 'axios';
import ROOT_API from '../../config/API'
import URL_img from '../../config/URL_img'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css';
import { MdDelete } from 'react-icons/md';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
function Example1() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState('');
  const [src, setsrc] = useState(photo);
  const [formData1, setformData1] = useState({ file: '' });

  const [disableButton, setdisableButton] = useState(false);


  var divStyleButton = {
    display: disableButton ? 'block' : 'none'
  };
  const handleName_typeChange = (e) => {
    setdisableButton(true)
    setName(e.target.value);

  }
  // const handlestatus_typeChange = (e) => {

  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    var date = new Date();
    // alert();
    axios.post(ROOT_API + '/api/banner?name_banner=' + name +
      '&date_banner=' + date.getFullYear() + '-' + (date.getMonth() + 1)
      + '-' + date.getDate() + ' ' + date.getHours('00') + ':'
      + date.getMinutes('00') + ':' + date.getSeconds('00'), formData1
    ).then(Response => {
     
      // alert('insert sucsess !!')
      window.location.reload(false);
    }).then(error => {
     
    });

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
      <Button variant="primary" className="btnbuy" onClick={handleShow}>
        เพิ่ม Banner
        </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่ม Banner : </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="text-center" >
            <input className="form-control" type="text" name="name_type"

              onChange={handleName_typeChange} maxLength="100"
            />
            <img width="100px" height="100px" src={src} />
            <input type="file" name="file" onChange={onChange} />
          </form>


        </Modal.Body>
        <Modal.Footer>
          <Button className="btnbuy" onClick={handleClose}>
            Close
            </Button>
          <Button className="btnbuy" style={divStyleButton} variant="primary" onClick={handleSubmit}>
            Save
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default class Admin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      banner: [],
      src: []
    }
  }

  componentWillMount() {
    const cookies = new Cookies();
    if (cookies.get('Type_Login') == undefined || cookies.get('Type_Login') != 'admin') {
      this.props.history.push('/')
    }
    axios.get(ROOT_API + "/api/banner").then(response => {
      this.setState({ banner: response.data })
      let dd = this.state.banner.length
      const id = this.state.banner.map(banner => banner.id_banner)
      const name = this.state.banner.map(banner => banner.name_banner)
      const img = this.state.banner.map(banner => banner.img_banner)
      for (let index = 0; index < dd; index++) {

        this.setState({
          src: [...this.state.src, {
            'id': id[index],
            'name': name[index],
            'src': URL_img + img[index],
            'name_src': img[index],
          }]
        })

      }
    }).catch(error => {});

  }
  delbanner(e) {

    axios.delete(ROOT_API + "/api/banner/" + e.target.value + "?nameimg=" + e.target.id).then(response => {
      window.location.reload(false);
    }).catch(error => {});
  }
  render() {
    const cookies = new Cookies();

   
    return (
      <div >


        <Row>
          <Col sm={3} className="navb" ><Navbar /></Col>
          <Col sm={9}><h1>Hello Admin</h1>
            <Container>
              <Example1 />
              <hr />
              <Row>

                {this.state.src.map(src =>
                  <Col sm={4}>
                    <Card key={src.id} >
                      <Card.Img variant="top" src={src.src} />
                      <h3>{src.name}</h3>
                      <Button className="btnbuy" key={'btn-' + src.id} value={src.id} id={src.name_src}
                        onClick={this.delbanner.bind(this)}
                      ><MdDelete /></Button>
                    </Card>
                  </Col>
                )}

              </Row>
            </Container>

          </Col>
        </Row>

      </div>
    );
  }
}
