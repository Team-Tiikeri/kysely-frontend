import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Card from "../components/Card"
import Container from "../components/Container"

const ReportPage = () => {
  const [questionnaire, setQuestionnaire] = useState({})
  const { id } = useParams()

  useEffect(() => {
    fetch(`https://ohp20kysely.herokuapp.com/api/questionnaires/${id}`)
      .then((response) => response.json())
      .then((response) => setQuestionnaire(response))
      .catch((err) => console.log(err))
  }, [id])

  return (
    <Container>
      <Card>{questionnaire.title}</Card>
    </Container>
  )
}

export default ReportPage
