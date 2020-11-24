import React from "react"
import { Link } from "react-router-dom"
import Card from "../components/Card"
import Container from "../components/Container"

const Questionnaire = ({ questionnaire }) => (
  <li key={questionnaire.questionnaireId}>
    <Link to={`/reports/${questionnaire.questionnaireId}`}>
      {questionnaire.title}
    </Link>
  </li>
)

const ReportList = ({ data }) => {
  return (
    <Container>
      <h2>Reports</h2>
      <Card>
        <ul>
          {data.map((questionnaire) => (
            <Questionnaire questionnaire={questionnaire} />
          ))}
        </ul>
      </Card>
    </Container>
  )
}

export default ReportList
