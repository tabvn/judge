import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Header from './header'
import { history } from '../hostory'

class Layout extends React.Component {

  componentDidMount () {
    if (this.props.admin && this.props.role !== 'admin') {
      history.push('/access-denied')
    }
  }

  render () {
    const {useHeader} = this.props
    return (
      <Fragment>
        {useHeader ? <Header/> : null}
        <div className={'container'}>
          {this.props.children}
        </div>
      </Fragment>
    )
  }
}

Layout.propTypes = {
  useHeader: PropTypes.bool,
  admin: PropTypes.bool
}
Layout.defaultProps = {
  useHeader: true,
  admin: false
}

const mapStateToProps = (state) => ({
  role: state.app.role
})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Layout)