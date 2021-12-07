import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {_retrieveData, displayResponse} from '../../utils';
import InsideAuthApi from '../../services/inSideAuth';
import {connect} from 'react-redux';
 
const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
 
  useEffect(() => {
    apiCall();
    // console.log(props.route.params.data)
  }, [])

 const apiCall = async() =>{
  const varUser = await _retrieveData('User');
    setUser(JSON.parse(varUser)._id);
    setRole(JSON.parse(varUser).type);
    InsideAuthApi(props.token)
      .GetChats()
      .then(async (res) => {
        res.data.filter((x) => x.owner === (JSON.parse(varUser).type === 'admin'?props.route.params?.data:JSON.parse(varUser)._id))[0].chats.map((x,index)=>(
          console.log(x.user , user),
          setMessages(previousMessages => GiftedChat.append(previousMessages, {
            _id: Math.random(),
            text: x.chat,
            user: {
              _id: x.user === JSON.parse(varUser)._id?1:2,
              name: x.user,
              avatar: 'https://placeimg.com/140/140/any',
            },
          }))
        ))
      })
 }



  const onSend = (msgs = [], rl) => {
    console.log(rl);
    InsideAuthApi(props.token)
    .EditChats({
      ...(rl === 'admin' && {"user_id": props.route.params?.data}),
      "msg": msgs[0].text
    })
    .then((res) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, {
        _id: Math.random(),
        text: msgs[0].text,
        user: {
          _id: 1,
          avatar: 'https://placeimg.com/140/140/any',
        },
      }))
    })
    .catch((err) => {
      displayResponse(err.message);
    });
  }
 
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages,role)}
      user={{
        _id: 1,
      }}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.access_token,
  };
};

export default connect(mapStateToProps, null)(ChatScreen);