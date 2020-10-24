import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './Users.module.css';
import { Container, Alert } from 'react-bootstrap';

// Components
import Pagination from '../../Components/Pagination/Pagination';
import TableHeading from '../../Assets/UI/Table/TableHeading/TableHeading';
import Form from '../../Assets/UI/Form/Form';

// Context
import { useData, useDataSort } from '../../Context/UsersContext/UsersContext';

const Users = () => {

  const [currPage, setCurrPage] = useState(1);
  const [data, setData] = useState([]);

  let receivedData = useData();
  let sortDataHandler = useDataSort();

  useEffect(() => {
    setData(
      receivedData.subData.length > 0 || receivedData.query !== ""
        ? receivedData.subData
        : receivedData.data
      // receivedData.data
    )
  }, [receivedData]);

  const resultPerPage = 10;

  const error = receivedData.error

  const paginationHandler = (gotoPage) => {
    console.log("changing page");
    setCurrPage(gotoPage);
  }

  let tableJSX = null;
  let errorJSX = null;
  if (data.length > 0) {
    tableJSX = data.slice((currPage - 1) * resultPerPage, currPage * resultPerPage).map(user => {
      return (
        <tr key={user.id}>
          <td>
            <Link to={`/user/${user.id}`}>
              {user.first_name}
            </Link>
          </td>
          <td>{user.last_name}</td>
          <td>{user.age}</td>
          <td>{user.email}</td>
          <td>
            <a href={user.web}
              target="_blank">
              {user.web}
            </a>
          </td>
        </tr>
      )
    })
  }
  else if (error !== null) {
    errorJSX =
      <Alert variant="danger" dismissible>
        <Alert.Heading>Connection Error!!!</Alert.Heading>
        <p>
          {error}
        </p>
      </Alert>
  }
  else if (receivedData.isLoading) {
    errorJSX =
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
  }

  return (
    <Container className={Styles.Users}>
      <div className={Styles.Heading}>
        <h3>Users</h3>
      </div>

      <div className={Styles.SearchForm}>
        <Form />
        <span>{data.length} User(s) Found!</span>
      </div>

      <div className={Styles.Table}>
        {errorJSX}
        <table className="table table-hover">
          <thead>
            <tr>
              <th
                scope="col"
                onClick={() => { sortDataHandler("first_name") }}>
                <TableHeading>
                  First Name
                  </TableHeading>
              </th>
              <th
                scope="col"
                onClick={() => { sortDataHandler("last_name") }}>
                <TableHeading>
                  Last Name
                  </TableHeading>
              </th>
              <th
                scope="col"
                onClick={() => { sortDataHandler("age") }}>
                <TableHeading>
                  Age
                  </TableHeading>
              </th>
              <th
                scope="col"
                onClick={() => { sortDataHandler("email") }}>
                <TableHeading>
                  Email
                  </TableHeading>
              </th>
              <th
                scope="col"
                onClick={() => { sortDataHandler("web") }}>
                <TableHeading>
                  Website
                  </TableHeading>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableJSX}
          </tbody>
        </table>
      </div>
      <div className={Styles.Pagination}>
        {data.length > 0
          ?
          <Pagination
            currPage={currPage}
            pageClick={paginationHandler}
            dataCount={data.length}
            resultPerPage={resultPerPage}
          />
          :
          null}
      </div>
    </Container>
  )
}

export default Users;