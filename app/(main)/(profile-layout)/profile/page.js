"use client"

import { ClientLayout, Orders, ProfileAside } from "components";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Orders />
    </>
  );
}
