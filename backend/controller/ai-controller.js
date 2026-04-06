import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";
import Question from "../models/question-model.js";
import Session from "../models/session-model.js";
import {
  conceptExplainPrompt,
  questionAnswerPrompt,
} from "../utils/prompts-util.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateInterviewQuestions = async (req, res) => {
  console.log("hi");
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res
        .status(400)
        .json({ success: false, message: "sessionId is required" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    if (session.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    const { role, experience, topicsToFocus } = session;
    console.log("session: ", session);

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, 10);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let rawText = response.text;

    const jsonMatch = rawText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("No JSON array found in AI response");

    let cleanedText = jsonMatch[0];

    cleanedText = cleanedText
      .replace(/,\s*\]/g, "]")
      .replace(/,\s*\}/g, "}");

    let questions;
    try {
      questions = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Parse Error Details:", parseError.message);
      console.error("Cleaned Text Snippet:", cleanedText.substring(0, 500));
      throw new Error("Failed to parse AI response as JSON");
    }

    if (!Array.isArray(questions)) throw new Error("Response is not an array");

    const saved = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer || "",
        note: "",
        isPinned: false,
      })),
    );

    session.questions.push(...saved.map((q) => q._id));
    await session.save();

    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    import("node:fs").then((fs) => {
       fs.writeFileSync(
         import.meta.dirname + "/../user-generate-error.txt",
         "MESSAGE: " + error.message + "\nSTACK: " + error.stack
       );
    });
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

export const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let rawText = response.text;

    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON object found in AI response");

    let cleanedText = jsonMatch[0];
    cleanedText = cleanedText
      .replace(/,\s*\]/g, "]")
      .replace(/,\s*\}/g, "}");

    let explanation;
    try {
      explanation = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Parse Error Details:", parseError.message);
      throw new Error("Failed to parse AI response as JSON");
    }

    if (!explanation.title || !explanation.explanation) {
      throw new Error(
        "Response missing required fields: title and explanation",
      );
    }

    res.status(200).json({
      success: true,
      data: explanation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate("questions");

    if (!session)
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });

    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
