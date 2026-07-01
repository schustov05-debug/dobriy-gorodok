// src/api/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Этот клиент будет автоматически подхватывать токен из localStorage
export const supabase = createClient(supabaseUrl, supabaseKey);