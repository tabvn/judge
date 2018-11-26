import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../layout/layout'
import { history } from '../hostory'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import classNames from 'classnames'
import moment from 'moment'
import { createContest } from '../redux/actions'
import _ from 'lodash'

class AddContest extends React.Component {

  state = {
    error: null,
    name: '',
    start: new Date(),
    end: moment().add(1, 'hours').toDate(),
    scoreboard: true
  }
  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.name === '') {
      this.setState({
        error: 'Contest name is required'
      })
    } else {

      const data = {
        name: _.trim(this.state.name),
        start: moment(this.state.start).unix(),
        end: moment(this.state.end).unix(),
        scoreboard: this.state.scoreboard
      }

      this.props.createContest(data).then((res) => {
        history.push(`/contests/${res.id}/edit`)
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
    let value =  e.target.value
    if(e.target.type === 'checkbox'){
      value = !this.state[name]
    }
    this.setState({
      [name]:value,
      error: null
    })
  }

  render () {

    const {error} = this.state
    return (

      <Layout admin={true}>

        <div className={'col-md-12'}>
          <div className="card">
            <div className="card-header">
              Create new contest
            </div>
            <div className="card-body">

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
                        minDate={new Date()}
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
                        minDate={this.state.start}
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
                  <input name={'scoreboard'} onChange={this.handleOnChange} checked={this.state.scoreboard} type="checkbox" className="form-check-input" id="scoreboard" />
                    <label className="form-check-label" htmlFor="scoreboard">Scoreboard</label>
                </div>

                <button className={'btn btn-primary'}>Create</button>
              </form>

            </div>
          </div>
        </div>
      </Layout>)
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  createContest
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddContest)