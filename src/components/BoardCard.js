import React from "react";

const BoardCard = ({ applicant }) => {
  return (
    <div key={applicant.id} className="board__card">
      <div className="board__card__title">
        {applicant.firstName + " " + applicant.lastName}
      </div>
      <div className="chips">
        <span className="chip">{applicant.degree}</span>
        <span className="chip">{applicant.experience}+ YOE</span>
      </div>
    </div>
  );
};

export default BoardCard;
