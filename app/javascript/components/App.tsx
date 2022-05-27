import React, { useState } from "react";
import Customers from "./Customers";

function App() {
  const [file, setFile] = useState(undefined);
  const [uploaded, setUploaded] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    const data = new FormData();
    // @ts-ignore will fix
    data.append("file", file);

    const response = await fetch("/api/customer/upload", {
      method: "POST",
      body: data,
    });

    const numCustomers = await response.json();

    setUploaded(true);
    setMessage(`${numCustomers} customers uploaded successfully`);
  };

  return (
    <div className="App">
      <form>
        <input type="file" onChange={(e) => setFile(e?.target?.files?.[0])} />
        <button
          type="submit"
          onClick={handleUpload}
          disabled={!file || uploaded}
        >
          Upload
        </button>
        {message && <span>{message}</span>}
      </form>
      {uploaded && <Customers />}
    </div>
  );
}

export default App;
