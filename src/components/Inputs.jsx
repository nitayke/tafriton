import Choose from "./Choose";
import ChooseCount from "./ChooseCount";

export default function Inputs() {
  return (
    <div className="w-full">
      <h3 className="text-lg mt-4">האם נתאי נמצא?</h3>
      <Choose options={{ path: "nitay", כן: true, לא: false }}></Choose>
      <h2 className="text-2xl font-bold m-4">ערב</h2>
      <Choose
        options={{ path: "erev/besari", בשרי: true, חלבי: false }}
      ></Choose>
      <Choose
        options={{ path: "erev/savta", "סבתא באה": true, לא: false }}
      ></Choose>
      <Choose options={{ path: "erev/marak", מרק: true, לא: false }}></Choose>
      <ChooseCount time={"erev"}></ChooseCount>
      <h2 className="text-2xl font-bold m-4">בוקר</h2>
      <Choose
        options={{ path: "boker/besari", בשרי: true, חלבי: false }}
      ></Choose>
      <Choose
        options={{ path: "boker/savta", "סבתא באה": true, לא: false }}
      ></Choose>
      <ChooseCount time={"boker"}></ChooseCount>
    </div>
  );
}
