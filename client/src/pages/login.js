import React, { Component } from 'react';
import axios from 'axios';
import { Button, Row } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';





function ShouldRegister(props) {
    if (props.register) {
        return (
            <div>
                <div className='form'>
                    <Row>
                        <label for="setUserName" className='form-label'>Enter a username</label>
                        <input name='setUserName' placeholder='Enter a username' onChange={props.handleChange} />
                    </Row>
                    <Row>
                        <label for="setPassword" className='form-label'>Enter your password</label>
                        <input name='setPassword' placeholder='Enter a password' onChange={props.handleChange} />
                    </Row>
                    <Row>
                        <label for="confirmPassword" className='form-label'>Reenter your password</label>
                        <input name='confirmPassword' placeholder='Reeneter your password' onChange={props.handleChange} />
                    </Row>
                </div>
                <Button className='my-2' variant="primary" onClick={props.login}>Register</Button>
            </div>
        );
    }
    else {
        return (
            <div>
                <div className='form'>
                    <Row>
                        <label for="setUserName" className='form-label'>Enter a username</label>
                        <input name='setUserName' type='text' placeholder='Enter a username' onChange={props.handleChange} />
                    </Row>
                    <Row>
                        <label for="setPassword" className='form-label'>Enter your password</label>
                        <input name='setPassword' type='password' placeholder='Enter a password' onChange={props.handleChange} />
                    </Row>
                </div>
                <Button className='my-2' variant="primary" onClick={props.login}>Login</Button>
            </div>
        );
    }
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchData: [],
            loggedIn: null,
            setUserName: '',
            setPassword: '',
            confirmPassword: '',
            message: '',
            register: null
        };
    }
    handleChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value
        this.setState({
            [nam]: val
        });
    };

    handleRegister = () => {
        this.setState({
            register: !this.state.register,
        })
    }
    handleChange2 = (event) => {
        this.setState({
            reviewUpdate: event.target.value
        });
    };


    login = () => {
        console.log("setUsernName, setPassword, confirmPassword :", this.state.setUserName, this.state.setPassword, this.state.confirmPassword);
        if (this.state.register) {
            console.log("Trying to register")
            if (this.state.setPassword !== this.state.confirmPassword) {
                alert("Passwords did not match!")
            }
            else {
                axios.put('api/register', this.state)
                    .then((res) => {
                        console.log('Response from register', res);
                        if (res.data.message) {
                            this.setState({ message: res.data.message, register: null });
                        } else {
                            this.setState({ message: 'Succesffuly registered!' });
                        }
                    })
            }
        }
        else {
            console.log('Trying to login');
            axios.post('api/login', this.state)
                .then((res) => {
                    console.log('/login results', res);
                    if (res.data.failed) {
                        this.setState({
                            message: res.data.message
                        })
                    }
                    else {
                        this.setState({
                            loggedIn: true,
                            message: res.data.message
                        });
                    }
                })
                .catch(() => { });
        }
    };

    delete = (id) => {
        if (window.confirm("Do you want to delete? ")) {
            axios.delete(`/api/delete/${id}`);
            document.location.reload();
        }
    };

    edit = (id) => {
        axios.put(`/api/update/${id}`, this.state);
        document.location.reload();
    };

    render() {
        console.log('Fetch Data:', this.state.fetchData);

        return (
            <div className='App'>
                {this.state.loggedIn && (<Navigate to='/home' />)}
                {this.state.message ? <div>{this.state.message}</div> : <></>}

                <h1>React App</h1>
                <ShouldRegister handleChange={this.handleChange} login={this.login} register={this.state.register}></ShouldRegister>
                <button className='reg-login' onClick={this.handleRegister}>{!this.state.register ? <span>Don't Have an account? Register</span> : <span>Login</span>}</button>
            </div>
        );

    };

};


export { Login };
