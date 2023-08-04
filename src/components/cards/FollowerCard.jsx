import React from "react";
import "./card.css";
import IconButton from "../iconButton/IconButton";
import { ErrorContent } from "../error/Error";
import { FollowerSkeleton } from "../skeleton/Skeleton";
import useRepeat from "../../hooks/useRepeat";

const FollowerCard = ({
  data,
  isLoading,
  message,
  setUsername,
  setActiveTabIndex,
}) => {
  const Skeleton = useRepeat(FollowerSkeleton, 6);

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : data.length !== 0 ? (
        data.map((user) => (
          <article key={user.id} className="card follower-card">
            <figure className="avatar-circle img-holder">
              <img
                src={`${user.avatar_url}&s=64`}
                width={56}
                height={56}
                loading="lazy"
                alt={user.login}
                className="img-cover"
              />
            </figure>
            <h3 className="card-title">{user.login}</h3>
            <IconButton
              handleClick={() => {
                setUsername(user.login);
                setActiveTabIndex(0);
              }}
              icon="link"
              ariaLabel={`Go to ${user.login} profile`}
            />
          </article>
        ))
      ) : (
        <ErrorContent text={`Doesn't have any ${message} yet.`} />
      )}
    </>
  );
};

export default FollowerCard;
