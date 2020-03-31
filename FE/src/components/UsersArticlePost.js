import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ROOT_API from '../config/API'

export default class UsersArticlePost extends Component {

    constructor(){
        super();
        this.state = {
            name_user: '',
            card_number: '',
            username: '',
            password: '',
            email_user: '',
            tel_user: '',
            type_user:'user'
        }
    }
    
    handlename_userChange(e){
        this.setState({
            name_user: e.target.value
        });
    }
    handlecard_numberChange(e){
        this.setState({
            card_number: e.target.value
        });
    }
    handleusernameChange(e){
        this.setState({
            username: e.target.value
        });
    }
    handlepasswordChange(e){
        this.setState({
            password: e.target.value
        });
    }
    handleemail_userChange(e){
        this.setState({
            email_user: e.target.value
        });
    }
    handletel_userChange(e){
        this.setState({
            tel_user: e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        
        axios.post(ROOT_API+'/api/users',this.state).then(Response =>{
          
            alert('insert sucsess !!')
        }).then(error => {
             
        });

    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Users Article Post</div>

                            <div className="card-body">

                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <input type="text" name="name_user" 
                                placeholder="Enter name" 
                                onChange={this.handlename_userChange.bind(this)}
                                value={this.state.name_user}/>
                                <input type="text" name="card_number" 
                                placeholder="Enter card_number"
                                onChange={this.handlecard_numberChange.bind(this)}
                                value={this.state.card_number} />
                                <input type="text" name="username" 
                                placeholder="Enter username" 
                                onChange={this.handleusernameChange.bind(this)}
                                value={this.state.username}/>
                                <input type="text" name="password" 
                                placeholder="Enter password"
                                onChange={this.handlepasswordChange.bind(this)}
                                value={this.state.password} />
                                <input type="text" name="email_user" 
                                placeholder="Enter email_user"
                                onChange={this.handleemail_userChange.bind(this)}
                                value={this.state.email_user}  />
                                <input type="text" name="tel_user" placeholder="Enter tel_user" 
                                onChange={this.handletel_userChange.bind(this)}
                                value={this.state.tel_user}  />
                                <button type="submit" >submit</button>

                            </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


