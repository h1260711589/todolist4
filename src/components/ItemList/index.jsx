import React, { Component } from 'react'
import Item from '../Item'
import Modal from '../Modal'
import { nanoid } from 'nanoid'



export default class ItemList extends Component {

    constructor(props) {
        super(props)
        this.state = { itemList: [], hidden: true }
    }

    render() {
        return (
            <div>
                {
                    this.state.hidden ? null :
                        <div>
                            {this.state.itemList.map((item, index) => {
                                return (
                                    <div key={item.id}>
                                        < Item {...item} removeItem={this.removeItem} />
                                        {index == this.state.itemList.length - 1 ? null : <div className='line'></div>}
                                    </div>)
                            })}
                        </div>
                }
                <Modal ref={e => this.Modal = e} addItem={this.addItem} type={0} />
            </div>
        )
    }

    removeItem = (id) => {
        let newArr = this.state.itemList.filter((item) => {
            if (item.id !== id)
                return true
            else
                return false
        })
        this.setState({ itemList: newArr })
    }

    showModal = () => {
        this.Modal.showModal()
    }

    addItem = (obj) => {
        let { itemList } = this.state
        let newItemList = [...itemList, obj]
        this.setState({ itemList: newItemList })
    }

    hide = () => {
        this.setState({ hidden: true })
    }

    appear = () => {
        this.setState({ hidden: false })
    }
}
