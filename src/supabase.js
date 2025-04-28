import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://brueizjcjsnbeerqkgyv.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJydWVpempjanNuYmVlcnFrZ3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDYzNTcsImV4cCI6MjA2MDQ4MjM1N30.lBbIkjwxBB9gvfhvqS_S9edScNV0IJlm9Ilm6a5WVAU"

export const supabase = createClient(supabaseUrl, supabaseKey);
