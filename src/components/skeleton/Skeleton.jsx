import React from "react";
import "./skeleton.css";

const ProfileSkeleton = () => {
  return (
    <div className="profile-skeleton">
      <div className="skeleton avatar-skeleton"></div>
      <div className="skeleton title-skeleton"></div>
      <div className="skeleton text-skeleton text-1"></div>
      <div className="skeleton text-skeleton text-2"></div>
      <div className="skeleton text-skeleton text-3"></div>
    </div>
  );
};

const FollowerSkeleton = () => {
  return (
    <div className="card follower-skeleton">
      <div className="skeleton avatar-skeleton" />
      <div className="skeleton title-skeleton" />
    </div>
  );
};

const RepoSkeleton = () => {
  return (
    <div className="card repo-skeleton">
      <div className="card-body">
        <div className="skeleton title-skeleton"></div>
        <div className="skeleton text-skeleton text-1"></div>
        <div className="skeleton text-skeleton text-2"></div>
      </div>

      <div className="card-footer">
        <div className="skeleton text-skeleton"></div>
        <div className="skeleton text-skeleton"></div>
        <div className="skeleton text-skeleton"></div>
      </div>
    </div>
  );
};

export { ProfileSkeleton, FollowerSkeleton, RepoSkeleton };
