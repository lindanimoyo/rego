import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text, Pressable, useWindowDimensions, ScrollView, FlatList
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
  const [loading, setLoading] = React.useState(false);
  const [publicationAbstract, setPublicationAbstract] = React.useState('');
  function getAbstract() {
    console.log(props.publication.pmid)
    let params =
      {
        db: "pubmed",
        idlist: props.publication.pmid,
        retmode: "json",
        rettype: "json",
        webenv: props.publication.referer === 'home' ?
          props.publication.webenv : props.publication.searchWebenv,
        querykey: props.publication.referer === 'home' ?
          props.publication.querykey : props.publication.searchQuerykey
      }
    let endpoint =
      `https://eutils.ncbi.nlm.nih.gov/
			entrez/eutils/efetch.fcgi?
			db=${params.db}&id=${params.idlist}&retmode=${params.retmode}
			&rettype=${params.rettype}$WebEnv=${params.webenv}`

    return fetch(endpoint)
      .then((response) => response.text())
      .then(handle => {
        console.log(handle)
        setPublicationAbstract(handle);
        setLoading(false)
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  React.useEffect(() => {
    getAbstract()
  }, [])

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

  return(
    <>
      <View
        style={{
          backgroundColor: '#004',
          flex:1
        }}
      >
        {
          showNav
          ? <NavBar {...props} width={width} height={height}/>
          : null
        }
        <FlatList
          data={[1]}
          onScroll={_handleScroll}
          style={{
            backgroundColor: '#555',
            margin: 4,
            marginBottom: showNav ? 40: 5,
            borderRadius: 20,
            elevation: 10,
          }}
          renderItem={() => (
            <Text
              style={{
                color: '#fff',
                fontFamily: props.app.fonts.bold,
                margin: 15,
                fontSize: 17,
              }}
            >
              {publicationAbstract}
            </Text>
          )}
        >
        </FlatList>
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

export default connect(mapStateToProps, mapDispatchToProps)(Abstract)
