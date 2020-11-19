import { Button } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Card from "../components/Card"
import Container from "../components/Container"
import QuestionField from "./QuestionField"

const QuestionnairePage = () => {
  const { id } = useParams()

  const [questions, setQuestions] = useState([])
  const [title, setTitle] = useState("")
  const [questionValues, setQuestionValues] = useState([])

  useEffect(() => {
    const getQuestions = () =>
      fetch(`https://ohp20kysely.herokuapp.com/api/questionnaires/${id}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response.questions)
          setQuestions(response.questions)
          setTitle(response.title)

          let questionsState = {}

          // Creates dynamic state for QuestionFields
          response.questions.map(
            (question) =>
              (questionsState = {
                ...questionsState,
                [question.questionId]: "",
              })
          )

          setQuestionValues(questionsState)
          console.log(questionsState)
        })
        .catch((err) => console.log(err))

    getQuestions()
  }, [id])

  const generateJson = () => {
    let json = []

    Object.entries(questionValues).map(([key, value]) =>
      json.push({ content: value, question: { questionId: key } })
    )

    return JSON.stringify(json)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const json = generateJson()
    console.log(json)

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
    }

    fetch("https://ohp20kysely.herokuapp.com/api/answers", requestOptions)
      .then((response) => response.json())
      .then((response) => console.log(response))
  }

  const handleContentChange = (event) => {
    const { name, value } = event.target
    setQuestionValues({ ...questionValues, [name]: value })
  }

  return (
    <Container>
      <Card styles={{ width: "80%" }}>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          {questions.map((question) => (
            <QuestionField
              key={question.questionId}
              question={question}
              handleContentChange={handleContentChange}
              questionValues={questionValues}
            />
          ))}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: 10 }}
          >
            Submit
          </Button>
        </form>
      </Card>
    </Container>
  )
}

export default QuestionnairePage
