import React, { useEffect, useState } from "react";
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Col } from "react-bootstrap";
import QuestionLayout from "../../layout/QuestionLayout";
import { TextEditor } from "../../Components/TextEditor"
import { get_assessment_id } from "../../Components/TokenParser";
import Api from "../../Components/Api";
import { Validator } from "../../Components/Validator";

const MultipleChoiceQuestion = (props) => {
	const { quill, element, editorText, setEditorText } = TextEditor();

	//* Inputs value for storing
	const [time_minutes, setTime_Minutes] = useState('')
	const [option_1, setOption_1] = useState('');
	const [option_2, setOption_2] = useState('');
	const [option_3, setOption_3] = useState('');
	const [option_4, setOption_4] = useState('');
	const [correct_option, setCorrect_Option] = useState('');
	const [error, setError] = useState();

	//* For option3 and option4 disbaling and hiding those options
	const [option3Visibility, setOption3Visibility] = useState(true)
	const [option4Visibility, setOption4Visibility] = useState(true)
	//* set Assessment And Que ID 
	const assessment = get_assessment_id();
	const id = props.location.state ? props.location.state[0].id : undefined
	const role = props.location.state ? props.location.state[0].role : undefined

	const question_type = "MCQ";

	const getPayload = () => {
		const payload = {};
		payload.time_minutes = time_minutes;
		payload.option_1 = option_1;
		payload.option_2 = option_2;
		payload.correct_option = correct_option;
		if (option3Visibility) {
			payload.option_3 = option_3
		}
		if (option4Visibility) {
			payload.option_4 = option_4
		}
		//option3Visibility ? payload.option_3 = option_3 : "";
		//option4Visibility ? payload.option_4 = option_4 : "";
		payload.text = editorText;
		payload.assessment_id = assessment;
		payload.question_type = question_type;
		return payload;
	}

	const validate = data => {
		const errors = Validator(data, { option3Visibility: option3Visibility, option4Visibility: option4Visibility })
		setError(errors)
		return errors
	}

	useEffect(() => {
		if (id) {
			Api.get("/new-assessment/question/" + id)
				.then((res) => {
					if (res.status) {
						setTime_Minutes(res.data.question.time)
						setOption_1(res.data.question.option_1)
						setOption_2(res.data.question.option_2)
						res.data.question.option_3 ? setOption_3(res.data.question.option_3) : setOption3Visibility(false)
						res.data.question.option_4 ? setOption_4(res.data.question.option_4) : setOption4Visibility(false)
						setCorrect_Option(res.data.question.correct_option)
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
		<QuestionLayout headingText="New Question - Multiple choice" title="MCQ" payload={getPayload()} assessmentID={assessment} validator={validate} history={props.history} id={id} role={role}>

			<Col md={6}>
				<div className="mb-4">
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
			<Col md={6}>
				<Container>
					<div className="p-2">
						<p className="font-size-medium">Select right answer</p>
					</div>
					<div className="radio-wrapper">
						<label className="radio-label">
							<input className="radio-input" type="radio" name="correct_option" value="option_1" onChange={e => setCorrect_Option(e.target.value)} checked={correct_option === "option_1" ? true : false} />
							<span className="radio-pulse" />
							<span className="radio-button">
								<span className="radio-button-inner" />
							</span>
						</label>
						<div className="w-100">
							<div className="form__group position-relative p-3">
								<input
									className="form__input"
									type="text"
									name="option_1"
									id="option_1"
									placeholder=" "
									onChange={e => setOption_1(e.target.value)}
									value={option_1}
								/>
								<label htmlFor="option_1" className="form__label">Option 1</label>
							</div>
							{
								error && <div className="invalid-error">{error.option_1}</div>
							}
						</div>
					</div>
					<div className="radio-wrapper">
						<label className="radio-label">
							<input className="radio-input" type="radio" name="correct_option" value="option_2" onChange={e => setCorrect_Option(e.target.value)} checked={correct_option === "option_2" ? true : false} />
							<span className="radio-pulse" />
							<span className="radio-button">
								<span className="radio-button-inner" />
							</span>
						</label>
						<div className="w-100">
							<div className="form__group position-relative p-3">
								<input
									className="form__input"
									type="text"
									name="option_2"
									id="option_2"
									placeholder=" "
									onChange={e => setOption_2(e.target.value)}
									value={option_2}
								/>
								<label htmlFor="option_2" className="form__label">Option 2</label>
							</div>
							{
								error && <div className="invalid-error">{error.option_2}</div>
							}
						</div>
					</div>
					{
						option3Visibility && (<div className="radio-wrapper">
							<label className="radio-label">
								<input className="radio-input" type="radio" name="correct_option" value="option_3" onChange={e => setCorrect_Option(e.target.value)} checked={correct_option === "option_3" ? true : false} />
								<span className="radio-pulse" />
								<span className="radio-button">
									<span className="radio-button-inner" />
								</span>

							</label>
							<div className="w-100">
								<div className="form__group position-relative p-3">
									<input
										className="form__input"
										type="text"
										name="option_3"
										id="option_3"
										placeholder=" "
										onChange={e => setOption_3(e.target.value)}
										value={option_3}
									/>
									<label htmlFor="option_3" className="form__label">Option 3</label>
								</div>
								{
									error && <div className="invalid-error">{error.option_3}</div>
								}
							</div>
							<FontAwesomeIcon icon={faBan} className="my-3" onClick={() => setOption3Visibility(false)} />
						</div>)
					}
					{
						option4Visibility && (<div className="radio-wrapper">
							<label className="radio-label">
								<input className="radio-input" type="radio" name="correct_option" value="option_4" onChange={e => setCorrect_Option(e.target.value)} checked={correct_option === "option_4" ? true : false} />
								<span className="radio-pulse" />
								<span className="radio-button">
									<span className="radio-button-inner" />
								</span>
							</label>
							<div className="w-100">
								<div className="form__group position-relative p-3">
									<input
										className="form__input"
										type="text"
										name="option_4"
										id="option_4"
										placeholder=" "
										onChange={e => setOption_4(e.target.value)}
										value={option_4}
									/>
									<label htmlFor="option_4" className="form__label">Option 4</label>
								</div>
								{
									error && <div className="invalid-error">{error.option_4}</div>
								}
							</div>
							<FontAwesomeIcon onClick={() => setOption4Visibility(false)} icon={faBan} className="my-3" />
						</div>)
					}
					{
						error && <div className="invalid-error">{error.correct_option}</div>
					}
					<div className="checkbox__group ">
						<label className="d-inline-flex float-right">
							<input type="checkbox" />
							<span className="checkbox-wrapper">
								<span className="checkbox"></span>
							</span>
							Shuffle Answers
						</label>
					</div>
				</Container>
			</Col>

		</QuestionLayout >
	)
}

export default MultipleChoiceQuestion