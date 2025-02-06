interface ApiRequest {
  content: string;
  source: "text" | "speech";
}

interface ApiResponse {
  id: string;
  content: string;
  timestamp: string;
  type: "ai";
}

const API_URL = "https://api.mistral.ai/v1/chat/completions"; // Replace with your api endpoint

const API_KEY = import.meta.env.VITE_API_KEY;
/**
 * Sends a chat message to the API and returns the AI response.
 * @param request The API request containing the message content and source.
 * @returns A promise that resolves to the API response.
 */
export const sendMessageToApi = async (request: ApiRequest): Promise<ApiResponse> => {
  try {
    // Make a POST request to the API endpoint
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-large-latest", // Use the appropriate model
        messages: [{ role: "user", content: request.content }],
      }),
    });
 // Parse the JSON response
    const data = await response.json();
    return {
      id: data.id || Math.random().toString(36).substring(7),
      content: data.choices[0]?.message?.content || "No response",
      timestamp: new Date().toISOString(),
      type: "ai",
    };
  } catch (error) {
    console.error("Error fetching Mistral API:", error);
    return {
      id: Math.random().toString(36).substring(7),
      content: "Error: Unable to get response",
      timestamp: new Date().toISOString(),
      type: "ai",
    };
  }
};
