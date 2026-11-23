import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://idiouynuwnjbjnphcpmk.supabase.co";
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkaW91eW51d25qYmpucGhjcG1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwNzQxNDcsImV4cCI6MjEwMDY1MDE0N30.7zyQCUzZYbKqIe3wnYCgm4WZUUcTl6RvaDUFFwQZzL8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

