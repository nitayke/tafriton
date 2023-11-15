import { useContext } from "react";
import { UserContext, getValueByPath, updateObjectByPath } from "../util";

export default function Choose({ options }) {
  const { params, setParams } = useContext(UserContext);
  return (
    <div className="flex w-full justify-between">
      {Object.keys(options)
        .filter((option) => option != "path")
        .map((option, i) => (
          <button
            className={
              "text-center w-1/2 m-2 rounded border-black p-2 border" +
              (getValueByPath(params, options.path) === options[option]
                ? "-2 bg-green-300"
                : "")
            }
            value={option}
            key={i}
            onClick={(e) => {
              updateObjectByPath(
                params,
                setParams,
                options["path"],
                options[e.target.value]
              );
            }}
          >
            {option}
          </button>
        ))}
    </div>
  );
}
