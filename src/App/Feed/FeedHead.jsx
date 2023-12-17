import React from "react";
import { useSelector } from "react-redux";

const FeedHead = () => {
  const { users } = useSelector((state) => {
    return {
      users: state.user,
    };
  });

  return (
    <>
      <div className="FeedHeadCst">
        <p className="w-300 text-sm">Hello {users.user_fullname}</p>
        <p className="text-xxs w-300">Let's start your Edneed journey.</p>
      </div>
    </>
  );
};
export default FeedHead;
