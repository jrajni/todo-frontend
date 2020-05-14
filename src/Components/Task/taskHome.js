import React, { Component } from 'react'
import ListItem from './ListITem'
import { Jumbotron } from 'reactstrap'
import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchTask, addTask, deleteTask, updateTask } from '../../actions/taskAction'
class TaskHome extends Component {
    state = {
        uid: "",
        items: [],
        currentItem: {
            text: "",
            key: "",
            isActive: true
        }
    }
    getData = async () => {
        await this.setState({ uid: this.props.userId })
        await this.props.fetchTask(this.state.uid)
        console.log("homeprops", this.props.userId)

    }
    componentWillMount() {
        this.getData()
    }
    handleInput = (e) => {
        this.setState({
            currentItem: {
                text: e.target.value,
                key: Date.now(),
                isActive: true
            }
        })
    }
    addItem = async (e) => {
        e.preventDefault()
        // console.log("props", this.props.items)
        try {
            this.props.addTask(this.state.currentItem, this.props.items, this.props.userId)
        } catch (err) {
            console.log("some err", err)
        }
        this.setState({ currentItem: { text: '', key: '' } })

        // }
    }

    completeItem = (id) => {
        this.props.items.map((item) => {
            if (item.key === id)
                item.isActive = false
        })
        this.props.deleteTask(this.props.items, this.props.userId)
    }
    deleteItem = (id) => {
        const itemlist = this.props.items.filter((item) => {
            return item.key !== id
        })

        this.props.deleteTask(itemlist, this.props.userId)
        // console.log(itemlist)
    }
    updateItem = (text, id) => {
        const { items } = this.props
        items.map((item) => {
            console.log("text,id", item.key, id)

            if (item.key === id) {
                item.text = text
            }
        })
        this.props.updateTask(items, this.props.userId)
    }
    render() {
        return (
            <div className="container">
                <Jumbotron>
                    <form onSubmit={this.addItem}>
                        <input placeholder="enter task" onChange={this.handleInput}
                            value={this.state.currentItem.text}>
                        </input>
                        <button type="submit"
                        >
                            Submit
    </button>
                    </form>
                    {/* <p>{this.props.items.text}</p> */}
                    <ListItem
                        deleteItem={this.deleteItem}
                        items={this.props.items}
                        completeItem={this.completeItem}
                        updateItem={this.updateItem} />
                </Jumbotron>
            </div>
        )
    }
}
TaskHome.propTypes = {
    fetchTask: PropTypes.func.isRequired,
    // items:
}
const mapStateToProps = (state) => {
    return {
        items: state.tasks.items,

        userId: state.auth.userId,
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps, { fetchTask, addTask, deleteTask, updateTask })(TaskHome)