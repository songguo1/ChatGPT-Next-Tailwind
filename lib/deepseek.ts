import OpenAI from "openai";

const deepseek = new OpenAI({
        baseURL: process.env.DEEPSEEK_API_Base_URL,
        apiKey: process.env.DEEPSEEK_API_Key,
});
export default deepseek