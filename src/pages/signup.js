import React, { useContext, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExists } from "../services/firebase";

// import { Container } from './styles';

function Signup() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  const isInvalid = password === "" || email === "";

  const history = useHistory();

  const { firebase } = useContext(FirebaseContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const usernameExists = await doesUsernameExists(username);
    if (!usernameExists) {
      try {
        const createdUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        await createdUser.user.updateProfile({
          displayName: username,
        });

        await firebase.firestore().collection("users").add({
          userId: createdUser.user.uid,
          username: username.toLowerCase(),
          fullName: fullName,
          emailAddress: email.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setUsername("");
        setEmail("");
        setFullName("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setError("Username already exists, try another");
    }
  };

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iphone with instagram"
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              className="mt-2 w-6/12 mb-4"
              src="/images/logo.png"
              alt="Instagram"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleSignUp} method="POST">
            <input
              name="username"
              value={username}
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 mb-2 border border-gray-primary rounded"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              name="fullname"
              value={fullName}
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 mb-2 border border-gray-primary rounded"
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              name="email"
              value={email}
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 mb-2 border border-gray-primary rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              name="password"
              type="password"
              value={password}
              aria-label="Enter your password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className={`w-full bg-blue-medium text-white mt-2 rounded h-8 font-bold ${
                isInvalid && "bg-opacity-50"
              }`}
              disabled={isInvalid}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center rounded items-center flex-col w-full bg-white p-4 border border-gray-primary mt-2">
          <p className="text-sm">
            Have an account?{" "}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
