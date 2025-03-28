import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust to your OpenManus server

export const openManusService = {
  // Send a query to OpenManus
  async sendQuery(query: string) {
    const response = await axios.post(`${API_BASE_URL}/query`, { prompt: query });
    return response.data;
  },
  
  // Get execution status
  async getExecutionStatus(sessionId: string) {
    const response = await axios.get(`${API_BASE_URL}/status/${sessionId}`);
    return response.data;
  },

  // Stream agent response with WebSocket
  streamAgentResponse(query: string, onUpdate: (data: any) => void) {
    // Create a session first
    return new Promise<() => void>(async (resolve, reject) => {
      try {
        // Start a session
        const response = await axios.post(`${API_BASE_URL}/query`, { prompt: query });
        const sessionId = response.data.session_id;
        
        // Connect to WebSocket for real-time updates
        const ws = new WebSocket(`ws://localhost:5000/ws/${sessionId}`);
        
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          onUpdate(data);
          
          // Close connection when completed or error
          if (data.status === 'completed' || data.status === 'error') {
            ws.close();
          }
        };
        
        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };
        
        // Return cleanup function
        resolve(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.close();
          }
        });
      } catch (error) {
        console.error('Error starting session:', error);
        reject(error);
      }
    });
  }
};

// Map OpenManus tool names to UI tool names
export const mapToolName = (openManusToolName: string): string => {
  const toolMap: Record<string, string> = {
    'browser': 'browser_use',
    'terminal': 'bash',
    'python': 'python_execute',
    'file_editor': 'str_replace_editor',
    // Add more mappings as needed
  };
  
  return toolMap[openManusToolName] || openManusToolName;
};