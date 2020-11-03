import React from "react"
import { useParams } from "react-router-dom"
import Card from "../components/Card"
import Container from "../components/Container"

const QuestionnairePage = ({ data }) => {
  const { id } = useParams()
  const questionnaire = data.questionnaires.filter((q) => q.id !== id)[0]
  console.log(questionnaire)
  return (
    <Container>
      <Card styles={{ width: "80%" }}>
        {questionnaire.title}
        {questionnaire.questions.map((question) => (
          <p key={question.id}>
            {question.content} - Is required:{" "}
            {question.isRequired ? "true" : "false"}
          </p>
        ))}
      </Card>
    </Container>
  )
}

export default QuestionnairePage
