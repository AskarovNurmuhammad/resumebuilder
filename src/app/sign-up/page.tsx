"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../utils/firebase";
import { useState } from "react";
import { set, ref } from "firebase/database";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const router = useRouter();
  function signUpUser() {
    createUserWithEmailAndPassword(auth, user.email, user.password).then(
      (res) => {
        set(ref(database, `users/${res.user.uid}`), {
          name: user.name,
          email: res.user.email,
          password: user.password,
        });
      }
    );
    router.push("sign-in");
  }

  return (
    <div className="card p-3 mx-auto w-25">
      <input
        placeholder="name..."
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="form-control mb-2"
        type="text"
      />
      <input
        placeholder="email..."
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="form-control mb-2"
        type="text"
      />
      <input
        placeholder="password..."
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="form-control mb-2"
        type="text"
      />
      <button onClick={signUpUser} className="btn btn-dark">
        Sing Up
      </button>
    </div>
  );
};

export default SignUp;
