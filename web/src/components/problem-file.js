import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'

const FileInfo = styled.span`
  margin-right: 10px;
`

export default class ProblemFile extends React.Component {

  render () {
    const {file} = this.props
    return (
      file ? (
        <div className={'problem-file'}>
          <FileInfo className={'file-info'}>{_.get(file, 'original_name')}</FileInfo>
          <button onClick={() => {
            if (this.props.onRemove) {
              this.props.onRemove()
            }
          }} type={'button'} className={'btn btn-secondary btn-sm'}>Remove
          </button>
        </div>) : null
    )
  }
}