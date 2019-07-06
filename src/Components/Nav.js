import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleUpdateUser } from '../redux/loginReducer'
import { Link } from 'react-router-dom'
import homeLogo from '../assets/home_logo.png'
import newLogo from '../assets/new_logo.png'
import shutDown from '../assets/shut_down.png'
import axios from 'axios'

export class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    logout = () => {
        axios
            .post('/api/auth/logout')
            .then(() => {
                this.props.handleUpdateUser({}) 
            })
            .catch(err => console.log(err));
    }


    render() {
        console.log(this.props.user)
        return (
            <div className='nav-container'>
            <div className='nav background'>
                <img src={this.props.user.profile} alt="profile pic" id='profile-pic'/>
                <h6>{this.props.user.username}</h6>
                <Link to={`/Dashboard/${this.props.user.id}`}>
                <img src={homeLogo} alt="home"/>
                </Link>
                <Link to={'/Post'}>
                <img src={newLogo} alt="new post"/>
                </Link>
            <div className="logout">
                <img src={shutDown} alt="logout"
                onClick={() => this.logout()}
                />
            </div>
            </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state
    return { user }
}

export default connect(mapStateToProps, { handleUpdateUser })(Nav)
