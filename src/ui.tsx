import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import PreviewApp from './PreviewApp'
import './ui.css'

const PREVIEW_ENV = process.env.PREVIEW_ENV
ReactDOM.render(!PREVIEW_ENV ? <App /> : <PreviewApp />, document.getElementById('react-page'))