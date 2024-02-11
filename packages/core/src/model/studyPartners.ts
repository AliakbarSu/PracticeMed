import * as mongodb from "mongodb";
import { Config } from "sst/node/config";
import { User } from "../../types/User";
import { StudyPartner } from "../../types/StudyPartner";

const MongoClient = mongodb.MongoClient;
let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(Config.MONGODB_URI);
  cachedDb = await client.db("StudyPartners");
  return cachedDb;
}

export const getPartner = async (userId: string): Promise<User> => {
  const db = await connectToDatabase();
  return db.collection("partners").findOne({ userId });
};

export const getAllPartners = async (): Promise<User[]> => {
  const db = await connectToDatabase();
  return db.collection("partners").find({}).toArray();
};

export const addPartner = async (
  partner: StudyPartner,
): Promise<StudyPartner> => {
  const db = await connectToDatabase();
  return db.collection("partners").insertOne(partner);
};
