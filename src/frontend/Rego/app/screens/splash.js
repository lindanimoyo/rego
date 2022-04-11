import * as React from 'react';
import {Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Loading from "../components/loading";

function Splash(props) {
  return (
    <>
      <View style={{flex: 1, backgroundColor: '#004', alignItems: 'center'}}>
        <Loading {...props}/>
        <Text
          style={{
            fontSize: 25,
            fontFamily: props.app.fonts.bold,
            color: '#fff',
            flex: 0.6
          }}
        >
          Research that moves
        </Text>
      </View>
    </>
  );
}

const mapStateToProps = state => {
  const {app} = state;
  return {app};
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
