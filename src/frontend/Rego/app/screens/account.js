import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text, Image, FlatList, useWindowDimensions
} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {PubCard} from "./publications";

function Profile(props){
  return(
    <>
      <View
        style={{
          alignItems: 'center',
          marginTop: 50,
          margin: 30,
          // borderBottomWidth: 2,
          borderBottomColor: '#888'

        }}
      >
        <Image
          source={{}}
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
            backgroundColor: '#0ff'
          }}
        />
        <Text
          style={{
            fontFamily: props.app.fonts.bold,
            fontSize: 35,
            color: '#0ff',
            margin: 10,
            marginBottom: 20
          }}
        >
          Wilson Mudaki
        </Text>
      </View>
    </>
  )
}
function Account(props) {
  const {width, height} = useWindowDimensions();
  const [showProfile, setShowProfile] = React.useState(true)
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
        setShowProfile(false)
      } else {
        setCounter(0)
        setShowProfile(true)
      }
    } else {
      if (counter > 5){
        setCounter(0)
      }else {
        setCounter(counter+1)
      }
    }
  }

  function _renderItem(item){
    return(
      <>
        <PubCard {...props} width={width} height={height}/>
      </>
    )
  }
  function _headerComponent(){
    return(
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: "center",
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              fontFamily: props.app.fonts.bold,
              fontSize: 25,
              color: '#fff',
              margin: 20,

              textAlign: 'center'
            }}
          >
            Your favourites
          </Text>
        </View>
      </>
    )
  }
  function _footerComponent(){
    return(
      <>
        <View style={{ margin: height * 0.1}}/>
      </>
    )
  }

  return(
    <>
      <View
        style={{
          backgroundColor: '#004',
          flex:1
        }}
      >
        {
          showProfile
            ? <Profile {...props}/>
            : null
        }
        <FlatList
          data={[1,2,3,4,5,6]}
          renderItem={_renderItem}
          ListHeaderComponent={_headerComponent}
          ListFooterComponent={_footerComponent}
          onScroll={_handleScroll}
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

export default connect(mapStateToProps, mapDispatchToProps)(Account)
