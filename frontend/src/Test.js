import { useDispatch } from "react-redux"
import { loginThunk } from "./store/session";

function Test() {

    const dispatch = useDispatch();

    const demoUser = {
        "credential": "demo@aa.io",
        "password": "password"
    }

    const testLogin = () => {
        // dispatch(loginThunk(demoUser))
        dispatch(loginThunk("demo@aa.io", "password"))
    }


    return (
        <div id='test' onClick={testLogin}>
            test
        </div>
    )
}


export default Test
