import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleUpdateUser } from '../redux/loginReducer'
import { Input, Label, Button } from 'reactstrap'
import Nav from './Nav'
import axios from 'axios'

export class Post extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            title: '',
            image_url: '',
            content: ''
        }
    }

    componentDidMount() {
        axios
            .get('/api/auth/session')
            .then((user) => {
                this.props.handleUpdateUser(user.data) 
        })
    }

    handleChange= (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    postMessage = () => {
        let { title, image_url, content } = this.state
        
        axios
            .post(`/api/post/`, { title, image_url, content })
            .then(() => {
                alert('your post was successful')
                this.setState({
                    title: '',
                    image_url: '',
                    content: ''
                })
            })
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <Nav />
                <div className='post-dashboard'>
                <div className='post-container'>
                <Label for="exampleFile">Title:</Label>
                <Input type='text' name='title' 
                onChange={e => this.handleChange(e)}
                />

                <Label for="exampleFile">Image URL:</Label>
                <Input type='text' name='image_url' 
                onChange={e => this.handleChange(e)}
                />
                <Label for="exampleFile">Content:</Label>
                <Input type='text' name='content' 
                onChange={e => this.handleChange(e)}
                />
                <Button
                onClick={() => this.postMessage()}
                >
                    Post
                </Button>
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

export default connect(mapStateToProps, { handleUpdateUser })(Post)
