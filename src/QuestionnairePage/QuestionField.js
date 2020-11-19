import React, {useState} from "react"
import TextField from "@material-ui/core/TextField"

const QuestionField = ({ question, handleContentChange, questionValues }) => {
  const [disabled, setDisabled] = useState(false)

  return (
    <div>
      {question.content} - Is required: {question.isRequired ? "true" : "false"}
      <br />
      <TextField
        id="outlined-basic"
        label={question.title}
        variant="outlined"
        style={{ width: "100%" }}
        name={String(question.questionId)}
        value={questionValues[question.questionId]}
        onChange={handleContentChange}
        disabled={disabled}
      />
    </div>
  )
}

export default QuestionField
