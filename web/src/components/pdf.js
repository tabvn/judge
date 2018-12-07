import React, { Component } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import styled from 'styled-components'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const Container = styled.div `
  justify-content: center;
  display: flex;
`
export default class PdfViewer extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = ({numPages}) => {
    this.setState({numPages})
  }

  render () {
    const {pageNumber} = this.state
    const {file} = this.props
    return (
      <Container>
        <Document
          loading={'please wait...'}
          renderMode={'svg'}
          file={file}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber}/>
        </Document>
      </Container>
    )
  }
}