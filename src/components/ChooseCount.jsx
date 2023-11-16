import { useContext } from "react";
import { UserContext } from "../util";

export default function ChooseCount({ time }) {
  const { params, setParams } = useContext(UserContext);
  return (
    <div
      className={
        "grid grid-cols-" +
        params[time].counts.length +
        " grid-rows-4 m-2 p-2 text-center rounded gap-x-10"
      }
    >
      <div className="p-1 font-semibold">עיקריות</div>
      <div className="p-1 font-semibold">פחמימות</div>
      <div className="p-1 font-semibold">ירקות</div>
      <div className={"p-1 font-semibold" + (time == "erev" ? "" : " hidden")}>
        מרק
      </div>
      {params[time].counts.map((e, i) => (
        <button
          key={i}
          onClick={() => {
            let l = params[time].counts;
            l[i]++;
            setParams({
              ...params,
              [time]: { ...params[time], counts: l },
            });
          }}
          className="border border-black rounded p-1"
        >
          &uarr;
        </button>
      ))}
      {params[time].counts.map((a, i) => (
        <div key={i} className="p-1 text-xl">
          {a}
        </div>
      ))}
      {params[time].counts.map((e, i) => (
        <button
          key={i}
          onClick={() => {
            let l = params[time].counts;
            if (l[i] == 0) return;
            l[i]--;
            setParams({
              ...params,
              [time]: { ...params[time], counts: l },
            });
          }}
          className="border border-black rounded p-1"
        >
          &darr;
        </button>
      ))}
    </div>
  );
}
