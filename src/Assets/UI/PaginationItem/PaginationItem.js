import React from 'react';
import { Pagination } from 'react-bootstrap';

const paginationItem = props => {
  return (
    <Pagination.Item
      onClick={() => props.clickPage(props.page)}>
      {props.page}
    </Pagination.Item>
  )
}

export default paginationItem;