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
import Button from 'react-bootstrap/Button'
import ParallaxEffect from '../components/parallax'

class ShopIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const images = get(this, 'props.data.allContentfulGalleryImage')
    const shopData = get(this, 'props.data.contentfulShop')

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

// react bootstrap layout ref: https://react-bootstrap.github.io/layout/grid/
    return (
      <Layout location={this.props.location} >
          <Helmet>
            <title>Shop| Framed Prints|Canvas|Art|Photographic|Artboard|Poster|Mounted|{siteTitle}</title>
            <meta name="description" content={shopData.metaDescription.metaDescription} />
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
            <div className="shop-title-section"data-sal-duration="1700"
              data-sal="slide-up" data-sal-delay="200" data-sal-easing="easeInOutCubic">
                <h1 className="hero-heading">Light Play Images<br/>Shop</h1>
                <p className="shop-text">{shopData.openingText.openingText}</p>
                <Button target="_blank" href="https://LP-Images.redbubble.com" className="btm-margin shop-button" variant="outline-success">Visit Shop</Button>
            </div>
          </div>
          <Container>
            <Row className="promo-wrapper">
              <Col xs={12} sm={12} md={6} lg={6}>
                <div className="promotional-img">
                  <a target="_blank" href="https://www.redbubble.com/people/lp-images/shop?artistUserName=lp-images&asc=u&iaCode=u-print-metal">
                    <Img  className="preview-img" alt={shopData.metalPromoPrint.description}  fluid={shopData.metalPromoPrint.fluid} />
                  </a>
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <div className="promotional-img">
                  <a target="_blank" href="https://www.redbubble.com/people/lp-images/shop?artistUserName=lp-images&asc=u&iaCode=u-print-frame">
                    <Img  className="preview-img" alt={shopData.framedPrintsTwo.description}  fluid={shopData.framedPrintsTwo.fluid} />
                  </a>
                </div>
              </Col>
            </Row>
            <Row className="promo-wrapper">
              <Col xs={12} sm={12} md={4} lg={4}>
                <div className="promotional-info">
                  <h3 className="promotional-heading">Wall Art</h3>
                  <p className="promo-text">A range of print reproductions are available including, art board, framed, canvas and metal prints.</p>
                  <Button href="https://LP-Images.redbubble.com" className="btm-margin shop-button" variant="outline-success">Visit Shop</Button>
                </div>
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
                <div className="promotional-img">
                  <a target="_blank" href="https://www.redbubble.com/people/lp-images/shop?artistUserName=lp-images&asc=u&iaCode=u-prints">
                    <Img  className="preview-img" alt={shopData.framedPrints.description}  fluid={shopData.framedPrints.fluid} />
                  </a>
                </div>
              </Col>
            </Row>
            <Row className="promo-wrapper">
              <Col xs={12} sm={12} md={6} lg={6}>
                <div className="promotional-img">
                  <a target="_blank" href="https://www.redbubble.com/people/lp-images/shop?artistUserName=lp-images&asc=u&iaCode=u-print-board-gallery">
                    <Img  className="preview-img" alt={shopData.artBoards.description}  fluid={shopData.artBoards.fluid} />
                  </a>
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <div className="promotional-img">
                  <a target="_blank" href="https://www.redbubble.com/people/lp-images/shop?artistUserName=lp-images&asc=u&iaCode=u-print-art">
                    <Img  className="preview-img" alt={shopData.artPrint.description}  fluid={shopData.artPrint.fluid} />
                  </a>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={8} lg={8}>
                <div className="promotional-img">
                  <a target="_blank" href="https://www.redbubble.com/people/lp-images/shop?artistUserName=lp-images&asc=u&iaCode=u-stationery">
                    <Img  className="preview-img" alt={shopData.greetingCardPromo.description}  fluid={shopData.greetingCardPromo.fluid} />
                  </a>
                </div>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <div className="promotional-info">
                  <h3 className="promotional-heading">Stationery</h3>
                  <p className="promo-text">A range of stationery is available including greeting cards, postcards, notepads etc.</p>
                  <Button href="https://LP-Images.redbubble.com" className="btm-margin shop-button" variant="outline-success">Visit Shop</Button>
                </div>
              </Col>
            </Row>
            <Row className="promo-wrapper">
              <Col xs={12} sm={12} md={6} lg={6}>
                <div className="promotional-img">
                  <a target="_blank" href="https://www.redbubble.com/people/lp-images/shop?artistUserName=lp-images&asc=u&iaCode=u-notebook-spiral">
                    <Img  className="preview-img" alt={shopData.spiralNotebook.description}  fluid={shopData.spiralNotebook.fluid} />
                  </a>
                </div>
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <div className="promotional-img">
                  <a target="_blank" href="https://www.redbubble.com/people/lp-images/shop?artistUserName=lp-images&asc=u&iaCode=u-notebook-spiral">
                    <Img  className="preview-img" alt={shopData.spiralNotebookTwo.description}  fluid={shopData.spiralNotebookTwo.fluid} />
                  </a>
                </div>
              </Col>
            </Row>
            <Row className="promo-wrapper">
              <Col xs={12} sm={12} md={4} lg={4}>
                <div className="promotional-info">
                  <h3 className="promotional-heading">And More!</h3>
                  <p className="promo-text">Many more products are available at my Redbubble shop including homewares, phone cases, bags and clothing.</p>
                  <Button href="https://LP-Images.redbubble.com" className="btm-margin shop-button" variant="outline-success">Visit Shop</Button>
                </div>
              </Col>
              <Col xs={12} sm={12} md={8} lg={8}>
                <div className="promotional-img">
                  <a target="_blank" href="https://www.redbubble.com/people/lp-images/shop?artistUserName=lp-images&asc=u&iaCode=u-pillows">
                    <Img  className="preview-img" alt={shopData.cushionPromo.description}  fluid={shopData.cushionPromo.fluid} />
                  </a>
                </div>
              </Col>
            </Row>
          </Container>

          <ParallaxEffect
            backgroundImg={imageOne[1].file.url}
            backgroundImgs={`${imageOne[0].file.url} 1900w,
                            ${imageOne[1].file.url} 1450w,
                            ${imageOne[2].file.url} 840w,
                            ${imageOne[3].file.url} 650w`}
            galleryClass="section-parallax"
          />
      </Layout>
    )
  }
}

