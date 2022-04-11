import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text, useWindowDimensions
} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import WebView from "react-native-webview";
import Loading from "../components/loading";
import {NavBar} from "./abstract";

function FullPublication(props) {
  const {width, height} = useWindowDimensions();
  const [showNav, setShowNav] = React.useState(true)
  const [previousPos, setPreviousPos] = React.useState(0)
  const [counter, setCounter] = React.useState(0)

  const _handleScroll = (event) => {
    // console.log('event',counter, event.nativeEvent.contentOffset.y)
    if (counter === 0){
      setPreviousPos(event.nativeEvent.contentOffset.y)
      setCounter(counter+1)
    } else if (counter === 5){
      if (previousPos < event.nativeEvent.contentOffset.y){
        setCounter(0)
        setShowNav(false)
      } else {
        setCounter(0)
        setShowNav(true)
      }
    } else {
      if (counter > 5){
        setCounter(0)
      }else {
        setCounter(counter+1)
      }
    }
  }

  const loadingIndicator = () => {
    return(
      <>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            alignSelf: 'center'
          }}
        >
          <Loading {...props} waitText={'ReGo'}/>
        </View>
      </>
    )
  }
  return(
    <>
      <View
        style={{
          backgroundColor: '#fff',
          flex:1
        }}
      >
        <WebView
          source={{ uri: `https://www.ncbi.nlm.nih.gov/pmc/articles/${props.publication.pmc}/`}}
          style={{
            backgroundColor: '#fff'
          }}
          startInLoadingState={true}
          renderLoading={loadingIndicator}
          onScroll={_handleScroll}
        />
        {
          showNav
          ? <NavBar {...props} height={height} width={width} title={'Full Publication'} />
          : null
        }

      </View>
    </>
  )
}


const mapStateToProps = state => {
  const {app, publication} = state;
  return {app, publication}
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(FullPublication)

