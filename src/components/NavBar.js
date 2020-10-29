import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import { Toolbar, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "#3366FF",
    marginBottom: "1rem"
  },
}))

const NavBar = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Typography variant="h5">KyselyApp</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
