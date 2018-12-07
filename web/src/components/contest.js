import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../layout/layout'
import _ from 'lodash'
import { history } from '../hostory'
import classNames from 'classnames'
import moment from 'moment'

class Contest extends React.Component {
  state = {
    contest: null,
    error: null
  }

  componentDidMount () {
    const id = _.get(this.props, 'match.params.id', null)

    this.props.getContest(id).then((data) => {
      this.setState({
        contest: data
      })
    }).catch(e => {
      this.setState({
        error: e.toLocaleString()
      })
    })
  }

  render () {

    const {contest} = this.state

    const breadcrumb = [
      {
        title: 'Home',
        link: '/',
      },
      {
        title: 'Contests',
        link: '/contests'
      },
      {
        title: _.get(contest, 'contest.name', ''),
        link: null,
        active: true
      }
    ]

    const tabs = [
      {
        title: 'Contest Problems',
        link: `/contests/${_.get(contest, 'contest.id')}`,
        active: true
      },
      {
        title: 'My submissions',
        link: `/contests/${_.get(contest, 'contest.id')}/my-submissions`,
        active: false
      },
      {
        title: 'Submissions',
        link: `/contests/${_.get(contest, 'contest.id')}/submissions`,
        active: false
      },
      {
        title: 'Scoreboard',
        link: `/contests/${_.get(contest, 'contest.id')}/scoreboard`
      }
    ]

    let problems = _.get(contest, 'contest_problems', [])
    if (!problems) {
      problems = []
    }

    const endTime = _.get(contest, 'contest.end', 0)
    const isEnded = moment().unix() > parseInt(endTime)

    const timeLeft = moment.unix(endTime) - moment().unix()





    return (
      <Layout breadcrumb={breadcrumb} fullWidth={true}>
        {this.state.error ? <div className="alert alert-danger" role="alert">
          {this.state.error}
        </div> : null}

        <div className={'row'}>
          <div className={'col-md-9'}>

            <div className={'pt-2 pb-3'}>
              <ul className="nav nav-tabs">
                {
                  tabs.map((tab, index) => {
                    return (
                      <li key={index} className="nav-item">
                        <button
                          onClick={() => {
                            history.push(tab.link)
                          }}
                          className={classNames('btn btn-link nav-link', {'active': tab.active})}>{tab.title}
                        </button>
                      </li>
                    )
                  })
                }
              </ul>
            </div>

            {
              problems.map((c, key) => {
                return (

                  <div key={key} className="card mb-3">
                    <div className="card-body">
                      <h5 className={'card-title'}>{c.problem.title}</h5>
                      <p className="card-text">Max Score: {c.max_score}</p>
                      <button onClick={() => {
                        history.push(`/contests/${c.contest_id}/problems/${c.problem_id}`)
                      }} className="btn btn-primary">Solve problem
                      </button>
                    </div>

                  </div>
                )
              })
            }
          </div>
          <div className={'col-md-3'}>
            <h3 className={'mt-3 mb-3'}>{_.get(contest, 'contest.name', '')}</h3>
            {
              isEnded ? <div>Contest is Finished</div> : (
                <div>
                  Time left: {moment.unix(timeLeft).format('hh:mm:ss')}
                </div>
              )
            }

          </div>


        </div>

      </Layout>)
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getContest: (id) => {
    return (dispatch, getState, {service}) => {
      return service.get(`api/contests/${id}/details`)
    }
  }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Contest)