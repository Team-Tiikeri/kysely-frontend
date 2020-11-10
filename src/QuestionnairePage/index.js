import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Card from "../components/Card"
import Container from "../components/Container"
import TextField from "@material-ui/core/TextField"

const QuestionnairePage = ({ data }) => {
  const { id } = useParams()

 
  console.log(data)

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    console.log("Get questions.")
    fetch("https://ohp20kysely.herokuapp.com/api/questionnaires/"+id+"/questions")
    .then(response => response.json())
    .then(response => setQuestions(response))
    .catch(err=> console.log(err))
  }, []);

  return (
    <Container>
      <Card styles={{ width: "80%" }}>
        <h2>{data.title}</h2>
        {questions.map((question) => (
          <div key={question.questionId}>
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
