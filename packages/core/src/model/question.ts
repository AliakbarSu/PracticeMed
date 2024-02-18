import * as mongodb from "mongodb";
import { ObjectId } from "mongodb";
import { Config } from "sst/node/config";
import { QuestionObject } from "../../types/Question";

const MongoClient = mongodb.MongoClient;
let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(Config.MONGODB_URI);
  cachedDb = await client.db("Questions");
  return cachedDb;
}

export const getQuestions = async (
  type = "amc",
  limit = 100,
  filters: any = {},
): Promise<QuestionObject[]> => {
  const db = await connectToDatabase();
  return db
    .collection("questions")
    .find({ type: type.toLowerCase(), available: true, ...filters })
    .limit(limit)
    .toArray();
};

export const getAllQuestions = async (
  filters: any = {},
): Promise<QuestionObject[]> => {
  const db = await connectToDatabase();
  return db
    .collection("questions")
    .find({ ...filters })
    .toArray();
};

export const getQuestion = async (id: string): Promise<QuestionObject[]> => {
  const db = await connectToDatabase();
  return db
    .collection("questions")
    .find({ _id: new ObjectId(id), available: true })
    .toArray();
};

export const addQuestion = async (question: Omit<QuestionObject, "_id">) => {
  const db = await connectToDatabase();
  const doc = db.collection("questions").insertOne(question);
  return { id: doc.insertedId, ...question };
};

export const updateQuestion = async (
  id: string,
  question: Partial<Omit<QuestionObject, "_id">>,
) => {
  delete (question as any).id;
  const db = await connectToDatabase();
  return db
    .collection("questions")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...question, updated_at: Date.now() } },
      { returnDocument: "after" },
    );
};
