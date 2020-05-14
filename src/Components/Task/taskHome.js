import React, { Component } from 'react'
import ListItem from './ListITem'
import { Jumbotron } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchTask, addTask, deleteTask, updateTask } from '../../actions/taskAction'
class TaskHome extends Component {
    state = {
        uid: "",
        items: [],
        loading: true,
        currentItem: {
            text: "",
            key: "",
            isActive: true
        }
    }
    getData = async () => {
        try {
            // await this.setState({ uid: this.props.userId })
            await this.props.fetchTask(this.props.userId)
        }
        catch (err) {
            this.showTest("Network error")

        }
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
    showTest = (val) => {
        toast(val);
    }
    addItem = async (e) => {
        e.preventDefault()
        try {
            this.props.addTask(this.state.currentItem, this.props.items, this.props.userId)
            if (this.props.addloading) {
                this.showTest("Task is being added")
            }
        } catch (err) {
            this.showTest("Some error occured")
            console.log("some err", err)
        }
        this.setState({ currentItem: { text: '', key: '' } })

        // }
    }

    completeItem = (id) => {
        try {
            this.props.items.map((item) => {
                if (item.key === id)
                    item.isActive = false
            })
            this.props.deleteTask(this.props.items, this.props.userId)
            if (this.props.deleteloading) {
                this.showTest("task is marked as completed")
            }
        } catch (err) {
            this.showTest("Some error occured")
        }
    }
    deleteItem = (id) => {
        try {
            const itemlist = this.props.items.filter((item) => {
                return item.key !== id
            })

            this.props.deleteTask(itemlist, this.props.userId)
            if (this.props.deleteloading) {
                this.showTest("task is being deleted")
            }
        } catch (err) {
            this.showTest("Some error occured")

        }
    }
    updateItem = (text, id) => {
        try {
            const { items } = this.props
            items.map((item) => {
                console.log("text,id", item.key, id)

                if (item.key === id) {
                    item.text = text
                }
            })
            this.props.updateTask(items, this.props.userId)
            if (this.props.updateloading) {
                this.showTest("task is being updated")
            }
        } catch (err) {
            this.showTest("Some error occured")

        }
    }
    render() {
        return (
            <div className="container">
                <ToastContainer />
                <Jumbotron>
                    <h1 className="ml-5">Todo List</h1>

                    <div className="container p-3 m-2 ml-4">
                        <form onSubmit={this.addItem}>
                            <input
                                placeholder="enter task" onChange={this.handleInput}
                                value={this.state.currentItem.text}>
                            </input>
                            <button

                                type="submit"
                                style={{ marginLeft: 5, borderRadius: 10 }}
                            >
                                Add Task
    </button>
                        </form>
                    </div>

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
    addTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired
    // items:
}
const mapStateToProps = (state) => {
    return {

        items: state.tasks.items,
        loading: state.tasks.loading,
        updateloading: state.tasks.updateloading,
        deleteloading: state.tasks.deleteloading,
        addloading: state.tasks.addloading,
        userId: state.auth.userId,
        isAuthenticated: state.auth.isAuthenticated
    }
}
export default connect(mapStateToProps, { fetchTask, addTask, deleteTask, updateTask })(TaskHome)