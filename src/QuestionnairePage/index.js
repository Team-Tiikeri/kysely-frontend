import { Button } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Card from "../components/Card"
import Container from "../components/Container"
import QuestionField from "./QuestionField"
import  Snackbar from '@material-ui/core/Snackbar'

const QuestionnairePage = () => {
  const { id } = useParams()

  const [msg, setMsg] = useState('');
  const [open, setOpen] = useState(false);

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
          response.questions.forEach((question) => {
            if (question.type === "CHECKBOX") {
              let options = {}
              question.options.forEach(
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

          setQuestionValues(questionsState)
        })
        .catch((err) => console.log(err))

    getQuestions()
  }, [id])

  const generateJson = () => {
    let json = []
    let optionIds = []
    // [ {...object1}, {...objcet2} ]
    let options = []
    // { questionId: [ optionId1, optionId2 ] }
    let questionsObject = {}

    questions.forEach((question) => {
      // If there are options, push them to arrays and object
      if (question.options.length > 0) {
        let optionArray = []
        question.options.forEach((option) => optionArray.push(option.optionId))
        questionsObject = {
          ...questionsObject,
          [question.questionId]: optionArray,
        }
        question.options.forEach((o) => options.push(o))
        question.options.forEach((option) => optionIds.push(option.optionId))
      }
    })

    Object.entries(questionValues).forEach(([key, value]) => {
      // Check if the answer is type of CHECKBOX
      if (Object.keys(value).length > 0 && value.constructor === Object) {
        Object.entries(value).forEach(([key, value]) => {
          // Check if a checkbox field is checked
          if (value === true) {
            // Find the Option object that matches to the key
            const option = Object.values(options).find(
              (o) => Number(key) === o.optionId
            )

            let questionId

            // Find the questionId from questionsObject
            Object.entries(questionsObject).forEach(([k, val]) => {
              if (val.includes(Number(key))) {
                questionId = k
              }
            })

            // Push the answer object to json array
            json.push({
              content: option.content,
              question: { questionId: questionId },
            })
          }
        })
      } else {
        // Push the answer object to json array if the answer is RADIOBUTTON or TEXT
        json.push({ content: value, question: { questionId: key } })
      }
    })

    return JSON.stringify(json)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setMsg("Your answers were saved succesfully!")
    setOpen(true)
    const json = generateJson()

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
    }

    fetch("https://ohp20kysely.herokuapp.com/api/answers", requestOptions)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }
  const closeSnackbar = () => {
    setOpen(false);
  }

  const handleContentChange = (event, question, isCheckbox) => {
    const { name, value, checked } = event.target

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
      <Card
        styles={{ width: "80%", flexDirection: "column", marginBottom: 16 }}
      >
        <h2>{title}</h2>
        <h5>(Fields marked * are required)</h5>
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
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={closeSnackbar}
        message={msg}
      />
    </Container>
  )
}

export default QuestionnairePage
