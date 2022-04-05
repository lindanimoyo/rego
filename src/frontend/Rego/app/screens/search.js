import * as React from 'react';
import {
  View,
  TextInput,
  Text,
  useWindowDimensions,
} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

function SearchBar(props){
  return(
    <>
      <View
        style={{
          flexDirection: 'row',
          minHeight: 50,
          height: props.height * 0.1,
          backgroundColor: '#fff',
          alignItems: 'center',
          padding: 10,
          alignSelf: 'center',
          width: '90%',
          borderRadius: props.height * 0.1,
          top: 20,
          position: 'absolute',

        }}
      >
        <Ionicons
          name={'search'}
          size={25}
          color={'#ff0092'}
        />
        <TextInput
          placeholder={'Search here'}
          selectionColor={'#ff0092'}
          style={{
            fontFamily: props.app.fonts.medium,
            flex: 1,
            marginLeft: 10,
            fontSize: 18
          }}
        />
      </View>
    </>
  )
}
function Search(props) {
  const {width, height} = useWindowDimensions();
  function _searchText(){
    return(
      <>
        <Text
          style={{
            fontFamily: props.app.fonts.bold,
            fontSize: 25,
            color: '#00f',
            textAlign: 'center',
            margin: 20
          }}
        >
          Discover over 32 million publications from pubmed
        </Text>
      </>
    )
  }
  return(
    <>
      <View
        style={{
          backgroundColor: '#004',
          flex:1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {_searchText()}
        <SearchBar {...props} width={width} height={height} />

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

export default connect(mapStateToProps, mapDispatchToProps)(Search)

