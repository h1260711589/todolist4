import axios from 'axios'
import React, { Component, useState, useRef, forwardRef } from 'react'
import ItemList from '../ItemList'
import Modal from '../Modal'


export default function Note(props) {
    const [name, setName] = useState(props.name)
    const [remindTime, setRemindTime] = useState(props.remindTime)
    const [id, setId] = useState(props.id)
    const [hideList, setHideList] = useState(true)

    const myItemList = useRef()
    const myModal = useRef()

    const addItem = () => {
        myItemList.current.showModal()
    }

    const showModal = () => {
        myModal.current.showModal()
    }

    const editNote = (obj) => {
        axios({
            method: 'POST',
            url: 'http://localhost:3000/note/edit',
            data: {
                id,
                ...obj
            }
        }).then(value => {
            setName(obj.name)
            setRemindTime(obj.remindTime)
        }, error => {
            console.log(error);
        })

    }

    const hideList2 = () => {
        setHideList(true)
        myItemList.current.hide()
    }

    const showList = () => {
        setHideList(false)
        myItemList.current.appear()
    }

    const deleteNote = () => {
        props.deleteNote(id)
    }

    return (
        <div className="note" style={{ display: props.hidden ? 'none' : 'block' }}>

            <div className="note-header">
                <div className="note-left">
                    <div className="note-name">{name}</div>
                    <div className="note-time">
                        <i className="iconfont icon-shijianzhongbiao"></i>
                        <span>{remindTime}</span>
                    </div>
                </div>
                <div className="note-right">
                    <i className="iconfont icon-add-bold" onClick={addItem}></i>
                    <i className="iconfont icon-ashbin" onClick={deleteNote}></i>
                    <i className="iconfont icon-setting" onClick={showModal}></i>
                    {hideList ? <i className="iconfont icon-arrow-left-bold" onClick={showList}></i> :
                        <i className="iconfont icon-arrow-down-bold" onClick={hideList2}></i>}
                </div>
            </div>

            <ItemList ref={myItemList} noteId={id} />
            <Modal type={1} ref={myModal} editNote={editNote} updateNoteList={props.updateNoteList} noteId={id} />
        </div>
    )
}

