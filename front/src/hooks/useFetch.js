import { useEffect} from "react";
import { makeRequest } from "../api/makeRequest";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

export const useFetch = (url) => {
  const {dataFetched, setDataFetched, loadingFetched, setLoadingfetched, fetchedError, setFetchedError} = useAuthContext()

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoadingfetched(true);
      try {
        await axios.post('/api/users/createrolesmanually', {timeout: 10000})
          .then(res => {
            if (isMounted) {
              setDataFetched(res.data);
              setFetchedError(null);
            }
          })
          .catch(err => {
            setFetchedError(err)
          })
      } catch (error) {
        if (axios.isCancel(error)) {
          setFetchedError('Request timed out');
        } else {
          setFetchedError(error.message);
          console.log(error)
        }
      } finally {
        if (isMounted) {
          setLoadingfetched(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);
  if(!dataFetched || dataFetched === null) return "no teams have been registred"

  return { dataFetched, loadingFetched, fetchedError };
};

export const userFetch = (url) => {
  const  {setUsersLoading, setUser, setErrMsg, usersLoading, user, errMsg} = useAuthContext()

  useEffect(() => {
    let isUserMounted = true;
    const fetchData = async () => {
      setUsersLoading(true);
      try {
        await axios.get(url, {timeout: 10000})
          .then(res => {
            if (isUserMounted) {
                setUser(res.data);
                setErrMsg(null);
            }
          })
          .catch(err => {
            setErrMsg(err)
          })
      } catch (error) {
        if (axios.isCancel(error)) {
          setErrMsg('Request timed out');
        } else {
          setErrMsg(error?.message);
          console?.log(error)
        }
      } finally {
        if (isUserMounted) {
          setUsersLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isUserMounted = false;
    };
  }, [url]);

  return {user, usersLoading, errMsg};
};

export const userOrderFetch = (url) => {
  const  {setUserOrderLoading, setUserOrder, setOrderErrMsg, userOrderLoading, userOrder, orderErrMsg} = useAuthContext()

  useEffect(() => {
    let isUserMounted = true;
    const fetchData = async () => {
      setUserOrderLoading(true);
      try {
        await axios.get(url, {timeout: 10000})
          .then(res => {
            if (isUserMounted) {
                setUserOrder(res.data);
                setOrderErrMsg(null);
            }
          })
          .catch(err => {
            setOrderErrMsg(err)
          })
      } catch (error) {
        if (axios.isCancel(error)) {
          setOrderErrMsg('Request timed out');
        } else {
          setOrderErrMsg(error.message);
          console.log(error)
        }
      } finally {
        if (isUserMounted) {
          setUserOrderLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isUserMounted = false;
    };
  }, [url]);

  return {userOrder, userOrderLoading, orderErrMsg};
};

export const userPaymentFetch = (url) => {
  const  {setUserPaymentLoading, setUserPayment, setPaymentErrMsg, userPaymentLoading, userPayment, paymentErrMsg} = useAuthContext()

  useEffect(() => {
    let isUserMounted = true;
    const fetchData = async () => {
      setUserOrderLoading(true);
      try {
        await axios.get(url, {timeout: 10000})
          .then(res => {
            if (isUserMounted) {
                setUserPayment(res.data);
                setPaymentErrMsg(null);
            }
          })
          .catch(err => {
            setPaymentErrMsg(err)
          })
      } catch (error) {
        if (axios.isCancel(error)) {
          setPaymentErrMsg('Request timed out');
        } else {
          setPaymentErrMsg(error.message);
          console.log(error)
        }
      } finally {
        if (isUserMounted) {
          setUserPaymentLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isUserMounted = false;
    };
  }, [url]);

  return {userPayment, userPaymentLoading, paymentErrMsg};
};

export const userChatFetch = (url) => {
  const  {setUserChatLoading, setUserChat, setChatErrMsg, userChatLoading, userChat, ChatErrMsg} = useAuthContext()

  useEffect(() => {
    let isUserMounted = true;
    const fetchData = async () => {
      setUserOrderLoading(true);
      try {
        await makeRequest.get(url, {timeout: 10000})
          .then(res => {
            if (isUserMounted) {
                setUserChat(res.data);
                setChatErrMsg(null);
            }
          })
          .catch(err => {
            setChatErrMsg(err)
          })
      } catch (error) {
        if (axios.isCancel(error)) {
          setChatErrMsg('Request timed out');
        } else {
          setChatErrMsg(error.message);
          console.log(error)
        }
      } finally {
        if (isUserMounted) {
          setUserChatLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isUserMounted = false;
    };
  }, [url]);

  return {userPayment, userPaymentLoading, paymentErrMsg};
};

export const rulesFetch = (url) => {
  const {setLoading, setRules, setMsg, setErrMsg, loading, rules, msg, errMsg} = useAuthContext()

  useEffect(() => {
    let isRulesMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        // const response = await makeRequest.get(url, { timeout: 5000 });
        // if (isMounted) {
        //   setDataFetched(response.data);
        //   setfetchedError(null);
        // }
        await axios.get(url, {timeout: 10000})
          .then(res => {
            console.log(res)
            if (isRulesMounted) {
                setRules(res.data);
                setMsg('The rules')
                setErrMsg(null);
            }
          })
          .catch(err => {
            setErrMsg(err.response.data.message)
          })
      } catch (error) {
        if (axios.isCancel(error)) {
          setErrMsg('Request timed out');
        } else {
          setErrMsg('There is no record');
          console.log(error)
        }
      } finally {
        if (isRulesMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isRulesMounted = false;
    };
  }, [url]);

  return { rules, msg, errMsg, loading };
};

export const ordersFetch = (url) => {
  const {setOrdersLoading, setOrders, setMsg, setErrMsg, ordersLoading, orders, msg, errMsg} = useAuthContext()

  useEffect(() => {
    let isOrdersMounted = true;
    const fetchData = async () => {
      setOrdersLoading(true);
      try {
        await axios.get(url, {timeout: 10000})
          .then(res => {
            //for debugging purpose
            //console.log(res)
            if(!res || res === undefined || res === null) return setErrMsg('No records')
            if (isOrdersMounted) {
                setOrders(res.data);
                setMsg('The orders')
                setErrMsg(null);
                return
            }
          })
          .catch(err => {
            setErrMsg(err.response.data.message)
            return
          })
      } catch (error) {
        if (axios.isCancel(error)) {
          setErrMsg('Request timed out');
          return
        } else {
          setErrMsg('There is no record');
          return
        }
      } finally {
        if (isOrdersMounted) {
          setOrdersLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isOrdersMounted = false;
    };
  }, [url]);

  return { orders, msg, errMsg, ordersLoading };
};

export const paymentsFetch = (url) => {
  const {setPaymentsLoading, setPayments, setPaymentMsg, setErrPaymentsMsg, paymentsLoading, payments, errPaymentsMsg} = useAuthContext()

  useEffect(() => {
    let isOrdersMounted = true;
    const fetchData = async () => {
      setPaymentsLoading(true);
      try {
        await axios.get(url, {timeout: 10000})
          .then(res => {
            //for debugging purpose
            //console.log(res)
            if(!res || res === undefined || res === null) return setErrMsg('No records')
            if (isOrdersMounted) {
                setPayments(res.data);
                setPaymentMsg('The orders')
                setErrPaymentsMsg(null);
                return
            }
          })
          .catch(err => {
            setErrPaymentsMsg(err.response.data.message)
            return
          })
      } catch (error) {
        if (axios.isCancel(error)) {
          setErrPaymentsMsg('Request timed out');
          return
        } else {
          setErrPaymentsMsg('There is no record');
          return
        }
      } finally {
        if (isOrdersMounted) {
          setPaymentsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isOrdersMounted = false;
    };
  }, [url]);

  return { payments, errPaymentsMsg, paymentsLoading };
};
