import * as React from 'react';
import {
  View,
  TextInput,
  Text,
  useWindowDimensions, ActivityIndicator, FlatList, Pressable,
} from "react-native";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import {setPmid, setReferer, setPMC, setSearchTerm} from "../state/publicationActions";
import {Actions} from "react-native-router-flux";

function SearchResultsCard(props){
  function getPMCID(idlist) {
    idlist.some(id => {
      if (id.idtype === 'pmc'){
        props.setPMC(id.value);
        return true
      } else {
        props.setPMC(null)
      }
    })
  }
  return(
    <>
      <Pressable
        android_ripple={{borderless: false, color: '#ff0092'}}
        onPress={() => {
          getPMCID(props.summary.articleids)
          props.setPmid(props.pmid)
          props.setReferer('search')
          Actions.abstract()
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          // width: '93%',
          alignSelf: 'center'
        }}
      >
        <Ionicons
          name={'book'}
          size={30}
          color={'#ff0092'}
        />
        <Text
          // numberOfLines={4}
          style={{
            fontFamily: props.app.fonts.bold,
            fontSize: 18,
            color: '#444',
            margin:10,
            flex:1
          }}
        >
          {props.summary ? props.summary.title: 'Search again'}
        </Text>
      </Pressable>
    </>
  )
}

function SearchBar(props){
  function _renderItem(item){
    return(
      <SearchResultsCard
        {...props}
        pmid={item.item}
        summary={props.publicationSummary ? props.publicationSummary[item.item]: null}
      />
    )
  }

  return(
    <>
      <View
        style={{
          top: 20,
          position: 'absolute',
          width: '100%'
        }}
      >
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

          }}
        >
          {
            props.isLoading
              ? <ActivityIndicator color={'#ff0092'}/>
              : null
          }
          <TextInput
            placeholder={'Search here'}
            selectionColor={'#ff0092'}
            onChangeText={(text) => props.setSearchTerm(text)}
            style={{
              fontFamily: props.app.fonts.medium,
              flex: 1,
              marginLeft: 10,
              fontSize: 18
            }}
          />
          <Pressable
            android_ripple={{ borderless: true, color: '#ff0092'}}
            style={{
              padding: 10,
            }}
            onPress={() => props.onSearch(props.publication.searchTerm)}
          >
            <Ionicons
              name={'search'}
              size={25}
              color={'#ff0092'}
            />
          </Pressable>

        </View>
        {
          props.isLoading
          ? null
          : (
              <FlatList
                data={props.publicationIDs}
                renderItem={_renderItem}
                style={{
                  backgroundColor: '#fff',
                  margin: 10,
                  marginTop: 10,
                  borderRadius:20,
                  maxHeight: props.height * 1/1.4
                }}
              />
            )
        }
      </View>
    </>
  )
}
function Search(props) {
  const {width, height} = useWindowDimensions();
  const [loading, setLoading] = React.useState(false);
  const [publicationsIDs, setPublicationIDs] = React.useState([]);
  const [publicationSummary, setPublicationSummary] = React.useState({});

  function getPublications(term){
    setLoading(true);
    let params =
      {
        db: "pubmed",
        term: `${term}`,
        retmode: "json",
        rettype: "json",
        retmax: 20,
        usehistory: "y"
      }
    let endPoint =
      `https://eutils.ncbi.nlm.nih.gov/
			entrez/eutils/esearch.fcgi?
			db=${params.db}&term=${term}&retmode=${params.retmode}
			&rettype=${params.rettype}&usehistory=y&retmax=${params.retmax}`


    return fetch(endPoint)
      .then((response) => response.json())
      .then(handle => {
        setPublicationIDs(handle.esearchresult.idlist)
        // console.log(handle.esearchresult.idlist)
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
        <SearchBar
          {...props}
          width={width}
          height={height}
          onSearch={getPublications}
          isLoading={loading}
          publicationIDs={publicationsIDs}
          publicationSummary={publicationSummary}
        />

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
    setPmid,
    setReferer,
    setPMC,
    setSearchTerm,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Search)

