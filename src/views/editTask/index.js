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

const EditTaskScreen = (props) => {
  const {colors} = useTheme();
  const [range, setRange] = React.useState({
    startDate: props.route.params.start_date,
    endDate: props.route.params.end_date,
  });
  const [open, setOpen] = React.useState(false);
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
        value: props.route.params.status?props.route.params.status:'created',
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
    console.log(data.controls.task.value, data.controls.task.value.length)
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
      ...(data.controls.details.value.length > 1 && {
        details: data.controls.details.value,
      }),
      ...(range.startDate && {start_date: range.startDate}),
      ...(range.endDate && {end_date: range.endDate})
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
    console.log(props.route.params.my_id)
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={styles.headerText}>Create Task</Text>
        <View style={styles.outerBox}>
          <View style={{marginBottom: 20}}>
            <Text>{"Task ID: "+props.route.params.task_d_id}</Text>
          </View>
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
          <Text style={[styles.text_footer, {marginTop: 20}]}>
            Enter Project Status
          </Text>
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
              options={['created','in progress', 'complete']}
            />
          </View>
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
          <View style={[styles.buttonInput, {marginTop: 20}]}>
            <ButtonLayout onPress={onSearch}>Edit Task</ButtonLayout>
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
