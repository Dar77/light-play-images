import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//react-parallax effect: https://www.npmjs.com/package/react-parallax
import { Parallax, Background } from 'react-parallax'
import ParallaxEffect from '../components/parallax'

class PageNotfoundIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const galleries = get(this, 'props.data.allContentfulGallery.edges')
    const images = get(this, 'props.data.allContentfulGalleryImage')

    //ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    const getRandomIntInclusive = (min, max) => {
      //get a random number for the number of available background images
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
    }

    //generate a random image to use as a background
    const randomImg = () => {
      //add the background image files to an array
      let imgArray = images.edges.map(({node}) => node.imageWideBackground.file.url)
      //find the length of the array and use this as the max argument in getRandomIntInclusive(min, max)
      let length = imgArray.length
      //return a random index
      return imgArray[getRandomIntInclusive(0, length-1)]
    }

// react bootstrap layout ref: https://react-bootstrap.github.io/layout/grid/
    return (
      <Layout location={this.props.location} >
          <Helmet>
            <title>{siteTitle}| Page not found |404</title>
            <meta name="description" content="Page not found, 404" />
            <meta name="robots" content="noindex" />
            <meta name="theme-color" content="#000" />
            <link href="https://fonts.googleapis.com/css?family=Lato:300,400,400italic,600,700|Raleway:300,400,500,600,700|Crete+Round:400italic" rel="stylesheet"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <link rel="apple-touch-icon" sizes="180x180" href="../../apple-touch-icon.png?v=lkggaQwrXr"/>
            <link rel="icon" type="image/png" href="../../favicon-32x32.png?v=lkggaQwrXr" sizes="32x32"/>
            <link rel="icon" type="image/png" href="../../favicon-16x16.png?v=lkggaQwrXr" sizes="16x16"/>
            <link rel="manifest" href="../../manifest.json?v=lkggaQwrXr"/>
            <link rel="mask-icon" href="../../safari-pinned-tab.svg?v=lkggaQwrXr" color="#5bbad5"/>
            <link rel="shortcut icon" href="../../favicon.ico?v=lkggaQwrXr"/>
          </Helmet>
          <Parallax
              blur={0}
              bgImage={randomImg()}
              bgImageAlt="parallax background image"
              strength={400}
          >
            <div
              className="main-title-section home-parallax"
              data-sal-duration="1700"
              data-sal="slide-up"
              data-sal-delay="200"
              data-sal-easing="easeInOutCubic"
            >
              <h1 className="main-heading">Sorry Page Not Found - 404</h1>
              <p className="parallax-text">We can't find the page you are looking for! It may have been permanently removed from the site. Get back on track with the links on this page.</p>
            </div>
          </Parallax>
          <div className="section-heading-container">
            <h2 className="section-title">Galleries</h2>
          </div>
          <Container>
            <Row className="gallery-preview-wrapper">
              {galleries.map(({ node }) => {
                return (
                  <Col key={node.galleryTitle} xs={12} sm={6} md={4} lg={3}>
                    <div className="img-container border-card">
                      <a href={`/gallery/${node.slug}/`}>
                        <Img  className="preview-img" alt={node.galleryDescription.galleryDescription}  fluid={node.previewImage.fluid} />
                      </a>
                      <a href={`/gallery/${node.slug}/`}>
                        <h3 className="border-card-title">{node.galleryTitle}</h3>
                      </a>
                      <a className="border-card-button" href={`/gallery/${node.slug}/`}>
                        Gallery
                      </a>
                    </div>
                  </Col>
                )
              })}
            </Row>
          </Container>
          <ParallaxEffect
            backgroundImg={randomImg()}
            galleryClass="section-parallax"
          />
      </Layout>
    )
  }
}

export default PageNotfoundIndex

//note: contentful long text entries require ItemsFieldName { itemsFieldName } to retrieve the stored data
export const pageQuery = graphql`

  query pageNotfoundIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulGallery(sort:{fields:[date], order:DESC}){
      edges {
        node {
          galleryTitle
          slug
          galleryDescription {
            galleryDescription
          }
          mainHeaderImage {
            title
            description
            file {
              url
            }
          }
          previewImage {
            title
            description
            fluid(maxWidth: 260) {
             ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
    allContentfulGalleryImage(
      filter:
        {
          backgroundImage: {eq: true}
        }
    ) {
      edges {
        node {
          imageWideBackground {
            title
            file {
              url
            }
          }
        }
      }
    }
  }
`