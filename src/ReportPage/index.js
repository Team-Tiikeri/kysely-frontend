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
      <Card>
        {questionnaire.title}

        {Object.values(questionnaire.questions).map((question, index) => (
          <div key={index}>
            <h3> {question.content}</h3>
            <ul>
              {question.answers.map((answer, index) => (
                <li key={index}>{answer.content}</li>
              ))}
            </ul>
          </div>
        ))}
      </Card>
    </Container>
  );
};

export default ReportPage;
