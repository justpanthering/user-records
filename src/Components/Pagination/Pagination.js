import React, { Fragment } from 'react';
import PaginationItem from '../../Assets/UI/PaginationItem/PaginationItem';

import { Pagination } from 'react-bootstrap'

const pagination = props => {

  return (
    <Pagination>
      {props.currPage <= 3
        ?
        <Fragment>
          <Pagination.First disabled />
          {props.currPage === 1
            ?
            <Pagination.Prev disabled />
            :
            <Pagination.Prev
              onClick={() => { props.pageClick(props.currPage - 1) }} />
          }
        </Fragment>
        :
        <Fragment>
          <Pagination.First
            onClick={() => { props.pageClick(1) }} />
          <Pagination.Prev
            onClick={() => { props.pageClick(props.currPage - 1) }} />

          <PaginationItem
            page={1}
            clickPage={props.pageClick} />
          <Pagination.Ellipsis disabled />
        </Fragment>
      }

      {props.currPage - 2 > 0
        ?
        <PaginationItem
          page={props.currPage - 2}
          clickPage={props.pageClick} />
        : null
      }
      {props.currPage - 1 > 0
        ?
        <PaginationItem
          page={props.currPage - 1}
          clickPage={props.pageClick} />
        : null
      }

      <Pagination.Item active>
        {props.currPage}
      </Pagination.Item>


      {props.currPage + 1 <= Math.ceil(props.dataCount / props.resultPerPage)
        ?
        <PaginationItem
          page={props.currPage + 1}
          clickPage={props.pageClick} />
        : null}
      {props.currPage + 2 <= Math.ceil(props.dataCount / props.resultPerPage)
        ?
        <PaginationItem
          page={props.currPage + 2}
          clickPage={props.pageClick} />
        : null
      }

      {
        props.currPage < Math.ceil(props.dataCount / props.resultPerPage) - 2
          ?
          <Fragment>
            <Pagination.Ellipsis disabled />
            <PaginationItem
              page={Math.ceil(props.dataCount / props.resultPerPage)}
              clickPage={props.pageClick} />
            <Pagination.Next
              onClick={() => { props.pageClick(props.currPage + 1) }} />
            <Pagination.Last
              onClick={() => { props.pageClick(Math.ceil(props.dataCount / props.resultPerPage)) }} />
          </Fragment>
          :
          <Fragment>
            {props.currPage === props.dataCount / props.resultPerPage
              ?
              <Pagination.Next disabled />
              :
              <Pagination.Next
                onClick={() => { props.pageClick(props.currPage + 1) }} />
            }

            <Pagination.Last disabled />
          </Fragment>
      }
    </Pagination>
  )
}

export default pagination;