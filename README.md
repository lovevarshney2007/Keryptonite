# 🔥 Kryptonite – ML Fire Detection Backend (Node.js)

Kryptonite is a **Node.js backend proxy server** that connects a frontend application to a **Python-based ML fire detection system**. It forwards requests, handles CORS, and normalizes responses for the frontend.

> Deployed on **Vercel**

---

## 🚀 Live Backend

**Base URL:**
https://kryptonite-8k3u.vercel.app


**Health Check:**
GET /api/health


---

## ✨ Features

- 🌍 Fetch fire locations on map
- 🔥 Fetch high-confidence fire regions
- 🖼️ Upload image and get fire detection bounding boxes
- 🧩 Acts as a proxy between frontend and ML backend
- ☁️ Deployed on Vercel

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- Axios
- Multer
- Vercel Serverless Functions
- Python ML backend (external)

---


---

## 🛣️ API Endpoints

Base path:
/api/fires




---

### 1️⃣ Get Fire Locations (Map)

POST /api/fires/get_locations

**Body (JSON):**
```json
{
  "country": "india",
  "state": "up",
  "source": "VIIRS_SNPP_NRT",
  "day_range": 3
}

Response:
Returns an HTML map page


2️⃣ Get High Confidence Fire Regions
POST /api/fires/get_height_regions_area

Body (JSON):
{
  "country": "india",
  "state": "up",
  "source": "VIIRS_SNPP_NRT",
  "day_range": 3
}

Response:
Returns JSON data


3️⃣ Analyze Image (Fire Detection)
POST /api/fires/draw_boxes_fire

Body:

Type: form-data

Key: image

Value: Image file

Response:
{
  "image_base64": "...",
  "format": "jpeg"
}


