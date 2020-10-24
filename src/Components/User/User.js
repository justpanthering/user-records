import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

import Styles from './User.module.css';

// Component
import UserData from './UserData/UserData';

// Context
import { useData } from '../../Context/UsersContext/UsersContext';

const User = props => {

  const data = useData().data;
  const id = useParams().id;

  let userDataJSX = null;
  data.forEach(user => {
    if (user.id === parseInt(id)) {
      userDataJSX =
        <div>
          <UserData
            label={"First Name"}
            value={user.first_name} />
          <UserData
            label={"Last Name"}
            value={user.last_name} />
          <UserData
            label={"Age"}
            value={user.age} />
          <UserData
            label={"Company Name"}
            value={user.company_name} />
          <UserData
            label={"City"}
            value={user.city} />
          <UserData
            label={"State"}
            value={user.state} />
          <UserData
            label={"Zip"}
            value={user.zip} />
          <UserData
            label={"Email"}
            value={user.email} />
          <UserData
            label={"Web"}
            value={user.web} />

        </div>
    }
  });

  return (
    <Container className={Styles.User}>
      <div className={Styles.Header}>
        <Link
          className={Styles.Back}
          to="/user">
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </Link>
        <h3>User Details</h3>
      </div>
      <div className={Styles.Body}>
        {userDataJSX}
      </div>
    </Container>
  )
}

export default User;