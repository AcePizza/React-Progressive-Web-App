import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Pagination from "react-bootstrap/Pagination";

function PaginationComponent({ page, setPage }) {
  const [ellipsisValue, setEllipsisvalue] = useState(page);

  const paginationEllipsisValue = () => {
    page <= 1 ? setPage(1) : setPage(page);
    page <= 5 ? setEllipsisvalue(5) : setEllipsisvalue(page);
  };

  useEffect(() => {
    paginationEllipsisValue();
  }, [page]);

  return (
    <Row>
      <Col xs>
        <Pagination size="sm">
          <Col>
            {" "}
            <Pagination.First
              onClick={() => {
                setPage(1);
              }}
            />
          </Col>
          <Col>
            {" "}
            <Pagination.Prev
              onClick={() => {
                setPage(page - 1);
              }}
            />
          </Col>
          <Col>
            {" "}
            <Pagination.Item active={page === ellipsisValue - 4 ? true : false}>
              {ellipsisValue - 4}
            </Pagination.Item>
          </Col>
          <Col>
            {" "}
            <Pagination.Item active={page === ellipsisValue - 3 ? true : false}>
              {ellipsisValue - 3}
            </Pagination.Item>
          </Col>

          <Col>
            {" "}
            <Pagination.Item active={page === ellipsisValue - 2 ? true : false}>
              {ellipsisValue - 2}
            </Pagination.Item>
          </Col>

          <Col>
            {" "}
            <Pagination.Item active={page === ellipsisValue - 1 ? true : false}>
              {ellipsisValue - 1}
            </Pagination.Item>
          </Col>

          <Col>
            {" "}
            <Pagination.Item active={page === ellipsisValue ? true : false}>
              {ellipsisValue}
            </Pagination.Item>
          </Col>

          <Col>
            {" "}
            <Pagination.Next
              onClick={() => {
                setPage(page + 1);
              }}
            />
          </Col>

          <Col>
            {" "}
            <Pagination.Last />
          </Col>
        </Pagination>
      </Col>
    </Row>
  );
}

export default PaginationComponent;
