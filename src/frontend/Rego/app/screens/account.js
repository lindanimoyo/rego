import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text, Image, FlatList, useWindowDimensions
} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {PubCard} from "./publications";
import Loading from "../components/loading";
import {setFavourite, setPmid, setPMC, setReferer} from "../state/publicationActions";

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
  const [publicationSummary, setPublicationSummary] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  function getTitles(ids) {
    setLoading(true)
    let params =
      {
        db: "pubmed",
        retmode: "json",
        rettype: "json",
        retmax: ids.length,
        usehistory: "y"
      }
    let endpoint =
      `https://eutils.ncbi.nlm.nih.gov/
			entrez/eutils/esummary.fcgi?
			db=${params.db}&id=${ids.join(' ')}&retmode=${params.retmode}
			&rettype=${params.rettype}&usehistory=y&retmax=${params.retmax}`

    return fetch(endpoint)
      .then((response) => response.json())
      .then(handle => {
        setPublicationSummary(handle.result);
        setLoading(false)
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  React.useEffect(() => {
    getTitles(props.publication.favourites)
  }, [])

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
        <PubCard
          {...props}
          width={width}
          height={height}
          pmid={item.item}
          summary={publicationSummary ? publicationSummary[item.item]: null}
        />
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
              color: '#ff0092',
              margin: 20,

              textAlign: 'center'
            }}
          >
            What you like
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

  const _listEmptyComponent = () => {
    return(
      <>
        <Text
          style={{
            color: '#888',
            alignSelf: 'center',
            textAlign: 'center',
            fontFamily: props.app.fonts.medium,
            fontSize: 20,
            flex: 1,
            marginTop: 100,
            margin: 40
          }}
        >
          Your favourite publications will appear here
        </Text>
      </>
    )
  }

  return(
    <>
      <View
        style={{
          backgroundColor: '#fff',
          flex:1,
        }}
      >
        {
          loading
          ? <Loading {...props} waitText={'ReGO'}/>
          : (
              <FlatList
                data={props.publication.favourites}
                extraData={props.publication.favourites}
                renderItem={_renderItem}
                ListHeaderComponent={_headerComponent}
                ListFooterComponent={_footerComponent}
                ListEmptyComponent={_listEmptyComponent}
                onScroll={_handleScroll}
                refreshing={loading}
                onRefresh={() => getTitles(props.publication.favourites)}
              />
            )
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
    setFavourite,
    setPmid,
    setPMC,
    setReferer
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Account)
