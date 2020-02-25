import { combineReducers} from "redux";
import { HomeReducers as Home} from "../routes/Home/modules/home";
const makeRootReducer = () => {
    return combineReducers({
        Home
    });
}

export default makeRootReducer;