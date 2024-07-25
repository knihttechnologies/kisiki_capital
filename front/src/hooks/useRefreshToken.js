import axios from 'axios';
import { useAuthContext } from '../context/AuthContext';

const useRefreshToken = () => {
    const auth = useAuthContext()

    const refresh = async () => {
        const response = await axios.get('/api/auth/refresh', {
            withCredentials: true
        })
        //localStorage.setItem("person", JSON.stringify(response?.data?.accessToken));
        auth.setToken(response.data.accessToken)
        return response.data.accessToken;
    }
    return refresh
};

export default useRefreshToken;
