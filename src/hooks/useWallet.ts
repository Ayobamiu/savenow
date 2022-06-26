/** @format */

import { useContext, useState } from "react";
import axios from "axios";
import { urlInUse } from "../server/server";
import storage from "../secure/storage";
import {
  BankRecord,
  Store,
  Transaction,
} from "../interfaces";
import BankContext from "../contexts/bankContext";


const useWallet = () => {
  let mounted = true;
  const { myBanks, setMyBanks } = useContext(BankContext);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [loadingWalletStatus, setLoadingWalletStatus] = useState("pending");
  const [loadingWalletError, setLoadingWalletError] = useState("");

  const [loadingMyBanks, setLoadingMyBanks] = useState(false);
  const [loadingMyBanksStatus, setLoadingMyBanksStatus] = useState("pending");
  const [loadingMyBanksError, setLoadingMyBanksError] = useState("");

  const [serviceFee, setServiceFee] = useState<number | null>(null);
  const [calculatingFee, setCalculatingFee] = useState(false);
  const [calculatingFeeStatus, setCalculatingFeeStatus] = useState("pending");
  const [calculatingFeeError, setCalculatingFeeError] = useState("");

  const [transaction, setTransaction] = useState<Transaction | null>();
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawingStatus, setWithdrawingStatus] = useState("pending");
  const [withdrawingError, setWithdrawingError] = useState("");
  const [withdrawingSuccess, setWithdrawingSuccess] = useState("");

  const [addingBank, setAddingBank] = useState(false);
  const [addingBankStatus, setAddingBankStatus] = useState("pending");
  const [addingBankError, setAddingBankError] = useState("");


  const getTransactionFee = async (amount: number) => {
    try {
      if (mounted) {
        setCalculatingFee(true);
        setCalculatingFeeStatus("pending");
        setCalculatingFeeError("");
        setServiceFee(null);
      }

      const res = await axios.post<{ serviceFee: number }>(
        `${urlInUse}withdraw/calculate-fee`,
        { amount }
      );
      if (mounted) {
        setServiceFee(res.data.serviceFee);
        //actions
        setCalculatingFee(false);
        setCalculatingFeeStatus("success");
        setCalculatingFeeError("");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && mounted) {
        setServiceFee(null);
        setCalculatingFee(false);
        setCalculatingFeeStatus("failed");
        setCalculatingFeeError(error?.response?.data?.message);
      }
    }
  };
  const loadMyBanks = async () => {
    const t = await storage.getToken();
    try {
      if (mounted) {
        setLoadingMyBanks(true);
        setLoadingMyBanksStatus("pending");
        setLoadingMyBanksError("");
      }
      //actions
      const res = await axios.get<BankRecord[] | []>(`${urlInUse}auth/banks`, {
        headers: {
          Authorization: "Bearer " + t,
        },
      });
      setMyBanks(res.data);

      if (mounted) {
        setLoadingMyBanks(false);
        setLoadingMyBanksStatus("success");
        setLoadingMyBanksError("");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && mounted) {
        setLoadingMyBanks(false);
        setLoadingMyBanksStatus("failed");
        setLoadingMyBanksError(error?.response?.data?.message);
      }
    }
  };
  const withdrawFromStore = async (data) => {
    const t = await storage.getToken();
    try {
      if (mounted) {
        setWithdrawing(true);
        setWithdrawingStatus("pending");
        setWithdrawingSuccess("");
        setWithdrawingError("");
        setTransaction(null);
      }
      const res = await axios.post<{
        store: Store;
        transaction: Transaction;
        message: string;
      }>(`${urlInUse}withdraw`, data, {
        headers: {
          Authorization: "Bearer " + t,
        },
      });

      if (mounted) {

      }

      //actions
      if (mounted) {
        setWithdrawing(false);
        setWithdrawingStatus("success");
        setWithdrawingSuccess(res.data.message);
        setWithdrawingError("");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && mounted) {
        setTransaction(null);
        setWithdrawing(false);
        setWithdrawingStatus("failed");
        setWithdrawingError(error?.response?.data?.message);
      }
    }
  };
  const addBankRecord = async (data) => {
    const t = await storage.getToken();
    try {
      if (mounted) {
        setAddingBank(true);
        setAddingBankStatus("pending");
        setAddingBankError("");
        setTransaction(null);
      }
      //actions
      const res = await axios.post<BankRecord>(
        `${urlInUse}auth/add-bank`,
        data,
        {
          headers: {
            Authorization: "Bearer " + t,
          },
        }
      );
      setMyBanks([res.data, ...myBanks]);

      if (mounted) {
        setAddingBank(false);
        setAddingBankStatus("success");
        setAddingBankError("");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && mounted) {
        setTransaction(null);
        setAddingBank(false);
        setAddingBankStatus("failed");
        setAddingBankError(error?.response?.data?.message);
      }
    }
  };

  return {
    loadingWallet,
    loadingWalletStatus,
    loadingWalletError,

    myBanks,
    loadingMyBanks,
    loadingMyBanksStatus,
    loadingMyBanksError,
    loadMyBanks,

    transaction,
    withdrawing,
    withdrawingStatus,
    withdrawingError,
    withdrawingSuccess,
    withdrawFromStore,

    addingBank,
    addingBankStatus,
    addingBankError,
    addBankRecord,

    serviceFee,
    calculatingFee,
    calculatingFeeStatus,
    calculatingFeeError,
    getTransactionFee,
  };
};
export default useWallet;
