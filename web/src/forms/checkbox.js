import { Field } from 'formik'
import React from 'react'

export const Checkbox = (props) => {
  return (
    <Field name={props.name}>
      {({field, form}) => (
        <label>
          <input
            type="checkbox"
            {...props}
            checked={field.value}
            onChange={() => {
              form.setFieldValue(props.name, !field.value)
            }}
          />
          {props.title}
        </label>
      )}
    </Field>
  )
}