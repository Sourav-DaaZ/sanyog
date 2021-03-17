import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {Drawer} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import {styles} from './style';

export const DrawerContent = (props) => {
  const {colors} = useTheme();
  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundColor}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri:
                    'https://www.caribbeangamezone.com/wp-content/uploads/2018/03/avatar-placeholder.png',
                }}
                size={50}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>Sourav Das</Title>
                <Caption style={styles.caption}>DaaZ</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  100
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <Icon name={'home-outline'} color={color} size={size} />
            )}
            label="Home"
            onPress={() => props.navigation.navigate('Home')}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name={'account-outline'} color={color} size={size} />
            )}
            label="Profile"
            onPress={() => props.navigation.navigate('Details')}
          />
          <DrawerItem
            icon={({color, size}) => (
              <IonicIcon name={'settings-outline'} color={color} size={size} />
            )}
            label="Settings"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Icon name={'account-check-outline'} color={color} size={size} />
            )}
            label="Support"
            onPress={() => {}}
          />
        </Drawer.Section>
        <Drawer.Section title="Prefarence">
          <TouchableRipple title={'Prefarence'}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={true} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDraweeSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name={'exit-to-app'} color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {}}
        />
      </Drawer.Section>
      {/* <Text>hi</Text> */}
    </View>
  );
};
