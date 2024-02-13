import { example_feedback } from "./resources";
import { Config } from "sst/node/config";
import { ChatGPTAPI } from "chatgpt";
import { Feedback } from "../../types/Result";

export const generate_feedback = async (stats: any): Promise<Feedback[]> => {
  const api = new ChatGPTAPI({
    apiKey: Config.CHAT_GPT_API_KEY,
  });

  const command = `Analysis this dataset: ${JSON.stringify(stats)} 
  and give me feedback similar to this in json: ${example_feedback} 
`;
  const response = await api.sendMessage(command);
  try {
    const result = JSON.parse(response.text);
    if (result && !result.feedback) {
      throw new Error("Invalid response from ChatGPT");
    }
    return result?.feedback;
  } catch (e) {
    console.error(e);
    return [];
  }
};
