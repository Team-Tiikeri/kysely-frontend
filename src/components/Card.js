import React from "react"
import MaterialUICard from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"

const Card = ({ children, styles }) => {
  const customStyle = {
    ...styles,
    minWidth: 275,
  }

  return (
    <MaterialUICard style={customStyle} variant="outlined">
      <CardContent>{children}</CardContent>
    </MaterialUICard>
  )
}

export default Card
