import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import man from '../../../assets/images/man.png';
import woman from '../../../assets/images/woman.png';
import { getTypeMessage } from '../../../common/functions';
import { useUploadImages } from '../../../hooks/useUploadImages';
import { selectUser } from '../../../redux/reducer/auth';
import {
  ConversationAction,
  selectMainConversation,
  selectMessageLoading,
} from '../../../redux/reducer/conversation';
import { MessageActions } from '../../../redux/reducer/message';
import ChatList from '../../components/ChatList';
import UploadFiles from '../../components/UploadFiles';
import Avatar from '../../shared/Avatar';
import Popover from '../../shared/Popover';
import SpinLoading from '../../shared/SpinLoading';
import SVGIcon from '../../shared/SVGIcon';
import { v4 } from 'uuid';

const Main = ({ match }) => {
  const {
    params: { idConversation },
  } = match;

  const dispatch = useDispatch();

  const inputRef = useRef();

  const user = useSelector(selectUser);

  const { conversationInfo = {}, listUser = [] } =
    useSelector(selectMainConversation) || {};

  const { listImages, setAddListImages, deleteImage, clearImages } =
    useUploadImages();

  const avatar =
    conversationInfo.creator_avatar ||
    (conversationInfo.creator_sex ? man : woman);

  useEffect(() => {
    dispatch(
      ConversationAction.getSpecificConversation({ id: idConversation })
    );
  }, [idConversation, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    const content = inputRef.current.value.trim();
    const type = getTypeMessage(content, listImages);
    if (type === -1) return;

    //display message before call sendMessage api.
    const idPreview = v4();
    dispatch(
      MessageActions.insertPreviewMessages({
        type: type,
        content: content,
        listImages: listImages.map((item) => item.previewSrc),
        idUser: +user.id_user,
        avatar: user.avatar,
        sex: user.sex,
        idPreview,
      })
    );

    //message data
    const dataMessage = new FormData();
    dataMessage.append('type', type);
    dataMessage.append('content', content);
    dataMessage.append('id_preview', idPreview);
    dataMessage.append('id_conversation', conversationInfo.id_room);

    if (listImages.length === 1) {
      dataMessage.append('singleImage', listImages[0].toUpload);
    } else if (listImages.length > 1) {
      listImages.forEach((image) => {
        dataMessage.append('multipleImage', image.toUpload);
      });
    }
    dispatch(MessageActions.sendMessage({ data: dataMessage, idPreview }));

    //cleanup
    inputRef.current.value = '';
    clearImages();
  };

  const isLoading = useSelector(selectMessageLoading);

  if (isLoading) return <SpinLoading />;

  return (
    <main className='main'>
      <div className='main__top'>
        <Avatar img={avatar} isOnline={true} />
        <div className='main__top__title'>
          <h3>{conversationInfo.creator_name}</h3>
          <small>Truy cập 4 giờ trước</small>
        </div>
        <div className='main__top__action'></div>
      </div>

      <ChatList author={+user.id_user} />

      <div className='main__bottom'>
        {listImages.length < 1 ? (
          <div className='main__bottom__action'>
            <div className='main__action__item'>
              <Popover root={<SVGIcon name='sticker' width='24px' />}></Popover>
            </div>
            <div className='main__action__item'>
              <UploadFiles
                multiple={true}
                accept='image/png, image/jpeg, image/jpg'
                onAddImages={(files) => setAddListImages(files)}
              >
                <SVGIcon name='image' width='24px' />
              </UploadFiles>
            </div>
            <div className='main__action__item'>
              <UploadFiles multiple={true}>
                <SVGIcon name='attachment' width='24px' />
              </UploadFiles>
            </div>
          </div>
        ) : (
          <div className='main__bottom__preview'>
            <ul>
              {listImages.map((item) => (
                <li key={item.id}>
                  <img src={item.previewSrc} alt='' />
                  <span onClick={() => deleteImage(item.id)}>
                    <SVGIcon name='close' />
                  </span>
                </li>
              ))}
              <li className='main__action__item'>
                <UploadFiles
                  multiple={true}
                  accept='image/png, image/jpeg, image/jpg'
                  onAddImages={(files) => {
                    inputRef.current.focus();
                    setAddListImages(files);
                  }}
                >
                  <SVGIcon name='image' width='24px' />
                </UploadFiles>
              </li>
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className='chat-box'>
            <input type='text' ref={inputRef} />
            <div className='chat-box__action'>
              <button>
                <div className='main__action__item'>
                  <div>
                    <SVGIcon name='like' width='24px' />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Main;
