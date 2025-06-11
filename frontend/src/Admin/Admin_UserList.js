import {useSelector} from "react-redux";

export default function Admin_UserList() {
    const users = useSelector(state => state.main.users);

    return (
        <>

        </>
    );
}