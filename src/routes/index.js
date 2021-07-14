import React from 'react';
import {Text} from 'react-native-paper';
import {connect} from 'react-redux';
import {_retrieveData} from '../utils';
import * as actions from '../store/actions';

const OutsideAuthRoutes = React.lazy(() => import('./outsideAuthRoutes'));
const InsidesideAuthRoutes = React.lazy(() => import('./insideAuthRoutes'));

const RootStackScreen = (props) => {
  React.useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = async () => {
    const varToken = await _retrieveData('Token');
    props.updateAccessToken(JSON.parse(varToken).access_token);
    props.updateRefreshToken(JSON.parse(varToken).refresh_token);
  };
  return (
    <React.Suspense fallback={<Text>LOADING....</Text>}>
      {props.access_token && props.access_token.length > 0 ? (
        <InsidesideAuthRoutes />
      ) : (
        <OutsideAuthRoutes />
      )}
    </React.Suspense>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccessToken: (data) => dispatch(actions.accessTokenUpdate(data)),
    updateRefreshToken: (data) => dispatch(actions.refreshTokenUpdate(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    access_token: state.auth.access_token,
    refresh_token: state.auth.refresh_token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootStackScreen);
