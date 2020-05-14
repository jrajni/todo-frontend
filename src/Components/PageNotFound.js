import React, { Component } from 'react'
import Navbar from './navbar/appnavbar'
import { Jumbotron } from 'reactstrap'
export default class PageNotFound extends Component {
    render() {
        return (
            <div>
                {/* <Navbar /> */}
                <Jumbotron className="container">
                    <h2>Please Log In first</h2>
                </Jumbotron>
            </div>
        )
    }
}
