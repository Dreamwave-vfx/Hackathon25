import React from "react";
import { useState } from "react";
function Account() {
  if (!localStorage.getItem("uid")) {
    return (
      <div>
        <h1>Please Login first</h1>
      </div>
    );
  }
  return (
    <div>
      <img src={localStorage.getItem("profilePic")} alt="IMG" />
    </div>
  );
}

export default Account;
