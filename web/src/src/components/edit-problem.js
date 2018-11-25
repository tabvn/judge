import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../layout/layout'
import AddProblemForm from '../forms/add-problem'
import { getProblem } from '../redux/actions'
import _ from 'lodash'

class EditProblem extends React.Component {

  state = {
    step: 'details',
  }

  componentWillMount () {
    const id = _.get(this.props, 'match.params.id')
    if (id) {
      this.props.getProblem(id)
    }

  }

  renderDetailsForm = () => {
    const {problem} = this.props
    return problem ? <AddProblemForm values={problem} submitTitle={'Save'}/> : null
  }

  render () {

    return (
      <Layout admin={true}>


        <div className={'row justify-content-md-center'}>
          <div className={'col-md-12'}>
            <div className="card">
              <div className="card-header">
                Problem title
              </div>
              <div className="card-body">
                <div className={'pt-2 pb-3'}>
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <button className="btn-link nav-link active">Details</button>
                    </li>
                    <li className="nav-item">
                      <button className="btn-link nav-link">Test cases</button>
                    </li>
                  </ul>
                </div>
                {
                  this.state.step === 'details' ? this.renderDetailsForm() : (
                    <div>hi</div>)
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
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditProblem)