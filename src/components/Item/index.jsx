import React, { Component } from 'react'
import PubSub from 'pubsub-js'


export default function Item(props) {
    const [done, setDone] = React.useState(props.done)
    const [name, setName] = React.useState(props.name)
    const [editTime, setEditTime] = React.useState(props.editTime)
    const [id, setId] = React.useState(props.id)

    function changeDone() {
        PubSub.publish('done', { done: !done, itemId: id })
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