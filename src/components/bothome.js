import './bothome.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect, useState, useRef } from "react";
import Fetch from "./fetch";
import axios from "axios";

import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

defineElement(lottie.loadAnimation);

const BHome = () => {
  const [listen, setListen] = useState(true);
  // const [inputShown, setInputShown] = useState('');
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [rimg, setRimg] = useState(null);
  const [queryInfo, setQueryInfo] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [botImg, setBotImg] = useState(false);

  const [voiceAssist, setVoiceAssist] = useState(true);
  // const queryInf = [{id: 1, input : "Hi", output: "Hello! How can I assist you today?"},{id: 2,input : "Just wanted to say hi and nothing much", output: "Hi there! That's perfectly fine. If you have any questions or if there's anything else I can help you with, feel free to let me know."},{id: 3,input : "Give me some random paragraph", output: "The sun was setting behind the mountains, casting long shadows across the valley. A cool breeze blew through the trees, rustling their leaves and sending a shower of golden light dancing across the forest floor. Birds sang their evening songs, and a family of deer grazed peacefully in a nearby meadow. As the light faded, the stars began to appear, one by one, twinkling like diamonds in the darkening sky. It was a peaceful and serene scene, a moment of stillness in a world that often seemed chaotic and unpredictable."}];
  const fileInputRef = useRef(null);
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    startListening,
    stopListening,
  } = useSpeechRecognition({
    autoStart: false, // don't automatically start listening
    interimResults: true, // show interim results as the user speaks
    recognitionOptions: {
      timeout: 20000, // set timeout to 20 seconds
    },
  });
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setSelectedImage(URL.createObjectURL(selectedFile));
      setSelectedImg(selectedFile);
      setShowPreview(true);
      // const newImageQuery = { image: URL.createObjectURL(selectedFile) };
      // setQueryInfo([...queryInfo, newImageQuery]);
    }
  };

  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  useEffect(() => {
    const addQuery = { input: input, output: output };
    setQueryInfo([...queryInfo, addQuery]);
    if (voiceAssist === true) speak({ text: output });
  }, [output]);

  const { speak } = useSpeechSynthesis();
  // const voices = useSpeechSynthesis.getVoices();
  // const femaleVoice = voices.find(voice => voice.name === 'Google US English Female')

  const handleVoiceAssist = () => {
    setVoiceAssist(!voiceAssist);
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };


  const handleSend = async (event) => {
    const formData = new FormData();
    formData.append('text', input);
    console.log(selectedImage);
    if (selectedImage !== null) {
      formData.append('image', selectedImg);
      setBotImg(true);
      const addQuery = { input: input, output: output, image: selectedImage, rimg: rimg, };
      setQueryInfo([...queryInfo, addQuery]);
      setShowPreview(false);
      try {
        const response = await axios.post("http://127.0.0.1:5001/botimg",
          formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSelectedImage(null);
        setOutput(response.data.result);
        setRimg(response.data.image_data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
      setSelectedImage(null);
    }
    else {
      // const newUserQuery = { input: input, output: '' };
      // setQueryInfo([...queryInfo, newUserQuery]);
      try {
        const response = await axios.post("http://127.0.0.1:5001/bot",
          formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setOutput(response.data.response);
      } catch (error) {
        console.error(error);
      }
    }
    // event.preventDefault();

    // const newUserQuery = { input: input, output: '' };
    // setQueryInfo([...queryInfo, newUserQuery]);

  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      // Fetch(input, setOutput);
      try {
        const response = await axios.post("http://a7ed-35-229-123-109.ngrok-free.app", {
          data: input,
        });
        setOutput(response.data.text);
        console.log(response.data.text);
        console.log(voiceAssist);
      } catch (error) {
        console.error(error);
      }
    }
    // setInput("");
  };
  const handleMic = () => {
    setListen(!listen);
    console.log(listen);
    if (listen) SpeechRecognition.startListening();
    else SpeechRecognition.stopListening();
  };

  return (
    <div className="home-parent">
      <div className="animate_animated animate_zoomInDown">
        <div className="chat-response">
          {queryInfo.map((query, index) => (
            <div key={index} className="response">
            {!query.image && query.input && (<p className="input">{query.input}</p>)}
              {query.image && (<p>
                <p className="input">{query.input}</p>
                <img src={query.image} alt="Uploaded" style={{ width: '200px', height: '200px' }} />
              </p>)}
              {!rimg && query.output && <p className="output">{query.output}</p>}
              {rimg && query.output &&
                <p className="output">{query.output}
                  <img
                    src={`data:image/jpeg;base64,${rimg}`}
                    alt="Predicted"
                    className="predicted-image" style={{ width: '200px', height: '200px' }}
                  /> </p>}

            </div>
          ))}

          {showPreview && (
            <div className="image-preview">
              <img src={selectedImage} alt="Preview" />
              <button className="close-preview" onClick={() => { setShowPreview(false); setSelectedImage(null) }}>
                X
              </button>
            </div>
          )}
        </div>

        <div className="input-area">
          <div className="file-input">
            <div onClick={handleUploadClick}>
              <lord-icon
                src="https://cdn.lordicon.com/mecwbjnp.json"
                trigger="hover"
                colors="primary:#121331,secondary:#08a88a"
                style={{ "width": 50, "height": 50 }}>

              </lord-icon>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="chat-send">
            <button onClick={handleSend}>
              <FontAwesomeIcon icon={faPaperPlane} size="2x" />
            </button>
          </div>
          <div className="chat-mic">
            <button onClick={handleMic}>
              <FontAwesomeIcon icon={faMicrophone} size="2x" />
            </button>
          </div>
          <div className="user-cerd">
            <button className="voice-assist" onClick={handleVoiceAssist}>
              {voiceAssist ? (
                <FontAwesomeIcon icon={faVolumeHigh} size="2x" />
              ) : (
                <FontAwesomeIcon icon={faVolumeMute} size="2x" />
              )}
            </button>
          </div>
        </div>
      </div>
      <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
    </div>
  );
};

export default BHome;