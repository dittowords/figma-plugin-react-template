import React, { useEffect, useRef, useState } from "react";

const TextItem = ({ node, handleUpdateText }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(node.text)
  const inputRef: any = useRef()

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

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
          ref={inputRef}
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