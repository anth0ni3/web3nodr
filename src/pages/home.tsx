import { useEffect, useContext } from "react";
import WalletItem from "../components/walletItem";
import WalletModal from "../components/walletModal";
import { WalletContext, ThemeContext } from "../store/context";

function Home({
  dimensions,
}: {
  dimensions: { width: number; height: number };
}) {

  const { wallets, fetchWallets }: any = useContext(WalletContext);

  const {
    modalIsOpen,
    getWalletInfo,
  }: any= useContext(ThemeContext); 

  useEffect(() => {
    fetchWallets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let vh = dimensions.height * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [dimensions.width, dimensions.height]);
  return (
    <>
      <div className="home">
        <div className="home__content">
          <h5 className="content__title">Select Wallet</h5>
          <div className="content__inner">
            {wallets &&
              wallets?.map((wallet: any) => (
                <WalletItem
                  key={wallet.id}
                  imagePath={wallet.imagePath}
                  title={wallet.title}
                  onClick={() => {
                    getWalletInfo(wallet.id);
                  }}
                />
              ))}
          </div>
          <div className="help">
            <span className="help__text">
              What is a wallet?{" "}
              <a
                href="https://www.coinbase.com/learn/crypto-basics/what-is-a-crypto-wallet"
                rel="noreferrer noopener"
                target="_blank"
                className="help__link">
                Click here
              </a>
            </span>
          </div>
        </div>
      </div>
      {modalIsOpen && <WalletModal />}
    </>
  );
}

export default Home;
