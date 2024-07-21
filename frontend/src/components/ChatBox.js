import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT =
  window.location.host.indexOf('localhost') >= 0
    ? 'http://127.0.0.1:5000'
    : window.location.host;

export default function ChatBox(props) {
  const { userInfo } = props;
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const isOpenRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState('');
  const [messages, setMessages] = useState([
    { name: 'Admin', body: 'Hello there, Please ask your question.' },
  ]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);

    sk.emit('onLogin', {
      _id: userInfo._id,
      name: userInfo.name,
      isAdmin: userInfo.isAdmin,
    });

    sk.on('adminStatus', (status) => {
      if (!status.online) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { body: 'Sorry. I am not online right now', name: 'Admin' },
        ]);
      }
    });

    sk.on('message', (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { body: data.body, name: data.isAdmin ? 'Admin' : data.name },
      ]);
      if (!isOpenRef.current) {
        setUnreadCount((prevCount) => prevCount + 1);
      }
    });

    return () => sk.disconnect();
  }, [userInfo]);

  const supportHandler = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert('Error. Please type a message.');
    } else {
      const newMessage = {
        body: messageBody,
        name: userInfo.isAdmin ? 'Admin' : userInfo.name,
      };
      setMessages([...messages, newMessage]);
      setMessageBody('');
      socket.emit('onMessage', {
        body: messageBody,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
        _id: userInfo._id,
      });
    }
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <div className={`chatbox ${isOpen ? 'chatbox-open' : 'chatbox-closed'}`}>
      {!isOpen ? (
        <button
          type="button"
          className="chatboxButton"
          onClick={supportHandler}
        >
          <i className="fa fa-commenting " />
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </button>
      ) : (
        <div className="card-body">
          <div className="row">
            <span>Support</span>
            <button className="na-close" onClick={closeHandler}></button>
          </div>
          <div className="row adminrow">
            <div className="adminname">
              <div className="fa fa-user-circle-o pednguser"></div>Admin
            </div>
          </div>
          <ul ref={uiMessagesRef} className="chatbox-messages adminrow">
            {messages.map((msg, index) => (
              <li
                key={index}
                className={
                  msg.name === 'Admin' ? 'admin-message' : 'user-message'
                }
              >
                {msg.body}
              </li>
            ))}
          </ul>

          <form onSubmit={submitHandler} className="row chatrow">
            <input
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              type="text"
              placeholder="Type message"
            />
            <button type="submit" className="na-paper-plane"></button>
          </form>
        </div>
      )}
    </div>
  );
}

// import React, { useEffect, useRef, useState } from 'react';
// import socketIOClient from 'socket.io-client';

// const ENDPOINT =
//   window.location.host.indexOf('localhost') >= 0
//     ? 'http://127.0.0.1:5000'
//     : window.location.host;

// export default function ChatBox(props) {
//   const { userInfo } = props;
//   const [socket, setSocket] = useState(null);
//   const uiMessagesRef = useRef(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [messageBody, setMessageBody] = useState('');
//   const [messages, setMessages] = useState([
//     { name: 'Admin', body: 'Hello there, Please ask your question.' },
//   ]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   useEffect(() => {
//     if (uiMessagesRef.current) {
//       uiMessagesRef.current.scrollBy({
//         top: uiMessagesRef.current.clientHeight,
//         left: 0,
//         behavior: 'smooth',
//       });
//     }
//     if (socket) {
//       socket.emit('onLogin', {
//         _id: userInfo._id,
//         name: userInfo.name,
//         isAdmin: userInfo.isAdmin,
//       });
//       socket.on('message', (data) => {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { body: data.body, name: data.isAdmin ? 'Admin' : data.name },
//         ]);
//       });
//     }
//   }, [isOpen, socket, userInfo]);

//   useEffect(() => {
//     if (messages.length > 1) {
//       // To avoid triggering notification on initial render
//       if (!isOpen) {
//         // Increment unread count only if chatbox is closed
//         setUnreadCount((prevCount) => prevCount + 1);
//       }
//     }
//   }, [messages, isOpen]);

