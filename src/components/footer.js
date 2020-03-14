import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import logo from "./light-play-logo-new.png" // Tell Webpack this JS file uses this image


//makes use of StaticQuery so graphql can be used in a component instead of just in pages
//ref: https://www.gatsbyjs.org/docs/static-query/
//uses react-bootstrap-navbar
//the footer dynamically creates links for gallery pages from Contentful data
export default () => (
  <StaticQuery
    query={graphql`
      {
        allContentfulGallery(sort:{fields:[date], order:DESC}) {
          edges {
            node {
              galleryTitle
              slug
            }
          }
        }
      }
    `}
    render={data => (

      <footer className="footer-wrapper">
        <Container className="footer-info">
          <Row>
            <Col  xs={12} sm={8} md={12} lg={4}>
              <img className="footer-logo" src={logo} alt="lightplay logo" />
            </Col>
            <Col xs={12} sm={8} md={6} lg={4} className="footer-col">
              <h3>Quick Links</h3>
              <ul className="footer-list">
                <li><a href="/">Home</a></li>
              </ul>
            </Col>
            <Col xs={12} sm={8} md={6} lg={4} className="footer-col">
              <h3>Galleries</h3>
              <ul className="footer-list">
                {data.allContentfulGallery.edges.map(({ node }) => {
                  return (
                    <li  key={node.galleryTitle}>
                      <a href={`/gallery/${node.slug}/`}>{node.galleryTitle}</a>
                    </li>
                  )
                })}
              </ul>
            </Col>
          </Row>
        </Container>
        <div className="copyright">
          <Container>
            <Row>
              <Col>
                <p className="copyright-text">Copyright © {new Date().getFullYear()} Light Play Images All Rights Reserved</p>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    )}
  />
)