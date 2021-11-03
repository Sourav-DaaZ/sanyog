import {Button, View} from 'native-base';
import * as React from 'react';
import {Alert, ScrollView, TouchableOpacity, Keyboard} from 'react-native';
import {Avatar, Card, useTheme, Text} from 'react-native-paper';
import {connect} from 'react-redux';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonInput from '../../sharedComponents/commonInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MenuLayout from '../../sharedComponents/menu';
import styles from './style';
import {displayResponse, updateObject} from '../../utils';
import ButtonLayout from '../../sharedComponents/button';
import InsideAuthApi from '../../services/inSideAuth';
import {DatePickerModal} from 'react-native-paper-dates';
import ModalLayout from '../../sharedComponents/modal';

const EditTaskScreen = (props) => {
  const {colors} = useTheme();
  const [range, setRange] = React.useState({
    startDate: new Date(props.route.params.start_date),
    endDate: new Date(props.route.params.end_date),
  });
  const [assignMenber, setAssignMenber] = React.useState('');
  const [assignMenbers, setAssignMenbers] = React.useState([]);
  const [assignTime, setAssignTime] = React.useState(0);
  const [status, setStatus] = React.useState('');
  const [assignCost, setAssignCost] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState({
    controls: {
      input: {
        elementType: 'input',
        elementConfig: {
          type: 'input',
          text: 'Name',
          placeholder: 'Enter project name',
        },
        value: props.route.params.name,
        validation: {
          required: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
        ],
      },
      details: {
        elementType: 'input',
        elementConfig: {
          type: 'details',
          text: 'Description',
          placeholder: 'Enter project description',
        },
        value: props.route.params.details,
        validation: {
          required: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
        ],
      },
      task: {
        elementType: 'input',
        elementConfig: {
          type: 'task',
          text: 'Parent Task',
          placeholder: 'Enter Parent Task',
        },
        value: props.route.params.parentTask.toString(),
        validation: {
          required: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
        ],
      },
      status: {
        elementType: 'select',
        elementConfig: {
          type: 'status',
          text: 'Parent Task',
          placeholder: 'Enter Parent Task',
        },
        value: props.route.params.status
          ? props.route.params.status
          : 'created',
        validation: {
          required: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [
          <FontAwesome name="user-o" color="#05375a" size={20} />,
          <Feather name="check-circle" color="green" size={20} />,
        ],
      },
    },
  });

  React.useEffect(() => {
    apiCall();
  }, []);

  React.useEffect(() => {
    apiCall();
  }, [visible]);

  const apiCall = () => {
    if (Number(props.route.params.parentTask) > 0) {
      InsideAuthApi(props.token)
        .GetTaskStatus(Number(props.route.params.parentTask))
        .then(async (res) => {
          displayResponse(res, true);
          setStatus(res.data.status);
        })
        .catch((err) => {
          displayResponse(err.message);
        });
    }
    InsideAuthApi(props.token)
      .GetAssignedMembers(props.route.params.task_id)
      .then(async (res) => {
        displayResponse(res, true);
        setAssignMenber('');
        setAssignCost(0);
        setAssignMenbers(res.data);
      })
      .catch((err) => {
        displayResponse(err.message);
      });
  };
  const onInputChange = (val, type) => {
    let varVal = {};
    varVal = updateObject(data, {
      controls: updateObject(data.controls, {
        [type]: updateObject(data.controls[type], {
          value: val,
          errors: '',
          valid: false,
        }),
      }),
    });
    setData(varVal);
  };

  const onSearch = () => {
    console.log(data.controls.task.value, data.controls.task.value.length);
    let datas = {
      project_id: props.route.params.projectId,
      task_id: props.route.params.task_id,
      name: data.controls.input.value,
      ...(data.controls.task.value > 0 && {
        parentTask: Number(data.controls.task.value),
      }),
      ...(data.controls.status.value.length > 0 && {
        status: data.controls.status.value,
      }),
      ...(String(props.route.params.owner) !=
        String(props.route.params.my_id) && {time: assignTime}),
      ...(data.controls.details.value.length > 1 && {
        details: data.controls.details.value,
      }),
      ...(range.startDate && {start_date: range.startDate}),
      ...(range.endDate && {end_date: range.endDate}),
    };
    InsideAuthApi(props.token)
      .EditTask(datas)
      .then(async (res) => {
        displayResponse(res, true);
        props.navigation.goBack();
      })
      .catch((err) => {
        displayResponse(err.message);
      });
  };

  const onAssign = (val) => {
    let datas = {
      task_id: props.route.params.task_id,
      email: val ? val : assignMenber,
      ...(String(props.route.params.owner) !=
        String(props.route.params.my_id) && {time: assignTime}),
      ...(!val && {cost: Number(assignCost)}),
      ...(val && {deleteUser: true}),
    };
    InsideAuthApi(props.token)
      .AssignTask(datas)
      .then(async (res) => {
        displayResponse(res, true);
        setVisible(false);
      })
      .catch((err) => {
        displayResponse(err.message);
        setVisible(false);
      });
  };

  const onDismiss = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = React.useCallback(
    ({startDate, endDate}) => {
      setOpen(false);
      setRange({startDate, endDate});
    },
    [setOpen, setRange],
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.headerText}>Edit Task</Text>
        <View style={styles.outerBox}>
          <View style={{marginBottom: 20}}>
            <Text>{'Task ID: ' + props.route.params.task_d_id}</Text>
          </View>
          {String(props.route.params.owner) ==
          String(props.route.params.my_id) ? (
            <React.Fragment>
              <Text style={styles.text_footer}>Enter project Name</Text>
              <View>
                <CommonInput
                  placeholder={data.controls.input.elementConfig.placeholder}
                  onInputChange={onInputChange}
                  onSubmit={() => Keyboard.dismiss()}
                  value={data.controls.input.value}
                  type={data.controls.input.elementConfig.type}
                  isValid={data.controls.input.valid}
                  validation={data.controls.input.validation}
                  icons={data.controls.input.icons}
                  ele={data.controls.input.elementType}
                />
              </View>
            </React.Fragment>
          ) : (
            <Text style={styles.text_footer}>
              project Name: {data.controls.input.value}
            </Text>
          )}
          {String(props.route.params.owner) ==
          String(props.route.params.my_id) ? (
            <React.Fragment>
              <Text style={[styles.text_footer, {marginTop: 20}]}>
                Enter project description
              </Text>
              <View>
                <CommonInput
                  placeholder={data.controls.details.elementConfig.placeholder}
                  onInputChange={onInputChange}
                  onSubmit={() => Keyboard.dismiss()}
                  value={data.controls.details.value}
                  type={data.controls.details.elementConfig.type}
                  isValid={data.controls.details.valid}
                  validation={data.controls.details.validation}
                  icons={data.controls.details.icons}
                  ele={data.controls.details.elementType}
                />
              </View>
            </React.Fragment>
          ) : (
            <Text style={[styles.text_footer, {marginTop: 20}]}>
              project description: {data.controls.details.value}
            </Text>
          )}
          {String(props.route.params.owner) ==
          String(props.route.params.my_id) ? (
            <React.Fragment>
              <Text style={[styles.text_footer, {marginTop: 20}]}>
                Enter Parent Task
              </Text>
              <View>
                <CommonInput
                  placeholder={data.controls.task.elementConfig.placeholder}
                  onInputChange={onInputChange}
                  onSubmit={() => Keyboard.dismiss()}
                  value={data.controls.task.value}
                  type={data.controls.task.elementConfig.type}
                  isValid={data.controls.task.valid}
                  validation={data.controls.task.validation}
                  icons={data.controls.task.icons}
                  ele={data.controls.task.elementType}
                  keyNum={true}
                />
              </View>
            </React.Fragment>
          ) : (
            <Text style={[styles.text_footer, {marginTop: 20}]}>
              Parent Task: {data.controls.task.value}
            </Text>
          )}
          {Number(props.route.params.parentTask) !== 0?<Text style={[styles.text_footer, {marginTop: 20}]}>
            Parent Task Status: {status}
          </Text>:null}
          <Text style={[styles.text_footer, {marginTop: 20}]}>Task Status</Text>
          <View>
            <CommonInput
              placeholder={data.controls.status.elementConfig.placeholder}
              onSelect={onInputChange}
              onSubmit={() => Keyboard.dismiss()}
              value={data.controls.status.value}
              type={data.controls.status.elementConfig.type}
              isValid={data.controls.status.valid}
              validation={data.controls.status.validation}
              icons={data.controls.status.icons}
              ele={data.controls.status.elementType}
              options={['created', 'in progress', 'complete']}
            />
          </View>
          {String(props.route.params.owner) !=
          String(props.route.params.my_id) ? (
            <React.Fragment>
              <Text style={[styles.text_footer, {marginTop: 20}]}>
                Enter Time
              </Text>
              <View>
                <CommonInput
                  placeholder={'Enter time'}
                  onInputChange={(val, type) => setAssignTime(val)}
                  onSubmit={() => Keyboard.dismiss()}
                  value={assignTime}
                  type={'input'}
                  icons={[
                    <FontAwesome
                      name="hourglass-o"
                      color="#05375a"
                      size={20}
                    />,
                  ]}
                  ele={'input'}
                  keyNum={true}
                />
              </View>
            </React.Fragment>
          ) : null}
          {String(props.route.params.owner) ==
          String(props.route.params.my_id) ? (
            <View style={[styles.text_footer, {marginTop: 20}]}>
              <ButtonLayout onPress={() => setOpen(true)} outline>
                {range.startDate || range.endDate
                  ? new Date(range.startDate).toLocaleDateString('en-US') +
                    ' - ' +
                    new Date(range.endDate).toLocaleDateString('en-US')
                  : 'Enter start date - Enter end date'}
              </ButtonLayout>
              <DatePickerModal
                locale="en"
                mode="range"
                visible={open}
                onDismiss={onDismiss}
                startDate={range.startDate}
                endDate={range.endDate}
                onConfirm={onConfirm}
              />
            </View>
          ) : null}
          <View style={[styles.inlineInput, {marginTop: 20}]}>
            {String(props.route.params.owner) ==
            String(props.route.params.my_id) ? (
              <React.Fragment>
                <ButtonLayout
                  onPress={() => {
                    setVisible(true);
                  }}
                  style={{width: '48%', marginRight: 20}}>
                  Assign Task
                </ButtonLayout>
                <ModalLayout
                  visable={visible}
                  close={() => setVisible(false)}
                  title="Assign Task"
                  onPress={() => onAssign(false)}
                  btnTxt="Done">
                  <View style={styles.inlineInput}>
                    <View style={{width: '50%', marginRight: '10%'}}>
                      <Text style={[styles.text_footer]}>Email</Text>
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
                    <View style={{width: '30%'}}>
                      <Text style={[styles.text_footer]}>Cost</Text>
                      <CommonInput
                        placeholder={'Enter cost'}
                        onInputChange={(val, type) => setAssignCost(val)}
                        onSubmit={() => Keyboard.dismiss()}
                        value={assignCost}
                        type={'input'}
                        icons={[
                          <FontAwesome
                            name="rupee"
                            color="#05375a"
                            size={20}
                          />,
                        ]}
                        ele={'input'}
                        keyNum={true}
                      />
                    </View>
                  </View>
                  <View style={{marginTop: 20}}>
                    {assignMenbers.map((x, index) => (
                      <Card.Title
                        key={index}
                        title={x.user.email}
                        subtitle={
                          'Time:' +
                          x.time +
                          ', Cost:' +
                          x.cost +
                          ' Total:' +
                          Number(x.time) * Number(x.cost)
                        }
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
              </React.Fragment>
            ) : null}
            {String(props.route.params.owner) ==
              String(props.route.params.my_id) ||
            (String(props.route.params.owner) !=
              String(props.route.params.my_id) &&
              (status == 'complete' ||
                Number(props.route.params.parentTask) == 0)) ? (
              <ButtonLayout onPress={onSearch} style={{width: '48%'}}>
                Save Task
              </ButtonLayout>
            ) : (
              <Text>Parent Task is not complete, So You can't update it</Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    token: state.auth.access_token,
  };
};

export default connect(mapStateToProps, null)(EditTaskScreen);
