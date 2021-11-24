import * as React from 'react';
import {
  Alert,
  ScrollView,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Avatar, Card, FAB, useTheme, Text} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InsideAuthApi from '../../services/inSideAuth';
import {connect} from 'react-redux';
import {_retrieveData} from '../../utils';
import CommonInput from '../../sharedComponents/commonInput';
import {displayResponse} from '../../utils';
import ButtonLayout from '../../sharedComponents/button';
import ModalLayout from '../../sharedComponents/modal';

const TaskScreen = (props) => {
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [owner, setOwner] = React.useState([]);
  const [assignMenber, setAssignMenber] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = React.useState('');

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      apiCall();
      setRefreshing(false);
    });
  }, []);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      apiCall();
    });

    return unsubscribe;
  }, [props.navigation]);

  React.useEffect( ()=>{
    fetchUser();
  },[])
  const fetchUser = async () => {
    const userType = await _retrieveData('UserType');
    setType(userType);
  };

  const apiCall = () => {
    InsideAuthApi(props.token)
      .AllTask(props.route.params.projectId)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setOwner(res.data.owner);
        displayResponse(res, true);
      })
      .catch((err) => {
        displayResponse(err.message);
      });
  };

  const onAssign = (val) => {
    let datas = {
      project_id: props.route.params.projectId,
      email: val === false? assignMenber: val,
      deleteUser: val === false?false:true,
    };
    InsideAuthApi(props.token)
      .AssignProject(datas)
      .then(async (res) => {
        displayResponse(res, true);
        setVisible(false);
        props.navigation.goBack();        
      })
      .catch((err) => {
        displayResponse(err.message);
        setVisible(false);
      });
  };

  return (
    <React.Fragment>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ButtonLayout
          onPress={() => {
            setVisible(true);
          }}
          style={{width: '80%', marginLeft: 50, marginTop: 20, marginBottom: 20}}>
          Assign Project
        </ButtonLayout>
        <ModalLayout
          visable={visible}
          close={() => setVisible(false)}
          title="Assign Task"
          onPress={() => onAssign(false)}
          btnTxt="Done">
          <View>
            <View style={{width: '100%'}}>
              <Text>Email</Text>
              <CommonInput
                placeholder={'Enter Email id'}
                onInputChange={(val, type) => setAssignMenber(val)}
                onSubmit={() => Keyboard.dismiss()}
                value={assignMenber}
                type={'input'}
                icons={[
                  <FontAwesome
                    name="envelope-open-o"
                    color="#05375a"
                    size={20}
                  />,
                ]}
                ele={'input'}
              />
            </View>
          </View>
          <View style={{marginTop: 20}}>
            {props.route.params.projectAssigned.map((x, index) => (
              <Card.Title
                key={index}
                title={x.user.email}
                left={() => (
                  <Avatar.Text
                    size={45}
                    label={x.user.email.charAt(0)}
                    style={{paddingBottom: 5}}
                  />
                )}
                right={() => (
                  <ButtonLayout
                    outline
                    style={{width: 30, height: 30, marginTop: -5}}
                    onPress={() => onAssign(x.user.email)}>
                    X
                  </ButtonLayout>
                )}
              />
            ))}
          </View>
        </ModalLayout>
        {data.map((x, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              props.navigation.navigate('EditTaskScreen', {
                projectId: props.route.params.projectId,
                task_id: x._id,
                status: x.status,
                owner: x.owner,
                my_id: owner,
                time: x.time,
                task_d_id: x.task_id,
                name: x.name,
                parentTask: x.parentTask ? x.parentTask : 0,
                details: x.details ? x.details : '',
                start_date: x.start_date ? x.start_date : undefined,
                end_date: x.end_date ? x.end_date : undefined,
              })
            }>
            <Card.Title
              title={x.name}
              subtitle={x.details}
              style={{backgroundColor: new Date(x.end_date) < new Date()  ? '#F08080' : ''}}
              left={() => (
                <Avatar.Text
                  size={45}
                  label={x.name.charAt(0)}
                  style={{paddingBottom: 5}}
                />
              )}
              // right={() => (
              //   <MenuLayout
              //     terget={
              //       <MaterialIcons
              //         name="dots-vertical"
              //         color={colors.iconColor}
              //         style={{marginRight: 5}}
              //         size={30}
              //       />
              //     }
              //     menuOption={[{text: 'enter', function: () => alert(`Save`)}]}
              //   />
              // )}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {type === '"admin"' ? (
        <FAB
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: colors.mainColor,
          }}
          icon="plus"
          onPress={() =>
            props.navigation.navigate('CreateTaskScreen', {
              projectId: props.route.params.projectId,
            })
          }
        />
      ) : null}
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.access_token,
  };
};
export default connect(mapStateToProps, null)(TaskScreen);
