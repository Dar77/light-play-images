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
    const newSearchByTag = path.resolve('./src/templates/search-by-tag.js')

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
            allContentfulGalleryImage {
              edges {
                node {
                  imageTag
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

        //create gallery pages
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

        const rawTags = {}
        const imageTags = result.data.allContentfulGalleryImage.edges
        //take all the tags from each image and create an array of the different tags without duplicates rawTags[]
        imageTags.forEach(({ node }) => {
          if (node.imageTag) {
            node.imageTag.forEach(tag => {
              if (!rawTags[tag]) {
                rawTags[tag] = []
              }
              rawTags[tag].push(node)
            })
          }
        })

        //create search-by-tag pages
        const tags = Object.keys(rawTags)
        tags.forEach((tag, index) => {
          createPage({
            path: `/search-by-tag/${tag.replace(/\s+/g, '-').toLowerCase().replace(/\&/, 'and')}/`,
            component: newSearchByTag,
            context: {
              tag: tag
            }
          })
        })
      })
    )
  })
}