import React, { Component } from "react";
import { URL } from "../../utils/utils";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";

import io from "socket.io-client";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

import {
  GiftedChat,
  Actions,
  Bubble,
  SystemMessage
} from "react-native-gifted-chat";
import apiBack from "../../api/apiBack";

export default class ContactChat extends Component {
  


  constructor(props) {
    super(props);
    this.props=props
    this.socket = io(URL);

    this.state = {
      contactSelected: this.props.navigation.state.params.contactSelected,
      commonIdChat: null,
      emitter: this.props.navigation.state.params.emitter,
      receiver: this.props.navigation.state.params.receiver,
      chat: [
        {
          emitter: this.props.emitter,
          receiver: this.props.receiver,
          message: "Hola",
          date: new Date(Date.UTC(2016, 7, 30, 17, 20, 0))
        }
      ],
      message: "",
      messages: []
    };

    this.onSend = this.onSend.bind(this);
    this.renderSystemMessage = this.renderSystemMessage.bind(this);
    this.renderBubble = this.renderBubble.bind(this);

    this.socket.on("receiver", message => {
      var data = [
        {
          chatId: message.chatId,
          text: message.message[0].text,
          user: { _id: this.state.receiver },
          createdAt: message.message[0].createdAt,
          _id: message.message[0]._id
        }
      ];

      if (data[0].chatId === this.state.commonIdChat) {
        this.setState(previousState => {
          return {
            messages: GiftedChat.append(previousState.messages, data)
          };
        });
      }
    });
  }

  componentWillMount() {
    this._getCommonChat();
  }

  renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
          backgroundColor: "black"
        }}
        textStyle={{
          fontSize: 14
        }}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "white",
            borderColor: "ffffff",
            borderWidth: 1
          },
          right: {
            backgroundColor: "rgb(106,17,203)",
            color: "white"
          }
        }}
      />
    );
  }

  _getCommonChat = async () => {
    const commonIdChat = await apiBack.FindChatId(
      this.state.emitter,
      this.state.receiver
    );
    console.log(commonIdChat);
    const messagesChat = await apiBack.GetChatMessages(commonIdChat.data);

    this.setState({
      ...this.state,
      commonIdChat: commonIdChat.data,
      messages: messagesChat.data.messages.reverse()
    });
  };

  onSend(messages = []) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages)
      };
    });

    var objMessage = {
      chatId: this.state.commonIdChat,
      emitter: this.state.chat.emitter,
      receiver: this.state.chat.receiver,
      message: messages
    };

    this.socket.emit("send", objMessage);
  }

  render() {
    console.log(this.state.contactSelected);

    return (

        <GiftedChat
          styles={{backgroundColor: "black"}}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderSystemMessage={this.renderSystemMessage}
          renderBubble={this.renderBubble}
          user={{
            _id: this.state.emitter
          }}
        />

    );
  }

  //   render() {
  //     return (
  //       <View style={styles.container}>
  //         <KeyboardAvoidingView
  //         keyboardVerticalOffset={65}
  //         style={{width: "100%", bottom: 0, position: "absolute"}}
  //         behavior="padding"
  //         enabled
  //       >
  //         <TextInput
  //         style={{height: 40, borderColor: 'gray', borderWidth: 1}}
  //         onChangeText={(text) => this.setState({text})}
  //         value={this.state.text}
  //       />
  //      </KeyboardAvoidingView>
  //       </View>
  //     );
  //   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF"
  }
});
