import { useState, useEffect } from "react";
import EntryList from "../components/entry-list";
import Layout from "../components/layout";
import Search from "../components/search";
import { formatDate } from "../helpers/util";

const baseUrl = "http://localhost:5000/entries";

export default function Home() {
  const [entries, setEntries] = useState([]);

  console.log(entries);

  const search = (startDate: Date, endDate: Date, keyword: string, bookmarkCount: number) => {
    const params = {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      keyword: keyword,
      bookmarkCount: bookmarkCount.toString(),
    };
    const queryString =
      "?" +
      Object.entries(params)
        .map(([k, v]) => `${k}=${encodeURI(v)}`)
        .join("&");

    const url = `${baseUrl}${queryString}`;

    fetch(url)
      .then(res => res.json())
      .then(res => setEntries(res.sort((a, b) => b.bookmark_count - a.bookmark_count)));
  };

  return (
    <Layout>
      <Search search={search}></Search>
      <EntryList entries={entries}></EntryList>
    </Layout>
  );
}
