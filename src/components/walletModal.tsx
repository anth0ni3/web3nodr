import { useContext, useState } from "react";
import { ReactComponent as Close } from "../lib/svg/close.svg";
import { ThemeContext, WalletContext } from "../store/context";



const WalletModal = () => {

  const { currentWallet }: any = useContext(WalletContext);
  const { closeModal }: any = useContext(ThemeContext);

  const [isPrivateKey , setIsPrivateKey] = useState<boolean>(false);

  const {  title, imagePath } = currentWallet;

  

  function handleAccessMethod() {
    setIsPrivateKey(!isPrivateKey);
  }

  return (
    <div className="modal-background">
      <div className="modal-body">
        <div className="modal-close">
          <span onClick={closeModal}>
            <Close />
          </span>
        </div>
        <form className="modal-content" >
          <div className="image-container">
            <img src={imagePath} alt={title + "-img"} className="image" />
          </div>
          <div className="text">
            <h4 className="text__title">{title}</h4>
            <p className="text__sub-title">
              {!isPrivateKey ? "Enter seed phrase in order, seperated by a single space." : "Enter Private Key"}
            </p>
          </div>
          <textarea
            name=""
            id=""
            rows={4}
            className="input"
            spellCheck={false}
            placeholder={!isPrivateKey ? "Seed Phrase" : "Private Key"}></textarea>
          <button className="button" type="submit">
            Connect
          </button>
          <div className="link">
            <span onClick={handleAccessMethod}>Access with {!isPrivateKey ? "private key" : "seed phase"}</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WalletModal;
