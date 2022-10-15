import React from 'react'
import {createContext} from 'react'

export const ContactContext = createContext()


const ContactContextProvider = ({children}) => {
  const [contactFormData, setContactFormData] = React.useState({
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    nickName: '',
    phoneNumbers: [],
    emailAddresses: [],
    profile: '', //social profile,
    imAddresses: [],
    postalAddresses:[],
    job:[],
    birthday: {year:null, month:null, day:null, dateString:null},
    urls:[],
    relationship:[],
    tags:[],
    notes:[]
  }) 
  const [birthdayModalVisible, setBirthdayModalVisible] = React.useState(false)
  // const [dateModalVisible, setDateModalVisible] = React.useState(false)
  const phoneNumbers = React.useMemo(() => (contactFormData.phoneNumbers), [contactFormData.phoneNumbers])
  const emailAddresses = React.useMemo(() => (contactFormData.emailAddresses), [contactFormData.emailAddresses])
  const imAddresses = React.useMemo(() => (contactFormData.imAddresses), [contactFormData.imAddresses])
  const postalAddresses = React.useMemo(() => (contactFormData.postalAddresses), [contactFormData.postalAddresses])
  const birthday = React.useMemo(() => (contactFormData.birthday), [contactFormData.birthday])
  const urls = React.useMemo(() => (contactFormData.urls), [contactFormData.urls])
  const relationship = React.useMemo(() => (contactFormData.relationship), [contactFormData.relationship])
  const tags = React.useMemo(() => (contactFormData.tags), [contactFormData.tags])


  const {title, firstName, middleName, lastName, suffix, nickName} = contactFormData

  // add input field functions
  const onChangeTitle =React.useCallback((value) => {
    setContactFormData((prevState) => ({...prevState, title: value}))
  },[contactFormData.title])

  const onChangeFirstName = React.useCallback((value) => {
    setContactFormData((prevState) => ({...prevState, firstName:value}))
  }, [contactFormData.firstName])

  const onChangeMiddleName = React.useCallback((value) => {
    setContactFormData((prevState) => ({...prevState, middleName:value}))
  }, [contactFormData.middleName])

  const onChangeLastName = React.useCallback((value) => {
    setContactFormData((prevState) => ({...prevState, lastName:value}))
  }, [contactFormData.lastName])

  const onChangeSuffix = React.useCallback((value) => {
    setContactFormData((prevState) => ({...prevState, suffix:value}))
  }, [contactFormData.suffix])

  const onChangeNickName = React.useCallback((value) => {
    setContactFormData((prevState) => ({...prevState, nickName:value}))
  }, [contactFormData.nickName])

  const onPressPhone = React.useCallback((value) => {
    const {phoneNumbers} = contactFormData
    setContactFormData((prevState) => ({...prevState, phoneNumbers: [...phoneNumbers, value]}))
  }, [contactFormData.phoneNumbers])

  const onPressEmail = React.useCallback((value) => {
    const {emailAddresses} = contactFormData
    setContactFormData((prevState) => ({...prevState, emailAddresses: [...emailAddresses, value]}))
  }, [contactFormData.emailAddresses])

  const onPressProfile = () => {}

  const onPressImAddress = React.useCallback((value) => {
    const {imAddresses} = contactFormData
    setContactFormData((prevState) => ({...prevState, imAddresses: [...imAddresses, value]}))
  },[contactFormData.imAddresses])

  const onPressPostalAddress = React.useCallback((value) => {
      const {postalAddresses} = contactFormData
      setContactFormData((prevState) => ({...prevState, postalAddresses: [...postalAddresses, value]}))
  },[contactFormData.postalAddresses])

  const onPressJob = React.useCallback((value) => {
    const {job} = contactFormData
    setContactFormData((prevState) => ({...prevState, job: [...job, value]}))
  },[contactFormData.job])

  const onPressUrl = React.useCallback((value) => {
    const {urls} = contactFormData
    setContactFormData((prevState) => ({...prevState, urls:[...urls, value]}))
  },[contactFormData.urls])

  const onPressRelationship = React.useCallback((value) => {
    const {relationship} = contactFormData
    setContactFormData((prevState) => ({...prevState, relationship:[...relationship, value]}))
  }, [contactFormData.relationship])

  const onPressNote = React.useCallback((value) => {
    const {notes} = contactFormData
    setContactFormData((prevState) => ({...prevState, notes: [...notes, value]}))
  },[contactFormData.notes])


  const test = React.useCallback(() => {},[])

  // change state functions
  const onChangePhone = React.useCallback((value, index) => {
    setContactFormData((prevState) => {
      const {phoneNumbers} = contactFormData
      phoneNumbers[index] =  {label:value.label, number: value.number.replace(/[^0-9]/g, '')}
      return {...prevState, phoneNumbers:phoneNumbers}
    })
  },[contactFormData.phoneNumbers])

  const onChangeEmail = React.useCallback((value, index) => {
    setContactFormData((prevState) => {
      const {emailAddresses} = contactFormData
      emailAddresses[index] = value
      return {...prevState, emailAddresses:emailAddresses}
    })
  },[contactFormData.emailAddresses])

  const onChangeImAddress = React.useCallback((value, index) => {
    setContactFormData((prevState) => {
      const {imAddresses} = contactFormData
      imAddresses[index] = value
      return {...prevState, imAddresses:imAddresses}
    })
  },[contactFormData.imAddresses])

  const onChangeBirthDay = React.useCallback((data) => {
    const {year, day, month, dateString} = data
    
    setContactFormData((prevState) => ({...prevState, birthday:{year, month, day, dateString}})
    )
  },[contactFormData.birthday])

  // const onChangeDate = React.useCallback((data) => {
  //   const {year, day, month, dateString} = data
    
  //   setContactFormData((prevState) => ({...prevState, birthday:{year, month, day, dateString}})
  //   )
  // },[contactFormData.birthday])

  const onChangePostalAddress = React.useCallback((value, index) => {
    setContactFormData((prevState) => {
      const {postalAddresses} = contactFormData
      postalAddresses[index] = value
      return {...prevState, postalAddresses}
    })
  }, [contactFormData.postalAddresses])

  const onChangeJob = React.useCallback((value, index) => {
    setContactFormData((prevState) => {
      const {job} = contactFormData
      job[index] = value
      return {...prevState, job}
    })
  },[contactFormData.job])

  const onChangeUrl = React.useCallback((value, index) => {
    setContactFormData((prevState) => {
      const {urls} = contactFormData
      urls[index] = value
      return {...prevState, urls}
    })
  }, [contactFormData.urls])

  const onChangeRelationship = React.useCallback((value, index) => {
    setContactFormData((prevState) => {
      const {relationship} = contactFormData
      relationship[index] = value
      return {...prevState, relationship}
    })
  },[contactFormData.relationship])

  const onChangeNote = React.useCallback((value, index) => {
    setContactFormData((prevState) => {
      const {notes} = contactFormData
      notes[index] = value
      return {...prevState, notes}
    })
  }, [contactFormData.notes])

  // remove funtion

  const removePhoneNumbers = React.useCallback((index) => {
    const newData = contactFormData.phoneNumbers.slice()
    newData.splice(index, 1)
    setContactFormData((prevState) => ({...prevState, phoneNumbers:newData}))
  },[contactFormData.phoneNumbers])

  const removeEmailAddress = React.useCallback((index) => {
    const newData = contactFormData.emailAddresses.slice()
    newData.splice(index, 1)
    setContactFormData((prevState) => ({...prevState, emailAddresses:newData}))
  },[contactFormData.emailAddresses])

  const removeImAddresses = React.useCallback((index) => {
    const newData = contactFormData.imAddresses.slice()
    newData.splice(index, 1)
    setContactFormData((prevState) => ({...prevState, imAddresses:newData}))
  },[contactFormData.imAddresses])

  const removePostalAddress = React.useCallback((index) => {
    const newData = contactFormData.postalAddresses.slice()
    newData.splice(index, 1)
    setContactFormData((prevState) => ({...prevState, postalAddresses:newData}))
  },[contactFormData.postalAddresses])

  const removeJob= React.useCallback((index) => {
    const newData = contactFormData.job.slice()
    newData.splice(index, 1)
    setContactFormData((prevState) => ({...prevState, job:newData}))
  },[contactFormData.job])

  const removeUrls = React.useCallback((index) => {
    const newData = contactFormData.urls.slice()
    newData.splice(index, 1)
    setContactFormData((prevState) => ({...prevState, urls:newData}))
  },[contactFormData.urls])

  const removeRelationship = React.useCallback((index) => {
    const newData = contactFormData.relationship.slice()
    newData.splice(index, 1)
    setContactFormData((prevState) => ({...prevState, relationship:newData}))
  },[contactFormData.relationship])

  const removeNote = React.useCallback((index) => {
    const newData = contactFormData.notes.slice()
    newData.splice(index, 1)
    setContactFormData((prevState) => ({...prevState, notes: newData}))
  },[contactFormData.notes])

  return (
    <ContactContext.Provider value={{
      contactFormData,
      birthday,
      birthdayModalVisible,
      setBirthdayModalVisible,
      title,
      firstName,
      middleName,
      lastName,
      suffix, 
      nickName,
      phoneNumbers,
      emailAddresses,
      imAddresses,
      postalAddresses,
      urls,
      relationship,
      tags,
      onChangeTitle,
      onChangeFirstName,
      onChangeMiddleName,
      onChangeLastName,
      onChangeSuffix,
      onChangeNickName,
      onPressPhone,
      onPressEmail,
      onPressProfile,
      onPressImAddress,
      onPressPostalAddress,
      onPressJob,
      onPressUrl,
      onPressRelationship,
      onPressNote,
      test,
      onChangePhone,
      onChangeEmail,
      onChangeImAddress,
      onChangeBirthDay,
      onChangePostalAddress,
      onChangeJob,
      onChangeUrl,
      onChangeRelationship,
      onChangeNote,
      removePhoneNumbers,
      removeEmailAddress,
      removeImAddresses,
      removePostalAddress,
      removeJob,
      removeUrls,
      removeRelationship,
      removeNote,
      setContactFormData
    }}>
      {children}
    </ContactContext.Provider>
  )
}

export default ContactContextProvider