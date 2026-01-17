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
  const res = await axios.post(`${PYTHON_BASE}/get_locations`, null, {
    params: {
      country: params.country,
      state: params.state,
      source: params.source,
      day_range: params.day_range,
    },
  });

  return res.data;
}


export async function getHighConfidence(params) {
  const res = await axios.post(
    `${PYTHON_BASE}/get_hight_regions_area`,
    null,
    {
      params: {
        country: params.country,
        state: params.state,
        source: params.source,
        day_range: params.day_range,
      },
    }
  );

  return res.data;
}


export async function analyzeImage(file) {
  const form = new FormData();

  form.append("file", file.buffer, file.originalname);

  const res = await axios.post(
    `${PYTHON_BASE}/draw_boxes_fire`,
    form,
    {
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
    }
  );

  return res.data;
}
