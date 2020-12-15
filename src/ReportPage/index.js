import { colors, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Card from "../components/Card"
import Container from "../components/Container"
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts"
import _ from "lodash"

const getChartData = (data) => {
  return _(data)
    .countBy("content")
    .map((value, key) => ({
      name: key,
      value: value,
    }))
    .value()
}

const chartColors = [
  "#7FFFD4",
  "#B0E0E6",
  "#5F9EA0",
  "#4682B4",
  "#6495ED",
  "#00BFFF",
  "#1E90FF",
  "#ADD8E6",
  "#87CEEB",
  "#87CEFA",
]

const ReportCard = ({ question }) => {
  console.log(question)
  if (question.type === "TEXT") {
    return (
      <Card styles={{ margin: 10 }}>
        <Typography variant="h6">{question.content}</Typography>
        {question.answers.length === 0 ? (
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

  const data = getChartData(question.answers)
  console.log({ data })
  console.log({ colors })

  return (
    <Card styles={{ margin: 10 }}>
      <Typography variant="h6">{question.content}</Typography>
      {question.answers.length === 0 ? (
        <span style={{ margin: 5 }}>No answers</span>
      ) : (
        <PieChart width={730} height={250}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
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
      .then((response) => {
        console.log(response)
        setQuestionnaire(response)
      })
      .catch((err) => console.log(err))
  }, [id])

  if (!questionnaire) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Typography variant="h3">{questionnaire.title} Report</Typography>
      {Object.values(questionnaire.questions).map((question, index) => (
        <ReportCard key={index} question={question} />
      ))}
    </Container>
  )
}

export default ReportPage
