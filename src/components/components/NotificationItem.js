import React from 'react';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import man from '../../assets/images/man.png';
import woman from '../../assets/images/woman.png';
import { NOTIFICATION_STATUS } from '../../common/constant';
import { getContentNotification } from '../../common/functions';
import { selectUser } from '../../redux/reducer/auth';
import { NotificationActions } from '../../redux/reducer/notification';
import Avatar from '../shared/Avatar';

const NotificationItem = ({ item, ...rest }) => {
  console.log('🚀 ~ item', item);
  const author = useSelector(selectUser);
  console.log('🚀 ~ author', author);
  const contentNotification = getContentNotification(author, item);
  const dispatch = useDispatch();

  const active = true;
  let contentName = 'Bạn có một thông báo mới 🎁';
  if (item.status === NOTIFICATION_STATUS.PENDING) {
    contentName = `${item.ownerName} đã gửi cho bạn lời mời kết bạn 👏`;
  } else if (item.status === NOTIFICATION_STATUS.FULFILLED) {
    contentName = `Bạn đã chấp nhận lời mời kết bạn của ${item.ownerName} 💕`;
  }
  const avatar = contentNotification.imgSrc
    ? contentNotification.imgSrc
    : item.ownerSex === 0
    ? man
    : woman;

  const handleAccept = (item) => {
    dispatch(
      NotificationActions.answerFriendRequest({
        status: NOTIFICATION_STATUS.FULFILLED,
        id_notification: item.id_notification,
        id_sender: item.id_owner,
      })
    );
  };

  return (
    <div className={`notification-item ${active ? 'active' : ''}`}>
      <div className='notification-item__flex'>
        <div className='notification-item__avatar'>
          <Avatar img={avatar} isOnline={true} />
        </div>
        <div>
          <div
            className={`notification-item__content ${
              active ? 'hight-light' : ''
            }`}
          >
            <div className='notification-item__content__name'>
              {contentNotification.content}
            </div>
            <div className='notification-item__content__message'>
              <span>{item.message}</span>
            </div>
          </div>
          <div className='notification-item__time'>
            {contentNotification.createAt && (
              <span>
                <Moment toNow>{contentNotification.contentNotification}</Moment>
              </span>
            )}
          </div>
          {item.status === NOTIFICATION_STATUS.PENDING && (
            <div className='notification-item__confirm'>
              <div className='btn' onClick={() => handleAccept(item)}>
                Xác nhận
              </div>
              <div className='btn btn--grey'>Xóa</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
