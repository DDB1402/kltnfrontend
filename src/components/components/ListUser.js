import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  ConversationAction,
  selectMainConversation,
} from "../../redux/reducer/conversation";
import SVGIcon from "../shared/SVGIcon";
// ConversationAction
const ListUser = ({ idConversation }) => {
  const { conversationInfo = {}, listUser = [] } =
    useSelector(selectMainConversation) || {};
  const userInfo = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const deleteUser = useCallback(
    (id) => {
      dispatch(
        ConversationAction.deleteUser({
          id_room: idConversation,
          id_deleted_user: id,
        })
      );
    },
    [dispatch, idConversation]
  );

  return (
    <>
      <div className="tabs__top__search">
        <div className="search_friend">
          {listUser
            .filter((user) => user.id_user !== userInfo.id_user)
            .map((user) => (
              <div key={`user_${user.id_user}`}>
                <div
                  className="search_friend__item"
                  key={"search_" + user.id_user}
                >
                  <img className="avatar" src={user.avatar} alt="" />
                  <div className="search_friend__item__name">{user.name}</div>
                  {conversationInfo.creator === userInfo.id_user && (
                    <SVGIcon
                      name="close"
                      width="25"
                      height="25"
                      className="closeIcon"
                      style={{ position: "relative", marginRight: "10px" }}
                      onClick={() => {
                        deleteUser(user.id_user);
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ListUser;
