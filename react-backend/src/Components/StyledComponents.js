import styled, { css, keyframes } from "styled-components";


export const StepWrapper = styled.div`
	width: ${p => p.width};
	display: flex;
	justify-content: center;
`;

export const ContentWrapper = styled.div`
	width: ${p => p.width ? p.width : "100%"};
	margin: 30px 0;
	position: relative;
	top: 10px;
	margin-left: auto;
	margin-right: auto;
	display:flex;
	justify-content: center;
`;

export const sharedStyles = css`
	content: "";
	position: absolute;
	z-index: 1;
	top: 25%;
	width: 50%;
	height: 3px;
	background: #2f2e2f;
`;

const psuedoStyles = css`
	&::before{
		${sharedStyles};
		left: 0px;
		${p =>
		p.isActive && `background: #6007ec`};
	}
	&::after {
		${sharedStyles};
		left: 50%;
		${p =>
		p.isActive && !p.isCurrentStep && `background: #6007ec`};
	}
	&:first-child::before,
	&:last-child::after {
		display: none;
	}
`;

export const Step = styled.div`
	position: relative;
	border: 0;
	padding: 0;
	width: 25%;
	text-align: center;
	background: transparent;
	outline: none;
	${psuedoStyles};
`;

export const StepBadge = styled.span`
	position: relative;
	z-index: 2;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	color: ${p => p.isActive ? "white" : "#bbbbbb"};
	background: ${p => p.isActive ? "#6007ec" : "#2f2e2f"};
`;

export const StepLabel = styled.div`
	font-size: 1rem;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 90px;
	color: ${p => p.isActive ? "#6007ec" : "#000"};
	font-weight: ${p => p.isActive ? "600" : "200"};
	margin: 0 auto;
`;


export const StepContentWrapper = styled.div`
	display: ${p => p.step === p.activeStep ? "block" : "none"};
	width: inherit;
`;

export const StyledButton = styled.button`
	position: relative;
	overflow: hidden;
	display: inline-flex;
	align-items:center;
	justify-content: center;
	height: 2.75rem;
	padding: 0 ${p => p.paddingX ? p.paddingX : "3rem"};
	font-size: 1.25rem;
	border: 0;
	border-radius: 0.5rem;
	background: ${p => p.bgColor ? p.bgColor : "#5d2fdf"};
	color: #f7f7f7;
	cursor: pointer;
	outline: none;
	transition-property: all;
	transition-duration: 0.35s;

	&:hover {
		background: ${p => p.shadeColor ? p.shadeColor : "#5526c5"};
	}

	&:focus {
		box-shadow: 0 0 0 3px ${p => p.shadeColor ? p.shadeColor : "#8659e9"} !important;
	}
	
	${p => p.isFirstStep === 1 ? DisableButtonStyle : ""};

	width: ${p => p.block ? "100% !important" : ""};

	${p => p.isLoading ? ButtonLoadingStyle : ""};

`;

const DisableButtonStyle = css`
	background: #d4d4d4 !important;
	cursor: not-allowed !important;
	&:hover {
		background: #d3d3d3 !important;
	}

	&:focus {
		box-shadow: 0 0 0 0  #d3d3d3 !important;
	}

	
`;
const ButtonAnimation = keyframes`
	0%{background-position: 0%};
	100%{background-position: -250px};
`;

const ButtonLoadingStyle = css`
	color: rgba(255,255,255,.5);
  	background: #5d2fdf repeating-linear-gradient(60deg,transparent,transparent 10px, #5526c5 10px, #5526c5 20px) ;
  	animation: ${ButtonAnimation} 5s infinite linear;
`;
export const SpanText = styled.span`
	margin: 0 0.5rem;
	position: relative;
	font-size: 1.25rem;
	top: -2px;
`;



export const RadioContainer = styled.div`
	display: flex;
	gap: 1rem;
	margin: 1rem;
`;

export const RadioWrapper = styled.div`
	display: flex;
	
`;
export const RadioInput = styled.input`
	transform: scale(0);
	position: absolute;
`;

export const RadioLabel = styled.label`
	position: relative;
	display: flex;
	align-items: center;
	gap: 1rem;
	border: 2px solid #5d2fdf;
	padding: 0.275rem 1.2rem;
	font-size: 1.25rem;
	border-radius: 10px;
	background: transparent;
	font-weight: 500;

	${RadioInput}:checked + &{
		background: #5d2fdf;
		font-weight: 700;
		border-color: #5526c5;
		color: #fff;
	}
`;


export const RequiredStar = styled.span`
	color: #f00;
	&::before {
		content: "*";
	}
`;



export const DropDown = styled.div`
	position: relative;
`;

export const DropDownList = styled.div`
	position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    float: left;
    min-width: 10rem;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 0.25rem;

	&.show {
		display: block;
    	position: absolute;
    	inset: auto auto 0px 0px;
    	margin: 0px;
    	transform: translate(-180px,63px);
	}
`;

export const DropDownListItem = styled.button`
	display: block;
    width: 100%;
    padding: 0.25rem 1.5rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    white-space: nowrap;
    background-color: transparent;
    border: 0;
`