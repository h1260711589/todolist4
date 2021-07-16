import React, { Component } from 'react'


// export default class Item extends Component {
//     state = { done: false, name: this.props.name, editTime: this.props.editTime, id: this.props.id }


//     render() {
//         return (
//             <div className="item">
//                 <div className="done" onClick={this.changeDone}>
//                     {this.state.done ? <i className="iconfont icon-gou"></i> : null}
//                 </div>
//                 <div className="item-content">
//                     <div className="item-record" style={{ color: this.state.done ? 'grey' : 'black' }}>{this.state.name}</div>
//                     <div className="item-time">上次编辑：{this.state.editTime}</div>
//                 </div>
//                 <div className="cancel" onClick={this.removeItem}>
//                     <i className="iconfont icon-jianhaocu"></i>
//                 </div>
//             </div>
//         )
//     }

//     changeDone = () => {
//         let { done } = this.state
//         this.setState({ done: !done })
//     }

//     removeItem = () => {
//         this.props.removeItem(this.state.id)
//     }

// }


export default function Item(props) {
    const [done, setDone] = React.useState(false)
    const [name, setName] = React.useState(props.name)
    const [editTime, setEditTime] = React.useState(props.editTime)
    const [id, setId] = React.useState(props.id)

    function changeDone() {
        setDone(done => !done)
    }

    function removeItem() {
        props.removeItem(id)
    }

    return (
        <div className="item">
            <div className="done" onClick={changeDone}>
                {done ? <i className="iconfont icon-gou"></i> : null}
            </div>
            <div className="item-content">
                <div className="item-record" style={{ color: done ? 'grey' : 'black' }}>{name}</div>
                <div className="item-time">上次编辑：{editTime}</div>
            </div>
            <div className="cancel" onClick={removeItem}>
                <i className="iconfont icon-jianhaocu"></i>
            </div>
        </div>
    )
}