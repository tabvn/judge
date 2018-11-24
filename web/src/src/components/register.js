import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../layout/layout'
import { register } from '../redux/actions'
import { validateEmail } from '../helpers'
import classNames from 'classnames'

class Register extends React.Component {

  state = {
    name: '',
    class: '',
    email: '',
    username: '',
    password: '',
    error: null,
  }
  submit = (e) => {

    e.preventDefault()

    const error = this.validateHasError()

    this.setState({
      error: error
    }, () => {

      if (error == null) {
        this.props.register({
          username: this.state.username,
          name: this.state.name,
          class: this.state.class,
          email: this.state.email,
          password: this.state.password
        })
      }
    })

  }
  validateHasError = (cb) => {
    let {name, email, password, username} = this.state

    if (!name) {
      return 'Your name is required'
    }
    if (!validateEmail(email)) {
      return 'Email is not correct'
    }
    if (!username) {
      return 'Username is required'
    }

    if (!password) {
      return 'Password is required'
    }

    return null
  }

  onChange = (e) => {

    const name = e.target.name
    this.setState({
      [name]: e.target.value,
      error: null
    })
  }

  render () {

    const {error} = this.state

    return (
      <Layout>
        <div className="card">
          <div className="card-header">
            Create an account
          </div>
          <div className="card-body">
            {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
            <form onSubmit={this.submit}>
              <div className="form-group">
                <label htmlFor="email">Your name</label>
                <input value={this.state.name} name={'name'} onChange={this.onChange} type="text"
                       className={classNames('form-control', {'is-invalid': error && error.search('Your name') !== -1})}
                       id="name"
                       placeholder="Enter your name"/>

              </div>

              <div className="form-group">
                <label htmlFor="class">Your class</label>
                <input value={this.state.class} name={'class'} onChange={this.onChange} type="text"
                       className={classNames('form-control', {'is-invalid': error && error.search('Class') !== -1})}
                       id="class"
                       placeholder="Enter class name"/>

              </div>

              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input value={this.state.email}
                       name={'email'} onChange={this.onChange} type="email"
                       className={classNames('form-control', {'is-invalid': error && error.search('Email') !== -1})}
                       id="email"
                       placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input value={this.state.username} name={'username'} onChange={this.onChange} type="text"
                       className={classNames('form-control', {'is-invalid': error && error.search('Username') !== -1})}
                       id="username"
                       placeholder="Enter username"/>
                <small id="emailHelp" className="form-text text-muted">Username or student ID</small>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input value={this.state.password} name={'password'} onChange={this.onChange} type="password"
                       className={classNames('form-control', {'is-invalid': error && error.search('Password') !== -1})}
                       id="password" placeholder="Password"/>
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>

      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  register
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Register)