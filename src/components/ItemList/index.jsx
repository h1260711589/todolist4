import axios from 'axios'
import React, { Component, forwardRef, useEffect } from 'react'
import Item from '../Item'
import Modal from '../Modal'
import PubSub from 'pubsub-js'


function ItemList(props, ref) {
    const [itemList, setItemList] = React.useState([])
    const [hidden, setHidden] = React.useState(true)

    const myModal = React.useRef()

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'http://localhost:3000/item-list',
            params: {
                noteId: props.noteId
            }
        }).then(value => {
            setItemList(value.data)
        })
    }, [])

    useEffect(() => {
        PubSub.subscribe('done', (_, data) => {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/item-list/changeDone',
                data: { ...data, noteId: props.noteId }
            })
        })

    }, [])

    function removeItem(id) {
        axios({
            method: 'POST',
            url: 'http://localhost:3000/item-list/deleteItem',
            data: { noteId: props.noteId, itemId: id }
        }).then(value => {
            let newArr = itemList.filter((item) => {
                if (item.id !== id)
                    return true
                else
                    return false
            })
            setItemList(newArr)
        })
    }

    function showModal() {
        myModal.current.showModal()
    }

    function addItem(obj) {
        axios({
            method: 'POST',
            url: 'http://localhost:3000/item-list/addItem',
            data: {
                noteId: props.noteId,
                item: obj
            }
        }).then(value => {
            let newItemList = [...itemList, obj]
            setItemList(newItemList)
        })

    }

    function hide() {
        setHidden(true)
    }

    function appear() {
        setHidden(false)
    }

    React.useImperativeHandle(ref, () => ({
        showModal: showModal,
        hide: hide,
        appear: appear
    }))



    return (
        <div>
            {
                hidden ? null :
                    <div>
                        {itemList.map((item, index) => {
                            return (
                                <div key={item.id}>
                                    < Item {...item} removeItem={removeItem} />
                                    {index == itemList.length - 1 ? null : <div className='line'></div>}
                                </div>)
                        })}
                    </div>
            }
            <Modal ref={myModal} addItem={addItem} type={0} />
        </div>
    )
}

ItemList = forwardRef(ItemList)

export default ItemList
