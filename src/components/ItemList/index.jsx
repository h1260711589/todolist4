import React, { Component,forwardRef } from 'react'
import Item from '../Item'
import Modal from '../Modal'
import { nanoid } from 'nanoid'



// export default class ItemList extends Component {

//     constructor(props) {
//         super(props)
//         this.state = { itemList: [], hidden: true }
//     }

//     render() {
//         return (
//             <div>
//                 {
//                     this.state.hidden ? null :
//                         <div>
//                             {this.state.itemList.map((item, index) => {
//                                 return (
//                                     <div key={item.id}>
//                                         < Item {...item} removeItem={this.removeItem} />
//                                         {index == this.state.itemList.length - 1 ? null : <div className='line'></div>}
//                                     </div>)
//                             })}
//                         </div>
//                 }
//                 <Modal ref={e => this.Modal = e} addItem={this.addItem} type={0} />
//             </div>
//         )
//     }

//     removeItem = (id) => {
//         let newArr = this.state.itemList.filter((item) => {
//             if (item.id !== id)
//                 return true
//             else
//                 return false
//         })
//         this.setState({ itemList: newArr })
//     }

//     showModal = () => {
//         this.Modal.showModal()
//     }

//     addItem = (obj) => {
//         let { itemList } = this.state
//         let newItemList = [...itemList, obj]
//         this.setState({ itemList: newItemList })
//     }

//     hide = () => {
//         this.setState({ hidden: true })
//     }

//     appear = () => {
//         this.setState({ hidden: false })
//     }
// }

function ItemList(props, ref) {
    const [itemList, setItemList] = React.useState([])
    const [hidden, setHidden] = React.useState(true)

    const myModal = React.useRef()


    function removeItem(id) {
        let newArr = itemList.filter((item) => {
            if (item.id !== id)
                return true
            else
                return false
        })
        setItemList(newArr)
    }

    function showModal() {
        myModal.current.showModal()
    }

    function addItem(obj) {
        let newItemList = [...itemList, obj]
        setItemList(newItemList)
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

ItemList=forwardRef(ItemList)

export default ItemList
