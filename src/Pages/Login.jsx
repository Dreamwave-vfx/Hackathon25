import React from "react";
import { signInWithGoogle } from "../Auth/config-firebase";

function Login() {
  return (
    <div>
      <button onClick={signInWithGoogle}>Login with Google</button>
    </div>
  );
}

export default Login;
