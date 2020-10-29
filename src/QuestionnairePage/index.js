import React from "react"
import Container from "../components/Container"
import Card from "../components/Card"
import data from "../mockData.json"

const QuestionnairePage = () => {
  return (
    <Container>
      <Card>
        {data.questionnaires.map((questionnaire) => (
          <div
            key={questionnaire.id}
          >{`ID: ${questionnaire.id} - ${questionnaire.title} - Questions: ${questionnaire.questions.length}`}</div>
        ))}
      </Card>
    </Container>
  )
}

export default QuestionnairePage
