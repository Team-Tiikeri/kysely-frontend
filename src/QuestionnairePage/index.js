import React from "react"
import { useParams } from "react-router-dom"
import Card from "../components/Card"
import Container from "../components/Container"
import TextField from "@material-ui/core/TextField"

const QuestionnairePage = ({ data }) => {
  const { id } = useParams()
  const questionnaire = data.questionnaires.filter((q) => q.id !== id)[0]
  console.log(questionnaire)
  return (
    <Container>
      <Card styles={{ width: "80%" }}>
        <h2>{questionnaire.title}</h2>
        {questionnaire.questions.map((question) => (
          <div key={question.id}>
            {question.content} - Is required:{" "}
            {question.isRequired ? "true" : "false"}
            <br />
            <TextField
              id="outlined-basic"
              label={question.title}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </div>
        ))}
      </Card>
    </Container>
  )
}

export default QuestionnairePage
