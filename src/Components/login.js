import React from 'react';
import {
    Container, Row, Col,
} from 'reactstrap';
import { Redirect } from 'react-router'
import { Toast, ToastBody, ToastHeader, Jumbotron } from 'reactstrap';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserAddOutlined, UnlockOutlined, StarTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Navbar from './navbar/appnavbar'
import { connect } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../actions/auth'
import axios from 'axios'
import PropTypes from 'prop-types'
class Login extends React.Component {
    state = {
        email: ""
        , password: "",
        redirection: false
    }
    onFinish = values => {
        console.log('Success:', values);
    };
    redirectfun = () => {
        if (this.state.redirection) {
            return <Redirect to="/home" />
        }
    }
    componentDidMount = () => {
    }
    showTest = (val) => {
        toast(val);
    }
    buttonHandler = () => {
        try {
            const { email, password } = this.state
            this.props.login({ email, password })
            this.showTest("You are logging in")

        } catch (err) {
            this.showTest("task is being updated")

        }
    }
    componentDidUpdate() {
        if (localStorage.getItem('authToken')) {
            this.setState({ redirection: true })
        }
    }
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    }
    render() {
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };
        return (
            <div >
                {/* <Navbar /> */}

                <Container>
                    <ToastContainer />

                    <Row>{this.redirectfun()}
                        <Col sm="4"></Col>
                        <div >
                            <Col className="containerdemo" sm="12" >
                                <div >
                                    <Jumbotron>
                                        <h2 className="ml-5 mb-4">LOG IN</h2>
                                        <Form
                                            // {...layout}
                                            name="basic"
                                            initialValues={{
                                                remember: true,
                                            }}
                                            onFinish={this.onFinish}
                                            onFinishFailed={this.onFinishFailed}
                                        >
                                            <Form.Item
                                                label="Username"
                                                name="username"

                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your username!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    onChange={(e) => this.setState({ email: e.target.value })}
                                                    prefix={<UserAddOutlined />} />
                                            </Form.Item>

                                            <Form.Item
                                                label="Password"
                                                name="password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your password!',
                                                    },
                                                ]}
                                            >
                                                <Input.Password
                                                    onChange={(e) => this.setState({ password: e.target.value })}

                                                    prefix={<UnlockOutlined />}
                                                />
                                            </Form.Item>


                                            <Form.Item >
                                                Don't have acount?<a href="/signup" style={{ color: "blue" }}>SignUp</a>
                                                <Button type="primary" htmlType="submit"
                                                    onClick={this.buttonHandler}
                                                    style={{ marginLeft: "5vw", backgroundColor: "blue" }}>
                                                    Submit
        </Button>
                                            </Form.Item>
                                        </Form>
                                    </Jumbotron>
                                </div>
                            </Col>
                        </div>
                    </Row>

                </Container>
            </div>
        )
    }
}
Login.propTypes = {
    login: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps, { login })(Login)