import mongoose from "mongoose";
import connectToDatabase from "../config/db";
import UserModel from "../models/userModel";
import ArticleModel from "../models/articleModel";
import { ConsultationModel } from "../models/consultationModel";
import SessionModel from "../models/sessionModel";
import VerificationCodeModel from "../models/verificationCodeModel";
import ChatRoom from "../models/chatRoom";
import LogModel from "../models/logModel";

const collections = [
  { name: "users", model: UserModel },
  { name: "articles", model: ArticleModel },
  { name: "consultations", model: ConsultationModel },
  { name: "sessions", model: SessionModel },
  { name: "verificationcodes", model: VerificationCodeModel },
  { name: "chatrooms", model: ChatRoom },
  { name: "logs", model: LogModel },
];

async function clearAll() {
  console.log("\n=== Clear All Collections ===\n");

  await connectToDatabase();

  for (const { name, model } of collections) {
    const result = await (model as any).deleteMany({});
    console.log(`  Cleared ${name}: ${result.deletedCount} documents deleted`);
  }

  console.log("\n=== All collections cleared ===\n");
  mongoose.disconnect();
}

clearAll().catch((err) => {
  console.error("Clear failed:", err);
  mongoose.disconnect();
  process.exit(1);
});
