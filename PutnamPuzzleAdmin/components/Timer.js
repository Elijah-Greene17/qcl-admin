import { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import Button from './Button';

import { initializeApp } from "firebase/app"
import { getDatabase, onValue, ref } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAYWnHYwXqH17hZbXIAT76bFgtN7gNyY7Q",
  authDomain: "quietcornerquests.firebaseapp.com",
  projectId: "quietcornerquests",
  storageBucket: "quietcornerquests.appspot.com",
  messagingSenderId: "170321202795",
  appId: "1:170321202795:web:ee95b6d259360368fc6b2e",
  measurementId: "G-0RJ6VZ0546"
}

const Timer = ({ hidden, time }) => {
  const [endTime, setEndTime] = useState(4000)
  const [running, setRunning] = useState(false)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const updateTimer = () => {
    // console.log(time)
    // let timeClone = time
    // const h = Math.floor(timeClone / 3600)
    // timeClone = time % 3600
    // const m = Math.floor(timeClone / 60)
    // timeClone = time % 60
    // const s = timeClone
    // setHours(h)
    // setMinutes(m)
    // setSeconds(s)


    // const decInt = time - 1;
    // setRunTime(decInt)
    console.log("run timer")
    const totalTime = endTime - Date.now()
    let timeClone = totalTime
    const h = Math.floor(timeClone / 3600000)
    timeClone = totalTime % 3600000
    const m = Math.floor(timeClone / 60000)
    timeClone = totalTime % 60000
    const s = timeClone
    setHours(h)
    setMinutes(m)
    setSeconds(s)

  }

  useEffect(() => {

    //Sync time from DB
    const app = initializeApp(firebaseConfig)
    const db = getDatabase()
    const timerRef = ref(db, 'app/timer/endTime')
    onValue(timerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const myDate = new Date(data)
        setEndTime(myDate)
        console.log("Data from DB: ", myDate.toString())
        console.log("Now: ", Date.now())
        console.log("Data-Now: ", parseInt(data) - Date.now())
        console.log()

        //setRunTime(parseInt(data) - Date.now())
        const totalTime = parseInt(data) - Date.now()

        let timeClone = totalTime
        const h = Math.floor(timeClone / 3600000)
        timeClone = totalTime % 3600000
        const m = Math.floor(timeClone / 60000)
        timeClone = totalTime % 60000
        const s = timeClone
        setHours(h)
        setMinutes(m)
        setSeconds(s)

        console.log("While: ", parseInt(Date.now()) < myDate)
        setTimeout(() => {
          console.log("r")
          updateTimer()
        }, 1000)
        // while (parseInt(Date.now()) < myDate) {
        //   console.log("l")

        // }

        //setRunning(true)


      } else {
        console.log("no timer stuff")
      }

    })
    // if (running) {
    //   console.log("running")
    //   while (parseInt(Date.now()) < endTime) {
    //     setTimeout(() => {
    //       console.log("r")
    //       updateTimer()
    //     }, 1000)
    //   }
    //   console.log('done')
    // } else {
    //   console.log("not running: ", running)
    // }
  }, [time])

  const timer = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '5%',
    height: '15%',
  };

  const timerText = {
    fontSize: 80,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  };

  return (
    <View style={timer}>
      {!hidden && <Text style={timerText}>
        {hours}:
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}</Text>}
    </View>
  );
};

export default Timer;
