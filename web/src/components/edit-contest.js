import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../layout/layout'
import { history } from '../hostory'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import classNames from 'classnames'
import moment from 'moment'
import { updateContest, getContest } from '../redux/actions'
import _ from 'lodash'
import ContestProblems from './contest-problems'

class EditContest extends React.Component {

  state = {
    step: 'details',
    error: null,
    name: '',
    start: new Date(),
    end: moment().add(1, 'hours').toDate(),
    scoreboard: true,
    published: true,
  }
  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.name === '') {
      this.setState({
        error: 'Contest name is required'
      })
    } else {

      const data = {
        id: parseInt(_.get(this.props, 'match.params.id', null)),
        name: _.trim(this.state.name),
        start: moment(this.state.start).unix(),
        end: moment(this.state.end).unix(),
        scoreboard: this.state.scoreboard,
        published: this.state.published
      }

      this.props.updateContest(data).then((res) => {
        history.push(`/admin/contests`)
      }).catch(e => {
        this.setState({
          error: e.toLocaleString()
        })
      })
    }
  }

  onStartDateChange = (date) => {

    let end = this.state.end
    if (end < date) {
      end = moment(date).add(1, 'hours').toDate()
    }
    this.setState({
      start: date,
      end: end
    })

  }

  onEndDateChange = (date) => {
    this.setState({
      end: date
    })
  }

  handleOnChange = (e) => {
    const name = e.target.name
    let value = e.target.value
    if (e.target.type === 'checkbox') {
      value = !this.state[name]
    }
    this.setState({
      [name]: value,
      error: null
    })
  }

  componentDidMount () {
    const {contest} = this.props
    if (!contest) {
      const id = _.get(this.props, 'match.params.id', null)
      if (id) {
        this.props.getContest(id).then((c) => {

          this.setState({
            name: c.name,
            start: moment.unix(c.start).toDate(),
            end: moment.unix(c.end).toDate(),
            scoreboard: c.scoreboard,
            published: c.published,

          })
        })
      }

    } else {

      this.setState({
        name: contest.name,
        start: moment.unix(contest.start).toDate(),
        end: moment.unix(contest.end).toDate(),
        scoreboard: contest.scoreboard,
        published: contest.published
      })

    }
  }

  renderForm = () => {
    const {error} = this.state
    return this.props.contest && (

      <form onSubmit={this.onSubmit}>
        <div className={'form-group'}>
          <label>Contest name</label>
          <input value={this.state.name} onChange={this.handleOnChange}
                 className={classNames('form-control', {'is-invalid': error && error.search('Contest name') !== -1})}
                 type={'text'} name={'name'}/>
        </div>
        <div className={'d-flex'}>
          <div className={'form-group pr-2'}>
            <label>Start time</label>
            <div>
              <DatePicker
                className={'form-control'}
                showTimeSelect
                timeIntervals={5}
                dateFormat="dd/MM/YYYY h:mm aa"
                timeCaption="time"
                selected={this.state.start}
                onChange={this.onStartDateChange}
              />
            </div>
          </div>

          <div className={'form-group'}>
            <label>End time</label>
            <div>
              <DatePicker
                className={'form-control'}
                showTimeSelect
                timeIntervals={5}
                dateFormat="dd/MM/YYYY h:mm aa"
                timeCaption="time"
                selected={this.state.end}
                onChange={this.onEndDateChange}
              />
            </div>
          </div>
        </div>

        <div className="form-group form-check">
          <input name={'scoreboard'} onChange={this.handleOnChange} checked={this.state.scoreboard}
                 type="checkbox" className="form-check-input" id="scoreboard"/>
          <label className="form-check-label" htmlFor="scoreboard">Scoreboard</label>
        </div>

        <div className="form-group form-check">
          <input name={'published'} onChange={this.handleOnChange} checked={this.state.published}
                 type="checkbox" className="form-check-input" id="published"/>
          <label className="form-check-label" htmlFor="published">Published</label>
        </div>

        <button className={'btn btn-primary'}>Update</button>
        <button onClick={() => {
          history.push(`/admin/contests`)
        }} type={'button'} className={'btn ml-2'}>Cancel
        </button>
      </form>
    )
  }

  render () {

    const id = parseInt(_.get(this.props, 'match.params.id', null))

    const tabs = [
      {
        title: 'Details',
        name: 'details',
      },
      {
        title: 'Problems',
        name: 'problems'
      }
    ]

    return (

      <Layout admin={true}>

        <div className={'col-md-12'}>
          <div className="card">
            <div className="card-header">
              <h6>Edit contest: {this.state.name}</h6>
            </div>
            <div className="card-body">

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

              {

                this.state.step === 'details' && this.renderForm()
              }
              {
                this.state.step === 'problems' && <ContestProblems id={id}/>
              }

            </div>
          </div>
        </div>
      </Layout>)
  }
}

const mapStateToProps = (state, props) => ({
  contest: state.contest.models.get(parseInt(_.get(props, 'match.params.id', 0)))
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getContest,
  updateContest
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditContest)