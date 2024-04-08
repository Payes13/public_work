import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// global IS COMING FROM THE GLOBAL SCOPE
let cached: MongooseConnection = (global as any).mongoose

// SINCE WE ARE USING NEXT.JS, WE HAVE TO CONNECT TO THE DB EVERYSINGLE TIME WE DO A REQUEST OR SERVER ACTION REQUEST BECAUSE NEXT.JS RUNS IN A SERVERLESS ENVIRONMENT. SERVERLESS FUNCTIONS ARE STATELESS MEANING THAT THEY START UP TO HANDLE THE REQUEST AND SHUT DONW AFTER WITHOUT MAINTAINING A CONTINUOUS CONNECTION TO THE DB. THIS APPROACH ENSURES THAT EACH REQUEST IS HANDLED INDEPENDENTLY ALLOWING FOR BETTER SCALABILITY AND RELIABILITY AS THERE IS NO NEED PERSISTENT CONNECTIONS ACCROSS MANY INSTANCES WHICH WORKS WELL WITH SCALABLE AND FLEXIBLE NATURE OF NEXT.JS APPS BUT DOING THAT WITHOUT ANY OPTIMIZATION WILL MEAN TOO MANY DB CONNECTIONS OPEN FOR EACH AND EVERY ACTION WE PERFORM ON THE SERVER SIDE. SO TO OPTIMIZE THIS WE WILL USE A CACHED CONNECTION.
if(!cached) {
  cached = (global as any).mongoose = { 
    conn: null, 
    promise: null 
  }
}

export const connectToDatabase = async () => {
  // THIS IS WHERE THE OPTIMIZATION HAPPENS
  if(cached.conn) return cached.conn;

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'jsm-imaginify', 
      bufferCommands: false 
    })

  cached.conn = await cached.promise;

  return cached.conn;
}