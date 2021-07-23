import React, { Component, useState, useRef, useImperativeHandle, forwardRef } from 'react'
import './index.css'
import { nanoid } from 'nanoid'
import axios from 'axios'


function Modal(props, ref) {
    const [hidden, setHidden] = useState(true)
    const [type, setType] = useState(props.type)

    const modalOverlay = useRef()
    const modalCancel = useRef()
    const modalSave = useRef()
    const input = useRef()
    const remindTimeInput = useRef()

    function cancel(event) {
        if (event.target != modalOverlay.current && event.target != modalCancel.current)
            return
        setHidden(true)
    }


    const addItem = () => {
        let name = input.current.value
        input.current.value = ''
        let myDate = new Date()
        let editTime = myDate.toLocaleTimeString()
        let id = nanoid()
        let itemObj = { name: name, editTime: editTime, id: id, done: false }
        props.addItem(itemObj)
        setHidden(true)

    }

    const editNote = () => {
        let name = input.current.value
        input.current.value = ''
        let remindTime = remindTimeInput.current.value
        remindTimeInput.current.value = ''
        let obj = { name: name, remindTime: remindTime }
        props.editNote(obj)
        props.updateNoteList(props.noteId, obj)
        setHidden(true)
    }

    const addNote = () => {
        let name = input.current.value
        input.current.value = ''
        let remindTime = remindTimeInput.current.value
        remindTimeInput.current.value = ''
        let id = nanoid()
        let obj = { name: name, remindTime: remindTime, id: id }
        props.addNote(obj)
        setHidden(true)
    }

    const showModal = () => {
        setHidden(false)
        if (type == 0)
            modalSave.current.onclick = addItem
        else if (type == 1)
            modalSave.current.onclick = editNote
        else
            modalSave.current.onclick = addNote
    }

    useImperativeHandle(
        ref,
        () => ({
            showModal: showModal
        })
    )


    return (
        <div className="modal-overlay" style={{ display: hidden ? 'none' : 'block' }} onClick={cancel} ref={modalOverlay}>
            <div className="modal">
                <div className="modal-header">
                    <div className="modal-cancel" ref={modalCancel}>取消</div>
                    <div className="modal-title">编辑{type == 0 ? '条目' : '便签'}</div>
                    <div className="modal-save" ref={modalSave}>保存</div>
                </div>
                <div className="modal-content">
                    <div className="modal-input-title">{type == 0 ? '记录' : '编辑便签'}</div>
                    <input type="text" className="modal-input" ref={input} />
                    {
                        type != 0 ? (
                            <div>
                                <div className="modal-input-title">设置提醒时间</div>
                                <input type="date" className="modal-input" ref={remindTimeInput} />
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

Modal = forwardRef(Modal)
export default Modal

