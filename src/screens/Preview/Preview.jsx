import { Link, useNavigate } from "react-router-dom";
import AppButton from "../../components/AppButton/AppButton";
import "./Preview.scss";

import CodeContext from "../../contexts/CodeContext";
import { useContext, useState } from "react";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import db from "../../services/firebase-config";
import Modal from "../../components/Modal/Modal";

function Preview() {
  const { codeData } = useContext(CodeContext);

  const navigate = useNavigate();

  localStorage.setItem("snaps_user_data", JSON.stringify(codeData));

  const activeCode = async () => {
    await setDoc(doc(db, "Redeemed", codeData.code), codeData);
    removeCode();
  };

  const publishCode = () => {
    codeData.active = true;
    activeCode();
  };

  const publish = () => {
    setHandlePublish(!handlePublish);
    console.log(handlePublish);
  };

  const removeCode = async () => {
    const codeDoc = doc(db, "Unredeemed", codeData.code);
    await deleteDoc(codeDoc);
    navigate("/congrats");
  };

  const [handlePublish, setHandlePublish] = useState(false);

  //console.log(codeData.texture);
  return (
    <div className="content-preview">
      {handlePublish && (
        <Modal
          closeModal={publish}
          content={
            <>
              <h2>ATENÇÃO!</h2>
              <p>
                Ao publicar a sua Realidade Aumentada, Obatag funcionara durante
                3 dias seguidos. Após esse período vai expirar. <br />
                <br />
                Verifique a data do seu evento antes de publicar.
              </p>
              <AppButton function={publishCode} title="PUBLICAR AGORA" />
              <a onClick={activeCode}>Salvar, mas não publicar agora!</a>
            </>
          }
        />
      )}

      <div className="preview">
        <h1>PRE-VISUALIZACAO</h1>
        <span>
          Aponte a camera do smartphone para o AR Marker que veio com o seu
          cartao
        </span>
      </div>

      <iframe
        src={codeData.texture !== "" ? "../../../public/WebXr/index.html" : ""}
      />

      <div className="buttons">
        <Link to={"/config"}>
          <AppButton
            min="40vw"
            firstColor={"#7a6adc"}
            secondColor={"#5f5ae5"}
            title="EDITAR"
          />
        </Link>
        <Link>
          <AppButton min="40vw" function={publish} title="PUBLICAR" />
        </Link>
      </div>
    </div>
  );
}

export default Preview;
