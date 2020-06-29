import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//makes use of StaticQuery so graphql can be used in a component instead of just in pages
//ref: https://www.gatsbyjs.org/docs/static-query/
//uses react-bootstrap-navbar
//the latest landscape orientation images from Contentful data
export default () => (
  <StaticQuery
    query={graphql`
      {
        allContentfulGalleryImage {
          edges {
            node {
              imageTitle
            }
          }
        }
        allContentfulGallery {
          edges {
            node {
              galleryTitle
            }
          }
        }
      }
    `}
    render={data => (
      <div className="gallery-header">
        <Container>
          <Row>
            <Col xs={12} sm={6} md={4} lg={3}>
              <h5 className="info-header-title">Galleries</h5>
              <p className="info-header-text"><i class="material-icons">photo_library</i> {data.allContentfulGallery.edges.length}</p>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
              <h5 className="info-header-title">Images</h5>
              <p className="info-header-text"><i class="material-icons">photo</i> {data.allContentfulGalleryImage.edges.length}</p>
            </Col>
          </Row>
        </Container>
      </div>
    )}
  />
)