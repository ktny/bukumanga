import { useState } from "react";
import EntryList from "../components/entry-list";
import Layout from "../components/layout";

export default function Home() {
  const [entries, setEntries] = useState([]);

  console.log(entries);

  return (
    <Layout setEntries={setEntries}>
      <EntryList entries={entries}></EntryList>
    </Layout>
  );
}
