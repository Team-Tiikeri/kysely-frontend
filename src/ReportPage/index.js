import { Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Card from "../components/Card"
import Container from "../components/Container"
import { PieChart, Pie } from "recharts"

const ReportCard = (question) => {
  if (question.type === "TEXT") {
    return (
      <Card styles={{ margin: 10 }}>
        <Typography variant="h6"> {question.content}</Typography>
        {(question.answers.length === 0 || !question.answers) ? (
          <span style={{ margin: 5 }}>No answers</span>
        ) : (
          <ul>
            {question.answers.map((answer, index) => (
              <li key={index}>{answer.content}</li>
            ))}
          </ul>
        )}
      </Card>
    )
  }
  return (
    <Card styles={{ margin: 10 }}>
      <Typography variant="h6">{question.content}</Typography>
      {(question.answers.length === 0 || !question.answers) ? (
        <span style={{ margin: 5 }}>No asnwers</span>
      ) : (
        <PieChart width={730} height={250}>
          <Pie
            data={question.answers}
            dataKey="content"
            nameKey="content"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
          />
        </PieChart>
      )}
    </Card>
  )
}

const ReportPage = () => {
  const [questionnaire, setQuestionnaire] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    fetch(`https://ohp20kysely.herokuapp.com/api/questionnaires/${id}`)
      .then((response) => response.json())
      .then((response) => setQuestionnaire(response))
      .catch((err) => console.log(err))
  }, [id])

  if (!questionnaire) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Typography variant="h3">{questionnaire.title} Report</Typography>
      {Object.values(questionnaire.questions).map((question, index) => (
        <Card key={index} question={question} />
        
      ))}
    </Container>
  )
}

export default ReportPage
