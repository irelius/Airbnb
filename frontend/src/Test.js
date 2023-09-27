import { useDispatch } from "react-redux"
import { loginThunk } from "./store/session";

function Test() {

    const dispatch = useDispatch();

    const testLogin = () => {
        dispatch(loginThunk("demo@aa.io", "password"))
    }


    return (
        <div id='test' onClick={testLogin}>
            test
        </div>
    )
}


export default Test
