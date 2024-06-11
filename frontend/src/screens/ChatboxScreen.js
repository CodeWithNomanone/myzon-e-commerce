// import { React, useState } from 'react';
// import closeIcon from '././../images/closeIcon.png';

// const ChatboxScreen = () => {
//   const [open, setOpen] = useState(true);
//   const [close, setClose] = useState(false);
//   const openChat = () => {
//     setOpen(false);
//     setClose(true);
//   };

//   const closeChat = () => {
//     setOpen(true);
//     setClose(false);
//   };

//   return (
//     <div>
//       <div className="openchat">
//         <button
//           className="open-chat "
//           onClick={openChat}
//           style={open ? { display: 'block' } : { display: 'none' }}
//         >
//           Chat <i className="  fa fa-comments"></i>
//         </button>
//       </div>
//       <div
//         className="chatboxin"
//         style={close ? { display: 'block' } : { display: 'none' }}
//       >
//         <div className="chatarea ">
//           <div className="positionclas">
//             <div className="chate">
//               <div className="Acard carde  ">
//                 <div className="card-header msg_head shadow-lg">
//                   <div className="d-flex align-items-center bd-highlight">
//                     <div className="img_cont">
//                       {/* <img
//                         src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
//                         className="rounded-circle user_img border border-primary border-2"
//                       /> */}
//                       <span className="online_icon"></span>
//                     </div>
//                     <div className="user_info">
//                       <span>Chat with Khalid</span>
//                       <p>1767 Messages</p>
//                     </div>
//                     <div className="">
//                       <span className="closIcon">
//                         <img
//                           className="closeiconsize"
//                           src={closeIcon}
//                           alt="Close"
//                           onClick={closeChat}
//                           style={
//                             close ? { display: 'block' } : { display: 'none' }
//                           }
//                         />
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="card-body msg_card_body">
//                   <div className="d-flex  p-chatL">
//                     <div className="img_cont_msg">
//                       {/* <img
//                         src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
//                         className="rounded-circle user_img_msg border border-primary border-1"
//                       /> */}
//                     </div>
//                     <div className="msg_cotainer  ">
//                       Hi, how are you samim?
//                       <span className="msg_time">8:40 AM, Today</span>
//                     </div>
//                   </div>
//                   <div className="d-flex justify-content-end p-chatR">
//                     <div className="msg_cotainer_send ">
//                       Hi Khalid i am good tnx how about you?
//                       <span className="msg_time_send">8:55 AM, Today</span>
//                     </div>
//                     <div className="img_cont_msg">
//                       {' '}
//                       {/* <img
//                         src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
//                         className="rounded-circle user_img_msg border border-primary border-1"
//                       /> */}
//                     </div>
//                   </div>
//                   <div className="d-flex  p-chatL">
//                     <div className="img_cont_msg">
//                       {/* <img
//                         src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
//                         className="rounded-circle user_img_msg border border-primary border-1"
//                       /> */}
//                     </div>
//                     <div className="msg_cotainer ">
//                       I am good too, thank you for your chat template
//                       <span className="msg_time">9:00 AM, Today</span>
//                     </div>
//                   </div>
//                   <div className="d-flex justify-content-end p-chatR">
//                     <div className="msg_cotainer_send ">
//                       You are welcome
//                       <span className="msg_time_send">9:05 AM, Today</span>
//                     </div>
//                     <div className="img_cont_msg">
//                       {' '}
//                       {/* <img
//                         src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
//                         className="rounded-circle user_img_msg border border-primary border-1"
//                       /> */}
//                     </div>
//                   </div>
//                   <div className="d-flex  p-chatL">
//                     <div className="img_cont_msg">
//                       {/* <img
//                         src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
//                         className="rounded-circle user_img_msg border border-primary border-1"
//                       /> */}
//                     </div>
//                     <div className="msg_cotainer">
//                       I am looking for your next templates
//                       <span className="msg_time">9:07 AM, Today</span>
//                     </div>
//                   </div>
//                   <div className="d-flex justify-content-end p-chatR">
//                     <div className="msg_cotainer_send ">
//                       Ok, thank you have a good day thank you have a good day
//                       thank you have a good day thank you have a good day
//                       <span className="msg_time_send">9:10 AM, Today</span>
//                     </div>
//                     <div className="img_cont_msg">
//                       {/* <img
//                         src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
//                         className="rounded-circle user_img_msg border border-primary border-1"
//                       /> */}
//                     </div>
//                   </div>
//                   <div className="d-flex  p-chatL">
//                     <div className="img_cont_msg">
//                       {/* <img
//                         src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
//                         className="rounded-circle user_img_msg border border-primary border-1"
//                       /> */}
//                     </div>
//                     <div className="msg_cotainer">
//                       Bye, see you
//                       <span className="msg_time">9:12 AM, Today</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="card-footer textAeriaChat shadow-lg">
//                   <div className="d-flex">
//                     <div className="">
//                       <span className="d-flex justify-content-center align-items-center attach_btn">
//                         <i className="fa fa-paperclip"></i>
//                       </span>
//                     </div>
//                     <textarea
//                       name=""
//                       className=" type_msg"
//                       placeholder="Type your message..."
//                     ></textarea>
//                     <div className="">
//                       <span className="d-flex justify-content-center align-items-center send_btn">
//                         <i className="fa fa-location-arrow "></i>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ChatboxScreen;
