import React from "react"
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

export default QuestionField
