import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import man from '../../../assets/images/man.png';
import woman from '../../../assets/images/woman.png';
import { selectListConversation } from '../../../redux/reducer/conversation';
import MessageItem from '../../components/MessageItem';
import Select from '../../shared/Select';
const listMessage = [
  {
    id: 1,
    name: 'Hoa Ngo',
    avatar: man,
    lassMessage: {
      form: '',
      content: 'I love u 💕',
    },
    sendingTime: Date.now(),
    countUnreadMessage: 5,
  },
  {
    id: 2,
    name: 'Hoàng Đức Huy',
    avatar: woman,
    lassMessage: {
      form: '',
      content: 'I love u 💕',
    },
    sendingTime: Date.now(),
    countUnreadMessage: 1,
  },
  {
    id: 3,
    name: 'Hoa Ngo 2',
    avatar: man,
    lassMessage: {
      form: 'You:',
      content: 'I love u 💕',
    },
    sendingTime: Date.now(),
    countUnreadMessage: 0,
  },
];

const transformListMessage = (list) => {
  return list.map((item) => {
    return {
      id: item.id_room,
      avatar: item.creator_avatar,
      name: item.creator_name,
    };
  });
};

const TabMessage = () => {
  const { url } = useRouteMatch();
  const listMessage = transformListMessage(
    useSelector(selectListConversation) || []
  );

  return (
    <div className='message'>
      <div className='message__filter'>
        <Select
          options={[
            'Tất cả tin nhắn',
            'Chỉ tin nhắn chưa đọc',
            'Chỉ tin nhắn từ người lạ',
          ]}
          defaultOption={0}
        />
        <p>Đánh dấu là đã đọc</p>
      </div>
      <div className='message__content'>
        <ul>
          {listMessage.map((item) => (
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
