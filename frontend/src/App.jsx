import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";

import Sidebar from "./components/Sidebar.jsx";
import Welcome from "./components/Welcome.jsx";
import MessageList from "./components/MessageList.jsx";
import InputBar from "./components/InputBar.jsx";

const API_BASE = "https://arsalan-ai.onrender.com" || "http://localhost:8000";
let messageId = 0;

function makeMsg(role, kind, payload = null) {
  return { id: `m${++messageId}`, role, kind, payload };
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [awaitingJD, setAwaitingJD] = useState(false);
  const [activeMode, setActiveMode] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resume, setResume] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE}/resume`)
      .then((response) => response.json())
      .then(setResume)
      .catch(() => setResume(null));
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function pushAssistant(kind, payload) {
    setMessages((m) => [...m, makeMsg("assistant", kind, payload)]);
  }

  async function streamChat(question, mode = "chat") {
    let assistantId = null;
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, mode }),
      });

      if (!response.ok || !response.body) throw new Error("Chat request failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;

        answer += chunk;
        if (!assistantId) {
          assistantId = `m${++messageId}`;
          setIsTyping(false);
          setMessages((messages) => [...messages, { id: assistantId, role: "assistant", kind: "text", payload: answer }]);
        } else {
          setMessages((messages) =>
            messages.map((message) => (message.id === assistantId ? { ...message, payload: answer } : message))
          );
        }
      }
    } catch (error) {
      setMessages((messages) => messages.filter((message) => message.id !== assistantId));
      throw error;
    } finally {
      setIsTyping(false);
    }
  }

  function handleNewChat() {
    setMessages([]);
    setAwaitingJD(false);
    setActiveMode(null);
    setInput("");
    setSidebarOpen(false);
    setIsTyping(false);
  }

  function handleAbout() {
    setActiveMode("about");
    setAwaitingJD(false);
    setSidebarOpen(false);
    setMessages((m) => [...m, makeMsg("user", "text", "Tell me about yourself.")]);
    streamChat("Give a concise summary of Arsalan's resume in 3 to 5 sentences. Mention his professional focus, strongest skills, and most relevant experience only. Do not reproduce the resume, list every skill, or include projects, education, contact details, or certifications unless essential to the summary.", "about").catch(() =>
      pushAssistant("text", "I couldn't reach the backend. Please try again.")
    );
  }

  function handleContact() {
    setActiveMode("contact");
    setAwaitingJD(false);
    setSidebarOpen(false);
    setMessages((m) => [...m, makeMsg("user", "text", "How can I reach you?")]);
    streamChat("What contact information is available for the candidate? Show only the available email and phone number.").catch(() =>
      pushAssistant("text", "I couldn't reach the backend. Please try again.")
    );
  }

  function showProjects() {
    setActiveMode("projects");
    setAwaitingJD(false);
    pushAssistant("projects", resume);
  }

  function handleProjects() {
    setSidebarOpen(false);
    setMessages((m) => [...m, makeMsg("user", "text", "What projects have you built?")]);
    showProjects();
  }

  function handleCheckAts() {
    setActiveMode("ats");
    setAwaitingJD(true);
    setSidebarOpen(false);
    setMessages((m) => [...m, makeMsg("user", "text", "I want to check the ATS score.")]);
    streamChat("Ask me to paste the job description so you can return only an ATS score out of 100 and a short verdict.", "prompt").catch(() =>
      pushAssistant("text", "I couldn't reach the backend. Please try again.")
    );
  }

  function handleDownloadResume() {
    const url = `${API_BASE}/resume/download`;
    const a = document.createElement("a");
    a.href = url;
    a.download = resume?.name ? `${resume.name.replace(/\s+/g, "_")}_Resume.pdf` : "Resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    pushAssistant("text", "Resume download started.");
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;

    setMessages((m) => [...m, makeMsg("user", "text", text)]);
    setInput("");

    if (awaitingJD) {
      streamChat(`Analyze this job description for ATS fit against my resume:\n\n${text}`, "ats").catch(() =>
        pushAssistant("text", "I couldn't reach the backend. Please try again.")
      );
      setAwaitingJD(false);
      setActiveMode(null);
    } else {
      const asksForProjects = /\b(project|projects|built|portfolio|work history)\b/i.test(text);
      const asksAbout = /\b(tell me about|who is|about)\b.*\barsalan\b/i.test(text);
      if (asksForProjects) {
        showProjects();
      } else if (asksAbout) {
        streamChat("Give a concise summary of Arsalan's resume in 3 to 5 sentences. Mention his professional focus, strongest skills, and most relevant experience only. Do not reproduce the resume, list every skill, or include projects, education, contact details, or certifications unless essential to the summary.", "about").catch(() =>
          pushAssistant("text", "I couldn't reach the backend. Please try again.")
        );
      } else {
        streamChat(text).catch(() => pushAssistant("text", "I couldn't reach the backend. Please try again."));
      }
    }
  }

  const showWelcome = messages.length === 0;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-canvas font-body text-ink">
      <button className="fixed left-3 top-3 z-20 hidden rounded-lg border border-line bg-surface-2 p-2 text-ink max-md:block" onClick={() => setSidebarOpen((s) => !s)} aria-label="Toggle menu">
        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <Sidebar
        sidebarOpen={sidebarOpen}
        activeMode={activeMode}
        resume={resume}
        onNewChat={handleNewChat}
        onAbout={handleAbout}
        onContact={handleContact}
        onProjects={handleProjects}
        onCheckAts={handleCheckAts}
        onDownloadResume={handleDownloadResume}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col overflow-y-auto" ref={scrollRef}>
          {showWelcome ? (
            <Welcome
              onAbout={handleAbout}
              onProjects={handleProjects}
              onCheckAts={handleCheckAts}
              onContact={handleContact}
            />
          ) : (
            <MessageList messages={messages} isTyping={isTyping} />
          )}
        </div>

        <InputBar input={input} setInput={setInput} onSend={handleSend} awaitingJD={awaitingJD} />
      </div>
    </div>
  );
}
