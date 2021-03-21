import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isFollowingProfile, toggleFollow } from "../../services/firebase";

// import { Container } from './styles';
//09:38

function Header({ photosCount, profile, followerCount, setFollowerCount }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useUser();

  const showBtnToggle = user && user.username !== profile.username;

  useEffect(() => {
    async function isLoggedUserFollowingProfile() {
      const isFollowing = await isFollowingProfile(user.userId, profile.userId);
      setIsFollowing(isFollowing);
    }
    if (Object.keys(user).length > 0 && profile.userId) {
      isLoggedUserFollowingProfile();
    }
  }, [user, profile]);

  const handleFollow = async (event) => {
    event.preventDefault();
    setIsFollowing((isFollowing) => !isFollowing);
    setFollowerCount({
      followerCount: isFollowing ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowing,
      user.docId,
      user.userId,
      profile.docId,
      profile.userId
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        <img
          className="rounded-full h-40 w-40 flex"
          alt={`${user.username} profile`}
          src={`/images/avatars/${profile.username}.jpg`}
        />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profile.username}</p>
          {showBtnToggle && (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleFollow}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {profile.followers === undefined ||
          profile.following === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span>
                {` `}
                Photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? "Seguidor" : "Seguidores"}
              </p>
              <p className="mr-10">
                <span className="font-bold">{profile.following.length}</span>
                {` `}
                Seguindo
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">{profile.fullName}</p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array,
  }).isRequired,
};

export default Header;
