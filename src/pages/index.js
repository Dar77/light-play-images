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
import InfoBar from '../components/info-bar'
import Landscape from '../components/latest-landscape'
import Portrait from '../components/latest-portrait'
import ParallaxEffect from '../components/parallax'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const galleries = get(this, 'props.data.allContentfulGallery.edges')
    const images = get(this, 'props.data.allContentfulGalleryImage')
    const homeData = get(this, 'props.data.contentfulSiteHome')

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
      let imgArray = images.edges.map(({node}) => node.wideBackgroundImages)
//      let imgArray = images.edges.map(({node}) => node.imageWideBackground.file.url)
      //find the length of the array and use this as the max argument in getRandomIntInclusive(min, max)
      let length = imgArray.length
      //return a random index
      return imgArray[getRandomIntInclusive(0, length-1)]
    }

    const imageOne = randomImg()
    const imageTwo = randomImg()

// react bootstrap layout ref: https://react-bootstrap.github.io/layout/grid/
    return (
      <Layout location={this.props.location} >
          <Helmet>
            <title>{siteTitle}| Original Artwork & Photography| Image Gallery</title>
            <meta name="description" content={homeData.metaDescription.metaDescription} />
            <meta name="google-site-verification" content="8emG-6BusKBTgh3I15W4nj5BnVlYnLqsK1gYAgdavDs" />
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
          <div className="hero-title">
            <div data-sal-duration="1700" data-sal="slide-up" data-sal-delay="200" data-sal-easing="easeInOutCubic">
              <h1 className="hero-heading">Welcome to <br/>Light Play Images</h1>
              <p className="hero-text">{homeData.description.description}</p>
            </div>
          </div>
          <ParallaxEffect
            backgroundImg={homeData.backgroundImages[1].file.url}
            backgroundImgs={`${homeData.backgroundImages[0].file.url} 1900w,
                            ${homeData.backgroundImages[1].file.url} 1450w,
                            ${homeData.backgroundImages[2].file.url} 840w,
                            ${homeData.backgroundImages[3].file.url} 650w`}
            galleryClass="gallery-header-parallax"
          />
          <InfoBar/>
          <div className="section-heading-container">
            <h2 className="section-title">Latest Images</h2>
          </div>
          <Container>
            <Landscape/>
            <Portrait/>
          </Container>
          <ParallaxEffect
            backgroundImg={imageOne[1].file.url}
            backgroundImgs={`${imageOne[0].file.url} 1900w,
                            ${imageOne[1].file.url} 1450w,
                            ${imageOne[2].file.url} 840w,
                            ${imageOne[3].file.url} 650w`}
            galleryClass="section-parallax"
          />
          <div className="section-heading-container">
            <h2 className="section-title">Galleries</h2>
          </div>
          <Container>
            <Row className="gallery-preview-wrapper">
              {galleries.map(({ node }) => {
                return (
                  <Col key={node.galleryTitle} xs={12} sm={6} md={4} lg={3}>
                    <div className="img-container border-card">
                      <Link to={`/gallery/${node.slug}/`}>
                        <Img  className="preview-img" alt={node.galleryDescription.galleryDescription}  fluid={node.previewImage.fluid} />
                      </Link>
                      <Link to={`/gallery/${node.slug}/`}>
                        <h3 className="border-card-title">{node.galleryTitle}</h3>
                      </Link>
                      <Link className="border-card-button" to={`/gallery/${node.slug}/`}>
                        Gallery
                      </Link>
                    </div>
                  </Col>
                )
              })}
            </Row>
          </Container>
          <ParallaxEffect
            backgroundImg={imageTwo[1].file.url}
            backgroundImgs={`${imageTwo[0].file.url} 1900w,
                            ${imageTwo[1].file.url} 1450w,
                            ${imageTwo[2].file.url} 840w,
                            ${imageTwo[3].file.url} 650w`}
            galleryClass="section-parallax"
          />
      </Layout>
    )
  }
}

export default RootIndex

//note: contentful long text entries require ItemsFieldName { itemsFieldName } to retrieve the stored data
export const pageQuery = graphql`

  query HomeIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    contentfulSiteHome {
      description {
        description
      }
      metaDescription {
        metaDescription
      }
      backgroundImages {
        file {
          url
        }
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
          metaDescription {
            metaDescription
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
          wideBackgroundImages {
            file {
              url
            }
          }
        }
      }
    }
  }
`

/* fixed background image
  <div className="bg-image" style={{ backgroundImage: `url(${homeData.backgroundImage.file.url})`}}>
    <div className="main-title-section">
      <h1 className="main-heading">{homeData.mainTitle}</h1>
      <p className="main-heading-p">{homeData.description.description}</p>
    </div>
  </div>
*/
// for gatsby image use Img component(note the capital I)
// for regular img tags use this format:
/*
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
    file {
      url
    }
  }
*/