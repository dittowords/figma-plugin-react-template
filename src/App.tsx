import React, { useRef } from 'react'

declare function require(path: string): any

function App() {
  const textbox = useRef<HTMLInputElement>()

  const countRef = (element: HTMLInputElement) => {
    if (element) element.value = '5'
    this.textbox = element
  }

  const onCreate = () => {
    const count = parseInt(this.textbox.value, 10)
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*')
  }

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }


  return <div>
    <img src={require('./logo.svg')} />
    <h2>Rectangle Creator</h2>
    <p>Count: <input ref={countRef} /></p>
    <button id="create" onClick={onCreate}>Create</button>
    <button onClick={onCancel}>Cancel</button>
  </div>
  
}

export default App