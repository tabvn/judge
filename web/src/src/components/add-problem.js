import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../layout/layout'
import classNames from 'classnames'

class AddProblem extends React.Component {

  state = {
    error: null,
    submitted: false,
    problem: {
      title: '',
      description: ''
    }
  }
  onChange = (e) => {
    const name = e.target.name

    this.setState({
      ...this.state,
      problem: {
        ...this.state.problem,
        [name]: e.target.value,
      }
    })
  }
  submit = (e) => {
    e.preventDefault()
  }

  render () {
    const {error, problem} = this.state

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
                <form onSubmit={this.submit}>

                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input value={problem.title} name={'title'} onChange={this.onChange} type="text"
                           className={classNames('form-control', {'is-invalid': error && error.search('Title') !== -1})}
                           id="title"
                           placeholder="Problem title"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="title">Description</label>
                    <textarea rows={8} value={problem.description} name={'description'} onChange={this.onChange}
                              className={classNames('form-control', {'is-invalid': error && error.search('Description') !== -1})}
                              id="title"
                              placeholder="Description"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="input">Input format</label>
                    <textarea rows={5} value={problem.input} name={'input'} onChange={this.onChange}
                              className={classNames('form-control', {'is-invalid': error && error.search('Input') !== -1})}
                              id="input"
                              placeholder="Input format"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="output">Output format</label>
                    <textarea rows={5} value={problem.input} name={'output'} onChange={this.onChange}
                              className={classNames('form-control', {'is-invalid': error && error.search('Output') !== -1})}
                              id="output"
                              placeholder="Output format"/>
                  </div>

                  <button disabled={this.state.submitted} type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </Layout>)
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddProblem)