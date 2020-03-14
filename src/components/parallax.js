import React from 'react'
//react-parallax effect: https://www.npmjs.com/package/react-parallax
import { Parallax, Background } from 'react-parallax';
//animations with, gatsby-plugin-scroll-reveal: https://github.com/mciastek/sal
//https://www.gatsbyjs.org/packages/gatsby-plugin-scroll-reveal/

export default props => (
    <Parallax
        blur={0}
        bgImage={props.backgroundImg}
        bgImageAlt="parallax background image"
        strength={400}
    >
      <div className={`main-title-section ${props.galleryClass}`}
        data-sal-duration="1700" data-sal="slide-up" data-sal-delay="200" data-sal-easing="easeInOutCubic">
        {props.pageTitle === 'Light Play Images' ? <h1 className="main-heading">Welcome to <br/>{props.pageTitle}</h1> :
        <h1 className="main-heading">{props.pageTitle}</h1>}
        {props.galleryDescription || props.pageTitle !== undefined? <p className="parallax-text">{props.galleryDescription}</p>
        : <p></p>
        }
      </div>
    </Parallax>
)
