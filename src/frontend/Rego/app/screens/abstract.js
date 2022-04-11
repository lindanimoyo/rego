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
import Loading from "../components/loading";
import WebView from "react-native-webview";

function NavBar(props){
  return(
    <>
      <View
        style={{
          backgroundColor: '#fff',
          minHeight: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 0,
          borderRadius: props.height*0.1,
          position: 'absolute',
          top: 7,
          width: '91%',
          alignSelf: 'center',
          elevation: 10,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
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
              fontSize: 20,
              color: '#ff0092'
            }}
          >
            {props.title ? props.title: 'Abstract'}
          </Text>
        </View>
        <Pressable
          onPress={() => Actions.pop()}
          android_ripple={{borderless: true, color: '#ff0092'}}
          style={{
            margin: 15
          }}
        >
          <Ionicons
            name={'heart-outline'}
            size={35}
            color={'#ff0092'}
          />
        </Pressable>
      </View>
    </>
  )
}

function Abstract(props) {
  const {width, height} = useWindowDimensions();
  const [loading, setLoading] = React.useState(false);
  const [publicationAbstract, setPublicationAbstract] = React.useState('');
  function getAbstract() {
    setLoading(true);
    // console.log(props.publication.pmid)
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
        // console.log(handle)
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

  function fetchPMC(id){
    let endpoint =
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pmc&id=${id}&retmode=json&rettype=json`

    return fetch(endpoint)
      .then((response) => response.text())
      .then(handle => {
        console.log('pmc', handle)
        // setPublicationAbstract(handle);
        // setLoading(false)
      })
      .catch(err => {
        console.log('err', err)
      })
  }

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

  function _listFooterComponent(){
    return(
      <>
        <View style={{
          minHeight: 60,
          backgroundColor: '#ff0092',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 0,
          elevation: 10,
          margin: 0,

        }}>
          <Pressable
            android_ripple={{ borderless: true, color: '#ff0'}}
            onPress={() => {
              // fetchPMC(props.publication.pmc)
              Actions.fullPublication()
            }}
            style={{
              width: '100%'
            }}
          >
            <Text
              style={{
                alignSelf: 'center',
                color: '#fff',
                fontSize: 20,
                fontFamily: props.app.fonts.bold
              }}
            >
              Read full publication...
            </Text>
          </Pressable>
        </View>
      </>
    )
  }

  function _renderItem(item){
    return(
      <>
        <Text
          style={{
            color: '#000',
            fontFamily: props.app.fonts.bold,
            margin: 15,
            fontSize: 17,
          }}
        >
          {publicationAbstract}
        </Text>
      </>
    )
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
          source={{uri: `https://pubmed.ncbi.nlm.nih.gov/${props.publication.pmid}/`}}
          renderLoading={loadingIndicator}
          startInLoadingState={true}
          style={{ backgroundColor: '#fff'}}
          onScroll={_handleScroll}
        />
        {
          showNav
            ? <NavBar {...props} width={width} height={height}/>
            : null
        }
        {
          props.publication.pmc
          ? showNav
              ? _listFooterComponent()
              : null
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

export default connect(mapStateToProps, mapDispatchToProps)(Abstract)
export {NavBar}
