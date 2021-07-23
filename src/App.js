import './App.css'
import Note from './components/Note'
import axios from 'axios'
import React, { Component, useState, useRef } from 'react'
import Modal from './components/Modal'
import { useEffect } from 'react'


export default function App() {
  const [noteList, setNoteList] = useState([])
  const [find, setFind] = useState('')

  const findInput = useRef()
  const myModal = useRef()

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/note'
    }).then(value => {
      setNoteList(value.data)
    })
  }, [])

  const showModal = () => {
    myModal.current.showModal()
  }

  const addNote = (noteObj) => {
    let addNote1 = axios({
      method: 'POST',
      url: 'http://localhost:3000/note/add',
      data: noteObj
    })
    let addNote2 = axios({
      method: 'POST',
      url: 'http://localhost:3000/item-list/addNote',
      data: { noteId: noteObj.id }
    })

    Promise.all([addNote1, addNote2]).then(value => {
      let newNoteList = [...noteList, noteObj]
      setNoteList(newNoteList)
    })

  }



  const deleteNote = (id) => {
    axios({
      method: 'POST',
      url: 'http://localhost:3000/note/delete',
      data: { id }
    }).then(value => {
      let newNoteList = noteList.filter((note) => {
        if (note.id != id)
          return true
        else return false
      })
      setNoteList(newNoteList)
    }, error => {
      console.log(error);
    })
  }

  const handleFindChange = (event) => {
    setFind(event.target.value)
  }

  const clearFind = () => {
    findInput.current.value = ''
    setFind('')
  }

  const updateNoteList = (id, obj) => {
    const newArr = noteList.map((note) => {
      if (note.id != id)
        return note
      else
        return { ...obj, id: note.id }
    })
    setNoteList(newArr)
  }

  return (
    <div>
      <div className="header">
        <div className="addNote" onClick={showModal}>
          <i className="iconfont icon-add-bold"></i>
        </div>
        <div className="right-header">
          <i className="iconfont icon-chazhao"></i>
          <input type="text" className="find" placeholder="查找便签" ref={findInput} onChange={handleFindChange} />
          <div className="reset" onClick={clearFind}>
            <i className="iconfont icon-cha"></i>
          </div>
        </div>
      </div>

      <div className="content">
        {
          noteList.map((note) => {
            let hidden = true
            if (find == '')
              hidden = false
            else if (note.name.indexOf(find) == 0)
              hidden = false
            return <Note {...note} key={note.id} deleteNote={deleteNote} hidden={hidden} updateNoteList={updateNoteList} />
          })
        }
      </div>

      <Modal ref={myModal} type={2} addNote={addNote} />
    </div>
  )
}
