import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import { NOT_FOUND } from "../constants/routes";
import Header from "../components/Header";
import UserProfile from "../components/Profile";

// import { Container } from './styles';

function Profile() {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);

      if (user) {
        setUser(user);
      } else {
        history.push(NOT_FOUND);
      }
    }
    checkUserExists();
  }, [username, history]);
  return user ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}

export default Profile;
