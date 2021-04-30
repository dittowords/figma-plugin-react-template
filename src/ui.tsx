import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import PreviewApp from './PreviewApp'
import './ui.css'

const PREVIEW_ENV = undefined
ReactDOM.render({PREVIEW_ENV == "undefined" ? <App /> : <PreviewApp />, document.getElementById('react-page'))