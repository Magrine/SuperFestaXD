import { useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";

import db from "../../services/firebase-config";
import AppButton from "../../components/AppButton/AppButton";
import CodeContext from "../../contexts/CodeContext";

import { ImBlocked, ImCheckmark } from "react-icons/im";

import "./Redeem.scss";

const Redeem = () => {
  // Contexto para atualizar o código globalmente na aplicação
  const { setCode } = useContext(CodeContext);

  const { redeem } = useParams();

  // Estado para controlar o código inserido pelo usuário
  const [inputRedeem, setInputRedeem] = useState("");

  // Estado para controlar se o código foi aceito ou não
  const [codeAccepted, setCodeAccepted] = useState(null);

  // Estados para armazenar os códigos disponíveis e os dados do código inserido
  const [codes, setCodes] = useState([]);
  //const [codeData, setCodeData] = useState([]);

  // Referência à coleção no Firestore
  const availableCodeRef = collection(db, "Unredeemed");
  const activeCodesRef = collection(db, "Redeemed");

  useEffect(() => {
    if (redeem) {
      const check = async () => {
        let activeCodes = await getDocs(activeCodesRef);
        let actives = activeCodes.docs.map((doc) => doc.id);

        let availableCodes = await getDocs(availableCodeRef);
        let available = availableCodes.docs.map((doc) => doc.id);

        //Verificar se o codigo ja foi resgatado -
        if (actives.includes(redeem)) {
          const activeData = (await getDoc(doc(db, "Redeemed", redeem))).data();
          if (
            Math.floor(
              Math.abs(Date.now() - new Date(activeData.date)) /
                (1000 * 60 * 60)
            ) > 72
          ) {
            setCodeAccepted(false);
          } else {
            setCodeAccepted(true);
          }
        }

        //Verificar se o codigo esta disponivel para resgate

        if (available.includes(redeem)) {
          setCodeAccepted(true);
        } else {
          setCodeAccepted(false);
        }
      };
      check();
      setCode(redeem);
      setInputRedeem(redeem);
    }

    // Função para obter os códigos disponíveis no Firestore
    const getCodes = async () => {
      const data = await getDocs(availableCodeRef);
      setCodes(data.docs.map((doc) => doc.id));
    };

    getCodes();
    //getCodeData();
  }, [codeAccepted]); // A execução dessas funções é condicionada à alteração de codeAccepted

  //Mostrar codigos validos
  console.log(codes);

  // Função para verificar se o código inserido é válido
  const checkCode = () => {
    if (codes.includes(inputRedeem)) {
      setCode(inputRedeem);
      setCodeAccepted(true);
    } else {
      setCodeAccepted(false);
    }
  };

  // Função para reiniciar o processo de inserção do código
  const tryCodeAgain = () => {
    setCodeAccepted(null);
    setInputRedeem("");
  };

  return (
    <>
      {codeAccepted === null && (
        // Componente para inserção do código
        <div className="redeem">
          <h1>ATIVAR CARTAO</h1>
          <span>
            Digite o codigo de ativacao que esta em seu cartao ou leia o QRCode
          </span>
          <input
            value={inputRedeem}
            type="text"
            onChange={(e) => setInputRedeem(e.target.value)}
          />
          <AppButton min="60vw" title="AVANÇAR" function={checkCode} />
        </div>
      )}

      {codeAccepted === true && (
        // Componente exibido quando o código é aceito
        <div className="accepted">
          <div>
            <ImCheckmark className="accepted_icon" />
          </div>
          <h1>CARTÃO VALIDADO COM SUCESSO!</h1>
          <div className="accepted_text">
            <span>Agora Voce ja pode configurar a sua Realidade Aumentada</span>
          </div>
          <Link to="/config">
            <AppButton title="CONFIGURAR AGORA" />
          </Link>
        </div>
      )}

      {codeAccepted === false && (
        // Componente exibido quando o código não é aceito
        <div className="erro">
          <div>
            <ImBlocked className="erro_icon" />
          </div>
          <h1>ATIVACAO NEGADA!</h1>
          <span>
            O seu cartao nao pode ser ativado, veja as possiveis causas:
          </span>
          <ul>
            <li>O codigo expirou por ja ter sido utilizado</li>
            <li>O codigo expirou por ja ter sido ativado a mais de 3 dias.</li>
            <li>Foi digitado um codigo diferente daquele que esta no cartao</li>
          </ul>
          <AppButton function={tryCodeAgain} title="TENTAR COM OUTRO CODIGO" />
        </div>
      )}
    </>
  );
};

export default Redeem;
