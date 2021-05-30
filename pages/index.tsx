import { useState, useEffect } from "react";
import CardList from "../components/card-list";
import Layout from "../components/layout";
import Search from "../components/search";

const baseUrl = "http://localhost:5000/entries";

const formateDate = (d: Date) => {
  return `
${d.getFullYear()}-
${(d.getMonth() + 1).toString().padStart(2, "0")}-
${d.getDate().toString().padStart(2, "0")}
`.replace(/\n|\r/g, "");
};

export default function Home() {
  const [entries, setEntries] = useState([]);

  console.log(entries);

  const search = (startDate: Date, endDate: Date, keyword: string, bookmarkCount: number) => {
    const params = {
      startDate: formateDate(startDate),
      endDate: formateDate(endDate),
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
    // .then(res => setEntries(res.slice(0, 100).sort((a, b) => b.bookmark_count - a.bookmark_count)));
  };

  return (
    <Layout>
      <Search search={search}></Search>
      <CardList entries={entries}></CardList>
    </Layout>
  );
}
