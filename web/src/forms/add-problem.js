import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'
import _ from 'lodash'
import ProblemFile from '../components/problem-file'

export default class AddProblemForm extends React.Component {

  state = {
    file: null
  }

  onFileAdd = (e) => {
    if (e.target.files.length && this.props.onUpload) {
      this.props.onUpload(e.target.files[0])
    }
  }
  onFileRemove = (file) => {
    if (this.props.onFileRemove) {
      this.props.onFileRemove(file)
    }
  }

  render () {
    const {onSubmit, submitTitle, values, file} = this.props
    const _this = this

    const fields = [
      {
        name: 'title',
        title: 'Problem title',
        type: 'input',
        placeholder: 'Problem title'
      },
      {
        name: 'file',
        title: 'PDF',
        type: 'file',
        placeholder: 'PDF',
      },
      {
        name: 'description',
        title: 'Problem description',
        type: 'textarea',
        placeholder: 'Problem description',
        rows: 3,
      },
      {
        name: 'input',
        title: 'Input format',
        type: 'textarea',
        placeholder: 'Input format',
        rows: 2,
      },
      {
        name: 'output',
        title: 'Output format',
        type: 'textarea',
        placeholder: 'Output format',
        rows: 2,
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
            values = _.setWith(values, 'file_id', _.get(file, 'id', null))
            onSubmit(values)
          }

        }}
        render={({errors, touched}) => (
          <Form>
            {
              fields.map((f, index) => {
                return (
                  f.type === 'file' ? (

                    file ? <ProblemFile onRemove={() => _this.onFileRemove(file)} key={index} file={file}/> : (
                      <div key={index} className="form-group">
                        <label htmlFor={f.name}>{f.title}</label>
                        <input onChange={_this.onFileAdd} className={'form-control-file'} type={'file'} name={f.name}/>
                      </div>)
                  ) : (

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