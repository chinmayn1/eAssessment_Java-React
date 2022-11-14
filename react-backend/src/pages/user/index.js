import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, ButtonGroup, Table } from 'react-bootstrap';
import '../../css/main.css'
import DashLayout from '../../layout/DashLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faArchive, faEdit, faPlusCircle, faArrowRight, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Api from '../../Components/Api'
import { usePagination } from '../../Components/usePagination';
import Auth from '../../Components/Auth';

const index = (props) => {
	const [assessments, setAssessments] = useState();

	// fetching data from url
	useEffect(() => {
		if (assessments)
			return
		Api.get("/new-assessment/")
			.then(res => {
				if (res.status) {
					setAssessments(res.data.assessments)
				}
			})
			.catch(err => console.log(err));
	})
	const [spin, setSpin] = useState(false)

	// Triggered when click on edit icon
	const handleInviteCandidate = (id = undefined, assessmentName = undefined) => {
		if (id)
			props.history.push("/assessment/edit/" + assessmentName, id)
	}

	// useEffect for fetching data if available 
	const { value, PaginationButton } = usePagination({ dataArr: assessments });


	return (
		<DashLayout title="Dashboard" history={this.props}>
			<section className="mt-3 p-2">
				<Row className="mt-3">
					<Col xs={12} style={{ background: "#ff6963" }}>
						<div style={{ textAlign: 'center', padding: '15px' }}>You have 15days left in your FREE Trail</div>
					</Col>

					<Col className="my-3 p-1 assess-btn">
						<h4 className="line-height-center p-1">My Assessments</h4>
						<div className="ml-auto mr-md-5 p-1">
							{Auth.hasAccess() ? (<Button type="link" href="/new-assessment" variant="success" onMouseEnter={() => { setSpin(true) }} onMouseLeave={() => setSpin(false)}><FontAwesomeIcon icon={faPlusCircle} className="mx-2" spin={spin} />Create New Assessment</Button>) : ''}
						</div>
					</Col>

					<Col className="my-2 p-2 d-flex container-btn" xs={12}>
						<div className="mx-md-5 p-2">
							<ButtonGroup>
								<Button variant="success">Active</Button>
								<Button variant="secondary">Archived</Button>
							</ButtonGroup>
						</div>
					</Col>

					<Col xs={12} className="mx-md-1 my-1 p-xs-0">
						<Container fluid className="p-xs-0">
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>Name</th>
										<th>Candidates</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{
										value && value.map((item, index) =>
											<tr key={index}>
												<td>{item.assessment_name}</td>
												<td>Otto</td>
												<td>
													<div className="d-flex justify-content-around">
														<button className="actions-btn"><FontAwesomeIcon icon={faUserPlus} onClick={() => handleInviteCandidate(item.id, item.assessment_name)} /></button>
														<button className="actions-btn"><FontAwesomeIcon icon={faEdit} /></button>
														<button className="actions-btn"><FontAwesomeIcon icon={faClone} /></button>
														<button className="actions-btn"><FontAwesomeIcon icon={faArchive} /></button>
														<button className="actions-btn"><FontAwesomeIcon icon={faArrowRight} /></button>
													</div>
												</td>
											</tr>
										)
									}
								</tbody>
							</Table>
							{PaginationButton}
						</Container>
					</Col>
				</Row>
			</section>
		</DashLayout>
	)
}

export default index;