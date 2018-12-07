import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../layout/layout'
import { findContests } from '../redux/actions'
import moment from 'moment'
import { history } from '../hostory'
import _ from 'lodash'

class Contests extends React.Component {

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

    const breadcrumb = [
      {
        title: 'Home',
        link: '/',
      },
      {
        title: 'Contests',
        link: null
      },
    ]

    return (

      <Layout breadcrumb={breadcrumb} fullWidth={true}>


        <div className={'col-md-12'}>
          <h1 className={'mt-3 mb-3'}>Contests</h1>

          <table className="table">
            <thead>
            <tr>
              <th scope="col">Contest name</th>
              <th scope="col">Start</th>
              <th scope="col">End</th>
              <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {
              contests.map((c, key) => {
                const start = moment.unix(c.start)
                const end = moment.unix(c.end)

                const isEnded = moment().unix() > parseInt(c.end)

                return (
                  <tr key={key}>
                    <td>
                      <button onClick={() => {
                        history.push(`/contests/${c.id}`)
                      }} className={'btn btn-link'}>{c.name}</button>
                    </td>
                    <td>{start.format(DateFormat)}</td>
                    <td>{end.format(DateFormat)}</td>
                    <td>
                      {
                        isEnded ? <button type={'button'} className={'btn btn-disabled'}>Ended</button> : <button
                          type={'button'} className={'btn btn-link'}>Join Contest</button>
                      }
                    </td>
                  </tr>
                )
              })
            }

            </tbody>
          </table>

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

export default connect(mapStateToProps, mapDispatchToProps)(Contests)