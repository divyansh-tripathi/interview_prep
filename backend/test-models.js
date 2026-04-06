import dotenv from "dotenv";
import fs from "fs";
dotenv.config();
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function list() {
  try {
    const res = await ai.models.list();
    const models = [];
    for await (const model of res) {
      models.push(model.name);
    }
    fs.writeFileSync("models.txt", models.join("\n"));
  } catch (err) {
    console.error(err.message);
  }
}
list();
