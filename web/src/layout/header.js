import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {signOut} from '../redux/actions'
import {history} from '../hostory'

class Header extends React.Component {
  render () {
    return (
      <div
        className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom">
        <h5 className="my-0 mr-md-auto font-weight-normal">Online Judge</h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <button onClick={() => {
            history.push('/contests')
          }} className="btn btn-link p-2 text-dark">Contests</button>
          <button className="btn btn-link p-2 text-dark">Problems</button>
          <button className="btn btn-link p-2 text-dark">Scoreboard</button>
        </nav>
        {this.props.user ? <button onClick={() => {
          this.props.signOut()
        }} className="btn btn-outline-primary">Logout
        </button> : null }
      </div>)
  }
}

const mapStateToProps = (state) => ({
  user: state.app.currentUser
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  signOut
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)