import {combineReducers} from "redux";
import {appReducer} from "./appReducer";
import {publicationReducer} from "./publicationReducer";

export default combineReducers({
  app: appReducer,
  publication: publicationReducer,
});
