import { Database } from "./supabase";

export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Todo = Database["public"]["Tables"]["todos"]["Row"];
