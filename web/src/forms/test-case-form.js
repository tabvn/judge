import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import classNames from 'classnames'
import _ from 'lodash'

export default class TestCaseForm extends React.Component {

  render () {
    const {onSubmit, submitTitle, values, onCancel} = this.props

    const fields = [
      {
        name: 'input',
        title: 'Input',
        type: 'textarea',
        placeholder: '',
        rows: 3,
      },
      {
        name: 'output',
        title: 'Output',
        type: 'textarea',
        placeholder: '',
        rows: 3,
      },

    ]
    return (
      <Formik
        initialValues={{
          input: _.get(values, 'input', ''),
          output: _.get(values, 'output', ''),
        }}
        onSubmit={values => {
          if (onSubmit) {
            onSubmit(values)
          }

        }}
        render={({errors, touched}) => (
          <Form>
            {
              fields.map((f, index) => {
                return (
                  <div key={index} className="form-group">
                    <label htmlFor={f.name}>{f.title}</label>
                    <Field
                      rows={_.get(f, 'rows')} component={_.get(f, 'type', 'input')}
                      className={classNames('form-control', {'is-invalid': _.get(errors, f.name)})} name={f.name}
                      placeholder={_.get(f, 'placeholder')}/>
                    <ErrorMessage
                      name={f.name}
                      component="small"
                      className="field-error text-danger"
                    />
                  </div>
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