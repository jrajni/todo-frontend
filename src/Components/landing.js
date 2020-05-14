import React, { Component } from 'react'

export default class landing extends Component {
    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <a href="/login">Login</a><br />
                <a href="/signup">Signup</a><br />
                <a href="/home">Home</a>

            </div>
        )
    }
}
