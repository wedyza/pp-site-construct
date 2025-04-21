import './profileMessages.scss'
import chat from '../../img/chat.png'
import { useState } from 'react';

const chats = [
    { id: 1, title: 'Спор по товару', body: 'К сожалению, не успеваем привезти заказ в срок — ' },
    { id: 2, title: 'Спор по товару', body: 'К сожалению, не успеваем привезти заказ в срок — ' },
    { id: 3, title: 'Спор по товару', body: 'К сожалению, не успеваем привезти заказ в срок — ' },
    { id: 4, title: 'Спор по товару', body: 'К сожалению, не успеваем привезти заказ в срок — ' },
    { id: 5, title: 'Спор по товару', body: 'К сожалению, не успеваем привезти заказ в срок — ' },
    { id: 6, title: 'Спор по товару', body: 'К сожалению, не успеваем привезти заказ в срок — ' },
];


const ProfileMessages: React.FC = () => {
    const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
    const selectedChat = chats.find(chat => chat.id === selectedChatId);

    return (
        <div className='profile-messages'>
            <div className="profile-messages_select">
                <h1 className='text-h1 profile-messages_title'>Сообщения</h1>
                <ul className='profile-messages_list'>
                    {chats.map(chat => (
                        <li
                            key={chat.id}
                            className={`profile-messages_item ${chat.id === selectedChatId ? 'profile-messages_item__active' : ''}`}
                            onClick={() => setSelectedChatId(chat.id)}
                        >
                            <div className="profile-messages_item-img"></div>
                            <div className="profile-messages_item-text">
                                <p className='text-h3'>{chat.title}</p>
                                <p className='text-n14'>{chat.body}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="profile-messages_chat">
                {selectedChat ? (
                    <div className="profile-messages_chat-display">
                        <div className="profile-messages_chat-content">
                            <span className='text-desc profile-messages_chat-date'>
                                7 мая 2025
                            </span>
                            <div className="text-n16 profile-messages_chat-bubble profile-messages_chat-bubble__to">
                                Здравствуйте, ваши вещи уже доставлены на почту, 
                                так как время хранения почты ограничено, просим вас как можно скорее приехать на почту, 
                                чтобы получить ваши вещи.заказ номер 46539969-0113-1.
                                номер накладной LK220824072CN
                            </div>
                            <div className="text-n16 profile-messages_chat-bubble profile-messages_chat-bubble__from">
                                Здравствуйте, ваши вещи уже доставлены на почту, 
                                так как время хранения почты ограничено, просим вас как можно скорее приехать на почту, 
                                чтобы получить ваши вещи.заказ номер 46539969-0113-1.
                                номер накладной LK220824072CN
                            </div>
                            <div className="text-n16 profile-messages_chat-bubble profile-messages_chat-bubble__from">
                                Здравствуйте, ваши вещи уже доставлены на почту, 
                                так как время хранения почты ограничено, просим вас как можно скорее приехать на почту, 
                                чтобы получить ваши вещи.заказ номер 46539969-0113-1.
                                номер накладной LK220824072CN
                            </div>
                        </div>
                        <div className="profile-messages_chat-actions">
                            <button className='profile-messages_chat-attach'>
                                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.7783 1.75C13.9158 1.75 13.0886 2.09264 12.4787 2.70255L3.28867 11.8926C2.30347 12.8777 1.75 14.214 1.75 15.6072C1.75 17.0005 2.30347 18.3367 3.28867 19.3219C4.27386 20.3071 5.61007 20.8606 7.00334 20.8606C8.39661 20.8606 9.73281 20.3071 10.718 19.3219L19.908 10.1319C20.2009 9.839 20.6758 9.839 20.9687 10.1319C21.2616 10.4248 21.2616 10.8997 20.9687 11.1926L11.7787 20.3826C10.5122 21.649 8.79443 22.3606 7.00334 22.3606C5.21224 22.3606 3.4945 21.649 2.22801 20.3826C0.96151 19.1161 0.25 17.3983 0.25 15.6072C0.25 13.8161 0.96151 12.0984 2.22801 10.8319L11.418 1.64189C12.3092 0.750679 13.518 0.25 14.7783 0.25C16.0387 0.25 17.2475 0.750679 18.1387 1.64189C19.0299 2.53311 19.5306 3.74186 19.5306 5.00222C19.5306 6.26259 19.0299 7.47134 18.1387 8.36255L8.93867 17.5526C8.42273 18.0685 7.72298 18.3583 6.99334 18.3583C6.2637 18.3583 5.56394 18.0685 5.04801 17.5526C4.53207 17.0366 4.24222 16.3369 4.24222 15.6072C4.24222 14.8776 4.53207 14.1778 5.04801 13.6619L13.5383 5.18158C13.8314 4.88886 14.3063 4.88914 14.599 5.18221C14.8917 5.47527 14.8914 5.95015 14.5984 6.24287L6.10867 14.7226C6.10856 14.7227 6.10877 14.7225 6.10867 14.7226C5.87423 14.9572 5.74222 15.2756 5.74222 15.6072C5.74222 15.939 5.87404 16.2573 6.10867 16.4919C6.3433 16.7265 6.66152 16.8583 6.99334 16.8583C7.32515 16.8583 7.64338 16.7265 7.87801 16.4919L17.078 7.30189C17.6879 6.69198 18.0306 5.86477 18.0306 5.00222C18.0306 4.13968 17.6879 3.31246 17.078 2.70255C16.4681 2.09264 15.6409 1.75 14.7783 1.75Z" fill="#02040F"/>
                                </svg>
                            </button>
                            <input className='text-n14 profile-messages_chat-input' placeholder='Введите текст' type="text" />
                            <button className='profile-messages_chat-send'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.4643 3.47509C2.67967 3.25528 3.00745 3.18933 3.29106 3.30875L22.2911 11.3087C22.5692 11.4258 22.75 11.6982 22.75 12C22.75 12.3017 22.5692 12.5741 22.2911 12.6912L3.29106 20.6912L3.00002 20L3.00002 20L3.29106 20.6912C3.00745 20.8106 2.67967 20.7447 2.4643 20.5249C2.24894 20.3051 2.1897 19.976 2.31488 19.6949L5.74152 12L2.31488 4.30507C2.1897 4.02396 2.24894 3.6949 2.4643 3.47509ZM4.4565 18.573L20.0673 12L4.4565 5.427L7.24766 11.6949C7.33414 11.8891 7.33414 12.1109 7.24766 12.3051L4.4565 18.573Z" fill="#02040F"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M5.75 12C5.75 11.5858 6.08579 11.25 6.5 11.25L22 11.25C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75L6.5 12.75C6.08579 12.75 5.75 12.4142 5.75 12Z" fill="#02040F"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="profile-messages_empty-chat">
                        <img className='profile-messages_empty-img' src={chat} alt="" />
                        <p className='profile-messages_empty-text text-h1'>Выберите чат</p>
                    </div>                    
                )}
            </div>
        </div>
    );
};

export default ProfileMessages;