import React from "react";
import "./card.css";
import Badge from "../badge/Badge";
import { RepoSkeleton } from "../skeleton/Skeleton";
import { ErrorContent } from "../error/Error";
import useRepeat from "../../hooks/useRepeat";

const RepositoryCard = ({ data, isLoading, message }) => {
  const Skeleton = useRepeat(RepoSkeleton, 6);

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : data.length !== 0 ? (
        data.map((repo) => (
          <article className="card repo-card" key={repo.id}>
            <div className="card-body">
              <a
                href={repo.html_url}
                target="_blank"
                className="card-title"
                rel="noreferrer"
              >
                <h3 className="title-3">{repo.name}</h3>
              </a>
              <p className="card-text">{repo.description}</p>
              <Badge name={repo.private ? "Private" : "Public"} />
            </div>
            <div className="card-footer">
              <div className="meta-item">
                <span className="material-symbols-rounded" aria-hidden="true">
                  code_blocks
                </span>
                <span className="span">{repo.language}</span>
              </div>
              <div className="meta-item">
                <span className="material-symbols-rounded">star_rate</span>
                <span className="span">{repo.stargazers_count}</span>
              </div>
              <div className="meta-item">
                <span className="material-symbols-rounded">family_history</span>
                <span className="span">{repo.forks_count}</span>
              </div>
            </div>
          </article>
        ))
      ) : (
        <ErrorContent text={`Doesn't have any ${message} yet.`} />
      )}
    </>
  );
};

export default RepositoryCard;
