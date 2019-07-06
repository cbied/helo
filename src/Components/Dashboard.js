import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleUpdateUser } from '../redux/loginReducer'
import Nav from './Nav'

export class Dashboard extends Component {
    render() {
        return (
            <div>
                <Nav />
                <h1>Helo {this.props.user.username}</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state
    return { user }
}

export default connect(mapStateToProps, { handleUpdateUser })(Dashboard)
