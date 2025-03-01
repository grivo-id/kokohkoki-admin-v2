import { useState } from "react";
import ContentWrapper from "../components/UI/content-wrapper";
import { useAuth } from "../context/use-context";
import UpdateUser from "../components/auth/update-user";
import Avatar from "@mui/material/Avatar";

export default function SettingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { userPayload } = useAuth();
  const username = userPayload?.username;
  const role = userPayload?.role;
  const id = userPayload?.id;

  return (
    <>
      <section id="setting-section" className="section-wrapper">
        <h1 className="text-rose-500 text-2xl font-bold mb-5">User Setting</h1>
        <div className="flex flex-wrap justify-between items-center mb-3">
          <button
            className="bg-rose-500 text-white px-3 py-2.5 rounded-md"
            onClick={() => setIsOpen(true)}
          >
            Edit Profile
          </button>
        </div>
        <ContentWrapper>
          <div className="flex flex-col items-center gap-2">
            <Avatar
              sx={{ fontSize: "40px", width: "60px", height: "60px" }}
              className="bg-rose-500"
            />
            <div className="flex flex-col gap-2 items-start text-gray-600 text-lg">
              <p>ID: {id}</p>
              <p>Name: {username}</p>
              <p>Role: {role}</p>
            </div>
          </div>
        </ContentWrapper>
      </section>
      <UpdateUser
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        userId={id}
        currentUsername={username}
      />
    </>
  );
}
