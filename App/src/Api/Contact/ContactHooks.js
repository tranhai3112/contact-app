import { useQueryClient, useQuery, useMutation } from "react-query";
import {getContacts, insertContact, updateContact, deleteContact} from './ContactApi'

export const useGetContacts = () => {
    const queryClient = useQueryClient()
    return [useQuery(['Contacts'], () => getContacts(), {

    }),(value) => queryClient.setQueryData('Contacts', value)]
}

export const useInsertContact = () => {
    const queryClient = useQueryClient()
    return useMutation('insert-contact',(contact) => insertContact(contact), {
        onSuccess:() => {
            queryClient.invalidateQueries('Contacts')
        }
    })
}

export const useUpdateContact = () => {
    const queryClient = useQueryClient()
    return useMutation('update-contact', (contact) => updateContact(contact), {
        onSuccess: () => {
            queryClient.invalidateQueries('Contacts')
        }
    })
}

export const useDeleteContacts = () => {
    const queryClient = useQueryClient()
    return useMutation('delete-contact', (ids) => deleteContact(ids), {
        onSuccess: () => {
            queryClient.invalidateQueries('Contacts')
        }
    })
}