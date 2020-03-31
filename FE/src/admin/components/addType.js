import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import axios from 'axios';
import ROOT_API from '../../config/API'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/navbar.css';
import { Navbar, Nav, Modal, ButtonToolbar } from 'react-bootstrap';



export default class Navbar1 extends Component {
  constructor() {
    super();
    this.state = { 
      post: {}
    }
  }

  componentDidMount() {

    const cookies = new Cookies();


    axios.get(ROOT_API + "/api/users/" + cookies.get('ID_Login')).then(response => {
      this.setState({ post: response.data });
    }).catch(error =>{} );


  }
  MyVerticallyCenteredModal(props) {

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
          {/* <form className="text-center" onSubmit={this.handleSubmit.bind(this)}>
                       <input className="form-control" type="text" name="name_type" 
                       placeholder="Enter name" 
                       onChange={this.handlename_typeChange.bind(this)}
                       value={this.state.name_type}/>
                                       
                       <button className="btn" type="submit" >submit</button>
        
                 </form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  App() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
      <ButtonToolbar>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Add Type Product
                </Button>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </ButtonToolbar>
    );
  }
  render() {

    return (
      <div>

        <App />

      </div>
    );
  }
}
