import { firebase, FieldValue } from "../lib/firebase";

export const doesUsernameExists = async (username) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.some((user) => Object.keys(user.data()).length > 0);
};

export const getUserByUsername = async (username) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user[0];
};
export const getUserByUserId = async (userId) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();
  const user = result.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  return user[0];
};

export const getSuggestedProfiles = async (userId, following) => {
  const result = await firebase.firestore().collection("users").limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
};

export const updateLoggedInUserFollowing = async (
  loggedInUserDocId,
  profileId,
  isFollowingProfile
) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
};

export const updateFollowedUserFollowers = async (
  suggestedProfileDocId,
  userId,
  isFollowingProfile
) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(suggestedProfileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
};

export const getPhotos = async (userId, following) => {
  //percorrer o following e pegar as fotos
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;

      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user;
      return { username, ...photo, userLikedPhoto };
    })
  );
  return photosWithUserDetails;
};

export const likePhoto = async (docId, userId, liked) => {
  await firebase
    .firestore()
    .collection("photos")
    .doc(docId)
    .update({
      likes: liked
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
};

export const saveComment = async (docId, comment) => {
  await firebase
    .firestore()
    .collection("photos")
    .doc(docId)
    .update({
      comments: FieldValue.arrayUnion(comment),
    });
};

export const getUserPhotos = async (userId) => {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();
  return result.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
};

export const isFollowingProfile = async (userId, profileId) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .where("following", "array-contains", profileId)
    .get();

  const response = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.length > 0;
};

export const toggleFollow = async (
  isFollowingProfile,
  activeUserDocId,
  activeUserUserId,
  profileDocId,
  profileUserId
) => {
  await updateLoggedInUserFollowing(
    activeUserDocId,
    profileUserId,
    isFollowingProfile
  );
  await updateFollowedUserFollowers(
    profileDocId,
    activeUserUserId,
    isFollowingProfile
  );
};
