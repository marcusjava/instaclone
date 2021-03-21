import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";

// import { Container } from './styles';

function SuggestedProfile({
  suggestedProfileDocId,
  loggedInUserDocId,
  username,
  profileId,
  userId,
}) {
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async (user) => {
    setFollowed(true);

    //atualizando lista de seguindo(following)
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);

    //atuzalizando perfil do seguidor(follower)
    await updateFollowedUserFollowers(suggestedProfileDocId, userId, false);
  };

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          alt="profile"
          src={`/images/avatars/${username}.jpg`}
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm"> {username}</p>
        </Link>
      </div>
      <div>
        <button
          className=" text-xs font-bold text-blue-medium"
          type="button"
          onClick={handleFollowUser}
        >
          Follow
        </button>
      </div>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  suggestedProfileDocId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default SuggestedProfile;
