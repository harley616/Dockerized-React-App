import axios from "axios";
import { Component } from "react";
import { Button } from "react-bootstrap";
import { Navigate, } from "react-router-dom";

export class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedOut: false,
            message: '',
        };
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout() {
        axios.get('api/logout').then(() => { console.log('loggout success'); this.setState({ loggedOut: true }) }).catch(this.setState({ message: 'logout failed' }));
    }

    render() {
        return (
            <div>
                {this.state.loggedOut ? <Navigate to='/login' /> : <></>}
                {this.state.message && <span>{this.state.message}</span>}
                <h1>Cya later</h1>
                <Button onClick={this.handleLogout}>Logout</Button>
            </div>
        )
    }
}