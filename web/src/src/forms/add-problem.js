import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'
import _ from 'lodash'

export default class AddProblemForm extends React.Component {

  render () {
    const {onSubmit, submitTitle, values} = this.props
    
    const fields = [
      {
        name: 'title',
        title: 'Problem title',
        type: 'input',
        placeholder: 'Problem title'
      },
      {
        name: 'description',
        title: 'Problem description',
        type: 'textarea',
        placeholder: 'Problem description',
        rows: 5,
      },
      {
        name: 'input',
        title: 'Input format',
        type: 'textarea',
        placeholder: 'Input format',
        rows: 3,
      },
      {
        name: 'output',
        title: 'Output format',
        type: 'textarea',
        placeholder: 'Output format',
        rows: 3,
      }

    ]
    return (
      <Formik
        initialValues={{
          title: _.get(values, 'title', ''),
          description: _.get(values, 'description', ''),
          input: _.get(values, 'input', ''),
          output: _.get(values, 'output', ''),
        }}

        validationSchema={Yup.object().shape({
          title: Yup.string()
            .max(255, 'Too long')
            .required('Title is required'),
        })}
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
                    <Field rows={_.get(f, 'rows')} component={_.get(f, 'type', 'input')}
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
            <button className={'btn btn-primary'} type="submit">{submitTitle ? submitTitle : 'Create'}</button>
          </Form>
        )}
      />
    )
  }
}