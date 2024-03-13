// Importa as dependências necessárias do React e do React Router
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Importa o estilo específico para este componente
import "./Start.scss";
import video from "../../assets/video/intro/intro.mp4";

// Importa o componente AppButton
import AppButton from "../../components/AppButton/AppButton";
import Modal from "../../components/Modal/Modal";
import db from "../../services/firebase-config";
import { collection, getDocs } from "firebase/firestore";

// Define o componente funcional Start
const Start = () => {
  // Define o estado local para controlar a exibição da lista de lojas
  const [openList, setOpenList] = useState(false);
  const [lojas, setLojas] = useState([]);
  // Lista de lojas disponíveis

  const listLojas = collection(db, "Lojas");

  const getLojas = async () => {
    const loja = await getDocs(listLojas);
    const itens = loja.docs.map((doc) => doc.data());
    // Atualiza o estado com a nova lista de lojas
    setLojas(itens);
  };

  useEffect(() => {
    getLojas();
  }, []);

  // Função para exibir a lista de lojas
  const showList = () => {
    setOpenList(true);
  };

  // Função para ocultar a lista de lojas
  const hideList = () => {
    setOpenList(false);
  };

  // Retorna o conteúdo JSX do componente Start
  return (
    <div className="start">
      {/*<img src={shapeTest} alt="" />*/}
      <h1>LEVE A MAGIA DA REALIDADE AUMENTADA PARA A SUA FESTA</h1>
      {/* Contêiner para explicar como funciona */}
      <div className="how-it-works_container">
        <p>Veja como funciona</p>
        <video width="400" controls>
          <source src={video}></source>
        </video>
      </div>
      {/* Botão para ativar o cartão */}
      <div className="btn-active">
        <Link to="/redeem">
          <AppButton title="ATIVAR SUPER FESTA XD" />
        </Link>
      </div>
      {/* Contêiner para informar sobre a obtenção do cartão */}
      <div className="get-card_container">
        <p>Nao tem um cartao?</p>
        <span onClick={showList}>Veja como adquirir</span>
      </div>
      {/* Modal de instruções sobre como adquirir o cartão */}
      {openList && (
        <Modal
          closeModal={hideList}
          content={
            <>
              <h2>Como adquirir um cartão Obatag Realidade Aumentada</h2>
              <p>
                Os cartões estão disponíveis para compra em lojas físicas. Veja
                na lista abaixo a loja mais perto de você. Caso não haja nenhuma
                loja por perto, clique aqui para comprar online.
              </p>
              {/* Lista de lojas disponíveis */}
              <div className="list">
                {lojas.map((item) => (
                  <div key={item.nome} className="list-item">
                    <h3>{item.nome}</h3>
                    <p>
                      Endereco: {item.endereco}, {item.cep}
                    </p>
                    <p>Telefone: {item.telefone}</p>
                  </div>
                ))}
              </div>
            </>
          }
        />
      )}
    </div>
  );
};

export default Start;
