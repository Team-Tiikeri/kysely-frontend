import React from "react"
import { Link } from "react-router-dom"
import Container from "../components/Container"
import Card from "../components/Card"

const QuestionnaireList = ({ data }) => {
  console.log(data);
  return (
    <Container>
      <h2>Questionnaires</h2>
      {data.map((questionnaire) => (
        <Card styles={{ margin: 20, padding: 0 }} key={questionnaire.questionnaireId}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/${questionnaire.questionnaireId}`}
          >
            <h3>{`${questionnaire.title}`}</h3>
          </Link>
        </Card>
      ))}
    </Container>
  )
}

export default QuestionnaireList