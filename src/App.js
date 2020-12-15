import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Snackbar } from "@material-ui/core"
import NavBar from "./components/NavBar"
import QuestionnaireList from "./QuestionnaireList"
import QuestionnairePage from "./QuestionnairePage"
import ReportList from "./ReportList"
import ReportPage from "./ReportPage"
import "./App.css"

const App = () => {
  const [questionnaires, setQuestionnaires] = useState([])
  const [msg, setMsg] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch("https://ohp20kysely.herokuapp.com/api/questionnaires")
      .then((response) => response.json())
      .then((response) => setQuestionnaires(response))
      .catch((err) => console.log(err))
  }, [])

  const closeSnackbar = () => {
    setOpen(false)
  }

  if (!questionnaires) {
    return <div>Loading</div>
  }

  return (
    <Router>
      <div>
        <NavBar />
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={closeSnackbar}
          message={msg}
        />
        <Switch>
          <Route path="/reports/:id">
            <ReportPage />
          </Route>
          <Route path="/reports">
            <ReportList data={questionnaires} />
          </Route>
          <Route path="/:id">
            <QuestionnairePage
              data={questionnaires}
              msg={msg}
              setMsg={setMsg}
              open={open}
              setOpen={setOpen}
            />
          </Route>
          <Route path="/">
            <QuestionnaireList data={questionnaires} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
