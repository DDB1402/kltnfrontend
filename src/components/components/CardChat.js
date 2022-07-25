import React from "react";
import Moment from "react-moment";
import { MESSAGE_STATUS, MESSAGE_TYPE } from "../../common/constant";
import FileMessage from "./FileMessage";
import { Sticker } from "./Sticker/Sticker";

const CardChat = ({
  type,
  children,
  createTime,
  img,
  status,
  icon,
  id_message,
  content,
  url,
  ...rest
}) => {
  return (
    <div
      className={`card-chat ${
        status === MESSAGE_STATUS.PENDING ? "pending" : ""
      }${status === MESSAGE_STATUS.ERROR ? "error" : ""}`}
      // data-id={id_message}
      id={"message_" + id_message}
    >
      {type === MESSAGE_TYPE.TEXT && (
        <p className="card-chat__text">{children}</p>
      )}
      {type === MESSAGE_TYPE.IMAGE && <img src={img} alt="" />}
      {type === MESSAGE_TYPE.TEXT_AND_IMAGE && (
        <p className="card-chat__text">
          {children}
          <img src={img} alt="" />
        </p>
      )}
      {type === MESSAGE_TYPE.ICON && (
        <Sticker
          framesPerRow={icon.blocksOfHeight}
          framesPerColumn={icon.blocksOfWidth}
          src={icon.iconUrl}
          width={icon.width}
          height={icon.height}
          totalFrames={icon.totalFrames}
        />
      )}
      {type === MESSAGE_TYPE.FILE && (
        <FileMessage fileName={content} url={url} />
      )}

      {createTime && (
        <span className="card-chat__time">
          <Moment format="hh:mm" toNow>
            {createTime}
          </Moment>
        </span>
      )}
    </div>
  );
};

export default CardChat;
