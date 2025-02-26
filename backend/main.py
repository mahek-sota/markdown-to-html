import redis.asyncio as redis
import markdown
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to Redis
redis_client = None

@app.on_event("startup")
async def startup():
    global redis_client
    redis_client = redis.Redis(host="localhost", port=6379, decode_responses=True)

@app.on_event("shutdown")
async def shutdown():
    await redis_client.close()

# Define request model
class MarkdownInput(BaseModel):
    text: str

@app.post("/convert")
async def convert_markdown(data: MarkdownInput):
    cache_key = f"markdown:{data.text}"

    # Check if the result is in Redis cache
    cached_html = await redis_client.get(cache_key)
    if cached_html:
        return {"html": cached_html, "cached": True}

    # ✅ Convert Markdown to Proper HTML
    html_content = markdown.markdown(data.text, extensions=["extra", "nl2br"])
    print(html_content)

    # Store in Redis with an expiry of 1 hour
    await redis_client.set(cache_key, html_content, ex=3600)

    return {"html": html_content, "cached": False}
