import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../layout/layout'
import _ from 'lodash'
import { history } from '../hostory'
import classNames from 'classnames'
import PdfViewer from './pdf'
import { api } from '../config'

class ContestProblem extends React.Component {

  state = {
    data: null,
    error: null,
    step: 'details'
  }

  componentDidMount () {

    this.loadData()
  }

  loadData = () => {
    const contestId = _.get(this.props, 'match.params.id', null)
    const problemId = _.get(this.props, 'match.params.problem_id', null)
    this.props.getData(contestId, problemId).then((data) => {
      this.setState({
        data: data
      })
    }).catch(e => {

      this.setState({
        error: e.toLocaleString()
      })
    })

  }

  componentDidUpdate (prevProps, prevState, snapshot) {

    if (_.get(this.props, 'match.params.problem_id', null) !== _.get(prevProps, 'match.params.problem_id', null)) {
      this.loadData()
    }
  }

  renderDetails = () => {

    const problem = _.get(this.state.data, 'problem', null)

    const file = {
      url: `${api}/api/problems/${_.get(problem, 'id')}/document.pdf`,
      httpHeaders: {'Authorization': this.props.getToken()},
      withCredentials: true
    }

    return (
      _.get(problem, 'file.name') ? <div>
        <div className={'problem-details'} dangerouslySetInnerHTML={{__html: _.get(problem, 'description')}}/>
        <PdfViewer file={_.get(problem, 'file.name') ? file : null}/>
        <div className="card mt-3">
          <div className={'card-header'}>
            Submit code
          </div>
          <div className="card-body highlight">

            <div className={'form-group'}>
              <textarea rows={10} className={'form-control'} name={'code'} placeholder={'Enter your code here'}/>
            </div>

            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div> : null
    )
  }

  renderSubmissions = () => {
    return (
      <div>
        Submissions list
      </div>
    )
  }

  render () {

    const problemId = parseInt(_.get(this.props, 'match.params.problem_id', 0))

    const {data} = this.state

    const tabs = [
      {
        title: 'Problem details',
        name: 'details',
      },
      {
        title: 'Submissions',
        name: 'submissions'
      }
    ]

    const breadcrumb = [
      {
        title: 'Home',
        link: '/'
      },
      {
        title: 'Contests',
        link: '/contests'
      },
      {
        title: _.get(data, 'contest.name', ''),
        link: `/contests/${_.get(data, 'contest.id')}`
      },
      {
        title: 'Problem',
        link: null,
        active: true
      }
    ]

    let problems = _.get(data, 'contest_problems', [])
    const problem = _.get(data, 'problem', null)

    if (!problems) {
      problems = []
    }

    return (
      <Layout breadcrumb={breadcrumb} fullWidth={true} useHeader={true}>

        {this.state.error ? <div className="alert alert-danger" role="alert">
          {this.state.error}
        </div> : null}

        <div className={'row'}>
          <div className={'col col-md-9'}>
            <h1 className={'mt-3 mb-3'}>{_.get(problem, 'title')}</h1>
            <div className={'pt-2 pb-3'}>
              <ul className="nav nav-tabs">
                {
                  tabs.map((tab, index) => {
                    return (
                      <li key={index} className="nav-item">
                        <button
                          onClick={() => {
                            this.setState({
                              ...this.state,
                              step: tab.name,
                            })

                          }}
                          className={classNames('btn btn-link nav-link', {'active': this.state.step === tab.name})}>{tab.title}
                        </button>
                      </li>
                    )
                  })
                }
              </ul>
            </div>


            {this.state.step === 'details' && this.renderDetails()}
            {this.state.step === 'submissions' && this.renderSubmissions()}
          </div>
          <div className={'col col-md-3'}>
            <div className="card">
              <div className="card-header">
                Contest Problems
              </div>
              <ul className="list-group list-group-flush">
                {
                  problems.map((p, key) => {

                    const isActive = p.problem_id === problemId
                    return (
                      <li key={key} className="list-group-item">
                        {
                          <button disabled={isActive} onClick={() => {
                            history.push(`/contests/${p.contest_id}/problems/${p.problem_id}`)
                          }} className={'btn btn-link m-0 p-0'}>{p.problem.title}</button>
                        }
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>


        </div>
      </Layout>)
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getToken: () => {
    return (dispatch, getState, {service}) => {
      return service.getToken()
    }
  },
  getData: (contestId, problemId) => {
    return (dispatch, getState, {service}) => {
      return service.get(`api/contests/${contestId}/problems/${problemId}`)
    }
  }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ContestProblem)