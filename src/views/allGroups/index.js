import * as React from 'react';
import {
  Alert,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Avatar, Card, useTheme, Text} from 'react-native-paper';
import InsideAuthApi from '../../services/inSideAuth';
import {connect} from 'react-redux';
import CommonInput from '../../sharedComponents/commonInput';
import {updateObject} from '../../utils';

import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuLayout from '../../sharedComponents/menu';
import {displayResponse} from '../../utils';

const AllGroups = (props) => {
  const {colors} = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [dataBackup, setDataBackup] = React.useState([]);
  const [cost, setCost] = React.useState([]);
  const [costBackup, setCostBackup] = React.useState([]);
  const [task, setTask] = React.useState([]);
  const [taskBackup, setTaskBackup] = React.useState([]);
  const [dateExp, setDateExp] = React.useState([]);
  const [dateExpBackup, setDateExpBackup] = React.useState([]);
  const [short, setShort] = React.useState({
    controls: {
      status: {
        elementType: 'select',
        elementConfig: {
          type: 'status',
          text: 'Parent Task',
          placeholder: 'Enter Parent Task',
        },
        value: 'all',
        validation: {
          required: true,
        },
        valid: false,
        errors: '',
        className: [],
        icons: [],
      },
    },
  });

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
    apiCall();
  }, []);
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      apiCall();
    });

    return unsubscribe;
  }, [props.navigation]);

  const apiCall = () => {
    InsideAuthApi(props.token)
      .AllProject()
      .then((res) => {
        setData(res.data.data);
        setDataBackup(res.data.data);
        setCost(res.data.cost);
        setCostBackup(res.data.cost);
        setTask(res.data.taskStatus);
        setTaskBackup(res.data.taskStatus);
        setDateExp(res.data.dateExp);
        setDateExpBackup(res.data.dateExp);
        displayResponse(res, true);
      })
      .catch((err) => {
        displayResponse(err.message);
      });
  };

  const onInputChange = (val, type) => {
    let varVal = {};
    let valData = [];
    let valTask = [];
    let valcost = [];
    let valdate = [];
    let copTask = [];
    if (val === 'in progress') {
      dataBackup.map((x, index) =>
        (taskBackup[index] === 'in progress'
          ? (valData.push(x),
            valTask.push(taskBackup[index]),
            valcost.push(costBackup[index]),
            valdate.push(dateExpBackup[index]))
          : null)
      );
      setTask(valTask);
      setDateExp(valdate);
      setCost(valcost);
      setData(valData);
    } else if (val === 'created') {
      dataBackup.map((x, index) =>
        ((taskBackup[index] == 'created' || typeof(taskBackup[index]) === 'undefined')
          ? (valData.push(x),
            valTask.push(taskBackup[index]),
            valcost.push(costBackup[index]),
            valdate.push(dateExpBackup[index]))
          : null)
      );
      setTask(valTask);
      setCost(valcost);
      setDateExp(valdate);
      setData(valData);
    } else if (val === 'completed') {
      dataBackup.map((x, index) =>
        (taskBackup[index] == 'complete'
          ? (valData.push(x),
            valTask.push(taskBackup[index]),
            valcost.push(costBackup[index]),
            valdate.push(dateExpBackup[index]))
          : null)
      );
      setTask(valTask);
      setCost(valcost);
      setDateExp(valdate);
      setData(valData);
    } else if (val === 'cost inc') {
      costBackup.map((i, index) =>
          (copTask.push([
          costBackup[index],
          taskBackup[index],
          dateExpBackup[index],
          index,
        ])),
      );
      copTask.sort(function (a, b) {
        return a[0] > b[0] ? -1 : 1;
      });
      dataBackup.map(
        (x, index) => (
          valData.push(dataBackup[copTask[index][3]]),
          valTask.push(copTask[index][1]),
          valcost.push(copTask[index][0]),
          valdate.push(copTask[index][2])
        ),
      );
      setTask(valTask);
      setDateExp(valdate);
      setCost(valcost);
      setData(valData);
    } else if (val === 'cost dec') {
      costBackup.map((i, index) =>
         ( copTask.push([
          costBackup[index],
          taskBackup[index],
          dateExpBackup[index],
          index,
        ])),
      );
      copTask.sort(function (a, b) {
        return a[0] < b[0] ? -1 : 1;
      });
      dataBackup.map(
        (x, index) => (
          valData.push(dataBackup[copTask[index][3]]),
          valTask.push(copTask[index][1]),
          valcost.push(copTask[index][0]),
          valdate.push(copTask[index][2])
        ),
      );
      setTask(valTask);
      setCost(valcost);
      setDateExp(valdate);
      setData(valData);
    }else{
      costBackup.map((i, index) =>
          (copTask.push([
          costBackup[index],
          taskBackup[index],
          dateExpBackup[index],
          index,
        ])),
      );
      copTask.sort(function (a, b) {
        return a[0] > b[0] ? -1 : 1;
      });
      dataBackup.map(
        (x, index) => (
          valData.push(dataBackup[copTask[index][3]]),
          valTask.push(copTask[index][1]),
          valcost.push(copTask[index][0]),
          valdate.push(copTask[index][2])
        ),
      );
      setTask(taskBackup);
      setDateExp(dateExpBackup);
      setCost(costBackup);
      setData(dataBackup);
    }
    varVal = updateObject(short, {
      controls: updateObject(short.controls, {
        [type]: updateObject(short.controls[type], {
          value: val,
          errors: '',
          valid: false,
        }),
      }),
    });
    setShort(varVal);
  };
  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}

      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <CommonInput
        placeholder={short.controls.status.elementConfig.placeholder}
        onSelect={onInputChange}
        style={{marginRight: 20}}
        onSubmit={() => Keyboard.dismiss()}
        value={short.controls.status.value}
        type={short.controls.status.elementConfig.type}
        isValid={short.controls.status.valid}
        validation={short.controls.status.validation}
        icons={short.controls.status.icons}
        ele={short.controls.status.elementType}
        options={[
          'all',
          'created',
          'in progress',
          'completed',
          'cost inc',
          'cost dec',
        ]}
      />
      {data.map((x, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            props.navigation.navigate('TaskScreen', {
              projectId: x._id,
              owner: x.owner,
              projectAssigned: x.projectAssigned
            })
          }>
          {dateExp[index]?<Card.Title
            title={x.name}
            style={{backgroundColor: dateExp[index]? '#F08080' : ''}}
            right={() => (
              <Text style={{marginRight: 10}}>
                <Text>Cost: {cost[index]}</Text>
                <Text> Status: {task[index] ? task[index] : 'created'}</Text>
              </Text>
            )}
            subtitle={x?.details}
            left={() => (
              <Avatar.Text
                size={45}
                label={x?.name.charAt(0)}
                style={{paddingBottom: 5}}
              />
            )}
          />:
          <Card.Title
            title={x.name}
            // style={{backgroundColor: dateExp[index]? '#F08080' : ''}}
            right={() => (
              <Text style={{marginRight: 10}}>
                <Text>Cost: {cost[index]}</Text>
                <Text> Status: {task[index] ? task[index] : 'created'}</Text>
              </Text>
            )}
            subtitle={x?.details}
            left={() => (
              <Avatar.Text
                size={45}
                label={x?.name.charAt(0)}
                style={{paddingBottom: 5}}
              />
            )}
          />}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.access_token,
  };
};

export default connect(mapStateToProps, null)(AllGroups);
