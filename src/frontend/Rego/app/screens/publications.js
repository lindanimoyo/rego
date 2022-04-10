import * as React from 'react';
import {
  View,
  Pressable,
  Text,
  FlatList,
  StatusBar,
  useWindowDimensions
} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import Loading from "../components/loading";
import {Actions} from "react-native-router-flux";
import {setPmid, setWebenv, setQuerykey, setReferer} from "../state/publicationActions";

function PubCard(props){
  function _formatNames(authors){
    let nameList = []
    authors.map(name => {
      nameList.push(name.name)
    })
    return nameList.join(', ')
  }
  return(
    <>
      <Pressable
        style={{
          minHeight: props.height * 1/2,
          backgroundColor: '#fff',
          margin: 5,
          marginTop: 15,
          // marginBottom: 0,
          borderRadius: 20,
          padding: 10,
          borderStyle: 'solid',
          elevation: 10,
          justifyContent: 'space-evenly',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Ionicons name={'book-outline'} size={35} color={'#f00'} style={{ flex: 0.15, margin: 10}}/>
          <Text
            // numberOfLines={5}
            style={{
              fontFamily: props.app.fonts.bold,
              fontSize: 20,
              color: props.app.colors.text,
              flex: 1,
              marginTop: 10,
            }}
          >
            {props.summary ? props.summary.title : "Publication Title"}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Text
            numberOfLines={3}
            style={{
              fontFamily: props.app.fonts.light,
              fontSize: 17,
              color: '#888',
              marginTop: 20,
              // textAlign: 'right',
              flex: 1
            }}
          >
            {props.summary ? _formatNames(props.summary.authors): 'Publication authors'}
          </Text>
          <Ionicons name={'people'} size={35} color={'#f00'} style={{ flex: 0.15, margin: 10}}/>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              minHeight: 50,
              height: props.height * 0.08,
              backgroundColor: '#fff',
              width: '30%',
              justifyContent: 'center',
              // alignSelf: 'flex-end',
              alignItems: 'center',
              padding: 0,
              borderRadius: props.height * 0.1,
              marginTop: 30,
              marginBottom: 10,
              margin: 10,
              borderWidth: 2,
              borderColor: '#ff0092'
              // elevation: 10,
            }}
          >
            <Pressable
              android_ripple={{borderless: true, color: '#ff0092'}}
              style={{
                //
              }}
            >
              <Ionicons
                name={'heart'}
                size={40}
                color={'#ff0092'}
              />
            </Pressable>
          </View>
          <View
            style={{
              minHeight: 50,
              height: props.height * 0.08,
              backgroundColor: '#5f5',
              width: '50%',
              elevation: 5,
              justifyContent: 'center',
              alignSelf: 'flex-end',
              padding: 0,
              borderRadius: props.height * 0.1,
              marginTop: 30,
              marginBottom: 10,
              margin: 10,
            }}
          >
            <Pressable
              android_ripple={{borderless: true}}
              onPress={() => {
                props.setPmid(props.pmid)
                props.setReferer('home')
                Actions.abstract()
              }}
              style={{
                //
              }}
            >
              <Text
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontFamily: props.app.fonts.bold,
                  fontSize: 20,
                  color: '#000'
                }}>
                Abstract
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </>
  )
}

function Publications(props) {
  const {width, height} = useWindowDimensions();
  StatusBar.setBackgroundColor('#004')
  const [publicationsIDs, setPublicationIDs] = React.useState([]);
  const [publicationSummary, setPublicationSummary] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  function getPublications(){
    setLoading(true);
    let params =
      {
        db: "pubmed",
        term: '(human) AND ("journal article"[Publication Type])',
        retmode: "json",
        rettype: "json",
        retmax: 20,
        usehistory: "y"
      }
    let endPoint =
      `https://eutils.ncbi.nlm.nih.gov/
			entrez/eutils/esearch.fcgi?
			db=${params.db}&term=${params.term}&retmode=${params.retmode}
			&rettype=${params.rettype}&usehistory=y`


    return fetch(endPoint)
      .then((response) => response.json())
      .then(handle => {
        setPublicationIDs(handle.esearchresult.idlist)
        props.setWebenv(handle.esearchresult.webenv, 'home')
        props.setQuerykey(handle.esearchresult.querykey, 'home')
        getTitles(handle.esearchresult.webenv, handle.esearchresult.querykey)
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  function getTitles(webenv, queryKey) {
    let params =
      {
        db: "pubmed",
        term: "human",
        retmode: "json",
        rettype: "json",
        retmax: 20,
        usehistory: "y"
      }
    let endpoint =
      `https://eutils.ncbi.nlm.nih.gov/
			entrez/eutils/esummary.fcgi?
			db=${params.db}&WebEnv=${webenv}&query_key=${queryKey}&retmode=${params.retmode}
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
    getPublications();
  }, [])

  function _renderItem(item){
    return(
      <>
        <PubCard
          {...props}
          width={width}
          height={height}
          pmid={item.item}
          summary={publicationSummary[item.item]}
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
              color: '#fff',
              margin: 20,
              marginBottom: 50,
              marginTop: 50,
              textAlign: 'center'
            }}
          >
            Editor's choice
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
          loading
            ? <Loading {...props} waitText={'ReGo'}/>
            : <FlatList
              data={publicationsIDs}
              renderItem={_renderItem}
              ListHeaderComponent={_headerComponent}
              ListFooterComponent={_footerComponent}
            />
        }
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
    setPmid,
    setWebenv,
    setQuerykey,
    setReferer
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Publications)
export {PubCard}
