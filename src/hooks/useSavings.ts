/** @format */

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { urlInUse } from "../server/server";
import storage from "../secure/storage";
import {
  BankRecord,
  NewSavings,
  Savings,
} from "../interfaces";
import SavingContext from "../contexts/savingsContext";
import { Alert } from "react-native";


const useSavings = () => {
  let mounted = true;
  const {  mySavingsPlans, setMySavingsPlans } = useContext(SavingContext);
  const [loadingMyBanks, setGettingAllMySavingsPlans] = useState(false);
  const [loadingMyBanksStatus, setGettingAllMySavingsPlansStatus] = useState("pending");
  const [loadingMyBanksError, setGettingAllMySavingsPlansError] = useState("");

  const [addingBank, setAddingBank] = useState(false);
  const [addingBankStatus, setAddingBankStatus] = useState("pending");
  const [addingBankError, setAddingBankError] = useState("");

  const [addingSavings, setAddingSavings] = useState(false);
  const [addingSavingsStatus, setAddingSavingsStatus] = useState("pending");
  const [addingSavingsError, setAddingSavingsError] = useState("");

  const [savings, setSavings] = useState<Savings>()

  useEffect(() => {
    getAllMySavingsPlans()
  }, [])

 
  const getAllMySavingsPlans = async () => {
    const t = await storage.getToken();
    try {
      if (mounted) {
        setGettingAllMySavingsPlans(true);
        setGettingAllMySavingsPlansStatus("pending");
        setGettingAllMySavingsPlansError("");
      }
      //actions
      const res = await axios.get<NewSavings[] | []>(`${urlInUse}savings`, {
        headers: {
          Authorization: "Bearer " + t,
        },
      });
      setMySavingsPlans(res.data);

      if (mounted) {
        setGettingAllMySavingsPlans(false);
        setGettingAllMySavingsPlansStatus("success");
        setGettingAllMySavingsPlansError("");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && mounted) {
        setGettingAllMySavingsPlans(false);
        setGettingAllMySavingsPlansStatus("failed");
        setGettingAllMySavingsPlansError(error?.response?.data?.message);
      }
    }
  };
  const addSavings = async (amount: number, planId: string) => {
    const t = await storage.getToken();
    try {
      if (mounted) {
        setAddingSavings(true);
        setAddingSavingsStatus("pending");
        setAddingSavingsError("");
      }
      //actions
      const res = await axios.post<Savings>(`${urlInUse}savings/add-savings/${planId}`,{amount});
      console.log('res.data',res.data);
      
      setSavings(res.data);
      const savingsIndex = mySavingsPlans.findIndex(i=>i._id=== planId)
      const updatedSP = [...mySavingsPlans]
      updatedSP.splice(savingsIndex,1,{...mySavingsPlans[savingsIndex], savings:[...mySavingsPlans[savingsIndex].savings,res.data]})
      setMySavingsPlans(updatedSP)
      if (mounted) {
        setAddingSavings(false);
        setAddingSavingsStatus("success");
        setAddingSavingsError("");
      }
      return res.data
    } catch (error) {
      Alert.alert('error')
      if (axios.isAxiosError(error) && mounted) {
        // setSavings(undefined)
        setAddingSavings(false);
        setAddingSavingsStatus("failed");
        setAddingSavingsError(error?.response?.data?.message);
      }
      return null
    }
  };

  const addBankRecord = async (data) => {
    const t = await storage.getToken();
    try {
      if (mounted) {
        setAddingBank(true);
        setAddingBankStatus("pending");
        setAddingBankError("");

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


      if (mounted) {
        setAddingBank(false);
        setAddingBankStatus("success");
        setAddingBankError("");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && mounted) {

        setAddingBank(false);
        setAddingBankStatus("failed");
        setAddingBankError(error?.response?.data?.message);
      }
    }
  };

  return {


    myBanks: mySavingsPlans,
    loadingMyBanks,
    loadingMyBanksStatus,
    loadingMyBanksError,
    getAllMySavingsPlans,

    addingBank,
    addingBankStatus,
    addingBankError,
    addBankRecord,

    addingSavings,
    addingSavingsStatus,
addingSavingsError,
    addSavings,savings



  };
};
export default useSavings;
