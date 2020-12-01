import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import NavBar from "./components/NavBar"
import QuestionnaireList from "./QuestionnaireList"
import QuestionnairePage from "./QuestionnairePage"
import ReportList from "./ReportList"
import ReportPage from "./ReportPage"
import "typeface-roboto"
//import data from "./mockData.json"

const App = () => {
  const [questionnaires, setQuestionnaires] = useState([])

  useEffect(() => {
    console.log("Get questionnaires.")
    fetch("https://ohp20kysely.herokuapp.com/api/questionnaires")
      .then((response) => response.json())
      .then((response) => setQuestionnaires(response))
      .catch((err) => console.log(err))
  }, [])

  if (!questionnaires) {
    return <div>Loading</div>
  }

  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/reports/:id">
            <ReportPage />
          </Route>
          <Route path="/reports">
            <ReportList data={questionnaires} />
          </Route>
          <Route path="/:id">
            <QuestionnairePage data={questionnaires} />
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
