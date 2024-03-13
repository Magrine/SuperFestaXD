import { useContext, useEffect, useState } from "react";
import AppButton from "../../components/AppButton/AppButton";
import "./Config.scss";

import CodeContext from "../../contexts/CodeContext";

import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import frame_1 from "../../assets/frame_1.jpg";
//import frame_2 from "../../assets/frame_2.jpg";

const Config = () => {
  // Contexto para acessar e modificar informações globais
  const {
    codeData,
    age,
    name,
    setDate,
    setName,
    setAge,
    setTheme,
    setTexture,
    setInfo,
  } = useContext(CodeContext);

  const themes = [{ title: "Aniversário Divertido", img: frame_1 }];

  const [isThemeSelected, setIsThemeSelected] = useState(false);
  const [themeSelected, setThemeSelected] = useState(0);

  useEffect(() => {
    setDate(Date.now());
  }, []);
  console.log(codeData);
  // Função para lidar com a mudança de textura ao carregar uma imagem

  const changeTexture = (e) => {
    var file = e.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (event) {
        setTexture(event.target.result);
      };
      reader.readAsDataURL(file);
      chengeInfo();
    }
  };

  const chengeInfo = () => {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Definindo propriedades de estilo do texto
    ctx.font = "140px Calibri";
    ctx.fillStyle = "black";
    ctx.fillStyle = "#5B0D42";
    ctx.textAlign = "center";

    // Escrevendo o texto no canvas
    ctx.fillText(
      `${codeData.name.toUpperCase()}`,
      canvas.width / 2,
      canvas.height * 0.44
    );
    ctx.fillText(
      `${codeData.age} ANOS`,
      canvas.width / 2,
      canvas.height * 0.78
    );

    var image = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    setInfo(image);
  };

  //------LIDAR COM SELECAO DOS TEMAS------

  const addTheme = () => {
    if (themeSelected < 5) {
      setThemeSelected(themeSelected + 1);
      setTheme(themes[themeSelected].title);
    }
  };

  const subTheme = () => {
    if (themeSelected > 0) {
      setThemeSelected(themeSelected - 1);
      setTheme(themes[themeSelected].title);
    }
  };

  const selectTheme = () => {
    setIsThemeSelected(!isThemeSelected);
  };

  setTheme(themes[themeSelected].title);

  return (
    <div className="config">
      <h1>CONFIGURANDO</h1>
      {isThemeSelected === true && (
        <>
          <div className="forms">
            {/* Formulário para inserir o nome */}
            <div className="field">
              <span>Nome</span>
              <input
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* Formulário para inserir a idade */}
            <div className="field">
              <span>Idade</span>
              <input
                value={age}
                type="text"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            {/* Formulário para carregar a imagem de textura e visualização do canvas */}
            <div className="field">
              <span>Foto</span>
              <input
                onChange={(e) => changeTexture(e)}
                type="file"
                id="uploadImage"
                accept=".jpg, .png"
              />
              <canvas id="myCanvas" width="638" height="362"></canvas>
            </div>
          </div>
          {/* Botão para pré-visualizar as configurações */}
          <Link to="/preview">
            <AppButton title="PRE-VISUALIZAR" />
          </Link>
        </>
      )}

      {isThemeSelected === false && (
        <>
          <div className="carousel">
            {themeSelected > 0 && (
              <BsArrowLeftCircleFill
                onClick={subTheme}
                className="arrow arrow-left"
              />
            )}

            {themes.map((item, id) => {
              return (
                <div
                  key={id}
                  className={themeSelected === id ? "item" : "item-hidden"}
                >
                  <h2>{item.title}</h2>
                  <div
                    className="item-img"
                    style={{ backgroundImage: `url(${item.img})` }}
                  ></div>
                </div>
              );
            })}
            {themeSelected < 5 && themes.length > 1 && (
              <BsArrowRightCircleFill
                onClick={addTheme}
                className="arrow arrow-right"
              />
            )}
          </div>

          <AppButton min="60vw" title="AVANÇAR" function={selectTheme} />
        </>
      )}
    </div>
  );
};

export default Config;
