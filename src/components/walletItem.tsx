import {ReactComponent as Right} from "../lib/svg/right.svg";

type WalletItemProps = {
  imagePath: string;
  title: string;
  onClick: () => void; 
};

const WalletItem = ({
  imagePath,
  title = "KeepKey",
  onClick
}: WalletItemProps): JSX.Element => {
  return (
    <div className="wallet" onClick={onClick}>
      <div className="wallet__content">
        <div className="image-container">
          <img src={imagePath} alt={title + "-img"} className="image" />
        </div>
        <div className="text">
          <h4 className="text__title">{title}</h4>
          <span className="text__sub-title">Connect using {title} wallet</span>
        </div>
      </div>
      <div className="wallet__expand-container">
        <Right/>
      </div>
    </div>
  );
};

export default WalletItem;
