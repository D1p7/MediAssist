import axios from "axios";
import { diseases } from "../../components/Form/Form";

const transformDataToAI = (data) => {
  let result = [];

  for (let i = 0; i < diseases.length; i++) {
    for (let j = 0; j < diseases[i].length; j++) {
      result.push(data.includes(diseases[i][j]) ? 1 : 0);
    }
  }
  return result;
};

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = req.body;
    let data = transformDataToAI(body);
    data = [data];

    const response = await axios.post(
      "https://b5a0-34-106-25-31.ngrok-free.app/process_data",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json(response.data);
  }
}