//   const supportHandler = () => {
//     setIsOpen(true);
//     setUnreadCount(0); // Reset unread count when chatbox is opened
//     const sk = socketIOClient(ENDPOINT);
//     setSocket(sk);
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (!messageBody.trim()) {
//       alert('Error. Please type a message.');
//     } else {
//       const newMessage = {
//         body: messageBody,
//         name: userInfo.isAdmin ? 'Admin' : userInfo.name,
//       };
//       setMessages([...messages, newMessage]);
//       setMessageBody('');
//       setTimeout(() => {
//         socket.emit('onMessage', {
//           body: messageBody,
//           name: userInfo.name,
//           isAdmin: userInfo.isAdmin,
//           _id: userInfo._id,
//         });
//       }, 1000);
//     }
//   };

//   const closeHandler = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div className={`chatbox ${isOpen ? 'chatbox-open' : 'chatbox-closed'}`}>
//       {!isOpen ? (
//         <button
//           type="button"
//           className="chatboxButton"
//           onClick={supportHandler}
//         >
//           <i className="fa fa-support" />
//           {unreadCount > 0 && (
//             <span className="notification-badge">{unreadCount}</span>
//           )}
//         </button>
//       ) : (
//         <div className="card card-body">
//           <div className="row">
//             <strong>Support</strong>
//             <button
//               type="button"
//               className="chatboxButton CROSS"
//               onClick={closeHandler}
//             >
//               <i className="fa fa-close" />
//             </button>
//           </div>
//           <ul ref={uiMessagesRef} className="chatbox-messages">
//             {messages.map((msg, index) => (
//               <li
//                 key={index}
//                 className={
//                   msg.name === 'Admin' ? 'admin-message' : 'user-message'
//                 }
//               >
//                 <strong>{msg.name}: </strong> {msg.body}
//               </li>
//             ))}
//           </ul>
//           <div className="chatbox-input">
//             <form onSubmit={submitHandler} className="row">
//               <input
//                 value={messageBody}
//                 onChange={(e) => setMessageBody(e.target.value)}
//                 type="text"
//                 placeholder="Type message"
//               />
//               <button type="submit" className="chatboxButton">
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useRef, useState } from 'react';
// import socketIOClient from 'socket.io-client';

// const ENDPOINT =
//   window.location.host.indexOf('localhost') >= 0
//     ? 'http://127.0.0.1:5000'
//     : window.location.host;

// export default function ChatBox(props) {
//   const { userInfo } = props;
//   const [socket, setSocket] = useState(null);
//   const uiMessagesRef = useRef(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [messageBody, setMessageBody] = useState('');
//   const [messages, setMessages] = useState([
//     { name: 'Admin', body: 'Hello there, Please ask your question.' },
//   ]);

//   useEffect(() => {
//     if (uiMessagesRef.current) {
//       uiMessagesRef.current.scrollBy({
//         top: uiMessagesRef.current.clientHeight,
//         left: 0,
//         behavior: 'smooth',
//       });
//     }
//     if (socket) {
//       socket.emit('onLogin', {
//         _id: userInfo._id,
//         name: userInfo.name,
//         isAdmin: userInfo.isAdmin,
//       });
//       socket.on('message', (data) => {
//         setMessages([...messages, { body: data.body, name: data.name }]);
//       });
//     }
//   }, [messages, isOpen, socket, userInfo]);

//   const supportHandler = () => {
//     setIsOpen(true);
//     console.log(ENDPOINT);
//     const sk = socketIOClient(ENDPOINT);
//     setSocket(sk);
//   };
//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (!messageBody.trim()) {
//       alert('Error. Please type message.');
//     } else {
//       setMessages([...messages, { body: messageBody, name: userInfo.name }]);
//       setMessageBody('');
//       setTimeout(() => {
//         socket.emit('onMessage', {
//           body: messageBody,
//           name: userInfo.name,
//           isAdmin: userInfo.isAdmin,
//           _id: userInfo._id,
//         });
//       }, 1000);
//     }
//   };
//   const closeHandler = () => {
//     setIsOpen(false);
//   };
//   return (
//     <div className="chatbox">
//       {!isOpen ? (
//         <button
//           type="button"
//           className="chatboxButton"
//           onClick={supportHandler}
//         >
//           <i className="fa fa-support" />
//         </button>
//       ) : (
//         <div className="card card-body backgroundchatbox">
//           <div className="row ">
//             <strong>Support </strong>
//             <button
//               type="button"
//               className="chatboxButton"
//               onClick={closeHandler}
//             >
//               <i className="fa fa-close" />
//             </button>
//           </div>
//           <ul ref={uiMessagesRef} className="backgroundGreen">
//             {messages.map((msg, index) => (
//               <li key={index}>
//                 <strong>{`${msg.name}: `}</strong> {msg.body}
//               </li>
//             ))}
//           </ul>
//           <div>
//             <form onSubmit={submitHandler} className="row">
//               <input
//                 value={messageBody}
//                 onChange={(e) => setMessageBody(e.target.value)}
//                 type="text"
//                 placeholder="type message"
//               />
//               <button type="submit" className="chatboxButton">
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
