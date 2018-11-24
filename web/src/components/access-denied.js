import React from 'react'
import Layout from '../layout/layout'

export default class AccessDenied extends React.Component {

  render () {
    return (
      <Layout>
        <div className={'px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center'}>
          <h1 className="display-4">Access denied</h1>
        </div>

      </Layout>

    )
  }

}