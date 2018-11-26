import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../layout/layout'
import {history} from '../hostory'

class AdminContests extends React.Component {
  render () {
    return (

      <Layout admin={true}>


        <div className={'col-md-12'}>
          <div className="card">
            <div className="card-header">
              Manage contests
            </div>
            <div className="card-body">
              <div className={'pt-3 pb-3'}>
                <button onClick={() => {
                  history.push('/admin/contests/add')
                }} type={'button'} className={'btn btn-link'}><i className={'md-icon float-left'}>add</i> Create new
                  contest
                </button>
              </div>

              <table className="table">
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Contest name</th>
                  <th scope="col">Start time</th>
                  <th scope="col">End time</th>
                  <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Test</td>
                  <td>20/10/2018</td>
                  <td>20/10/2018</td>
                  <td>
                    <button type={'button'} className={'btn btn-link'}><i className={'md-icon'}>edit</i></button>
                  </td>
                </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>


      </Layout>)
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AdminContests)