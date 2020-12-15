import React from "react"
import { Link } from "react-router-dom"
import Card from "../components/Card"
import Container from "../components/Container"

const Questionnaire = ({ questionnaire }) => (
  <Link
    style={{ textDecoration: "none", color: "black" }}
    to={`/reports/${questionnaire.questionnaireId}`}
  >
    <Card styles={{ margin: 10 }} key={questionnaire.questionnaireId}>
      <h3>{questionnaire.title}</h3>
    </Card>
  </Link>
)

const ReportList = ({ data }) => {
  return (
    <Container>
      <h2>Reports</h2>

      {data.map((questionnaire, index) => (
        <Questionnaire key={index} questionnaire={questionnaire} />
      ))}
    </Container>
  )
}

export default ReportList
