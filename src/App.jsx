import Start from "./screens/start/start";
import Redeem from "./screens/Redeem/Redeem";
import Config from "./screens/Config/Config";

//Import SCSS
import "./index.scss";
import logo from "./assets/logo.png";
import bg_dots from "./assets/shape_2.svg";

import CodeContext from "./contexts/CodeContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Preview from "./screens/Preview/Preview";
import Go from "./screens/Go/Go";
import Congrats from "./screens/Congrats/Congrats";

function App() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [texture, setTexture] = useState("");
  const [info, setInfo] = useState("");
  const [date, setDate] = useState("");
  const [theme, setTheme] = useState("");
  const [active, setActive] = useState(false);

  const codeData = {
    active: active,
    code: code,
    name: name,
    theme: theme,
    age: age,
    texture: texture,
    date: date,
    info: info,
  };

  // getData("156546546");

  const codeDataString = JSON.stringify(codeData);

  localStorage.setItem("ObaTag", codeDataString);

  return (
    <div className="app">
      <div className="bg">
        <div className="bg_dots">
          <img id="circulo" src={bg_dots} />
        </div>
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="circle-bg"></div>
        <div className="filled-circle-bg"></div>
      </div>
      <div className="content">
        <CodeContext.Provider
          value={{
            codeData,
            setCode,
            setName,
            setAge,
            setTexture,
            setDate,
            setTheme,
            name,
            code,
            age,
            theme,
            setActive,
            setInfo,
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/redeem/:redeem?" element={<Redeem />} />
              <Route path="/config" element={<Config />} />
              <Route path="/preview" element={<Preview />} />
              <Route path="/congrats" element={<Congrats />} />
              <Route path="/go/:code?" element={<Go />} />
            </Routes>
          </BrowserRouter>
        </CodeContext.Provider>
      </div>
    </div>
  );
}

export default App;
