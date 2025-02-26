#  Markdown to HTML Converter

This is a **full-stack web application** that converts **Markdown** to **HTML** using **FastAPI (backend) and React (frontend)**. The backend processes Markdown input, converts it into HTML, caches the output using **Redis**, and serves it to the frontend. The frontend allows users to input Markdown text, request conversion, and view the output both as raw HTML code and rendered HTML.

---

##  Tech Stack

### Backend (FastAPI)
- **FastAPI** → Lightweight, high-performance web framework for building APIs.
- **Redis** → In-memory data store used for caching converted Markdown outputs.
- **Markdown (Python library)** → Converts Markdown syntax to HTML.

### Frontend (React)
- **React.js** → JavaScript library for building the user interface.
- **Axios** → Used for making HTTP requests to the FastAPI backend.
- **CSS** → Used for styling the UI components.

---

## 🔧 Setup & Installation

### 1️ Clone the Repository
- Clone the project repository from GitHub.
- Navigate into the project directory.

### 2️ Setup Backend (FastAPI)
- Install required Python dependencies.
- Ensure Redis is installed and running.
```
redis-server
```
- Start the FastAPI server.
```
uvicorn main:app --reload
```

### 3️ Setup Frontend (React)
- Install required npm dependencies.
```
cd ../frontend
npm install
```
- Start the React development server.
```
npm start
```

---

##  How It Works

1. **User enters Markdown text** in the frontend.
2. **Frontend sends a request to the FastAPI backend**.
3. **Backend checks if the Markdown has been previously converted**:
   -  If **cached**, it returns the stored HTML.
   -  If **not cached**, it converts Markdown to HTML, caches the result, and returns it.
4. **Frontend displays the converted HTML**:
   - Shows both **raw HTML code** and **rendered output**.

---

##  Screenshots

### Markdown Input
- The user types Markdown-formatted text in the input area.

### Converted HTML Output
- The application displays the converted HTML both as **raw HTML code** and as a **rendered preview**.

---

##  API Endpoints

| Method | Endpoint  | Description |
|--------|----------|-------------|
| `POST` | `/convert` | Converts Markdown to HTML and caches the result in Redis |

### Example Request (JSON)
- The request contains the Markdown text to be converted.

### Example Response (JSON)
- The response contains the converted HTML output and indicates whether it was retrieved from the cache.

---

##  Features

 **FastAPI Backend** for handling Markdown conversion requests.  
 **Redis Caching** to improve performance and reduce redundant processing.  
 **React Frontend** for a user-friendly experience.  
 **Raw HTML & Rendered Output** for a complete Markdown preview.  
 **Simple UI** with text input and real-time conversion.  

---

##  Troubleshooting

### Backend Issues
- **Redis is not running?** Start Redis before launching the backend.
- **Port conflict?** Run FastAPI on a different port if required.

### Frontend Issues
- **CORS error?** Ensure the frontend URL is allowed in FastAPI CORS settings.
- **Frontend not updating?** Restart the development server.



