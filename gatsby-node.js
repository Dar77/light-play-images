exports.onCreateNode = ({ node, getNode, actions }) => {
   const { createNodeField } = actions
   if(node.internal.type==='SitePage'){
    createNodeField({
        node,
        name: `slug`,
        value: node.path,
    });
   }
}

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