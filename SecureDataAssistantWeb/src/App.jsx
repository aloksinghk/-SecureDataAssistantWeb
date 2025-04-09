
import { useState } from "react";

export default function App() {
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [store, setStore] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const correctPin = "1234";

  const handlePinSubmit = () => {
    if (pin === correctPin) setAuthenticated(true);
    else alert("Incorrect PIN");
  };

  const addData = () => {
    if (!title || !content) return;
    setStore([...store, { title, content }]);
    setTitle(""); setContent("");
  };

  const queryPrompt = () => {
    const entry = store.find(e => prompt.toLowerCase().includes(e.title.toLowerCase()));
    setResult(entry ? entry.content : "No match found.");
  };

  if (!authenticated) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-xl mb-2">Enter PIN to Access</h1>
        <input type="password" value={pin} onChange={e => setPin(e.target.value)} className="border p-2 rounded" />
        <button onClick={handlePinSubmit} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Secure Data Assistant</h1>
      <div className="border p-4 rounded space-y-2">
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full border p-2 rounded" />
        <input placeholder="Content" value={content} onChange={e => setContent(e.target.value)} className="w-full border p-2 rounded" />
        <button onClick={addData} className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
      </div>
      <div className="border p-4 rounded space-y-2">
        <input placeholder="Ask your prompt..." value={prompt} onChange={e => setPrompt(e.target.value)} className="w-full border p-2 rounded" />
        <button onClick={queryPrompt} className="bg-blue-600 text-white px-4 py-2 rounded">Query</button>
        {result && <div className="bg-gray-100 p-2 rounded">Result: {result}</div>}
      </div>
    </div>
  );
}
