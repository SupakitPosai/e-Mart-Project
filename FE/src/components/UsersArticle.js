import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import ROOT_API from '../config/API'



export default class UsersArticle extends Component {

    constructor(props){
        super(props);
        this.state = {
            post: {}
        };
    }

    componentDidMount(){
        axios.get(ROOT_API+"/api/users/" + this.props.match.params.id).then(response => {
            this.setState({post : response.data });
        }).catch(error => {});
    }

   
    render() {
       if(this.state.post){
        return (
            <div>
            <h1>Hello</h1>
             <h1> {this.state.post.id} </h1>
             <p> {this.state.post.address_user} </p>
             </div>
        );
       }else {
           return null;
       }
    }
}

