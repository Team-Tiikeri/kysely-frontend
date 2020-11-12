import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Container from "../components/Container";
import TextField from "@material-ui/core/TextField";
import { Button, Input } from "@material-ui/core";

const QuestionnairePage = ({ data }) => {
  const { id } = useParams();

  console.log(data);

  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");

  useEffect(() => {
    console.log("Get questions.");
    fetch("https://ohp20kysely.herokuapp.com/api/questionnaires/" + id)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.questions);
        setQuestions(response.questions);
        setTitle(response.title);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event, id) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: answer, question: { questionId: id } }),
    };
    event.preventDefault();
    fetch("https://ohp20kysely.herokuapp.com/api/answers", requestOptions)
      .then(response => response.json())
      .then(response => console.log(response))
  };

  return (
    <Container>
      <Card styles={{ width: "80%" }}>
        <h2>{title}</h2>
        {questions.map((question) => (
          <div key={question.questionId}>
            {question.content} - Is required:{" "}
            {question.isRequired ? "true" : "false"}
            <br />
            <form
              onSubmit={(event) => handleSubmit(event, question.questionId)}
            >
              <TextField
                id="outlined-basic"
                label={question.title}
                variant="outlined"
                style={{ width: "100%" }}
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
              />
              <Button type="submit">Submit answers</Button>
            </form>
          </div>
        ))}
      </Card>
    </Container>
  );
};

export default QuestionnairePage;
