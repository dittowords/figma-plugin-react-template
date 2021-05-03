import React, { useEffect, useState } from 'react'

declare function require(path: string): any

function App() {

  const [inputText, setInputText] = useState<string>('')
  const [selectedTextNodes, setSelectedTextNodes] = useState<any[]>([])

  const onCreate = () => {
    parent.postMessage({ pluginMessage: { type: 'create-text', text: inputText } }, '*')
  }

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }
  const onMessage = (msg) => {
    console.log('msg', msg)
    if (msg.data.pluginMessage &&  msg.data.pluginMessage.event === 'selected-text-nodes') {
      console.log('here',msg.data.pluginMessage.nodes)
      setSelectedTextNodes(msg.data.pluginMessage.nodes)
    }
  }

  useEffect(() => {
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return <div>
    <img src={require('./logo.svg')} />
    <h2>Text Creator</h2>
    <p>Text: <input value={inputText} onChange={e => setInputText(e.target.value)} /></p>
    <button id="create" onClick={onCreate}>Create</button>
    <button onClick={onCancel}>Cancel</button>
    <div>
      <h2>Selected Text</h2>
      {selectedTextNodes.length === 0 && <div>No selected text</div>}
      <div>
      {selectedTextNodes.map((node, index) => (
        <div key={index}>{node.text}</div>
      ))}
      </div>
    </div>
  </div>
  
}

export default App