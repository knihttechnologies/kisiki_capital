import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '@/hooks/useRefreshToken';
import { useAuthContext } from "../context/AuthContext";
import Loader from '../common/Loader'

const PersistLogin = () => {
    const refresh = useRefreshToken();
    const auth = useAuthContext();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                auth.setLoading(true)
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && auth.setLoading(false);
            }
        }

        // persist added here AFTER tutorial video
        // Avoids unwanted call to verifyRefreshToken
        !auth.token && auth.persist ? verifyRefreshToken() : auth.setLoading(false);

        return () => isMounted = false;
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${auth.loading}`)
        console.log(`aT: ${JSON.stringify(auth.token)}`)
    }, [auth.loading])

    return (
        <>
            {!auth.persist
                ? <Outlet />
                : auth.loading
                    ? <Loader />
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin