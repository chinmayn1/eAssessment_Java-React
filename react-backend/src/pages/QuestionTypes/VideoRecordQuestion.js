import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import QuestionLayout from "../../layout/QuestionLayout";
import { TextEditor } from "../../Components/TextEditor";
import { get_assessment_id } from "../../Components/TokenParser";
import Api from "../../Components/Api";
import { Validator } from "../../Components/Validator";

const VideoRecordQuestion = (props) => {
	const { quill, element, editorText, setEditorText } = TextEditor();
	//* Inputs value for storing
	const [time_minutes, setTime_Minutes] = useState("")
	const [error, setError] = useState();
	//* set Assessment And Que ID 
	const assessment = get_assessment_id();
	const id = props.location.state ? props.location.state[0].id : undefined
	const role = props.location.state ? props.location.state[0].role : undefined
	const question_type = "Video Record";

	const getPayload = () => {
		const payload = {};
		payload.time_minutes = time_minutes;
		payload.text = editorText;
		payload.assessment_id = assessment;
		payload.question_type = question_type;
		return payload;
	}

	const validate = data => {
		const errors = Validator(data)
		setError(errors)
		return errors
	}
	//Fetching Data for specific Question to be modify
	useEffect(() => {
		if (id) {
			Api.get("/new-assessment/question/" + id)
				.then((res) => {
					if (res.status) {
						console.log(res.data)
						setTime_Minutes(res.data.question.time)
						setEditorText(res.data.question.question)
					}
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}, [id])
	if (editorText && quill.getLength() === 1) {
		quill.root.innerHTML = editorText
	}
	return (
		<QuestionLayout headingText="New Question - Video Record" title="Video Record" assessmentID={assessment} payload={getPayload()} validator={validate} history={props.history} id={id} role={role}>
			<Col md={6}>
				<div className="mb-4">
					<div className="form__group p-3">
						<select className="form__input" onChange={e => setTime_Minutes(e.target.value)} value={time_minutes}>
							<option value="" defaultValue>Select max length of video</option>
							<option value="30">30 sec</option>
							<option value="60">60 sec</option>
							<option value="90">1.5 min</option>
							<option value="120">2 min</option>
						</select>
					</div>
					{
						error && <div className="invalid-error">{error.time_minutes}</div>
					}
				</div>
				{element}
				<div>
					{
						error && <div className="invalid-error">{error.text}</div>
					}
				</div>
			</Col>
			<Col md={6}>
				Some instruction for this question.....
			</Col>
		</QuestionLayout >
	)
}

export default VideoRecordQuestion