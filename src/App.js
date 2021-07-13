import './App.css'
import Note from './components/Note'
import { nanoid } from 'nanoid'
import React, { Component } from 'react'
import Modal from './components/Modal'


export default class App extends Component {
  state = { noteList: [], find: '' }

  render() {
    return (
      <div>
        <div className="header">
          <div className="addNote" onClick={this.showModal}>
            <i className="iconfont icon-add-bold"></i>
          </div>
          <div className="right-header">
            <i className="iconfont icon-chazhao"></i>
            <input type="text" className="find" placeholder="查找便签" ref={e => this.find = e} onChange={this.handleFindChange} />
            <div className="reset" onClick={this.clearFind}>
              <i className="iconfont icon-cha"></i>
            </div>
          </div>
        </div>

        <div className="content">
          {
            this.state.noteList.map((note) => {
              let hidden = true
              if (this.state.find == '')
                hidden = false
              else if (note.name.indexOf(this.state.find) == 0)
                hidden = false
              return <Note {...note} key={note.id} deleteNote={this.deleteNote} hidden={hidden}/>
            })
          }
        </div>

        <Modal ref={e => this.Modal = e} type={2} addNote={this.addNote} />
      </div>
    )
  }

  showModal = () => {
    this.Modal.showModal()
  }

  addNote = (noteObj) => {
    let { noteList } = this.state
    let newNoteList = [...noteList, noteObj]
    this.setState({ noteList: newNoteList })
  }

  deleteNote = (id) => {
    let newNoteList = this.state.noteList.filter((note) => {
      if (note.id != id)
        return true
      else return false
    })
    this.setState({ noteList: newNoteList })
  }

  handleFindChange = (event) => {
    this.setState({ find: event.target.value })
  }

  clearFind = () => {
    this.find.value = ''
    this.setState({ find: '' })
  }
}

