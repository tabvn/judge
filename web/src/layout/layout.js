import React, { Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Header from './header'
import { history } from '../hostory'
import classNames from 'classnames'

class Layout extends React.Component {

  componentDidMount () {
    if (this.props.admin && this.props.role !== 'admin') {
      history.push('/access-denied')
    }
  }

  render () {
    const {useHeader, fullWidth, breadcrumb} = this.props
    return (
      <Fragment>
        {useHeader ? <Header/> : null}
        {
          breadcrumb && breadcrumb.length ? (
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                {
                  breadcrumb.map((item, key) => {
                    return (
                      item.title ? <li key={key} className={classNames('breadcrumb-item', {'active': item.active})}>
                        <button disabled={item.active} onClick={() => {
                          if (item.link) {
                            history.push(item.link)
                          }
                        }} className={'btn btn-link p-0'}>{item.title}</button>
                      </li> : null
                    )
                  })
                }
              </ol>
            </nav>
          ) : null
        }
        <div className={classNames('mt-3', {'container': !fullWidth}, {'container-fluid': fullWidth})}>
          {this.props.children}
        </div>
      </Fragment>
    )
  }
}

Layout.propTypes = {
  useHeader: PropTypes.bool,
  admin: PropTypes.bool,
  fullWidth: PropTypes.bool,
  breadcrumb: PropTypes.array
}
Layout.defaultProps = {
  useHeader: true,
  admin: false,
  fullWidth: false,
  breadcrumb: [],
}

const mapStateToProps = (state) => ({
  role: state.app.role
})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Layout)