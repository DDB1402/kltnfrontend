import React from "react";
import SVGIcon from "../../components/shared/SVGIcon";

const FileMessage = ({ fileName, url }) => {
  return (
    <div className="file">
      <p className="file__name">{fileName}</p>
      <div className="file__download">
        <a href={url} download>
          <SVGIcon name="download" />
        </a>
      </div>
    </div>
  );
};

export default FileMessage;
