import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Photos from "./Photos";
import { getUserPhotos } from "../../services/firebase";

// import { Container } from './styles';
//08:25
const reducer = (state, newState) => ({ ...state, ...newState });

const initialState = {
  profile: {},
  photosCollection: [],
  followerCount: 0,
};

function Profile({ user }) {
  //facilita quando há varios states
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotos(user.userId);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }

    getProfileInfoAndPhotos();
  }, [user]);
  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos collection={photosCollection} />
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    following: PropTypes.array.isRequired,
    followers: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};

export default Profile;
