import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text, Pressable, useWindowDimensions
} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Actions} from "react-native-router-flux";

function NavBar(props){
  return(
    <>
      <View
        style={{
          backgroundColor: '#fff',
          minHeight: 50,
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
          borderRadius: props.height*0.1
        }}
      >
        <Pressable
          onPress={() => Actions.pop()}
          android_ripple={{borderless: true, color: '#ff0092'}}
          style={{
            margin: 10,
            padding: 5,
          }}
        >
          <Ionicons
            name={'arrow-back'}
            size={35}
            color={'#ff0092'}
            />
        </Pressable>
        <Text
          style={{
            fontFamily: props.app.fonts.bold,
            fontSize: 25,
            color: '#000'
          }}
        >
          Abstract
        </Text>
      </View>
    </>
  )
}

function Abstract(props) {
  const {width, height} = useWindowDimensions();
  return(
    <>
      <View
        style={{
          backgroundColor: '#004',
          flex:1
        }}
      >
        <NavBar {...props} width={width} height={height}/>
      </View>
    </>
  )
}


const mapStateToProps = state => {
  const {app} = state;
  return {app}
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Abstract)
