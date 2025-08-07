from fastapi import FastAPI
from pydantic import BaseModel
from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint
from langchain.schema import SystemMessage, HumanMessage, AIMessage
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import json
import os

# === Load environment variables ===
load_dotenv()

# === Define a function to load the dynamic prompt from JSON ===
def load_prompt(filepath: str) -> str:
    """Load system prompt from a JSON file."""
    try:
        with open(filepath, "r") as f:
            data = json.load(f)
            return data.get("system_prompt", "You are a helpful assistant.")
    except FileNotFoundError:
        return "You are a helpful assistant."

# === Load prompt at startup ===
SYSTEM_PROMPT = load_prompt("./prompt.json")

# === Initialize FastAPI app ===
app = FastAPI()

# === Enable CORS for frontend access (React Native, etc.) ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, set your app's actual domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Initialize the LLaMA model via HuggingFace ===
llm = HuggingFaceEndpoint(
    repo_id="meta-llama/Llama-3.1-8B-Instruct",
    task="text_generation"
)
model = ChatHuggingFace(llm=llm)

# === Store per-session chat histories ===
chat_sessions = {}

# === Request body model for the chat endpoint ===
class ChatRequest(BaseModel):
    session_id: str
    message: str

# === Health check route ===
@app.get("/")
def read_root():
    return {"message": "Tutor Link Chatbot API is running"}

# === Main chat route ===
@app.post("/chat")
async def chat(request: ChatRequest):
    session_id = request.session_id
    user_input = request.message

    # Get or create history for this session
    if session_id not in chat_sessions:
        chat_sessions[session_id] = [SystemMessage(content=SYSTEM_PROMPT)]

    chat_history = chat_sessions[session_id]
    chat_history.append(HumanMessage(content=user_input))

    # Invoke model and get response
    response = model.invoke(chat_history)

    # Save assistant response to session
    chat_history.append(AIMessage(content=response.content))

    # Return response
    return {"response": response.content}
