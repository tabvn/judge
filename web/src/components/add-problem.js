import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../layout/layout'
import AddProblemForm from '../forms/add-problem'
import { addProblem } from '../redux/actions'
import { history } from '../hostory'

class AddProblem extends React.Component {

  state = {
    error: null,
  }

  render () {
    const {error} = this.state
    return (
      <Layout admin={true}>
        <div className={'row justify-content-md-center'}>
          <div className={'col-md-12'}>
            <div className="card">
              <div className="card-header">
                Create problem
              </div>
              <div className="card-body">
                {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}
                <AddProblemForm onSubmit={(values) => {
                  this.props.addProblem(values).then((res) => {
                    history.push(`/problems/${res.id}/edit`)
                  }).catch((e) => {
                    this.setState({
                      error: e.toLocaleString()
                    })
                  })
                }}/>
              </div>
            </div>
          </div>
        </div>

      </Layout>)
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addProblem
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddProblem)