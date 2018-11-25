import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import TestCaseForm from '../forms/test-case-form'

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
    addTestCase: false
  }

  renderTable () {
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
          <tr>
            <th scope="row">1</th>
            <td>link to input file</td>
            <td>link to output file</td>
            <td><Button><i className={'md-icon'}>check_box_outline_blank</i></Button></td>
            <td><Strength className={'form-control'} type={'text'} defaultValue={0}/></td>
            <td><Button><i className={'md-icon'}>check_box</i></Button></td>
            <td>
              <Button><i className={'md-icon'}>delete</i></Button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }

  render () {
    return (
      <div className={'test-cases'}>

        {
          this.state.addTestCase ? <TestCaseForm onCancel={() => {
              this.setState({
                addTestCase: false
              })
            }} submitTitle={'Save'}/>
            : this.renderTable()
        }

      </div>)
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TestCase)