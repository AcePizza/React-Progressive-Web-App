import React from "react";

function Pagination() {
  const pagNum = () => {
    let generatedNumbers = Array.from(Array(5), (_, index) => index + page);
    setFirst(generatedNumbers[0]);
    setSecond(generatedNumbers[1]);
    setThird(generatedNumbers[2]);
    setForth(generatedNumbers[3]);
    setFift(generatedNumbers[4]);
  };

  return (
    <Row xs={1} md={2} className="g-4">
      <Col>
        <Pagination>
          <Pagination.First
            onClick={() => {
              setPage(1);
            }}
          />
          <Pagination.Prev
            onClick={() => {
              if (page <= 1) {
                return null;
              } else {
                setPage(page - 1);
              }
            }}
          />

          <Pagination.Item active={page === first ? true : false}>
            {first}
          </Pagination.Item>
          <Pagination.Item active={page === second ? true : false}>
            {second}
          </Pagination.Item>
          <Pagination.Item active={page === third ? true : false}>
            {third}
          </Pagination.Item>
          <Pagination.Item active={page === forth ? true : false}>
            {forth}
          </Pagination.Item>
          <Pagination.Item active={page === fifth ? true : false}>
            {fifth}
          </Pagination.Item>

          <Pagination.Next
            onClick={() => {
              setPage(page + 1);
            }}
          />
          <Pagination.Last
            onClick={() => {
              setPage(albumData.pagination.pages);
            }}
          />
        </Pagination>
      </Col>
    </Row>
  );
}

export default Pagination;
