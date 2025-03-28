from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import json
import uvicorn
import uuid

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    prompt: str

# In-memory storage for active sessions
sessions = {}

# Mock OpenManus agent class
# In a real implementation, this would import and use the actual OpenManus framework
class MockOpenManusAgent:
    def __init__(self):
        self.tools = ["browser", "terminal", "python", "file_editor"]
    
    async def run(self, prompt):
        # This is a mock implementation that simulates OpenManus behavior
        # In a real implementation, this would call the actual OpenManus agent
        await asyncio.sleep(1)  # Simulate processing time
        
        if "browse" in prompt.lower() or "web" in prompt.lower():
            return {
                "result": f"I searched the web for information about '{prompt}'",
                "tools_used": ["browser"],
                "output": "Browsing results would appear here"
            }
        elif "terminal" in prompt.lower() or "command" in prompt.lower() or "run" in prompt.lower():
            return {
                "result": f"I executed the command in the terminal",
                "tools_used": ["terminal"],
                "output": "$ echo Hello\nHello"
            }
        elif "python" in prompt.lower() or "code" in prompt.lower():
            return {
                "result": f"Here's a Python function as requested:\n\n```python\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n```",
                "tools_used": ["python"],
                "output": "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)"
            }
        elif "file" in prompt.lower() or "edit" in prompt.lower():
            return {
                "result": f"I've edited the file as requested",
                "tools_used": ["file_editor"],
                "output": "File content would appear here"
            }
        else:
            return {
                "result": f"I processed your request: '{prompt}'",
                "tools_used": [],
                "output": ""
            }

@app.post("/api/query")
async def handle_query(query: Query):
    # Create a new OpenManus agent
    agent = MockOpenManusAgent()
    
    # Generate a session ID
    session_id = str(uuid.uuid4())
    
    # Store the session
    sessions[session_id] = {
        "agent": agent,
        "status": "running",
        "tools_used": [],
        "output": "",
        "prompt": query.prompt
    }
    
    # Process the query in a background task
    asyncio.create_task(process_query(session_id, query.prompt))
    
    # Return immediately with session ID
    return {
        "session_id": session_id,
        "status": "processing",
        "message": "Query is being processed"
    }

async def process_query(session_id, prompt):
    session = sessions[session_id]
    agent = session["agent"]
    
    try:
        # Execute the agent with the prompt
        result = await agent.run(prompt)
        
        # Update session with results
        session["status"] = "completed"
        session["result"] = result.get("result", "")
        session["tools_used"] = result.get("tools_used", [])
        session["output"] = result.get("output", "")
        
    except Exception as e:
        session["status"] = "error"
        session["error"] = str(e)

@app.get("/api/status/{session_id}")
async def get_status(session_id: str):
    if session_id not in sessions:
        return {"error": "Session not found"}
    
    session = sessions[session_id]
    return {
        "status": session["status"],
        "tools_used": session.get("tools_used", []),
        "result": session.get("result", ""),
        "output": session.get("output", ""),
        "error": session.get("error", "")
    }

# WebSocket endpoint for real-time updates
@app.websocket("/ws/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str):
    await websocket.accept()
    
    if session_id not in sessions:
        await websocket.send_json({"error": "Session not found"})
        await websocket.close()
        return
    
    try:
        # Send initial state
        session = sessions[session_id]
        await websocket.send_json({
            "status": session["status"],
            "tools_used": session.get("tools_used", []),
            "output": session.get("output", ""),
            "result": session.get("result", ""),
            "error": session.get("error", "")
        })
        
        # If still processing, wait for completion
        if session["status"] == "running":
            # Simulate progressive updates
            if "browse" in session["prompt"].lower() or "web" in session["prompt"].lower():
                await websocket.send_json({
                    "status": "running",
                    "tools_used": ["browser"],
                    "output": "Loading webpage...",
                    "result": "I'm searching the web for information..."
                })
                await asyncio.sleep(2)
            
            # Wait for completion
            for _ in range(10):  # Timeout after 10 seconds
                if session["status"] != "running":
                    break
                await asyncio.sleep(1)
            
            # Send final state
            await websocket.send_json({
                "status": session["status"],
                "tools_used": session.get("tools_used", []),
                "output": session.get("output", ""),
                "result": session.get("result", ""),
                "error": session.get("error", "")
            })
            
    except WebSocketDisconnect:
        pass
    except Exception as e:
        await websocket.send_json({"error": str(e)})
    finally:
        if websocket.client_state.CONNECTED:
            await websocket.close()

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=5000, reload=True)