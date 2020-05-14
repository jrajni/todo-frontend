import React from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Input, Modal } from 'antd'
let clasvar = ""
class ListITem extends React.Component {
    state = {
        visible: false,
        localElement: "",
        updatedValue: ""
    }
    showModal = (status) => {
        this.setState({ visible: status })
    }
    Modal = (element) => {
        console.log("modal", element)
        this.setState({ visible: true, localElement: element })
        // return <Modal showModal={this.showModal} />
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
            updatedValue: ""
        });
    };
    handleOk = () => {
        this.props.updateItem(this.state.updatedValue, this.state.localElement.key)
        this.setState({ visible: false, updatedValue: "" })
    }
    render() {
        return (
            <div className="container">
                {/* {listItems} */}
                <ul class="list-group">
                    {this.props.items && this.props.items.map((element) => {
                        { element.isActive ? clasvar = "text-dark" : clasvar = "text-secondary" }

                        return <span>
                            <li className={`list-group-item p-2 m-2 ${clasvar}`}>{element.text}
                                {element.isActive && <EditOutlined style={{ float: "right", margin: 1, padding: 5 }} onClick={() => { this.Modal(element) }} />}
                                {element.isActive && <DeleteOutlined style={{ float: "right", margin: 1, padding: 5 }} onClick={() => {

                                    this.props.deleteItem(element.key)
                                }}></DeleteOutlined>}
                                <button style={{ float: "right", border: "none" }} onClick={() => {
                                    this.props.completeItem(element.key)
                                }} >{element.isActive ? <span
                                    // classname="chnagesPara"
                                    style={{ fontSize: "12px", color: "blue" }}
                                >Complete</span> : <span>marked as completed</span>}</button>


                            </li>


                        </span>
                    })}
                </ul>
                <Modal
                    title="Update List"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    // confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Input
                        placeholder={this.state.localElement.text}
                        value={this.state.updatedValue}
                        onChange={(e) => { this.setState({ updatedValue: e.target.value }) }}
                    >
                    </Input>

                    {/* <p>{ModalText}</p> */}
                </Modal>

            </div>
        )
    }
}
export default ListITem