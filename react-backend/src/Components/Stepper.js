import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { StepWrapper, Step, StepBadge, StepLabel, StyledButton } from './StyledComponents'
import { get_assessment_id } from './TokenParser';
import Api from './Api';

const Stepper = (props) => {
  // const [activeStep, setActive] = useState(props.currentstep);
  const activeStep = props.currentstep
  const [nextPageAccessible, setNextPageAccessible] = useState(false);
  const [previousPageAccessible, setPreviousPageAccessible] = useState(false);
  const isActive = (step) => step <= activeStep;
  const isCurrentStep = (step) => step === activeStep;
  //Steps and Label
  const steps = [1, 2, 3];
  const stepsLabel = ["Name assessment", "Add questions", "Review & configure"]

  const handlePreviousPage = () => activeStep > 1 ? setPreviousPageAccessible(true) : "";
  const isLastStep = () => activeStep === steps.length
  const handleNextPage = () => {
    if (activeStep < steps.length) {
      if (props.validator && props.validator(props.payload).total_error === 0) {
        if (props.payload && get_assessment_id() === null) {
          Api.post("/new-assessment/create", props.payload)
            .then((res) => {
              console.log(res)
              if (res.status) {
                localStorage.setItem("id", res.data.assessment_id);
                setNextPageAccessible(true);
              }
            })
            .catch(error => console.log(error))
        }
      }

      //! for access 3 page review as there is no validation hence provide access for 3 step from 2 step
      if (activeStep === 2)
        setNextPageAccessible(true);
    }
  }
  const handleFinish = () => {
    if (localStorage.getItem("id")) {
      localStorage.removeItem("id");
      props.history.history.push("/dashboard")
    }
  }


  if (previousPageAccessible) {
    return <Redirect to={{ pathname: props.previousstep }} />
  }
  if (nextPageAccessible) {
    return <Redirect to={{ pathname: props.nextstep }} />
  }
  return (
    <React.Fragment>
      <Row className="mx-2 my-5">
        <Col className="d-flex justify-content-between">
          <StyledButton isFirstStep={activeStep} onClick={() => handlePreviousPage()} type="button"><FontAwesomeIcon icon={faAngleLeft} /></StyledButton>
          {
            isLastStep() ? (<StyledButton type="button" bgColor="#28a745" shadeColor="#208b39" onClick={() => handleFinish()}>Finish</StyledButton>) : (<StyledButton onClick={() => handleNextPage()} type="button">Next Step</StyledButton>)
          }
        </Col>
      </Row>
      <StepWrapper width="100%">
        {
          steps.map((step, index) => (
            <Step key={index} isCurrentStep={isCurrentStep(step)} isActive={isActive(step)}
            >
              <StepBadge isActive={isActive(step)}>{step}</StepBadge>
              <StepLabel isActive={isActive(step)}>{stepsLabel[index]}</StepLabel>
            </Step>
          ))
        }
      </StepWrapper>
    </React.Fragment>
  );
};

export default Stepper;