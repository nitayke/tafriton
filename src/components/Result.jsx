import { useEffect, useState } from "react";
import Papa from "papaparse";
import { calculate, shareResult } from "../util";

export default function Result({ params }) {
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [helper, setHelper] = useState(0);

  useEffect(() => {
    setData([]);
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQrenl7FdSH1sprDWGrGH3QzdTTVFWL8bS09cKChn-Ao4v4jOueOYvhVwkR04e7uI1xvNDwK1fwFP0r/pub?gid=1069206652&single=true&output=csv"
    )
      .then((response) => response.text())
      .then((data) => {
        const parsedData = Papa.parse(data, { header: true }).data;
        setData(Object.values(parsedData));
      });
  }, [helper]);

  useEffect(() => {
    if (data.length) {
      setResult(calculate(data, params));
    }
  }, [data]);

  if (!data.length || !result.length)
    return (
      <h1 className="text-center text-xl mt-4">רק רגע מחשבן את התפריט...</h1>
    );

  return (
    <>
      <div className="w-4/5">
        <h1 className="font-semibold text-2xl mt-3">להלן התוצאה:</h1>
        <h1 className="font-semibold text-xl mt-3">ערב</h1>
        {result[0].map((a, i) => (
          <div key={i}>{a}</div>
        ))}
        <h1 className="font-semibold text-xl mt-3">בוקר</h1>
        {result[1].map((a, i) => (
          <div key={i}>{a}</div>
        ))}
      </div>
      <button
        className="text-center border border-black rounded py-2 w-1/2 mt-4 font-bold text-lg"
        onClick={() => shareResult(result)}
      >
        שיתוף תפריט
      </button>
      <button
        className="text-center border border-black rounded py-2 w-1/2 mt-4 font-bold text-lg"
        onClick={() => {
          setHelper(helper + 1);
          setResult(calculate(data, params));
        }}
      >
        חולל מחדש
      </button>
    </>
  );
}
