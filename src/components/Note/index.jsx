import React, { Component } from 'react'
import ItemList from '../ItemList'
import Modal from '../Modal'

export default class Note extends Component {
    state = { name: this.props.name, remindTime: this.props.remindTime, id: this.props.id, hideList: true }

    render() {
        return (
            <div className="note" style={{ display: this.props.hidden ? 'none' : 'block' }}>

                <div className="note-header">
                    <div className="note-left">
                        <div className="note-name">{this.state.name}</div>
                        <div className="note-time">
                            <i className="iconfont icon-shijianzhongbiao"></i>
                            <span>{this.state.remindTime}</span>
                        </div>
                    </div>
                    <div className="note-right">
                        <i className="iconfont icon-add-bold" onClick={this.addItem}></i>
                        <i className="iconfont icon-ashbin" onClick={this.deleteNote}></i>
                        <i className="iconfont icon-setting" onClick={this.showModal}></i>
                        {this.state.hideList ? <i className="iconfont icon-arrow-left-bold" onClick={this.showList}></i> :
                            <i className="iconfont icon-arrow-down-bold" onClick={this.hideList}></i>}
                    </div>
                </div>

                <ItemList ref={e => this.ItemList = e} />
                <Modal type={1} ref={e => this.Modal = e} editNote={this.editNote} />
            </div>
        )
    }

    addItem = () => {
        this.ItemList.showModal()
    }

    showModal = () => {
        this.Modal.showModal()
    }

    editNote = (obj) => {
        this.setState(obj)
    }

    hideList = () => {
        this.setState({ hideList: true })
        this.ItemList.hide()
    }

    showList = () => {
        this.setState({ hideList: false })
        this.ItemList.appear()
    }

    deleteNote = () => {
        this.props.deleteNote(this.state.id)
    }

}
