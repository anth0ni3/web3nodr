import { createContext, useEffect, useState } from "react";
import type { FC } from "react";

interface ThemeContextValues {
  modalIsOpen: boolean;
  getWalletInfo: (id: number) => void;
  closeModal?: () => void;
}

interface WalletContextValues {
  id: number;
  title: string;
  imagePath: string;
}

interface FetchWallets {
  (): any;
}

export interface FetchWalletsData {
  wallets: WalletContextValues[] | null;
  fetchWallets: FetchWallets;
  currentWallet: WalletContextValues | undefined;
}

export const ThemeContext = createContext<ThemeContextValues | null>(null);

export const WalletContext = createContext<FetchWalletsData | null>(null);

const DataProvider: FC = ({ children }) => {
  // const walletValues = [
  //   {
  //     id: 1,
  //     title: "Metamask",
  //     imagePath: "../lib/svg/metamask.svg",
  //   },
  //   {
  //     id: 2,
  //     title: "KeepKey",
  //     imagePath: "../lib/svg/keepkey.svg",
  //   },
  // ];
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [wallets, setWallets] = useState<WalletContextValues[] | null>(null);
  const [currentWallet, setCurrentWallet] = useState<
    WalletContextValues | undefined
  >(undefined);

  async function fetchWallets() {
    const url = "/lib/wallets.json";
    const response = await fetch(url);
    const data = await response.json();
    return setWallets(data);
  }

  const dataValue: ThemeContextValues = {
    modalIsOpen,

    getWalletInfo: (id: number) => {
      // console.log(wallet);
      setCurrentWallet(wallets?.find((wallet: WalletContextValues) => wallet?.id === id));
      setModalIsOpen(true);
    },

    closeModal: () => {
      setModalIsOpen(false);
    },
  };

  return (
    <ThemeContext.Provider value={dataValue}>
      <WalletContext.Provider value={{ wallets, fetchWallets, currentWallet }}>
        {children}
      </WalletContext.Provider>
    </ThemeContext.Provider>
  );
};

export default DataProvider;
