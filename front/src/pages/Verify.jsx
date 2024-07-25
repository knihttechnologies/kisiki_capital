import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useTableContext } from '../context/TableContext';

const Verify = () => {
    const table = useTableContext()
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const emailAccessToken = new URLSearchParams(location.search).get('emailAccessToken');
        const verifyEmail = async () => {
            try {
                const response = await axios.get('/api/user/verifyemail?emailAccessToken=${emailAccessToken}', {
                    params: { emailAccessToken },
                });
                console.log(response.data);
                table?.setTableMsg(`Email verified successfully!`)
                // Redirect the user to a success page or perform other actions
                navigate('/success');
            } catch (error) {
                console.error(`Failed to verify email: ${error}`);
                table?.setTableErr(`Failed to verify email: ${error}`)
                // Redirect the user to an error page or perform other actions
                navigate('/home');
            }
        };

        if (emailAccessToken) {
            setTimeout(() => {
                verifyEmail(); 
            }, 5000);
        } else {
            // console.error('Email verification token not found!');
            table?.setTableErr(`Email verification token not found!`)
            navigate('/home');
        }
    }, [location.search]);

    return (
        <div className="flex flex-col justify-center flex-wrap p-20">
            {/* {updateContext?.tableEmailMsg && <p className="bg-green-500 text-white rounded-md text-sm p-3 mt-4 mb-4">{updateContext?.tableEmailMsg}</p> }
            {updateContext?.tableErrMsg && <p className="bg-green-500 text-white rounded-md text-sm p-3 mt-4 mb-4">{updateContext?.tableErrMsg}</p> }
            {updateContext?.tableMsg && <p className="bg-green-500 text-white rounded-md text-sm p-3 mt-4 mb-4">{updateContext?.tableMsg}</p> } */}
            <h4 className="p-3 bg-warning border border-none text-white font-bold text-sm shadow-xl mt-10 mb-5 w-70 flex flex-wrap rounded-md">{table?.tableMsg || "Email successfully verified"}</h4>
            <p className="p-3 bg-warning border border-none text-black font-bold text-sm shadow-xl mt-5 mb-5 w-70 flex flex-wrap rounded-md">Loading...</p>
        </div>
    )
}

export default Verify