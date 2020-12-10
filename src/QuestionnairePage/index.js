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
  const [questionValues, setQuestionValues] = useState(null)

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
          response.questions.map((question) => {
            if (question.type === "CHECKBOX") {
              let options = {}
              question.options.map(
                (option) => (options = { ...options, [option.optionId]: false })
              )

              questionsState = {
                ...questionsState,
                [question.questionId]: options,
              }
            } else {
              questionsState = {
                ...questionsState,
                [question.questionId]: "",
              }
            }
          })

          console.log(questionsState)

          setQuestionValues(questionsState)
          console.log(questionsState)
        })
        .catch((err) => console.log(err))

    getQuestions()
  }, [id])

  const generateJson = () => {
    let json = []
    let optionIds = []
    let options = []
    let questionsObject = {}

    questions.map((question) => {
      if (question.options.length > 0) {
        let optionArray = []
        question.options.map((option) => optionArray.push(option.optionId))
        questionsObject = {
          ...questionsObject,
          [question.questionId]: optionArray,
        }
        question.options.map((o) => options.push(o))
        question.options.map((option) => optionIds.push(option.optionId))
      }
    })

    Object.entries(questionValues).map(([key, value]) => {
      if (Object.keys(value).length > 0 && value.constructor === Object) {
        Object.entries(value).map(([key, value]) => {
          if (value === true) {
            const option = Object.values(options).find(
              (o) => Number(key) === o.optionId
            )

            let questionId

            Object.entries(questionsObject).map(([k, val]) => {
              if (val.includes(Number(key))) {
                console.log(val.includes(Number(key)))
                questionId = k
              }
            })

            json.push({
              content: option.content,
              question: { questionId: questionId },
            })
          }
        })
      } else {
        json.push({ content: value, question: { questionId: key } })
      }
    })

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

  const handleContentChange = (event, question, isCheckbox) => {
    const { name, value, checked, type } = event.target
    /* console.log(question)
    console.log({ name })
    console.log(questionValues[question].options) */
    console.log({ value: value })
    console.log({ questions: questionValues })

    console.log({
      ...questionValues,
      [question]: {
        ...questionValues[question],
        [name]: checked ? true : false,
      },
    })

    if (isCheckbox) {
      setQuestionValues({
        ...questionValues,
        [question]: {
          ...questionValues[question],
          [name]: checked ? true : false,
        },
      })
    } else {
      setQuestionValues({ ...questionValues, [name]: value })
    }
  }

  if (!questionValues) return <div>Loading...</div>

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
