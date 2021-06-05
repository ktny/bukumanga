import { Dispatch, SetStateAction } from "react";
import Header from "./header";
import { IEntry } from "../models/model";

export default function Layout({
  children,
  setEntries,
}: {
  children: React.ReactNode;
  setEntries: Dispatch<SetStateAction<IEntry[]>>;
}) {
  return (
    <>
      <Header setEntries={setEntries} />
      <main>{children}</main>
      <footer>bukumanga.com 2021</footer>
    </>
  );
}
