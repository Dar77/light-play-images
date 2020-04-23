import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const constructTitle = (str) => {
  //get the url path string back to a tag title
  let firstStr = str.replace('/search-by-tag/', '')
  firstStr = firstStr.replace(/-/g, ' ')
  return firstStr
}

const imageList = (tags) => {
  const rawTags = {}
  const imageTags = tags
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
  let finalTags = Object.keys(rawTags)
  //sort array alphabetically
  finalTags = finalTags.sort()

  return finalTags
}

export default props => (
  <div>
    <DropdownButton
      id="search by tag menu"
      variant="outline-success"
      drop="left"
      title="Search By Tag"
      role="menu"
    >
    {imageList(props.tags).map((tag) => {
      return (
        <Dropdown.Item
          key={tag}
          className={props.active === `/search-by-tag/${tag.replace(/\//, '-').replace(/\s+/g, '-').toLowerCase().replace(/\&/, 'and')}/`? "active-item" : ""}
          href={`/search-by-tag/${tag.replace(/\//, '-').replace(/\s+/g, '-').toLowerCase().replace(/\&/, 'and')}/`}
        >
          {constructTitle(tag)}
        </Dropdown.Item>
      )
    })}
    </DropdownButton>
  </div>
)