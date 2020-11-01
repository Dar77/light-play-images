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

      <footer>
        <Container className="footer-info">
          <Row>
            <Col  xs={12} sm={8} md={12} lg={4}>
              <img className="footer-logo" src={logo} alt="lightplay logo" />
            </Col>
            <Col xs={12} sm={8} md={6} lg={4} className="footer-col">
              <h3>Quick Links</h3>
              <ul className="footer-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
              </ul>
              <h3>Redbubble Shop</h3>
              <ul className="footer-list">
                <li><a  target="_blank" href="https://www.redbubble.com/people/lp-images/shop?artistUserName=LP-Images&asc=u&iaCode=u-prints">Wall Art</a></li>
                <li><a  target="_blank" href="https://www.redbubble.com/people/lp-images/shop?artistUserName=lp-images&asc=u&iaCode=u-clothing">Clothing</a></li>
                <li><a  target="_blank" href="https://www.redbubble.com/people/lp-images/shop?artistUserName=lp-images&asc=u&iaCode=u-accessories">Accessories</a></li>
                <li><a  target="_blank" href="https://www.redbubble.com/people/lp-images/shop?artistUserName=lp-images&asc=u&iaCode=u-phone-cases">Phone Cases</a></li>
                <li><a  target="_blank" href="https://www.redbubble.com/people/lp-images/shop?artistUserName=lp-images&asc=u&iaCode=u-stationery">Stationery</a></li>
                <li><a  target="_blank" href="https://www.redbubble.com/people/lp-images/shop?artistUserName=lp-images&asc=u&iaCode=u-decor">Home & Living</a></li>
              </ul>
              <h3>Social Media</h3>
              <ul className="footer-list">
                <li><a  target="_blank" href="https://www.pinterest.com.au/lightplayimages/_saved/"><img className="social-icon-style" src="../../badgeRGB-white-20.png" alt="pinterest icon"/> Pinterest</a></li>
              </ul>
            </Col>
            <Col xs={12} sm={8} md={6} lg={4} className="footer-col">
              <h3>Galleries</h3>
              <ul className="footer-list">
                {data.allContentfulGallery.edges.map(({ node }) => {
                  return (
                    <li  key={node.galleryTitle}>
                      <Link to={`/gallery/${node.slug}/`}>{node.galleryTitle}</Link>
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