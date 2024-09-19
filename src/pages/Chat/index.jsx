import { useState } from "react";
import "./styles.css";

export function Chat() {
  const [conversations, setConversations] = useState([
    { id: 1, name: "Conversa 1", messages: [] },
  ]);
  const [activeConversationId, setActiveConversationId] = useState(1);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      // Adiciona a mensagem na conversa ativa
      const updatedConversations = conversations.map((conversation) => {
        if (conversation.id === activeConversationId) {
          return {
            ...conversation,
            messages: [...conversation.messages, { type: "user", text: input }],
          };
        }
        return conversation;
      });

      setConversations(updatedConversations);

      // Simulação de resposta da IA
      setTimeout(() => {
        const responseMessage = {
          type: "bot",
          text: "Simulação de resposta da IA...",
        };
        const updatedConversationsWithResponse = updatedConversations.map(
          (conversation) => {
            if (conversation.id === activeConversationId) {
              return {
                ...conversation,
                messages: [...conversation.messages, responseMessage],
              };
            }
            return conversation;
          }
        );

        setConversations(updatedConversationsWithResponse);
      }, 1000);

      setInput("");
    }
  };

  const handleNewConversation = () => {
    const newConversationId = conversations.length + 1;
    const newConversation = {
      id: newConversationId,
      name: `Conversa ${newConversationId}`,
      messages: [],
    };

    setConversations([...conversations, newConversation]);
    setActiveConversationId(newConversationId);
  };

  const handleSwitchConversation = (id) => {
    setActiveConversationId(id);
  };

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId
  );
  return (
    <div className="container-fluid chat-wrapper">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 sidebar">
          <h3>Conversa</h3>
          <button
            className="btn btn-outline-light w-100 mb-3"
            onClick={handleNewConversation}
          >
            Nova Conversa
          </button>
          <ul className="list-unstyled">
            {conversations.map((conversation) => (
              <li
                key={conversation.id}
                className={`conversation-tab ${
                  conversation.id === activeConversationId ? "active" : ""
                }`}
                onClick={() => handleSwitchConversation(conversation.id)}
              >
                {conversation.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Chat area */}
        <div className="col-md-9 col-lg-10 chat-container">
          <div className="chat-header text-center">
            <h2>Tech-Squad</h2>
          </div>
          <div className="chat-box mb-3 p-3">
            {activeConversation?.messages.map((msg, index) => (
              <p
                key={index}
                className={msg.type === "user" ? "user-msg" : "bot-msg"}
              >
                {msg.text}
              </p>
            ))}
          </div>
          <div className="chat-input-container d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-success ms-2" onClick={handleSend}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
