import React from "react"
import CssBaseline from "@material-ui/core/CssBaseline"
import MaterialUIContainer from "@material-ui/core/Container"

// This creates a fluid container for a page

const Container = ({ children }) => {
  return (
    <React.Fragment>
      <CssBaseline>
        <MaterialUIContainer>{children}</MaterialUIContainer>
      </CssBaseline>
    </React.Fragment>
  )
}

export default Container
