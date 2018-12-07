import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getContestProblems } from '../redux/actions'
import Modal from '../layout/modal'
import EditContestProblem from '../forms/edit-contest-problem'
import styled from 'styled-components'
import { deleteContestProblem } from '../redux/actions'
import ProblemList from './problem-list'

const Button = styled.button`
  i{
    float: left;
  }
`

class ContestProblems extends React.Component {

  state = {
    edit: null,
    add: false
  }

  componentWillMount () {
    this.props.getContestProblems(this.props.id)
  }

  render () {
    const {models} = this.props

    return (
      <div>

        <div className={'pb-2 pt-2'}>
          <Button onClick={() => {

            this.setState({
              add: true
            })
          }} className={'btn btn-link'}><i className={'md-icon'}>add</i> Add problem to contest</Button>
        </div>
        <table className="table">
          <thead>
          <tr>
            <th scope="col">Problem</th>
            <th scope="col">Max score</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          {
            models.map((m, index) => {

              const p = m.problem
              return (

                <tr key={index}>
                  <td>
                    <a target={'_blank'} href={`/problems/${p.id}/edit`} className={'btn btn-link'}>{p.title}</a>
                  </td>
                  <td>{m.max_score}</td>
                  <td>
                    <button onClick={() => {
                      this.setState({
                        edit: m
                      })
                    }} className={'btn btn-link'}>Edit
                    </button>
                    <button onClick={() => {
                      this.props.deleteContestProblem(m.id)
                    }} className={'btn btn-link'}>Remove
                    </button>
                  </td>
                </tr>

              )
            })
          }

          </tbody>
        </table>
        <Modal onClose={() => {
          this.setState({
            edit: null
          })
        }} title={'Edit contest problem'} open={!!this.state.edit}>
          <EditContestProblem onDone={() => {
            this.setState({
              edit: null
            })
          }} id={this.props.id} model={this.state.edit}/>
        </Modal>

        <Modal onClose={() => {
          this.setState({
            add: false
          })
        }} title={'Add problem to contest'} open={this.state.add}>
          <ProblemList onClose={() => {

            this.setState({
              add: false
            })
          }} contestId={this.props.id}/>
        </Modal>


      </div>)
  }
}

const mapStateToProps = (state, props) => ({
  models: state.contestProblem.models.filter((cp) => cp.contest_id === props.id).valueSeq()
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getContestProblems,
  deleteContestProblem
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ContestProblems)