import '../public/style.css'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import store from '../client/store'

class Main extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <h1>Hello World!</h1>
    )
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app')
)