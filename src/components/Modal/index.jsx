import React, { Component } from 'react'
import './index.css'
import { nanoid } from 'nanoid'

export default class Modal extends Component {
    state = { hidden: true, type: this.props.type }

    render() {
        return (
            <div className="modal-overlay" style={{ display: this.state.hidden ? 'none' : 'block' }} onClick={this.cancel} ref={e => this.modalOverlay = e}>
                <div className="modal">
                    <div className="modal-header">
                        <div className="modal-cancel" ref={e => this.modalCancel = e}>取消</div>
                        <div className="modal-title">编辑{this.state.type == 0 ? '条目' : '便签'}</div>
                        <div className="modal-save" ref={e => this.modalSave = e}>保存</div>
                    </div>
                    <div className="modal-content">
                        <div className="modal-input-title">{this.state.type == 0 ? '记录' : '编辑便签'}</div>
                        <input type="text" className="modal-input" ref={e => this.input = e} />
                        {
                            this.state.type != 0 ? (
                                <div>
                                    <div className="modal-input-title">设置提醒时间</div>
                                    <input type="date" className="modal-input" ref={e => this.remindTime = e} />
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        )
    }

    cancel = (event) => {
        if (event.target != this.modalOverlay && event.target != this.modalCancel)
            return
        this.setState({ hidden: true })
    }

    showModal = () => {
        this.setState({ hidden: false })
        if (this.state.type == 0)
            this.modalSave.onclick = this.addItem
        else if (this.state.type == 1)
            this.modalSave.onclick = this.editNote
        else
            this.modalSave.onclick = this.addNote
    }

    addItem = () => {
        let name = this.input.value
        this.input.value = ''
        let myDate = new Date()
        let editTime = myDate.toLocaleTimeString()
        let id = nanoid()
        let itemObj = { name: name, editTime: editTime, id: id }
        this.props.addItem(itemObj)
        this.setState({ hidden: true })
    }

    editNote = () => {
        let name = this.input.value
        this.input.value = ''
        let remindTime = this.remindTime.value
        this.remindTime.value = ''
        let obj = { name: name, remindTime: remindTime }
        this.props.editNote(obj)
        this.setState({ hidden: true })
    }

    addNote = () => {
        let name = this.input.value
        this.input.value = ''
        let remindTime = this.remindTime.value
        this.remindTime.value = ''
        let id = nanoid()
        let obj = { name: name, remindTime: remindTime, id: id }
        this.props.addNote(obj)
        this.setState({ hidden: true })
    }

}
