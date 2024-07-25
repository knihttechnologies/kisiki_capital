import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { makeRequest } from "../api/makeRequest";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
const TableContext = createContext({});

export const TableProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [openTableTab, setOpenTableTab] = useState(1);
    const [tableLoading, setTableLoading] = useState(false);
    const [tableModal, setTableModal] = useState(true);
    const [tableErr, setTableErr] = useState("");
    const [tableEmailErr, setTableEmailErr] = useState("");
    const [tableMsg, setTableMsg] = useState("");
    const [tableEmailMsg, setTableEmailMsg] = useState("");
    const [clickedColor, setClickedColor] = useState(0);
    const [checkout, setCheckout] = useState({});
    const [tradingCurrency, setTradingCurrency] = useState("USD");
    const [cardPrice, setCardPrice] = useState(10000);
    const [order, setOrder] = useState({
        pkgtitle: "",
        pkgprice: 0,
        acctbal: 0,
        useremail: "",
        userpass: "",
    });
    const [email, setEmail] = useState(null)

    return (
        <TableContext.Provider 
            value={{
                tableModal, setTableModal,
                tableLoading, setTableLoading,
                tableErr, setTableErr,
                tableMsg, setTableMsg,
                tableEmailErr, setTableEmailErr,
                tableEmailMsg, setTableEmailMsg,
                order, setOrder,
                checkout, setCheckout,
                openTableTab, setOpenTableTab,
                cardPrice, setCardPrice,
                clickedColor, setClickedColor,
                tradingCurrency, setTradingCurrency,
                email, setEmail
            }}>
            {children}
        </TableContext.Provider>
    )
}
export const useTableContext = () => {return useContext(TableContext)}
export default TableContext;
// import React from 'react';

// const TableContext = React.createContext();

// export default TableContext;