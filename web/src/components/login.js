import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../layout/layout'
import { login } from '../redux/actions'
import { validateEmail } from '../helpers'
import classNames from 'classnames'
import { history } from '../hostory'

class Login extends React.Component {

  state = {
    username: '',
    password: '',
    error: null,
    submitted: false
  }
  submit = (e) => {

    e.preventDefault()

    const error = this.validateHasError()

    this.setState({
      error: error,
      submitted: !error,
    }, () => {

      if (error == null) {

        const isEmail = validateEmail(this.state.username)

        this.props.login({
          username: !isEmail ? this.state.username : '',
          email: isEmail ? this.state.username : '',
          password: this.state.password,
        }).catch((e) => {
          this.setState({
            submitted: false,
            error: "Login failed"
          })
        })
      }
    })

  }
  validateHasError = (cb) => {
    let {password, username} = this.state

    if (!username) {
      return 'Username or student ID is required'
    }

    if (!password) {
      return 'Password is required'
    }

    return null
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.props.user) {
      history.push('/')
    }
  }

  componentDidMount () {
    if(this.props.user){
      history.push('/')
    }
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
        <div className={'row justify-content-md-center'}>
          <div className={'col-md-5'}>
            <div className="card">
              <div className="card-header">
                Login
              </div>
              <div className="card-body">
                {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
                <form onSubmit={this.submit}>

                  <div className="form-group">
                    <label htmlFor="username">Email or username</label>
                    <input value={this.state.username} name={'username'} onChange={this.onChange} type="text"
                           className={classNames('form-control', {'is-invalid': error && error.search('Username') !== -1})}
                           id="username"
                           placeholder="Enter username"/>
                    <small id="emailHelp" className="form-text text-muted">Email or student ID</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={this.state.password} name={'password'} onChange={this.onChange} type="password"
                           className={classNames('form-control', {'is-invalid': error && error.search('Password') !== -1})}
                           id="password" placeholder="Password"/>
                  </div>

                  <button disabled={this.state.submitted} type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.app.currentUser,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)