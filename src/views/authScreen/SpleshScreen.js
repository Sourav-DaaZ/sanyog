import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoginLayout from '../../sharedComponents/layout/loginLayout';
import {spleshStyle as styles} from './style';

const SplashScreen = ({navigation}) => {
  return (
    <LoginLayout
      layout={
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          //   source={require('https://mpng.subpng.com/20190625/qas/kisspng-logo-design-architecture-advertising-kickstarter-free-essential-steps-to-crowdfunding-success-wr-5d12db2707e6b5.4861744115615168390324.jpg')}
          source={{
            uri:
              'https://www.freepnglogos.com/uploads/green-email-logo-png-3.png',
          }}
          style={styles.logo}
          resizeMode="stretch"
        />
      }>
      <Text style={styles.title}>Stay connected with everyone!</Text>
      <Text style={styles.text}>Sign in with account</Text>
      <View style={styles.button}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <LinearGradient colors={['#08d464', '#01ab9d']} style={styles.signIn}>
            <Text style={styles.textSign}>Get Started</Text>
            <MaterialIcons name="navigate-next" color="#fff" size={20} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LoginLayout>
  );
};

export default SplashScreen;
