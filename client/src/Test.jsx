import './App.css';
import io from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import QRCode from 'react-qr-code';

const socket = io.connect('192.168.1.165:3001');

function Test() {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const [start, setStart] = useState(false);
  const [endTime, setEndTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [picker, setPicker] = useState('00:00:00');
  const [room, setRoom] = useState(null);
  const [inputRoom, setInputRoom] = useState(null);
  const [enterRoom, setEnterRoom] = useState(false);

  let id = useRef();

  const createRoom = () => {
    const randomRoom = Math.floor(10000 + Math.random() * 90000);

    setRoom(randomRoom);
    setEnterRoom(true);
  };

  const joinRoom = () => {
    if (room != null) {
      socket.emit('join_room', room);
    }
  };

  useEffect(() => {
    console.log('useeffect');
    joinRoom();
  }, [enterRoom]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('send_message', { message, room });
  };

  useEffect(() => {
    socket.on('received_message', (data) => {
      console.log(data);
      setReceivedMessage(data.message);
    });

    socket.on('clock', (data) => {
      console.log(data);
      setStart(data.start);
    });

    socket.on('time', (data) => {
      console.log(data);
      setPicker(data.picker);
    });
  }, [socket]);

  function vibrate() {
    navigator.vibrate(50);
    console.log('vibrate');
  }

  function setTime(e) {
    e.preventDefault();
    // const currentTime = Date.now();
    // const min = inputMinutes;
    // const sec = inputSeconds;
    setMinutes(String(inputMinutes));
    setSeconds(String(inputSeconds));
    setInputMinutes(0);
    setInputSeconds(0);
    // setStartTime(Date.now());
    // setEndTime(Date.now() + min * 60000 + sec * 1000);
  }

  function startCountdown() {
    const currentTime = Date.now();
    const end = currentTime + minutes * 60000 + seconds * 1000;

    setEndTime(end);

    id.current = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = end - currentTime;

      if (remainingTime >= 0) {
        setRemainingTime(remainingTime);
        setMinutes(
          String(Math.floor(remainingTime / 1000 / 60)).padStart(2, '0')
        );
        setSeconds(
          String(Math.floor((remainingTime / 1000) % 60)).padStart(2, '0')
        );
      } else {
        clearInterval(id.current);
        setStart(false);
        console.log('clear interval');
      }
    }, 100);
  }

  function remoteStart() {
    socket.emit('start_clock', { start: true, room });
  }

  function remoteStop() {
    socket.emit('start_clock', { start: false, room });
  }

  useEffect(() => {
    console.log('useEffect start');
    if (start === true) {
      startCountdown();
    } else {
      pauseCountdown();
      setStart(false);
    }
  }, [start]);

  function pauseCountdown() {
    clearInterval(id.current);
  }

  function resetCountdown() {
    clearInterval(id.current);
    setMinutes('00');
    setSeconds('00');
  }

  useEffect(() => {
    setMinutes(picker?.split(':')[1]);
    setSeconds(picker?.split(':')[2]);
    console.log(picker);
    socket.emit('set_time', { picker, room });
  }, [picker]);

  return (
    <div className="App">
      {/* <input placeholder="Room #" onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Join</button> */}
      {/* <input
        placeholder="message..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMEssage}>Send message</button>

      <h2>Room # {room}</h2>

      <h1>Message: </h1>
      {messageReceived}

      <button onClick={startClock}>Start</button>
      <button onClick={stopClock}>Stop</button>
      {start ? 'running' : 'stopped'} */}
      <h2>Countdown</h2>
      <div className="clock">
        {minutes.padStart(2, '0')}:{seconds.padStart(2, '0')}
      </div>
      <button onClick={startCountdown}>Start</button>
      <button onClick={pauseCountdown}>Pause</button>
      <button onClick={resetCountdown}>Reset</button>
      <div className="time-selector">
        {/* <form onSubmit={(e) => setTime(e)}>
          <input
          type="number"
          value={inputMinutes}
          min={0}
          onChange={(e) => setInputMinutes(e.target.value)}
          />
          <input
          type="number"
          value={inputSeconds}
          min={0}
          onChange={(e) => setInputSeconds(e.target.value)}
          />
          <button>Submit</button>
        </form> */}

        <TimePicker
          clearText={null}
          showHour={false}
          showSecond={true}
          onChange={(e) => setPicker(e._d.toString().split(' ')[4])}
          defaultValue={moment().hour(0).minute(0).second(0)}
          allowEmpty={false}
        />
      </div>

      <button onClick={createRoom}>Create Room</button>
      <h2>{room == null ? 'Click Create Room' : room}</h2>

      <input
        type="number"
        onChange={(e) => setRoom(Number(e.target.value))}
        value={room}
      />
      <button onClick={joinRoom}>Join Room</button>

      <form onSubmit={sendMessage}>
        <input type="text" onChange={(e) => setMessage(e.target.value)} />
        <button>send</button>
      </form>

      <button onClick={remoteStart}>Remote start</button>
      <button onClick={remoteStop}>Remote stop</button>
      {/* <button onClick={remoteReset}>Remote reset</button> */}
      <button onClick={vibrate}>Vibrate</button>

      {room && <QRCode value={room} />}
    </div>
  );
}

export default Test;
