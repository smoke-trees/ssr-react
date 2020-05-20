import React from 'react'

import './global.css'
import './index.css'

import img from './img.jpg'

class Index extends React.Component {
  constructor () {
    super()
    this.state = { name: 'a', email: '' }

    this.onFormSubmit = (event) => {
      event.preventDefault()
    }

    this.onNameChangeHandler = (event) => {
      this.setState({ name: event.target.value })
    }

    this.onEmailChangeHandler = (event) => {
      this.setState({ email: event.target.value })
    }
  }

  render () {
    return (
      <div>
        <h1 className='heading'>Smoke -h</h1>
        <form onSubmit={this.onFormSubmit}>
          <div>
            <label htmlFor='name-input' defaultValue='Name'>Name: </label>
            <input
              name='name-input' onChange={this.onNameChangeHandler} type='text'
              value={this.state.name}
            />
          </div>
          <br />
          <div>
            <label htmlFor='email-input' defaultValue='Email'>Email: </label>
            <input
              name='email-input' onChange={this.onEmailChangeHandler} type='email'
              placeholder='email' value={this.state.email}
            />
          </div>
          <br />
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
        <span><h5>Name: {this.state.name}</h5></span>
        <span><h5>Email: {this.state.email}</h5></span>
        <img src={img} alt='something' />
      </div>
    )
  }
}

export default Index
