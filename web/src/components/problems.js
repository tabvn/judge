import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Problems extends React.Component {
  render () {
    return (<div></div>)
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Problems)