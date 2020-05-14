import React from 'react';
import {
    Container, Row, Col, Jumbotron
} from 'reactstrap';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserAddOutlined, UnlockOutlined, StarTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Config from "../config";
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import PropTypes from 'prop-types'
import Navbar from './navbar/appnavbar'

import { Redirect } from 'react-router'
import axios from 'axios'
export default class Example extends React.Component {
    state = {
        fname: "",
        lname: "",
        email: "",
        password: "",
        redirect: false
    }
    onFinish = values => {
        console.log('Success:', values);
    };
    redirection = () => {
        if (this.state.redirect) {
            return <Redirect to="/login" />
        }
    }
    buttonHandler = () => {
        console.log(this.state)
        const { email, password, fname, lname } = this.state
        let name = fname + lname
        axios.post(Config.hostName + `/api/user/register`, { email, password, name })
            .then((res) => {
                console.log("api hit sign", res.data)
                this.setState({ redirect: true })

            })
            .catch((err) => { console.log("api error sign", err) })

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
        return (
            <div >
                {/* <Navbar /> */}
                <Container>
                    <Row>{this.redirection()}
                        <Col sm="4"></Col>
                        <div >
                            <Col className="containerdemo" sm="12" >
                                <div >
                                    <Jumbotron>
                                        <h2 className="ml-5 mb-4">SIGN UP</h2>
                                        <Form
                                            {...layout}
                                            name="basic"
                                            initialValues={{
                                                remember: true,
                                            }}
                                            onFinish={this.onFinish}
                                            onFinishFailed={this.onFinishFailed}
                                        >
                                            <Form.Item
                                                label="First Name"
                                                name="firstname"

                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your First Name!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    onChange={(e) => { this.setState({ fname: e.target.value }) }}
                                                // prefix={<UserAddOutlined />} 
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="Last Name"
                                                name="lastname"

                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your Lastname!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    onChange={(e) => { this.setState({ lname: e.target.value }) }}

                                                // prefix={<UserAddOutlined />} 
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label="Email"
                                                name="email"

                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your email!',
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    // width="30 %"
                                                    onChange={(e) => { this.setState({ email: e.target.value }) }}

                                                // prefix={<UserAddOutlined />} 
                                                />
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
                                                    onChange={(e) => { this.setState({ password: e.target.value }) }}

                                                // prefix={<UnlockOutlined 
                                                // />}
                                                />
                                            </Form.Item>


                                            {/* <Form.Item > */}
                                            <Button type="primary" htmlType="submit"
                                                onClick={this.buttonHandler}
                                                style={{ float: "right", background: "blue" }}
                                            >
                                                Sign Up
        </Button><span className="m-2">
                                                Already have an acount?<a href="/login" style={{ color: "blue" }}>Login</a>
                                            </span>
                                            {/* </Form.Item> */}
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