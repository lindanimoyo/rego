import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import WebView from "react-native-webview";

function FullPublication(props) {
  return(
    <>
      <View
        style={{
          backgroundColor: '#fff',
          flex:1
        }}
      >
        <WebView
          source={{ uri: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8955010/'}}
          style={{
            backgroundColor: '#004'
          }}
        />

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

export default connect(mapStateToProps, mapDispatchToProps)(FullPublication)

