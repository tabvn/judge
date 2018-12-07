import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { findProblems, addProblemToContest } from '../redux/actions'
import styled from 'styled-components'
import classNames from 'classnames'
import _ from 'lodash'

const List = styled.div`
  height: 250px;
  overflow-y: auto;
`

class ProblemList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      active: null,
      search: '',
      problems: [],
      max_score: 10,
    }

    this._search = _.debounce(this.loadProblems, 200)
  }

  onChange = (e) => {
    const value = e.target.value

    this.setState({
      search: value,
    }, () => {
      this._search(value)
    })
  }

  componentDidMount () {
    const filter = {
      limit: 50,
      offset: 0,
      search: this.state.search
    }

    this.props.findProblems(filter).then((problems) => {
      this.setState({
        problems: problems ? problems : []
      })
    })
  }

  loadProblems (search = '') {
    const filter = {
      limit: 50,
      offset: 0,
      search: _.trim(search)
    }

    this.props.findProblems(filter).then((problems) => {
      this.setState({
        problems: problems ? problems : []
      })
    })
  }

  render () {
    const {problems} = this.state

    return (
      <div>

        <div className={'pb-2 pt-2'}>
          <input
            className={'form-control'}
            value={this.state.search} onChange={this.onChange.bind(this)}
            type={'text'}
            placeholder={'search problems...'}/>
        </div>
        <List className="list-group">
          {
            problems.map((p, index) => {

              const isActive = _.get(this.state.active, 'id') === p.id
              const isDisable = this.props.models.find((m) => m.problem_id === p.id)

              return (
                !isDisable ? <button
                  disabled={isDisable}
                  onClick={() => {
                    this.setState({
                      active: isActive ? null : p
                    })
                  }}
                  key={index} type="button"
                  className={classNames('list-group-item list-group-item-action', {'active': isActive})}>{p.title}</button> : null
              )
            })
          }
        </List>

        {
          this.state.active && (
            <div className="input-group mb-3 mt-2">
              <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Max score</label>
              </div>
              <input className={'form-control'} placeholder={'Max score'} type={'text'} name={'max_score'}
                     value={this.state.max_score} onChange={(e) => {
                this.setState({
                  max_score: e.target.value,
                })
              }}/>

            </div>

          )
        }

        <button
          disabled={!this.state.active}
          onClick={() => {
            this.props.addProblemToContest(this.props.contestId, {
              problem_id: this.state.active.id,
              max_score: parseInt(this.state.max_score),
              contest_id: this.props.contestId
            }).then(() => {
              if (this.props.onClose) {
                this.props.onClose()
              }
            })
          }} className={classNames('btn btn-primary mt-2')} type={'button'}>Add
        </button>

      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  models: state.contestProblem.models.filter((cp) => cp.contest_id === props.contestId).valueSeq()
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  findProblems,
  addProblemToContest
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProblemList)