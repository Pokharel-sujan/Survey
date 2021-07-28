import React, {Component} from 'react';
import {connect}from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';

class Header extends Component{
    renderContent(){
        switch (this.props.auth){
            case null:
            return ;    //still deciding

            case false:
            return (
                <li>
                    <a href= "/auth/google">Login With Google</a>
                </li>
            ); // user is logged out logged out
            default:
            return [ <li key='1'><Payments/></li>,
                <li key ='3'style ={{margin:'0 10px'}} > Credits:{this.props.auth.credits}</li>,
                <li key ='2'><a href= "/api/logout">Logout</a></li>   ]; // 'logged in';

        }
    }

    render(){

        console.log(this.props);
        return (
            <nav>
                <div className = 'nav-wrapper'>
                <Link to ={this.props.auth ? '/surveys': '/' } className = 'left brand-logo'>Emaily </Link>
                <ul className ='right'>
                {this.renderContent()}
                </ul>

                </div>
            </nav>
        );
    }
}
function mapStateToProps({auth}){
    return {auth};
}
export default connect(mapStateToProps)(Header);
// hello this is the change