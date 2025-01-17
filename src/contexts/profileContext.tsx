/**
 * @name dataContext
 * @desc Context container for the profile data
 */
import React, { useState, createContext } from "react";
import { BioState } from "interfaces/profileInterface";

export const initialState: BioState = {
  alias: "",
  aboutURL: "",
  imageURL: "",
  profession: null,
  jobTitle: null,
  description: null,
  skills: null,
  hasSyncedWallet: false,
  timeBlockLengthMin: "15",
  timeBlockCostADA: "20",
  walletBalance: 56,
  setAlias: () => {},
  setAboutURL: () => {},
  setImageURL: () => {},
  setTimeBlockLengthMin: () => {},
  setTimeBlockCostADA: () => {},
  setHasSyncedWallet: () => {},
  setWalletBalance: () => {},
  setProfession: () => {},
  setJobTitle: () => {},
  setDescription: () => {},
  setSkills: () => {},
};

export interface ContextProviderProps {
  children: React.ReactNode;
}

export const ProfileContext = createContext<BioState>(initialState);

export const ProfileContextProvider = ({ children }: ContextProviderProps) => {
  const [alias, setAlias] = useState<string>("");
  const [aboutURL, setAboutURL] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [timeBlockLengthMin, setTimeBlockLengthMin] = useState<string | null>(
    null
  );
  const [timeBlockCostADA, setTimeBlockCostADA] = useState<string | null>(null);
  const [profession, setProfession] = useState<string | string[] | null>(null);
  const [jobTitle, setJobTitle] = useState<string | string[] | null>(null);
  const [description, setDescription] = useState<string | string[] | null>(
    null
  );
  const [skills, setSkills] = useState<string | string[] | null>(null);
  const [hasSyncedWallet, setHasSyncedWallet] = useState<boolean>(false);
  const [walletBalance, setWalletBalance] = useState<number>(56);

  return (
    <ProfileContext.Provider
      value={{
        alias,
        walletBalance,
        aboutURL,
        imageURL,
        hasSyncedWallet,
        timeBlockLengthMin,
        timeBlockCostADA,
        profession,
        jobTitle,
        description,
        skills,
        setAlias,
        setAboutURL,
        setImageURL,
        setWalletBalance,
        setHasSyncedWallet,
        setTimeBlockLengthMin,
        setTimeBlockCostADA,
        setProfession,
        setJobTitle,
        setDescription,
        setSkills,
      }}>
      {children}
    </ProfileContext.Provider>
  );
};
