import React, { useState } from "react";

const TextItem = ({ node, handleUpdateText }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(node.text)

  return (
    <div className="textItem">
      {!isEditing ? (
        <div 
          onClick={() => setIsEditing(true)}
         
        >
          {node.text}
          </div>
      ): (
        <input
          value={text} 
          onChange={e => setText(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              setIsEditing(false)
              handleUpdateText(node.figmaNodeID, text)
            }
          }}
        />
      )}
    </div>
  )
}

export default TextItem