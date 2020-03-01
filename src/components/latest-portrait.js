import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

//makes use of StaticQuery so graphql can be used in a component instead of just in pages
//ref: https://www.gatsbyjs.org/docs/static-query/
//uses react-bootstrap-navbar
//the latest portrait orientation images from Contentful data
export default () => (
  <StaticQuery
    query={graphql`
      {
        allContentfulGalleryImage(
          limit: 8
          filter: {imageOrientation: { eq: false }}
          sort:{fields:[year], order:DESC}
        ) {
          edges {
            node {
              imageTitle
              galleryTitle
              imageDescription {
                imageDescription
              }
              imageOrientation
              image {
                title
                fluid(maxWidth: 260) {
                 ...GatsbyContentfulFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Row>
        {data.allContentfulGalleryImage.edges.map(({ node }) => {
          return (
            <Col key={node.imageTitle} className="margin-btm" xs={12} sm={6} md={4} lg={3}>
                <div className="img-container">
                  <a href={`/gallery/${node.galleryTitle.replace(/\s+/g, '-').toLowerCase().replace(/\&/, 'and')}/`}>
                    <Img className="preview-img" alt={node.imageDescription.imageDescription} fluid={node.image.fluid}/>
                  </a>
                  <h3 className="img-title">{node.imageTitle}</h3>
                </div>
            </Col>
          )
        })}
      </Row>
    )}
  />
)