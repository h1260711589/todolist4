import React, { Component, useState, useRef, forwardRef } from 'react'
import ItemList from '../ItemList'
import Modal from '../Modal'

// export default class Note extends Component {
//     state = { name: this.props.name, remindTime: this.props.remindTime, id: this.props.id, hideList: true }

//     render() {
//         return (
//             <div className="note" style={{ display: this.props.hidden ? 'none' : 'block' }}>

//                 <div className="note-header">
//                     <div className="note-left">
//                         <div className="note-name">{this.state.name}</div>
//                         <div className="note-time">
//                             <i className="iconfont icon-shijianzhongbiao"></i>
//                             <span>{this.state.remindTime}</span>
//                         </div>
//                     </div>
//                     <div className="note-right">
//                         <i className="iconfont icon-add-bold" onClick={this.addItem}></i>
//                         <i className="iconfont icon-ashbin" onClick={this.deleteNote}></i>
//                         <i className="iconfont icon-setting" onClick={this.showModal}></i>
//                         {this.state.hideList ? <i className="iconfont icon-arrow-left-bold" onClick={this.showList}></i> :
//                             <i className="iconfont icon-arrow-down-bold" onClick={this.hideList}></i>}
//                     </div>
//                 </div>

//                 <ItemList ref={e => this.ItemList = e} />
//                 <Modal type={1} ref={e => this.Modal = e} editNote={this.editNote} />
//             </div>
//         )
//     }

//     addItem = () => {
//         this.ItemList.showModal()
//     }

//     showModal = () => {
//         this.Modal.showModal()
//     }

//     editNote = (obj) => {
//         this.setState(obj)
//     }

//     hideList = () => {
//         this.setState({ hideList: true })
//         this.ItemList.hide()
//     }

//     showList = () => {
//         this.setState({ hideList: false })
//         this.ItemList.appear()
//     }

//     deleteNote = () => {
//         this.props.deleteNote(this.state.id)
//     }

// }

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
        setName(obj.name)
        setRemindTime(obj.remindTime)
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

            <ItemList ref={myItemList} />
            <Modal type={1} ref={myModal} editNote={editNote} updateNoteList={props.updateNoteList} noteId={id}/>
        </div>
    )
}

