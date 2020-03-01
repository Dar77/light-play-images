exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
   const { createNodeField } = boundActionCreators
   if(node.internal.type==='SitePage'){
    createNodeField({
        node,
        name: `slug`,
        value: node.path,
    });
   }
}
//generating dynamic menus ref: https://spectrum.chat/gatsby-js/general/how-to-dynamically-generate-navigation-based-on-js-pages~4b0b8de2-13f9-4b26-bda2-1553d1990f0c
/*
{
  allSitePage {
    edges {
      node {
        path
        fields {
          slug
        }
      }
    }
  }
}
*/




//function to dynamically create gallery pages from the data on Contentful.
const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const newGallery = path.resolve('./src/templates/gallery.js')
    resolve(
      graphql(
        `
          {
            allContentfulGallery {
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
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const galleries = result.data.allContentfulGallery.edges
        galleries.forEach((gallery, index) => {
          createPage({
            path: `/gallery/${gallery.node.slug}/`,
            component: newGallery,
            context: {
              slug: gallery.node.slug,
              galleryTitle: gallery.node.galleryTitle
            },
          })
        })
      })
    )
  })
}

//from scooby blog
/*
const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )
  })
}
*/

//original code
/*
const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug
            },
          })
        })
      })
    )
  })
}
*/
