import React from 'react'
import { withRouter, Redirect } from 'react-router'

import { Collapse, Container, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
export default class Appnavbar extends React.Component {
    state = {
        isOpen: false,
        redirect: false,
        tokenPresent: false
    }
    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }
    redirection = () => {
        if (this.state.redirect) {
            return <Redirect to="/login" />
        }
    }
    pageNotFound = async () => {
        if (this.state.tokenPresent) {
            console.log("not")
            // this.props.history.push('/pagenotfound');
            return <Redirect to="/home" />
        } else {
            return <Redirect to="/pagenotfound" />

        }
    }
    componentDidMount() {
        console.log("nav", localStorage.getItem('authToken'))
        if (localStorage.getItem('authToken')) {
            this.setState({ tokenPresent: true })
        }
        else {
            // this.pageNotFound()
            this.setState({ tokenPresent: false })
        }


    }
    render() {
        return (
            <div>
                {/* {this.pageNotFound()} */}
                {/* {this.redirection()} */}
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">Authentication</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}></NavbarToggler>
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    {this.state.tokenPresent ?
                                        <NavLink href="/login" onClick={() =>
                                            localStorage.clear()
                                        } >Logout</NavLink>
                                        :
                                        // <NavLink href="/" ></NavLink>

                                        <NavLink href="/login" >Login</NavLink>
                                    }

                                </NavItem>
                            </Nav>

                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}