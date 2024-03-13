import { useNavigate, useParams } from "react-router-dom";
import "./Go.scss";
import { useEffect, useRef, useState } from "react";
import getData from "../../services/get-data";
import calcDate from "../../utils/calcDate";
import { IoIosHelpCircle, IoIosCamera, IoIosShareAlt } from "react-icons/io";
import takeVideo from "../../utils/takeVideo";
import whammy from "react-whammy";
import takeScreenshot from "../../utils/takeScreenshot";

//import takeScreenshot from "../../utils/takeScreenshot";

function Go() {
  const navigate = useNavigate();

  const { code } = useParams();

  const [texture, setTexture] = useState("");
  //const [name, setName] = useState("");
  //const [age, setAge] = useState("");
  //const [data, setData] = useState([]);

  useEffect(() => {
    const userData = async () => {
      try {
        const data = await getData(code);
        //setData(data);
        if (data.active === true && calcDate(data.date) >= 0) {
          setTexture(data.texture);
          //setName(data.name);
          //setAge(data.age);
        } else {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
      }
    };
    userData();
  }, [code, navigate]);

  const fps = 18;
  let encoder = new whammy.Video(fps, 500);
  const longPressRef = useRef(false);
  const pressTimer = useRef(null);

  const handleButtonPress = () => {
    longPressRef.current = false;
    pressTimer.current = window.setTimeout(() => {
      longPressRef.current = true;
      startRepeatedLog();
    }, 500);
  };

  const handleButtonRelease = () => {
    clearTimeout(pressTimer.current);
    if (!longPressRef.current) {
      takeScreenshot();
    } else {
      stopRepeatedLog();
    }
  };

  const startRepeatedLog = () => {
    pressTimer.current = setInterval(() => {
      if (longPressRef.current) {
        let frame = takeVideo();
        encoder.add(frame.toDataURL("image/webp"));
      } else {
        stopRepeatedLog();
      }
    }, 1000 / fps);
  };

  const stopRepeatedLog = () => {
    encoder.compile(false, (output) => {
      const blob = new Blob([output], { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(blob);
      const date = new Date();

      const downloadLink = document.createElement("a");
      downloadLink.href = videoUrl;
      downloadLink.download = `${date}.mp4`;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      console.log(encoder);

      encoder = new whammy.Video();
      document.body.removeChild(downloadLink);
    });

    clearInterval(pressTimer.current);
  };

  return (
    <div className="contente-go">
      <iframe
        allow="display-capture"
        id="obatag"
        src={texture !== "" ? "../../../public/WebXr/index.html" : ""}
      />

      <div className="users-interaction">
        <div className="help">
          <IoIosHelpCircle />
        </div>
        <div
          className={`screenshot ${longPressRef.current ? "holded" : ""}`}
          onMouseDown={handleButtonPress}
          onMouseUp={handleButtonRelease}
        >
          <IoIosCamera />
        </div>
        <div className="share">
          <IoIosShareAlt />
        </div>
      </div>
    </div>
  );
}

export default Go;
