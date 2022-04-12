import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Loading from "../components/loading";

function Splash(props) {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center'}}
      >
        <Image
          source={require('../assets/images/rego.png')}
          style={{
            width: 120,
            height: 120,
          }}
        />
        <Text
          style={{
            fontSize: 25,
            fontFamily: props.app.fonts.bold,
            color: '#ff0092',
            margin: 10
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
