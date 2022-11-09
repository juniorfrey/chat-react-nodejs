
import './App.css';
import io from 'socket.io-client';
import {useState, useEffect} from 'react';

const socket = io('http://localhost:5000');

function App() {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('mensaje', message);
    setMessage('');
    const nuevoMensaje = {
      body:message,
      from:"Yo"
    }
    setMessages([nuevoMensaje, ...messages]);
  };

  useEffect(() => {

    const recibirMensaje = mensajerecibido => {
      
      setMessages([...messages, mensajerecibido]);

    }

    socket.on("mensaje", recibirMensaje);

    return () => {
       socket.off("mensaje", recibirMensaje);
    }

  }, [messages])

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center rounded">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className="text-2xl font-bold my-2">Chat React</h1>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="border-2 border-zinc-700 p-2 text-black w-full rounded"
        />
        <button className="bg-blue-500 border-2 border-white-300 rounded w-full my-3">
          Enviar
        </button>
        <ul className="h-80 overflow-y-auto">
          {messages.map((mess, index) => (
            <li
              key={index}
              className={`my-2 p-2 table text-sm rounded-md ${
                mess.from === "Yo" ? "bg-sky-700 ml-auto" : "bg-gray-500"
              }`}
            >
              <p>
                {mess.from}: {mess.body}
              </p>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
