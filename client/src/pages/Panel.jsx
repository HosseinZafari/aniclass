import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Panel = (props) => {
  return (
    <div className="columns full-height fit-footer container m-rl-auto mt-5 mb-4">
      <div className="column is-four-fifths is-offset-1 m-rl-auto">
        <article className="panel is-primary is-justi-1fy-content-space-between">
          <p className="mb-2 is-size-4 panel-heading has-text-weight-bold has-text-white  is-flex is-align-items-center">
              <span className="ml-3">
                    پنل کاربری
              </span>
            <FontAwesomeIcon icon={faAddressCard} />
          </p>
          
          {props.children}
        </article>
      </div>
    </div>
  );
};

export default Panel;
