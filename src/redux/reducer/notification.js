import { createActions, createReducer } from "reduxsauce";
import { NOTIFICATION_STATUS, NOTIFICATION_TYPE } from "../../common/constant";

const NOTIFICATION_INIT_STATE = {
  notification: null,
};

const { Types, Creators } = createActions({
  getAllNotification: ["payload"],
  getAllNotificationSucceed: ["payload"],
  answerFriendRequest: ["payload"],
  answerFriendRequestSucceed: ["payload"],
  addNewNotification: ["payload"],
});

//reducer
const handleGetAllNotificationSucceed = (state, { payload }) => {
  return {
    ...state,
    notification: payload.data,
  };
};

const handleAnswerFriendRequestSucceed = (state, { payload }) => {
  console.log("🚀 ~ payload", payload);
  const newNotification = state.notification.map((item) => {
    if (item.id_notification === payload)
      item.status = NOTIFICATION_STATUS.FULFILLED;

    return item;
  });
  return {
    ...state,
    notification: newNotification,
  };
};

const handleAddNewNotification = (state, { payload }) => {
  const { newNotification: _newNotification, curUser } = payload;
  const newNotification = state.notification.reverse();
  if (_newNotification?.type?.toString() === NOTIFICATION_TYPE.FRIEND_REQUEST.toString()) {
    const owner = _newNotification.data.ownerInfo;
	console.log(_newNotification,_newNotification.data.idNotification)
    newNotification.push({
      id_notification: _newNotification.data.idNotification,
      createAt: _newNotification.data.createAt,
      id_owner: owner.id_user,
      id_receiver: curUser.id_user,
      message: "",
      ownerAvatar: owner.avatar,
      ownerEmail: owner.email,
      ownerName: owner.name,
      ownerPhone: owner.phone,
      ownerSex: owner.sex,
      receiverAvatar: curUser.avatar,
      receiverEmail: curUser.email,
      receiverName: curUser.name,
      receiverPhone: curUser.phone,
      receiverSex: curUser.sex,
      seenAt: null,
      status: NOTIFICATION_STATUS.PENDING,
      type: NOTIFICATION_TYPE.FRIEND_REQUEST,
    });
  }

  return {
    ...state,
    notification: newNotification,
  };
};

export const NotificationTypes = Types;
export const NotificationActions = Creators;

export const NotificationReducer = createReducer(NOTIFICATION_INIT_STATE, {
  [Types.GET_ALL_NOTIFICATION_SUCCEED]: handleGetAllNotificationSucceed,
  [Types.ANSWER_FRIEND_REQUEST_SUCCEED]: handleAnswerFriendRequestSucceed,
  [Types.ADD_NEW_NOTIFICATION]: handleAddNewNotification,
});
