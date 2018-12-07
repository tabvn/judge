import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

export default function (ComposedComponent) {
  class Auth extends React.Component {

    componentWillMount () {
      if (!this.props.isAuthenticated) {
        this.context.router.history.push('/login')
      }
    }

    componentWillUpdate (nextProps) {

      if (!nextProps.isAuthenticated) {
        this.context.router.history.push('/login')
      }
    }

    componentWillReceiveProps (nextProps) {

      if (!nextProps.isAuthenticated) {
        this.context.router.history.push('/login')
      }

    }

    render () {

      return (
        <ComposedComponent {...this.props} />
      )
    }
  }

  Auth.contextTypes = {
    router: PropTypes.object.isRequired,
  }
  const mapStateToProps = state => ({
    isAuthenticated: _.get(state.app, 'currentUser.id'),
  })
  const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

  return connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Auth)

}