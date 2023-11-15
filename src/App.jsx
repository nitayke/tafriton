import { useState } from "react";
import Inputs from "./components/Inputs";
import { UserContext, paramsDefault } from "./util";
import Result from "./components/Result";

export default function App() {
  const [params, setParams] = useState(paramsDefault);
  const [pressed, press] = useState(false);

  return (
    <div className="bg-green-200 flex flex-col items-center p-10">
      <h1 className="text-3xl font-black text-center">מחולל התפריטים הגדול</h1>
      <UserContext.Provider value={{ params: params, setParams: setParams }}>
        {pressed ? (
          <Result params={params}></Result>
        ) : (
          <>
            <Inputs></Inputs>
            <button
              className="text-center border-2 border-black rounded py-2 px-10 mt-4 font-bold text-xl"
              onClick={() => press(true)}
            >
              חולל תפריט
            </button>
          </>
        )}
      </UserContext.Provider>
    </div>
  );
}
