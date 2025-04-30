// src/lib/Supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tbwxgcudgkmyvycarqph.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRid3hnY3VkZ2tteXZ5Y2FycXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczOTM1NDQsImV4cCI6MjA1Mjk2OTU0NH0.TbBYlIKASzsZIGk8QHeuY15cGb70UWQA04botFqbaIU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;