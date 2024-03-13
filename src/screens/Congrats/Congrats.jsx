import { useNavigate } from "react-router-dom";
import AppButton from "../../components/AppButton/AppButton";
import "./Congrats.scss";

import { GiPartyPopper, GiShare } from "react-icons/gi";
import { useContext } from "react";
import CodeContext from "../../contexts/CodeContext";

const Congrats = () => {
  const { codeData } = useContext(CodeContext);

  const navigate = useNavigate();
  console.log(codeData);

  const startNow = () => {
    navigate(`/go/${codeData.code}`);
  };

  return (
    <div className="congrats">
      <div className="congrats-header">
        <h2>REALIDADE AUMENTADA PUBLICADA COM SUCESSO!</h2>
        <GiPartyPopper className="congrats-img" />
        <h2>Agora a sua festa ficara ainda mais inesquecivel</h2>
      </div>
      <div className="next-steps">
        <div className="next-steps_title">Os proximos passos sao:</div>
        <div className="next-steps_container">
          <div className="next-steps_item">
            <div className="next-step_number">01</div>
            <div className="next-step_text">
              Posicionar o AR Marker no local desejado
            </div>
          </div>
          <div className="next-steps_item">
            <div className="next-step_number">02</div>
            <div className="next-step_text">
              Compartilhar o link de acesso com os seus convidados
            </div>
          </div>
          <div className="next-steps_item">
            <div className="next-step_number">03</div>
            <div className="next-step_text">
              Divirta-se fazendo fotos e videos para compartilhar
            </div>
          </div>
        </div>
      </div>

      <div className="share">
        <div className="share-link">
          <GiShare className="share-icon" />
          <span>Compartilhe o link com os seus convidados</span>
        </div>
        <AppButton
          function={startNow}
          min="100%"
          title="COMECE A USAR AGORA MESMO"
        />
      </div>
    </div>
  );
};

export default Congrats;
