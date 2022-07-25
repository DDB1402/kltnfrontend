import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
// import man from '../../../assets/images/man.png';
// import woman from '../../../assets/images/woman.png';
import {
  selectConversationLoading,
  selectListConversation,
} from "../../../redux/reducer/conversation";
// import {CONVERSATION_TYPE} from "../../../common/constant";
import MessageItem from "../../components/MessageItem";
import Select from "../../shared/Select";
import SpinLoading from "../../shared/SpinLoading";

const transformListMessage = (list) => {
  return list.map((item) => {
    const {
      id_room,
      creator_avatar,
      creator_name,
      listAvatar,
      nextUserName,
      nextUserAvatar,
      nextUserSex,
      ...rest
    } = item;
    return {
      ...rest,
      id: id_room,
      avatar: creator_avatar,
      next_user_avatar: nextUserAvatar,
      next_user_sex: nextUserSex,
      name: creator_name,
      listAvatar: listAvatar?.split("****") || [],
      nextUserName: nextUserName,
    };
  });
};

const TabMessage = () => {
  const { url } = useRouteMatch();
  // const match=useRouteMatch();
  const listMessage = transformListMessage(
    useSelector(selectListConversation) || []
  );
  const sortedListMessage = useMemo(() => {
    return listMessage.sort((conversation1, conversation2) => {
      let timeConver1 = 0,
        timeConver2 = 0;
      if (conversation1.last_message_time === null) {
        timeConver1 = conversation1.createAt;
      } else timeConver1 = conversation1.last_message_time;

      if (conversation2.last_message_time === null) {
        timeConver2 = conversation2.createAt;
      } else {
        timeConver2 = conversation2.last_message_time;
      }
      return new Date(timeConver2).getTime() - new Date(timeConver1).getTime();
    });
  }, [listMessage]);
  console.log(listMessage);

  const isLoading = useSelector(selectConversationLoading);

  return (
    <div className="message">
      <div className="message__filter">
        <Select
          options={[
            "Tất cả tin nhắn",
            "Chỉ tin nhắn chưa đọc",
            "Chỉ tin nhắn từ người lạ",
          ]}
          defaultOption={0}
        />
        <p>Đánh dấu là đã đọc</p>
      </div>
      <div className="message__content">
        {isLoading && <SpinLoading />}
        <ul>
          {sortedListMessage.map((item) => (
            <li key={item.id}>
              <Link to={`${url}/${item.id}`}>
                <MessageItem item={item} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TabMessage;
