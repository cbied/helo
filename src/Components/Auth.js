import React, { Component } from 'react'
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { handleUpdateUser } from '../redux/loginReducer'
import DashBoard from './Dashboard'
import heloLogo from '../assets/helo_logo.png'
import axios from 'axios'

export class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
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

    logIn = () => {
        let { username, password }= this.state
        axios
            .post('/api/auth/login', { username, password })
            .then(user => {
                this.props.handleUpdateUser(user.data) 
                this.setState({
                    username: '',
                    password: ''
                })
            })
            .catch(() => alert('Incorrect username or password'));
    }

    render() {
        console.log(this.props)
        let { id } = this.props.user
        return (
            !id ? (
                <div className='container center background'>
                <Row className="login background">
                    <Col xs={12}>
                        <Row center="xs">
                        <Col xs={4}>
                        <img src={heloLogo} alt="helo logo"/>
                        <h1>Helo</h1>
                        <Form>
                            <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" placeholder="Username" 
                            onChange={e => this.handleChange(e)}
                            />
                            </FormGroup>
                            <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" placeholder="password" 
                            onChange={e => this.handleChange(e)}
                            />
                            </FormGroup>
                            <Button
                            onClick={() => this.logIn()}
                            >Submit</Button>
                        </Form>
                        </Col>
                        </Row>
                    </Col>
                </Row>
                </div>
            )
            :
            (
                <DashBoard />
            )
            
        )
    }
}

function mapStateToProps(state) {
    const { user } = state
    return { user }
}

export default connect(mapStateToProps, { handleUpdateUser })(Auth)
