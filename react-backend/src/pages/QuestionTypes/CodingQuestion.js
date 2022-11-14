import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import QuestionLayout from "../../layout/QuestionLayout";
import { RadioContainer, RadioInput, RadioLabel, RadioWrapper } from "../../Components/StyledComponents";
import { TextEditor } from "../../Components/TextEditor";
import { get_assessment_id } from "../../Components/TokenParser";
import Api from "../../Components/Api"
import { Validator } from "../../Components/Validator";

const CodingQuestion = (props) => {
	const { quill, element, editorText, setEditorText } = TextEditor();
	// //* Inputs value for storing
	 const [time_minutes, setTime_Minutes] = useState("")
	 const [error, setError] = useState();
	 const [langSelected, setLangSelected] = useState()
	//  * set Assessment And Que ID 
	const assessment = get_assessment_id();
	const id = props.location.state ? props.location.state[0].id : undefined
	const role = props.location.state ? props.location.state[0].role : undefined
	const question_type = "Coding";

	 const [isVisible1, setIsVisible1] = useState(true);
	 const [style, setStyle] = useState({ display: "none" });

	 const languageArray = ["Python", "PHP", "JavaScript", "SQL", "Ruby"];
	 const getPayload = () => {
	 	const payload = {};
		payload.time_minutes = time_minutes;
		payload.text = editorText;
		payload.assessment_id = assessment;
		payload.question_type = question_type;
		payload.selected_language = langSelected;
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
			setIsVisible1(false)
			// setIsVisible2(true)
			setStyle({ display: "block" })
			Api.get("/new-assessment/question/" + id)
				.then((res) => {
					if (res.status) {
						console.log(res.data)
						setTime_Minutes(res.data.question.time)
						setEditorText(res.data.question.question)
						setLangSelected(res.data.question.selected_language)
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
		<QuestionLayout headingText="New Question - Coding" title="Coding" assessmentID={assessment} payload={getPayload()} validator={validate} history={props.history} id={id} role={role}>
			{
				isVisible1 ? (
					<Row className="mx-auto" key="row">
						<Col>
							<div>
								<h2>Choose your coding language</h2>
							</div>
							<RadioContainer>
								{
									languageArray.map((language, index) => <RadioWrapper key={index}>
										<RadioInput onChange={(e) => { setLangSelected(e.target.value); setIsVisible1(false); setStyle({ display: "block" }) }} type="radio" value={language} id={language} name="language" />
										<RadioLabel htmlFor={language}>{language}</RadioLabel>
									</RadioWrapper>)
								}
							</RadioContainer>
						</Col>
					</Row>
				) : ""
			}
			<React.Fragment>
				<Col md={6} style={style}>
					<div className="mb-4">
						<h3 className="p-2">Time Info - {langSelected ? langSelected : "language"}</h3>
						<div className="form__group p-3">
							<input
								className="form__input"
								type="text"
								name="time_minutes"
								id="time_minutes"
								placeholder=" "
								onChange={e => setTime_Minutes(e.target.value)}
								value={time_minutes}
							/>
							<label htmlFor="time_minutes" className="form__label">Time to Answer Question</label>
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
				<Col md={6} style={style}>
					<p>Some instruction for this question.</p>
				</Col>
			</React.Fragment>
		</QuestionLayout>
	);
}

export default CodingQuestion