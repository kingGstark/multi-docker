import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
export default () => {
  const [seenIndex, setseenIndex] = useState([]);
  const [values, setvalues] = useState({});
  const [index, setindex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    setvalues(values.data);
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    setseenIndex(seenIndexes.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post("/api/values", {
      index: index,
    });
    setindex("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={(e) => setindex(e.target.value)} />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {seenIndex.map(({ number }) => number).join(", ")}
      <h3>Calculated Values:</h3>
      {Object.keys(values).map((key) => (
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      ))}
    </div>
  );
};
