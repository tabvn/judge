import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../layout/layout'
import AddProblemForm from '../forms/add-problem'

class EditProblem extends React.Component {

  state = {
    step: 'details',
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
                  this.state.step === 'details' ? <AddProblemForm submitTitle={'Save'}/> : (<div>hi</div>)
                }
              </div>
            </div>
          </div>
        </div>


      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditProblem)