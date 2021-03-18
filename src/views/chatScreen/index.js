import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Send, InputToolbar, Bubble} from 'react-native-gifted-chat';
import {IconButton, Text} from 'react-native-paper';
import {View, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTheme} from 'react-native-paper';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const {colors} = useTheme();

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
        sent: true,
        received: true,
        pending: true,
      },
    ]);
  }, []);

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={50} color={colors.mainColor} />
        </View>
      </Send>
    );
  }

  const onSend = useCallback((msg = []) => {
    const [messageToSend] = msg;
    //  messageToSend.pending = true;
    messageToSend.sent = true;
    messageToSend.received = true;
    //  messageToSend.image = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [messageToSend]),
    );
    console.log(messages);
  }, []);

  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: colors.backgroundColor,
          paddingVertical: 8,
          paddingHorizontal: 5,
        }}
      />
    );
  };
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.mainColor,
            paddingHorizontal: 7,
            paddingVertical: 5,
            borderTopRightRadius: 15,
          },
          left: {
            backgroundColor: colors.backgroundColor,
            paddingHorizontal: 7,
            paddingVertical: 5,
            borderTopLeftRadius: 15,
          },
        }}
        timeTextStyle={{
          left: {fontSize: 12},
          right: {fontSize: 12},
        }}
        textStyle={{
          right: {
            color: colors.backgroundColor,
          },
          left: {
            color: colors.textColor,
          },
        }}
      />
    );
  };
  const renderChatFooter = () => {
    if (image.length > 0) {
      return (
        <View
          style={[
            styles.imageViewer,
            {backgroundColor: colors.backgroundColor},
          ]}>
          <Image
            source={{
              uri:
                'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
            }}
            style={{height: 75, width: 125}}
          />
          <TouchableOpacity>
            <Text
              style={{
                color: colors.textColor,
                textDecorationLine: 'underline',
              }}>
              Cancel Image
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };
  const onTextChanged = (txt) => {
    setText(txt);
  };
  const scrollToBottomComponent = () => {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton
          icon="chevron-double-down"
          size={36}
          color={colors.mainColor}
        />
      </View>
    );
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={(msg) => onSend(msg)}
      showUserAvatar
      alwaysShowSend
      renderSend={renderSend}
      infiniteScroll={true}
      renderBubble={renderBubble}
      placeholder="Type your message here..."
      renderActions={() => (
        <Entypo
          name="attachment"
          size={28}
          style={{height: 35, marginLeft: 5}}
          color={colors.iconColor}
        />
      )}
      renderInputToolbar={(props) => customtInputToolbar(props)}
      text={text}
      onInputTextChanged={onTextChanged}
      renderChatFooter={renderChatFooter}
      scrollToBottomComponent={scrollToBottomComponent}
      renderFooter={() => (
        <Text style={{marginBottom: 10, marginLeft: 15}}>typing.....</Text>
      )}
      minInputToolbarHeight={60}
      user={{
        _id: 1,
        name: 'Sourav',
        avatar: 'https://placeimg.com/140/140/any',
      }}
    />
  );
};

export default ChatScreen;
