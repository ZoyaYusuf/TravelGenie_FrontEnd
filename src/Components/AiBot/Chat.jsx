import "./Chat.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./myContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
    const { newChat, prevChats, reply } = useContext(MyContext);
    const [latestReply, setLatestReply] = useState(null);

    useEffect(() => {
        if (reply === null) {
            setLatestReply(null);
            return;
        }
        if (!prevChats?.length) return;

        // no typing animation — render full markdown
        setLatestReply(reply);
    }, [prevChats, reply]);

    return (
        <>
            {newChat && <h1 className="newChatHeader">Start a New Chat!</h1>}

            <div className="chats">
                {/* old messages */}
                {prevChats?.slice(0, -1).map((chat, idx) => (
                    <div
                        className={chat.role === "user" ? "userDiv" : "gptDiv"}
                        key={idx}
                    >
                        {chat.role === "user" ? (
                            <p className="userMessage">{chat.content}</p>
                        ) : (
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                            >
                                {chat.content}
                            </ReactMarkdown>
                        )}
                    </div>
                ))}

                {/* latest */}
                {prevChats.length > 0 && (
                    <>
                        <div className="gptDiv">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeHighlight]}
                            >
                                {latestReply ?? prevChats[prevChats.length - 1].content}
                            </ReactMarkdown>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Chat;
