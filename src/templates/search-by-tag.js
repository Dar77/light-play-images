//gallery template
import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ParallaxEffect from '../components/parallax'
import Modal from 'react-modal'

class SearchByTagTemplate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
      currentImg: ''
    }
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalOpen = (id) => {
    this.setState({ currentImg: id})
    this.setState({ isModalOpen: true })
  }

  handleModalClose = () => {
    this.setState({ isModalOpen: false })
  }

  constructTitle = (str) => {
  	//get the url path string back to a tag title
  	let firstStr = str.replace('/search-by-tag/', '')
  	firstStr = firstStr.replace(/-/g, ' ')
  	let result = firstStr.slice(0, -1);
  	return result
  }

  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const images = get(this.props, 'data.allContentfulGalleryImage')
    const search = get(this.props, 'data.contentfulSearchByTag')

    return (
      <Layout location={this.props.location}>
        <main id="main">
          <Helmet>
            <title>{`Search By Tag| ${this.constructTitle(this.props.location.pathname)}| ${siteTitle}`}</title>
            <meta name="description" content="search images by tag name results" />
            <meta name="robots" content="noindex, follow" />
            <link rel="manifest" crossorigin="use-credentials" href="../../manifest.webmanifest" />
            <meta name="theme-color" content="#000" />
            <link href="https://fonts.googleapis.com/css?family=Lato:300,400,400italic,600,700|Raleway:300,400,500,600,700|Crete+Round:400italic&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap"/>
            <link rel="apple-touch-icon" sizes="180x180" href="../../apple-touch-icon.png?v=lkggaQwrXr"/>
            <link rel="icon" type="image/png" href="../../favicon-32x32.png?v=lkggaQwrXr" sizes="32x32"/>
            <link rel="icon" type="image/png" href="../../favicon-16x16.png?v=lkggaQwrXr" sizes="16x16"/>
            <link rel="mask-icon" href="../../safari-pinned-tab.svg?v=lkggaQwrXr" color="#5bbad5"/>
            <link rel="shortcut icon" href="../../favicon.ico?v=lkggaQwrXr"/>
          </Helmet>
          <ParallaxEffect
            backgroundImg={search.BackgroundImages[1].file.url}
            backgroundImgs={`${search.BackgroundImages[0].file.url} 1900w,
                            ${search.BackgroundImages[1].file.url} 1450w,
                            ${search.BackgroundImages[2].file.url} 840w,
                            ${search.BackgroundImages[3].file.url} 650w`}
            pageTitle="Search Results"
            galleryClass="gallery-header-parallax"
          />
          <div className="gallery-header">
            <Container>
              <Row>
                <Col xs={12} sm={6} md={4} lg={3}>
                  <h2 className="gallery-g">S</h2>
                </Col>
                <Col xs={12} sm={6} md={4} lg={3}>
                  <h2 className="gallery-header-title">{this.constructTitle(this.props.location.pathname)}</h2>
                  <p className="gallery-header-text">These are the results of your custom search on tag name.</p>
                  <p className="gallery-header-text"><i class="material-icons">photo</i> {images.edges.length}</p>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="gallery-wrapper">
            <Container className="gallery-container">
                {images.edges.map(({ node }) => {
                  return (
                    <Row className="gallery-row" key={node.imageTitle}
                    data-sal-duration="1700" data-sal="slide-right" data-sal-delay="200" data-sal-easing="easeInOutCubic">
                      <Col xs={12} sm={6} md={6} lg={5}>
                        <div className={node.imageOrientation === false? "img-max-width gallery-image-wrapper" : "gallery-image-wrapper" }
                         onClick={() => this.handleModalOpen(node.imageTitle)}>
                          <Img className="gallery-img" alt={node.imageDescription.imageDescription} fluid={node.image.fluid}/>
                        </div>
                      </Col>
                      <Col xs={12} sm={6} md={6} lg={4}>
                        <div className="gallery-img-info">
                          <h3 className="gallery-img-title">{node.imageTitle}</h3>
                          <p>{node.imageDescription.imageDescription}</p>
                          <p><i class="material-icons">gps_fixed</i> {node.location}</p>
                          <p><i class="material-icons">today</i> {node.year}</p>
                          <p><i class="material-icons">photo_camera</i> {node.cameraModel}</p>
                          <p><i class="material-icons">person_outline</i> {node.imageCreator.initials}</p>
                          <Button onClick={() => this.handleModalOpen(node.imageTitle)} variant="outline-success">Image Lightbox</Button>
                          <Modal
                            isOpen={node.imageTitle == this.state.currentImg? this.state.isModalOpen: false}
                            onRequestClose={this.handleModalClose}
                            contentLabel={node.imageTitle}
                            ariaHideApp={false}
                            style={{
                                overlay: {
                                  backgroundColor: 'rgba(0, 0, 0, 0.88)',
                                  zIndex: 1020
                                },
                                content: {
                                  top: '105px',
                                  left: '0px',
                                  right: '0px',
                                  overflowY: 'hidden',
                                  backgroundColor: 'transparent',
                                  border: 'none',
                                  padding: '0px'
                                }
                            }}
                          >
                            <h3 className="lightbox-title">{node.imageTitle}</h3>
                            <img className="lightbox-img" alt={node.imageDescription.imageDescription} onClick={this.handleModalClose} src={node.image.file.url}/>
                            <span className="close-lightbox" onClick={this.handleModalClose}><i class="material-icons">highlight_off</i></span>
                          </Modal>
                        </div>
                      </Col>
                    </Row>
                  )
                })}
            </Container>
          </div>
        </main>
      </Layout>
    )
  }
}

export default SearchByTagTemplate

//variables for graphql are declared at the start eg: ($tag: [String])
//these have been defined in gatsby-node.js in the create pages function under context.
//ref: https://www.gatsbyjs.org/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs
export const pageQuery = graphql`
  query SearchByTag($tag: [String]) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulGalleryImage(
      filter: {imageTag: {in: $tag}}
      sort:{fields:[date], order:DESC}
    ) {
      edges {
        node {
          imageTitle
          galleryTitle
          date
          year
          cameraModel
          imageOrientation
          location
          imageTag
          imageCreator {
            initials
          }
          imageDescription {
            imageDescription
          }
          image {
            title
            file {
              url
            }
          }
          image {
            title
            fluid(maxWidth: 520) {
             ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
    contentfulSearchByTag {
	  BackgroundImages {
		file {
		  url
		}
      }
    }
  }
`