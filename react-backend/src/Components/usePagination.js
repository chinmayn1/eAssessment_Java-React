import React, { useEffect, useState } from "react"
import { Pagination, Col, Row } from "react-bootstrap"

export const usePagination = ({ dataArr = [], itemsPerPage = 5 }) => {

	if (dataArr === undefined) {
		console.warn("Pagination required  arguments dataArr");
		return {};
	}

	if (typeof (dataArr) !== "object") {
		console.warn("the dataArr must be an array or object of array");
		return {};
	}

	if (!Number.isInteger(itemsPerPage)) {
		console.warn("itemsPerPage must be an integer only")
		return {};
	}

	//State to maintain
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(0);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const value = dataArr.slice(indexOfFirstItem, indexOfLastItem);

	useEffect(() => {
		setTotalPage(Math.ceil(dataArr.length / itemsPerPage));
	}, [dataArr]);

	const handlePrevPage = () => {
		if (currentPage > 1)
			setCurrentPage(currentPage - 1)
	}
	const handleNextPage = () => {
		if (currentPage < totalPage)
			setCurrentPage(currentPage + 1)
	}
	const PaginationButton = (
		totalPage ? <Row className="justify-content-end">
			<Col sm={12} md={6} className="mx-1 d-flex justify-content-end">
				<Pagination>
					<h5 className="m-2">Page {currentPage} of {totalPage}</h5>
					<Pagination.Prev onClick={() => handlePrevPage()} />
					<Pagination.Next onClick={() => handleNextPage()} className="mx-1" />
				</Pagination>
			</Col>
		</Row> : ''
	);
	return { value, PaginationButton }
}