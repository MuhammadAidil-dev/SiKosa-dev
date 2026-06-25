// ChatMessages.js
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../../hooks/hooks";
import CONFIG from "../../../../config/config";

const PesanChat = ({ messages, psikolog }) => {
  const { authUser } = useAuth();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex-1 min-h-0 overflow-y-auto mb-4"
    >
      {messages.map((msg, index) => (
        <div key={index} className={`flex mb-3 ${msg.senderId === authUser._id ? "justify-end" : "justify-start"}`}>
          {msg.senderId === psikolog._id && (
            <img
              src={CONFIG.BASE_URL + psikolog.profile.picture}
              alt="Doctor"
              className="w-8 h-8 object-cover rounded-full mr-2"
            />
          )}
          <div
            className={`p-2 rounded-lg max-w-xs ${
              msg.senderId === authUser._id ? "bg-blue-500 text-white" : "bg-white text-black"
            }`}
          >
            {msg.message}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </motion.div>
  );
};

export default PesanChat;
