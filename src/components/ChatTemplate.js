import React from 'react'

const ChatTemplate = (props) => {
    const {message} = props
  return (
    <div>
        <h6> {message} </h6>
    </div>
  )
}

export default ChatTemplate