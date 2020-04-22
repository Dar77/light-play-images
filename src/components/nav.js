import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from "./light-play-logo-new.png" // Tell Webpack this JS file uses this image


//makes use of StaticQuery so graphql can be used in a component instead of just in pages
//ref: https://www.gatsbyjs.org/docs/static-query/
//uses react-bootstrap-navbar
//the nav dynamically creates links for gallery pages from Contentful data
export default props => (
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

        <Navbar id="header" className="header" expand="lg" fixed="top">
          <Navbar.Brand href="/"><img className="logo" src={logo} alt="lightplay logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link className={`${props.active}`} href="/">Home</Nav.Link>
              <NavDropdown className={`${props.activeGallery}`} title="Galleries" id="basic-nav-dropdown">
                {data.allContentfulGallery.edges.map(({ node }) => {
                  return (
                    <NavDropdown.Item className={props.activeGalleryItem === `/gallery/${node.slug}/`? "active-item" : ""} key={node.galleryTitle} href={`/gallery/${node.slug}/`}>
                      {node.galleryTitle}
                    </NavDropdown.Item>
                  )
                })}
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" aria-label="Tags" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
    )}
  />
)