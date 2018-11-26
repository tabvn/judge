import React, { Fragment } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import classNames from 'classnames'
import _ from 'lodash'
import { Checkbox } from './checkbox'
import { addTestCase, updateTestCase } from '../redux/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Yup from 'yup'

class TestCaseForm extends React.Component {

  onCreate = (values) => {

    values.strength = parseInt(values.strength)
    
    if (_.get(this.props.values, 'id')) {
      // update
      this.props.updateTestCase(Object.assign(this.props.values, values)).then(() => {
        if (this.props.onDone) {
          this.props.onDone()
        }
      })

    } else {
      this.props.addTestCase(this.props.problemId, values).then(() => {
        if (this.props.onDone) {
          this.props.onDone()
        }
      })
    }

  }

  render () {

    const onCreate = this.onCreate

    const {submitTitle, values, onCancel, title} = this.props

    const fields = [
      {
        name: 'input',
        title: 'Input',
        component: 'textarea',
        placeholder: '',
        rows: 3,
      },
      {
        name: 'output',
        title: 'Output',
        component: 'textarea',
        placeholder: '',
        rows: 3,
      },
      {
        name: 'strength',
        title: 'Strength',
        type: 'input',
        placeholder: '',
      },
      {
        name: 'sample',
        title: 'Sample',
        placeholder: '',
        type: 'checkbox'
      },
      {
        name: 'active',
        title: 'Active',
        placeholder: '',
        type: 'checkbox'
      },

    ]
    return (
      <Formik
        validationSchema={Yup.object().shape({
          strength: Yup.number(),
          sample: Yup.bool(),
          active: Yup.bool(),
        })}
        initialValues={{
          input: _.get(values, 'input', ''),
          output: _.get(values, 'output', ''),
          strength: _.get(values, 'strength', 10),
          sample: _.get(values, 'sample', false),
          active: _.get(values, 'active', true)
        }}
        onSubmit={values => {
          onCreate(values)
        }}
        render={({errors, touched}) => (
          <Form>
            <h5 className={'mb-top-2 mt-2'}>{title}</h5>
            {
              fields.map((f, index) => {
                return (
                  <Fragment key={index}>
                    {
                      _.get(f, 'type') === 'checkbox' ? (
                        <div className={'form-group'}>
                          <Checkbox key={index}
                                    title={f.title}
                                    name={f.name}/>
                        </div>) : (
                        <div key={index}
                             className={classNames('form-group', {'form-check': _.get(f, 'type') === 'checkbox'})}>
                          <label htmlFor={f.name}>{f.title}</label>
                          <Field
                            id={f.name}
                            type={_.get(f, 'type', 'text')}
                            rows={_.get(f, 'rows')}
                            component={_.get(f, 'component', 'input')}
                            className={classNames({'form-check-input': _.get(f, 'type') === 'checkbox'}, {'form-control': _.get(f, 'type') !== 'checkbox'}, {'is-invalid': _.get(errors, f.name)})}
                            name={f.name}
                            placeholder={_.get(f, 'placeholder')}/>

                          <ErrorMessage
                            name={f.name}
                            component="small"
                            className="field-error text-danger"
                          />
                        </div>
                      )
                    }
                  </Fragment>
                )
              })
            }
            <button className={'btn btn-primary mr-2'} type="submit">{submitTitle ? submitTitle : 'Create'}</button>
            <button onClick={() => {
              if (onCancel) {
                onCancel()
              }
            }} className={'btn btn-default'} type="button">Cancel
            </button>
          </Form>
        )}
      />
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addTestCase,
  updateTestCase
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TestCaseForm)