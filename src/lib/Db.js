// src/lib/Supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fboyxnzsekxhoszbyhnh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZib3l4bnpzZWt4aG9zemJ5aG5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMDQ1OTEsImV4cCI6MjA2MzY4MDU5MX0.jRhlROnAQCBR41o1KmPSdo8uSmWZ0S-3vRZ35ZCIRao';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;