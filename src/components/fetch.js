import axios from "axios";

const Fetch = async (input, setOutput) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    withCredentials: true,
  };
  const body = {
    text: input,
  };

  return axios
    .post("http://2b25-34-23-11-227.ngrok.io", body, config)
    .then((response) => {
      setOutput(response.data.data.text);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default Fetch;