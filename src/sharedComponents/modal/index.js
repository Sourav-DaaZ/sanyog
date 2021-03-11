import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {Text, Portal, Modal} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonLayout from '../button';
import styles from './style';

const ModalLayout = (props) =>(
    <Portal>
      <Modal visible={props.visable} onDismiss={props.close} contentContainerStyle={styles.modalPopup}>
          <View style={styles.container}>
          {props.title?<View style={styles.header}><Text style={styles.headerText}>{props.title}</Text><TouchableOpacity onPress={props.close}><MaterialIcons name="close" color="#05375a" size={30} /></TouchableOpacity></View>:null}
          <View style={styles.body}>{props.children}</View>
          {props.btnTxt?<View style={styles.footer}><ButtonLayout onPress={props.onPress} style={{maxWidth: 250}}>{props.btnTxt}</ButtonLayout></View>:null}
          </View>
      </Modal>
      </Portal>
)

export default ModalLayout;
