import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../layout/layout'
import AddProblemForm from '../forms/add-problem'
import { deleteProblemFile, getProblem, updateProblem, deleteProblem } from '../redux/actions'
import _ from 'lodash'
import classNames from 'classnames'
import TestCase from './testcase'
import { history } from '../hostory'

class EditProblem extends React.Component {

  state = {
    step: 'details',
    file: null,
    fileError: null,
    alert: {
      type: 'success',
      message: null
    }
  }

  componentDidMount () {
    const id = _.get(this.props, 'match.params.id')
    if (id) {
      this.props.getProblem(id).then((p) => {
        this.setState({
          file: _.get(p, 'file')
        })
      })
    }

  }

  renderDetailsForm = () => {
    const {problem} = this.props
    return problem ? (
      <AddProblemForm
        onDelete={() => {
          this.props.deleteProblem(problem.id).then(() => {
            history.push('/')
          })
        }}
        isEdit={true}
        submitTitle={'Save'}
        values={problem}
        onFileRemove={(file) => {

          this.props.deleteProblemFile(file).then(() => {
            this.setState({
              file: null
            })
          })
        }}
        file={this.state.file}
        onUpload={(file) => {
          this.props.upload(file).then((data) => {

            this.setState({
              file: data
            })
          }).catch((e) => {
            this.setState({
              fileError: e.toLocaleString()
            })
          })
        }}
        onSubmit={(values) => {
          // handle update here
          this.props.updateProblem(Object.assign(problem, values)).then(() => {
            this.setState({
              ...this.state,
              alert: {
                type: 'success',
                message: 'Problem has been saved'
              }
            }, () => {

              setTimeout(() => {
                this.setState({
                  ...this.state,
                  alert: {
                    type: 'success',
                    message: null
                  }
                })
              }, 3000)
            })
          }).catch(e => {

            this.setState({
              ...this.state,
              alert: {
                type: 'error',
                message: 'Problem could not be saved'
              }
            })
          })
        }}/>
    ) : null
  }

  render () {
    const id = _.get(this.props, 'match.params.id')

    const tabs = [
      {
        title: 'Details',
        name: 'details',
      },
      {
        title: 'Test cases',
        name: 'test'
      }
    ]
    return (
      <Layout admin={true}>


        <div className={'row justify-content-md-center'}>
          <div className={'col-md-12'}>
            <div className="card">
              <div className="card-header">
                {_.get(this.props, 'problem.title', '')}
              </div>
              <div className="card-body">

                {this.state.alert.message ? <div
                  className={classNames('alert', {'alert-danger': this.state.alert.type === 'error'}, {'alert-success': this.state.alert.type === 'success'})}>{this.state.alert.message}</div> : null}
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
                  this.state.step === 'details' ? this.renderDetailsForm() : (<TestCase id={id}/>)
                }
              </div>
            </div>
          </div>
        </div>


      </Layout>
    )
  }
}

const mapStateToProps = (state, props) => ({
  problem: state.problem.models.get(parseInt(_.get(props, 'match.params.id', 0)))
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getProblem,
  deleteProblemFile,
  updateProblem,
  deleteProblem,
  upload: (file) => {
    return (dispatch, getState, {service}) => {
      return service.upload('api/files', file)
    }
  }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditProblem)