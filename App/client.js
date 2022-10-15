import {QueryClient  , useQuery} from 'react-query'


export const key = {
    Contact: 'Contact', //{}
    ContactsSeleted: 'ContactsSelected', //[]
    ContactHeaderSelected:'ContactHeaderSelected', //boolean
    BottomSheetNavigator: 'BottomSheetNavigator',
    BottomSheetSelectContact: 'BottomSheetSelectContact'
}


const queryClient = new QueryClient()

export const useRQGlobalState = (key, initialData, options) => [
    useQuery([key], () => initialData , {
        enabled: false,
        cacheTime:Infinity,
        staleTime:Infinity,
        initialData,
        ...options
    }).data,
    (value) => queryClient.setQueryData(key, value)
]

export default queryClient