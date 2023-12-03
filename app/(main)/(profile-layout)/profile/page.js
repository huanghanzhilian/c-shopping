"use client"

import { useSelector } from "react-redux";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      hello
    </>
  );
}
