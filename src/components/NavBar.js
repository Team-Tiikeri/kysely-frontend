import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import { Toolbar, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

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
    marginBottom: "1rem",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    marginRight: 12
  }
}))

const NavBar = () => {
  const classes = useStyles()
  return (
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Link className={classes.link} to="/">
            <Typography variant="h5">KyselyApp</Typography>
          </Link>
          <Link className={classes.link} to="/">
            <Typography variant="h6">Home</Typography>
          </Link>
          <Link className={classes.link} to="/reports">
            <Typography variant="h6">Reports</Typography>
          </Link>
        </Toolbar>
      </AppBar>
  )
}

export default NavBar
