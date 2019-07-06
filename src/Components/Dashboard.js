import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleUpdateUser } from '../redux/loginReducer'
import { Input, Button } from 'reactstrap'
import Nav from './Nav'
import axios from 'axios'
import searchLogo from '../assets/search_logo.png'

export class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            messages: []
        }
    }

    componentDidMount() {
        axios
            .get('/api/auth/session')
            .then((user) => {
                this.props.handleUpdateUser(user.data) 
        })
        this.getMessages()
    }

    handleChange= (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    getMessages = () => {
        axios
            .get('/api/messages')
            .then(response => {
                this.setState({ messages: response.data })
            })
    }


    render() {
        let { search, messages } = this.state
        let displayMessages = messages.map(message => {
            return (
                <div className='message-map' key={message.id}>
                    <div className='title'>
                        <h2>{message.title}</h2>
                    </div>
                    <div className="info">
                        <h5>{message.username}</h5>
                        <img src={message.img} alt="post"/>
                    </div>
                </div>
            )
        })
        return (
            <div>
            <Nav />
                <div className="dashboard">
                <div className='container search-bar'>
                <div className='search'>
                    <Input type='text' name='search' value={search}
                    onChange={e => this.handleChange(e)}
                    />
                    <Button>
                        <img src={searchLogo} alt="Search"/>
                    </Button>
                    <Button>
                        Reset
                    </Button>
                </div>
                <div className='my-post-check'>
                    <h6>My Posts</h6>{'  '}
                    <Input type='checkbox'/>
                </div>
                </div>

                <div className='messages'>
                    {displayMessages}
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

export default connect(mapStateToProps, { handleUpdateUser })(Dashboard)
