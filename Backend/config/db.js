import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

const connectDb = async () => {
    console.log("Supabase connected successfully");
};

export { supabase };
export default connectDb;