export default ShopIndex


//note: contentful long text entries require ItemsFieldName { itemsFieldName } to retrieve the stored data
export const pageQuery = graphql`

  query ShopIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    contentfulShop {
      openingText {
        openingText
      }
      metaDescription {
        metaDescription
      }
      metalPromoPrint {
        description
        fluid(maxWidth: 1000) {
         ...GatsbyContentfulFluid
        }
      }
      framedPrintsTwo {
        description
        fluid(maxWidth: 1000) {
         ...GatsbyContentfulFluid
        }
      }
      greetingCardPromo {
        description
        fluid(maxWidth: 1000) {
         ...GatsbyContentfulFluid
        }
      }
      framedPrints {
        description
        fluid(maxWidth: 1000) {
         ...GatsbyContentfulFluid
        }
      }
      artBoards {
        description
        fluid(maxWidth: 1000) {
         ...GatsbyContentfulFluid
        }
      }
      artPrint {
        description
        fluid(maxWidth: 1000) {
         ...GatsbyContentfulFluid
        }
      }
      spiralNotebook {
        description
        fluid(maxWidth: 1000) {
         ...GatsbyContentfulFluid
        }
      }
      spiralNotebookTwo {
        description
        fluid(maxWidth: 1000) {
         ...GatsbyContentfulFluid
        }
      }
      cushionPromo {
        description
        fluid(maxWidth: 1000) {
         ...GatsbyContentfulFluid
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