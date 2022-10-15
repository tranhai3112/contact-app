//0e1984b2-777e-4ef8-8b84-6692adb5ea80
import {supabase} from '../SupabaseApi'

export const getContacts = async () => {
    let {data, error} = await supabase
    .from('contact')
    .select('*')
    return {data, error}
}

export const insertContact = async (contact) => {
   const { data, error } = await supabase
  .from('contact')
  .insert([
    contact
  ])
  return {data,error}
}


export const updateContact = async (contact) => {
  const {data, error} = await supabase
    .from('contact')
    .update(contact)
    .eq('id', contact.id)
  return {data, error}
}

export const deleteContact = async (ids) => {
  const {data, error} = await supabase
    .from('contact')
    .delete()
    .in('id', ids)
    return {data, error}
}