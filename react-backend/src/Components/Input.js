import React from "react"
import styled, { css } from "styled-components"

const FormGroup = styled.div`
	position: relative;
	width: ${props => props.width ? props.width : "100%"};
	height: 3rem;
	margin-right: auto;
	margin-left: auto;
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

const InputLabel = styled.label`
	position: absolute;
	left: 1rem;
	top: .8rem;
	padding: 0 .5rem;
	color: #000;
	cursor: ${props => props.readOnly ? "not-allowed" : "text"};
	transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in;
	background: ${props => props.readOnly ? "#d3d3d4" : "#fff"};
`;
const labelTransition = css`
	&:focus ~ ${InputLabel},
	&:not(:placeholder-shown)&:not(:focus) ~ ${InputLabel} {
		top: -0.5rem;
		font-size: .9rem;
		left: .8rem;
		color: #7700ff;
	}
`;
const InputTag = styled.input`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border: 2px solid rgb(148, 147, 147);
	border-radius: 0.5rem;
	font-family: inherit;
	font-size: inherit;
	outline: none;
	padding: 1.25rem;
	background: ${props => props.readOnly ? "#d3d3d4" : "none"}};
	margin-bottom: 1rem;
	display: inline-block;
	cursor: text;
	&:hover, &:focus {
		border-color: #7700ff;
	}	

	& + ${InputLabel} {
		cursor: ${props => props.readOnly ? "not-allowed" : ""};
		background: ${props => props.readOnly ? "#d3d3d4" : ""};
	}

	${props => props.readOnly ? "" : labelTransition}
	
`;
const RequiredStar = styled.span`
	color: #f00;
	&::before {
		content: "*";
	}
`;

const Input = ({ width, label, ...props }) => {
	return (
		<FormGroup width={width}>
			<InputTag placeholder=" " {...props} />
			<InputLabel htmlFor={{ ...props }.id}>{label}<RequiredStar /></InputLabel>
		</FormGroup>
	)
}

export default Input