import React, { useEffect, useState } from 'react'
import TextItem from './TextItem'

declare function require(path: string): any

function App() {
  const [selectedTextNodes, setSelectedTextNodes] = useState<any[]>([])

  const onMessage = (msg) => {
    if (msg.data.pluginMessage &&  msg.data.pluginMessage.event === 'selected-text-nodes') {
      setSelectedTextNodes(msg.data.pluginMessage.nodes)
    }
  }

  const handleUpdateText = (figmaNodeID, updatedText) => {
    parent.postMessage({ pluginMessage: { type: 'update-text', figmaNodeID , text: updatedText } }, '*')
  }

  useEffect(() => {
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return <div className="container">
    <div className="header">
      <img src={require('./logo.svg')} />
      <h2>Update Text App</h2>
    </div>
    
    <div>
      {selectedTextNodes.length === 0 && <div className="select-warning">Select some text in Figma that you wish to edit.</div>}
      <div className="textList">
      {selectedTextNodes.map((node, index) => (
        <TextItem 
          key={index}
          node={node}
          handleUpdateText={handleUpdateText}
        />
      ))}
      </div>
    </div>
  </div>
}

export default App