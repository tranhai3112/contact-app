import React, { useEffect, useState } from 'react'
import {Modal, View, Pressable} from 'react-native'
import colors from '../../../constants/colors'
import { Text } from '@ui-kitten/components'
import {Calendar} from 'react-native-calendars'

const CustomCalendar = ({visible, onClose, onDayPress, data}) => {
  const [calendarState, setCalendarState] = useState({
    selectedDate: {},
    markedDates:{}
  })
  const restoreState = React.useMemo(() => {
    if (!(data?.day !== null && data?.month !== null && data?.year !== null && data?.dateString !== null)){
      return {
        selectedDate: {},
        markedDates:{}
      }     
    }
    return {
      selectedDate: {
        day: data?.day,
        month: data?.month,
        year: data?.year,
        dateString: data?.dateString
      },
      markedDates: calendarState.markedDates
    }
  },[data])

  const getSelectedDayEvents = date => {
    const {day, month, year, dateString} = date
    let markedDates = {};
    markedDates[dateString] = { selected: true, color: '#00B0BF', textColor: '#FFFFFF' };
    setCalendarState({
        selectedDate: {day, month, year, dateString},
        markedDates: markedDates
  })}
  const onSave = () => {
    onDayPress(calendarState.selectedDate)
    onClose()
  }
  const onExit = () => {
    setCalendarState(restoreState)
    onClose()
  }

  return (
    <Modal visible={visible} animationType='fade' transparent={true} style={{flex:1}}>
      <Pressable style={{flex:1,justifyContent:'center', alignItems:'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <View style={{width:300, maxWidth:'100%'}}>
        <Calendar
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            todayTextColor: "#57B9BB",
            dayTextColor: "#222222",
            textDisabledColor: "#d9e1e8",
            monthTextColor: "#57B9BB",
            arrowColor: "#57B9BB",
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "500",
            textDayFontSize: 16,
            textMonthFontSize: 18,
            selectedDayBackgroundColor: "#57B9BB",
            selectedDayTextColor: "white",
            textDayHeaderFontSize: 8
          }}
          current={restoreState?.selectedDate?.dateString || new Date().toISOString().split('T')[0]}
          monthFormat={'yyyy MM'}
          onDayPress={(day) => getSelectedDayEvents(day)}
          markedDates={calendarState.markedDates}
          scrollEnabled={true}
          horizontal={true}
          minDate={"1996-05-10"}
          maxDate={"2030-05-30"}
          showScrollIndicator={true}
          disableMonthChange={true}
          onPressArrowLeft={subtractMonth => subtractMonth()}
          onPressArrowRight={addMonth => addMonth()}
          enableSwipeMonths={true}
        />
        <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-end', paddingBottom:20, width:'100%', height:'15%',backgroundColor:'#fff'}}>
            <Pressable onPress={onExit} style={{paddingHorizontal:14}}>
                <Text category={'s1'} style={{color:colors.primaryColor}}>Huy</Text>
            </Pressable>
            <Pressable onPress={onSave} style={{paddingHorizontal:14}}>
                <Text category={'s1'} style={{color:colors.primaryColor}}>Ok</Text>
            </Pressable>
        </View>
        </View>
        
      </Pressable>
      </Modal>
  )
}

export default CustomCalendar