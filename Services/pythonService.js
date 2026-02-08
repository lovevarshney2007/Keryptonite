import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

const PYTHON_BASE = process.env.PYTHON_BASE;

if (!PYTHON_BASE) {
  throw new Error("PYTHON_BASE is not set in .env");
}

console.log("Python base:", process.env.PYTHON_BASE);


export async function getLocations(params) {
  const res = await axios.post(`${PYTHON_BASE}/api/map`, null, {
    params: {
      country: params.country,
      state: params.state,
      // source: params.source,
      day_range: params.day_range,
    },
  });

  return res.data;
}


export async function getHighConfidence(params) {
  const res = await axios.post(
    `${PYTHON_BASE}/api/get_high_region_area/get_hight_regions_area`,
    null,
    {
      params: {
        country: params.country,
        state: params.state,
        // source: params.source,
        day_range: params.day_range,
      },
    }
  );

  return res.data;
}

export async function data_analyser(params) {
  const res = await axios.get(
    `${PYTHON_BASE}/api/data_analyser/data_analyser`,
    {
      params: {
        country: params.country,
      },
    }
  );

  return res.data;
}


export async function analyzeImage(file) {
  const form = new FormData();

  form.append("file", file.buffer, file.originalname);

  const res = await axios.post(
    `${PYTHON_BASE}/api/fireYolo/draw_boxes_fire`,
    form,
    {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
    }
  );

  return res.data;
}

export async function chatWithAI(userId, message) {
  // Proxies the chat request to the Python backend
  const res = await axios.post(`http://51.20.3.113:8005/chat`, {
    user_id: userId,
    message: message,
  });

  return res.data;
}

export async function getChatHistory(userId) {
  // Proxies the history request to the Python backend
  const res = await axios.get(`http://51.20.3.113:8005/chat/history/${userId}`);

  return res.data;
}
