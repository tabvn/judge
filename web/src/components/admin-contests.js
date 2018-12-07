import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../layout/layout'
import { history } from '../hostory'
import { findContests } from '../redux/actions'
import moment from 'moment'

class AdminContests extends React.Component {

  componentWillMount () {
    const filter = {
      search: '',
      limit: 50,
      offset: 0,
    }
    this.props.findContests(filter)
  }

  render () {

    const {contests} = this.props
    const DateFormat = 'DD/MM/YYYY, hh:mm A'

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
                  <th scope="col">Scoreboard</th>
                  <th scope="col">Published</th>
                  <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                  contests.map((c, key) => {
                    return (
                      <tr key={key}>
                        <th scope="row">{c.id}</th>
                        <td>{c.name}</td>
                        <td>{moment.unix(c.start).format(DateFormat)}</td>
                        <td>{moment.unix(c.end).format(DateFormat)}</td>
                        <td>{c.scoreboard ? 'Yes' : 'No'}</td>
                        <td>{c.published ? 'Published' : 'Unpublished'}</td>
                        <td>
                          <button onClick={() => {
                            history.push(`/contest/${c.id}/edit`)
                          }} type={'button'} className={'btn btn-link'}><i className={'md-icon'}>edit</i></button>
                        </td>
                      </tr>
                    )
                  })
                }

                </tbody>
              </table>

            </div>
          </div>
        </div>


      </Layout>)
  }
}

const mapStateToProps = (state) => ({
  contests: state.contest.models.valueSeq()
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  findContests
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AdminContests)