import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import { updateContestProblem } from '../redux/actions'

class EditContestProblem extends React.Component {

  state = {
    model: {
      max_score: 10,
    }
  }

  componentDidMount () {

    this.setState({
      model: this.props.model
    })
  }

  submit = (e) => {
    e.preventDefault()

    this.props.updateContestProblem(this.state.model).then(() => {
      if (this.props.onDone) {
        this.props.onDone()
      }
    })

  }
  onChange = (e) => {

    const name = e.target.name
    const value = e.target.value

    this.setState({
      ...this.state,
      model: {
        ...this.state.model,
        [name]: value
      }
    })
  }

  render () {
    const {model} = this.state
    return (
      <form onSubmit={this.submit}>
        <div className={'form-group'}>
          <label htmlFor={'max-score'}>Max score</label>
          <input id={'max-score'} onChange={this.onChange} value={_.get(model, 'max_score', '')}
                 className={'form-control'}
                 name={'max_score'}/>
        </div>
        <button className={'btn btn-primary'}>Save</button>
      </form>)
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateContestProblem
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditContestProblem)