import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import TaskHome from './Task/taskHome'
import PageNotFound from './PageNotFound'
import Navbar from './navbar/appnavbar'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Jumbotron } from 'reactstrap'
class Home extends Component {
    state = {
        showPage: false,
        token: ""
    }
    componentDidMount = () => {
        // console.log("homecom", this.props.userId)
    }
    getToken = async () => {
        console.log("token", localStorage.getItem('authToken'))
        if (localStorage.getItem('authToken')) {
            this.setState({ showPage: true })

        }
        // await axios.get('http://44bad1b4.ngrok.io/api/task/5ebbad7a1cdbd4096f150c3a', { headers: { authToken: localStorage.getItem('authToken') } })
        //     .then((res) => {
        //         // this.setState({ showPage: true })
        //     }
        //     )
        //     .catch((err) => {
        //         console.log("post err", err)
        //     })
    }
    logout = () => {
        localStorage.clear()
        this.setState({ showPage: false })

        return <Redirect to="/login" />
    }
    componentWillMount = () => {
        this.getToken()
        if (localStorage.getItem('authToken')) {
            this.setState({ showPage: true })
        }
        else {
            this.setState({ showPage: false })
        }

    }
    render() {
        return (<div>

            {this.state.showPage ? <TaskHome /> : <Redirect to="/pagenotfound" />}
        </div>)

    }
}
const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps)(Home)