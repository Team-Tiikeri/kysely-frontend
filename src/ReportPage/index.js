import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Container from "../components/Container";

const ReportPage = () => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://ohp20kysely.herokuapp.com/api/questionnaires/${id}`)
      .then((response) => response.json())
      .then((response) => setQuestionnaire(response))
      .catch((err) => console.log(err));
  }, [id]);

  if (!questionnaire) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h3">{questionnaire.title} Report</Typography>
      {Object.values(questionnaire.questions).map((question, index) => (
        <Card key={index} styles={{ margin: 10 }}>
          <Typography variant="h6"> {question.content}</Typography>
          {question.answers.length === 0 ? (
            <span style={{margin: 5}}>No answers</span>
          ) : (
            <ul>
              {question.answers.map((answer, index) => (
                <li key={index}>{answer.content}</li>
              ))}
            </ul>
          )}
        </Card>
      ))}
    </Container>
  );
};

export default ReportPage;
