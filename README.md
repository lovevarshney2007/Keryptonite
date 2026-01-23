# 🔥 Kryptonite – ML Fire Detection Backend (Node.js)

Kryptonite is a **Node.js backend proxy server** that connects a frontend application to a **Python-based ML fire detection system**. It forwards requests, handles CORS, and normalizes responses for the frontend.

> Deployed on **Vercel**

---

## 🚀 Live Backend

**Base URL:**
[https://keryptonite-8k3u.vercel.app](https://keryptonite-8k3u.vercel.app)

**Health Check:**
`GET /api/health`

---

## ✨ Features

* 🌍 Fetch fire locations on an interactive map
* 🔥 Fetch high-confidence fire regions
* 🖼️ Upload images and get fire detection bounding boxes
* 💬 Chat with AI Assistant (new)
* 🧩 Acts as a proxy between the frontend and ML backend
* ☁️ Deployed on Vercel

---

## 🏗️ Tech Stack

* Node.js
* Express.js
* Axios
* Multer
* Vercel Serverless Functions
* Python ML backend (external service)

---

## 🛣️ API Endpoints

### 🔥 Fire Detection Routes

**Base path:** `/api/fires`

---

### 1️⃣ Get Fire Locations (Map)

`POST /api/fires/get_locations`

**Request Body (JSON):**

```json
{
  "country": "india",
  "state": "up",
  "source": "VIIRS_SNPP_NRT",
  "day_range": 3
}
```

**Response:**
Returns an **HTML map page** showing detected fire locations.

---

### 2️⃣ Get High-Confidence Fire Regions

`POST /api/fires/get_hight_regions_area`

**Request Body (JSON):**

```json
{
  "country": "india",
  "state": "up",
  "source": "VIIRS_SNPP_NRT",
  "day_range": 3
}
```

**Response:**
Returns **JSON data** containing high-confidence fire region statistics.

---

### 3️⃣ Analyze Image (Fire Detection)

`POST /api/fires/draw_boxes_fire`

**Request Type:** `multipart/form-data`

**Form Field:**

* `image` → Image file

**Response (JSON):**

```json
{
  "image_base64": "...",
  "format": "jpeg"
}
```

---

## 💬 Chat Routes

**Base path:** `/chat`

---

### 1️⃣ Send Message to AI

`POST /chat`

**Description:**
Send a message to the AI assistant. The `user_id` is used to maintain conversation memory per user.

**Request Body (JSON):**

```json
{
  "user_id": "string",
  "message": "string"
}
```

**Response (JSON):**

```json
{
  "response": "AI generated reply"
}
```

---

### 2️⃣ Get Chat History

`GET /chat/history/{user_id}`

**Description:**
Fetch the complete chat history for a specific user.

**Response (JSON):**

```json
{
  "history": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "ai",
      "content": "Hi! How can I help?"
    }
  ]
}
```

---

## ✅ Notes

* All endpoints are CORS-enabled for frontend integration
* Designed for serverless deployment on Vercel
* Python ML backend is accessed via secure internal HTTP calls
