import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Card from "../components/Card"
import Container from "../components/Container"
import TextField from "@material-ui/core/TextField"
import { Button } from "@material-ui/core"

const QuestionField = ({
  question,
  handleSubmit,
  handleContentChange,
  questionValues,
}) => {
  return (
    <div>
      {question.content} - Is required: {question.isRequired ? "true" : "false"}
      <br />
      <form onSubmit={(event) => handleSubmit(event, question.questionId)}>
        <TextField
          id="outlined-basic"
          label={question.title}
          variant="outlined"
          style={{ width: "100%" }}
          name={questionValues[question.id]}
          value={question.id}
          onChange={handleContentChange}
        />
        <Button type="submit">Submit answer</Button>
      </form>
    </div>
  )
}

const QuestionnairePage = ({ data }) => {
  const { id } = useParams()

  console.log(data)

  const [questions, setQuestions] = useState([])
  const [title, setTitle] = useState("")
  const [questionId, setQuestionId] = useState("")
  const [questionValues, setQuestionValues] = useState({})

  useEffect(() => {
    const getQuestions = () =>
      fetch("https://ohp20kysely.herokuapp.com/api/questionnaires/" + id)
        .then((response) => response.json())
        .then((response) => {
          console.log(response.questions)
          setQuestions(response.questions)
          setTitle(response.title)
          response.questions.map((question) =>
            setQuestionValues({ ...questionValues, [question.id]: "" })
          )
        })
        .catch((err) => console.log(err))

    getQuestions()
  }, [])

  const handleSubmit = (event, id) => {
    console.log(questionId)
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: questionValues[questionId],
        question: { questionId: id },
      }),
    }
    event.preventDefault()
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
        {questions.map((question) => (
          <QuestionField
            key={question.questionId}
            question={question}
            handleSubmit={handleSubmit}
            handleContentChange={handleContentChange}
            questionValues={questionValues}
          />
        ))}
      </Card>
    </Container>
  )
}

export default QuestionnairePage
