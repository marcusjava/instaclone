import React from "react";
import useUser from "../../hooks/use-user";
import User from "./User";
import Sugestions from "./Sugestions";

// import { Container } from './styles';

function Sidebar() {
  const {
    user: { docId, fullName, username, userId, following },
  } = useUser();

  return (
    <div className="p-4">
      <User fullName={fullName} username={username} />
      <Sugestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
}

export default Sidebar;
