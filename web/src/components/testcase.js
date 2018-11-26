import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import TestCaseForm from '../forms/test-case-form'
import { loadTestCases, deleteTestCase, getTestCase } from '../redux/actions'
import { api } from '../config'

const Button = styled.button`
  border: 0 none;
  outline: 0 none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  &.delete{
    color: #212529;
  }
`

const Strength = styled.input`
  width: 50px !important;
`

class TestCase extends React.Component {

  state = {
    addTestCase: false,
    editTestCase: false
  }

  componentWillMount () {
    const {models} = this.props

    if (!models.size) {
      this.props.loadTestCases(this.props.id)
    }

  }

  renderTable () {

    const {models} = this.props

    return (
      <div>
        <div className={'pt-3 pb-3'}>
          <button onClick={() => {
            this.setState({
              addTestCase: true
            })
          }} type={'button'} className={'btn btn-primary'}>Add test case
          </button>
        </div>
        <table className="table">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Input</th>
            <th scope="col">Output</th>
            <th scope="col">Sample</th>
            <th scope="col">Strength</th>
            <th scope="col">Active</th>
            <th scope={'col'}>Action</th>
          </tr>
          </thead>
          <tbody>
          {
            models.map((t, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td><a target={'blank'} href={`${api}/api/tests/${t.id}/input`}>input_{t.id}.txt</a></td>
                  <td><a target={'blank'} href={`${api}/api/tests/${t.id}/output`}>ouput_{t.id}.txt</a></td>
                  <td><Button><i className={'md-icon'}>{t.sample ? 'check_box' : 'check_box_outline_blank'}</i></Button>
                  </td>
                  <td><Strength className={'form-control'} type={'text'} defaultValue={t.strength}/></td>
                  <td><Button><i className={'md-icon'}>{t.active ? 'check_box' : 'check_box_outline_blank'}</i></Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => {

                        this.props.getTestCase(t.id).then((data) => {
                          this.setState({
                            addTestCase: true,
                            editTestCase: data
                          })
                        })

                      }}
                      title={'Edit'} className={'mr-2'} type={'button'}><i className={'md-icon'}>edit</i></Button>
                    <Button onClick={() => {

                      this.props.deleteTestCase(t.id)
                    }} title={'Delete'} type={'button'}><i className={'md-icon'}>delete</i></Button>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    )
  }

  render () {
    return (
      <div className={'test-cases'}>

        {
          this.state.addTestCase ?
            <TestCaseForm
              values={this.state.editTestCase}
              title={this.editTestCase ? 'Edit test case' : 'Create new test case'}
              problemId={this.props.id}
              onDone={() => {
                this.setState({
                  addTestCase: false,
                  editTestCase: null
                })
              }}
              onCancel={() => {
                this.setState({
                  addTestCase: false,
                  editTestCase: null
                })
              }} submitTitle={'Save'}/>
            : this.renderTable()
        }

      </div>)
  }
}

const mapStateToProps = (state, props) => ({
  models: state.testcase.models.filter((t) => t.problem_id === parseInt(props.id)).valueSeq(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadTestCases,
  deleteTestCase,
  getTestCase
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TestCase)