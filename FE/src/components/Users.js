import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ROOT_API from '../config/API'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';



export default class Users extends Component {

    constructor(){
        super();
        this.state = {
            userss:[]
        }
    }

    componentWillMount(){

        axios.get(ROOT_API+'/api/users').then(response=>{
            this.setState({
                userss: response.data
            });
        }).catch(error =>{
             
        })
    }


    render() {
        return (
            <div className="container">
               {this.state.userss.map(users => 
               <h1>
                    <Link to={"/users/"+users.id}>{users.name_user}</Link>
                </h1>
                )}
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Users />, document.getElementById('example'));
}
