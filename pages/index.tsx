import { useState, useEffect } from "react";
import CardList from "../components/card-list";
import Layout from "../components/layout";

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [count, setCount] = useState(0);

  console.log(entries);

  useEffect(() => {
    const url = "http://localhost:5000/entries";
    fetch(url)
      .then(res => res.json())
      .then(res => setEntries(res));
  }, []);

  return (
    <Layout>
      <CardList entries={entries}></CardList>
      {/* <button onClick={() => setCount(count + 1)}>{count}</button> */}
    </Layout>
  );
}
