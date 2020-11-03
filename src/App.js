import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import NavBar from "./components/NavBar"
import QuestionnaireList from "./QuestionnaireList"
import QuestionnairePage from "./QuestionnairePage"
import data from "./mockData.json"

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/:id">
            <QuestionnairePage data={data} />
          </Route>
          <Route path="/">
            <QuestionnaireList data={data} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
