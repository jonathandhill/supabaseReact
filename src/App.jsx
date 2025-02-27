import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://goutivabyqouomuuarpl.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdXRpdmFieXFvdW9tdXVhcnBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1ODA2MTYsImV4cCI6MjA1NjE1NjYxNn0.tsndSUOM0eak6mi8_azpXlVDejKgF49Vjoe-UTR5PLI");

function App() {
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    const { data } = await supabase.from("instruments").select();
    setInstruments(data);
  }

  return (
    <>
      {instruments.map((instrument) => (
        <li key={instrument.name}>{instrument.name}</li>
      ))}
    </>
  )
}

export default App
