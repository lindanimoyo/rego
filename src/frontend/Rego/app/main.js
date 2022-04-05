import * as React from 'react';
import {LogBox} from "react-native";
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./state/index"
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import Publications from "./screens/publications";
import Account from "./screens/account";
import Search from "./screens/search";
import Login from "./screens/Login";
import Signup from "./screens/signup";
import {Router, Scene, Lightbox, Tabs} from "react-native-router-flux";
import CustomTabBar from "./components/tab";

LogBox.ignoreLogs([
  "[react-native-gesture-handler]",
  "Deprecation in 'createStackNavigator':",
  "Deprecation in 'navigationOptions':"
])
function App(){
  const store = createStore(rootReducer);
  const client = new ApolloClient({
    link: "https://rego.org/graphql",
    cache: new InMemoryCache()
  })
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <Lightbox>
              <Scene key={'root'}>
                <Tabs
                  key={'tabBar'}
                  tabBarComponent={CustomTabBar}
                  hideNavBar
                  lazy
                >
                  <Scene
                    component={Publications}
                    key={'publications'}
                    hideNavBar
                  />
                  <Scene
                    component={Search}
                    key={'search'}
                    hideNavBar
                  />
                  <Scene
                    component={Account}
                    key={'account'}
                    hideNavBar
                  />
                </Tabs>
                <Scene
                  component={Login}
                  key={'login'}
                  hideNavBar
                />
                <Scene
                  component={Signup}
                  key={'signup'}
                  hideNavBar
                />
              </Scene>
            </Lightbox>
          </Router>
        </Provider>
      </ApolloProvider>
    </>
  )
}

export default App;
