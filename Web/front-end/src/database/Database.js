import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabaseServerKey = process.env.REACT_APP_SUPABASE_SERVER_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
export const supabaseServer = createClient(supabaseUrl, supabaseServerKey)