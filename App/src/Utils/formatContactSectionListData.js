//https://stackoverflow.com/questions/44268744/how-do-i-get-my-data-into-the-correct-format-for-react-natives-sectionlist
const contactData = (contacts) =>{
    const groupContact = contacts.reduce((acc, contact) => {
      let key = '#'
      if(contact.firstName && contact.firstName.length){
        key = contact.firstName[0]
      }
      const foundIndex = acc.findIndex(element => element.title === key);
      if (foundIndex === -1) {
        return [
          ...acc, 
          {
            title: key,
            data: [contact],
          },
        ];
      }
      acc[foundIndex].data = [...acc[foundIndex].data, contact];
      return acc;
    }, []);
    return groupContact.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
} 
export default contactData