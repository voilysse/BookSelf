import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { useState } from "react";
import { useUpdateUserMutation } from "../../features/userApi";
const Profile = () => {
  const user = useSelector(selectCurrentUser);
  const welcome = user ? `Welcome user ${user.username}!` : "Welcome!";

  return (
    
    <><main
      style={{
        width: "100%",
        height:"100%"
      }}
    ><section className="welcome">
          <h1>{welcome}</h1>
          <p>Glad to have you back!</p>
      </section>
      </main>
      </>
  );
};

export default Profile;