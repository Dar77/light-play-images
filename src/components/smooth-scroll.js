import React from 'react'
import { Link } from "gatsby"

//the path for the scroll to top link is passed in as a prop in layout.js
export default props => (
    <div className="top-link">
        {props.path == '/404.html' ? '' : <Link to={`${props.path}#header`}><i class="material-icons">expand_less</i></Link>}
    </div>
)
