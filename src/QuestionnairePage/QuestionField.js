import React, {useEffect, useState} from "react"
import TextField from "@material-ui/core/TextField"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';

const QuestionField = ({ question, handleContentChange, questionValues }) => {
  const [disabled, setDisabled] = useState(false)
  const [checked, setChecked] = useState(null)
  
  
  useEffect(() => {
    let state = {}
    question.options.map(option => state = { ...state, [option.optionId]: false })
    console.log('state', state)
    setChecked(state)
  }, [])
  
  const handleChange = (event) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };
  
  if(!checked){
    return <div>loading</div>
  } 
  

  switch(question.type) {
    case 'RADIOBUTTON':
      return (
        <FormControl component="fieldset">
          <FormLabel component="legend">{question.content}</FormLabel>
          <RadioGroup name={question.title} value={question.title} onChange={handleContentChange}>
            {question.options.map(option => (
                <FormControlLabel value={option.content} control={<Radio />} label={option.content} />
            ))}
          </RadioGroup>
        </FormControl>
      )

    case 'CHECKBOX':
      return (
        <div>
        <FormControl component="fieldset">
          <FormLabel component="legend">{question.content}</FormLabel>
          <FormHelperText>Valitse 0-2</FormHelperText>
          <FormGroup>
            {question.options.map(option => (
                <FormControlLabel
                control={<Checkbox checked={checked[option.optionId]} onChange={handleChange} name={option.content} />}
                label={option.content}
              />
            ))}
          </FormGroup>
        </FormControl>
      </div>

      )

    default: 
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
  
}

export default QuestionField
