import { useEffect, useState } from "react";
import { Button } from "./components/button/button";
import { Input } from "./components/input/input";

function App() {
  const [test, setTest] = useState("");

  useEffect(() => {
    console.log({ test, now: Date.now() });
  }, [test]);

  return (
    <div style={{ padding: "2rem" }} className="grid grid-cols-6 gap-x-8 items-end">
      <Button>Normal Button</Button>
      <Input id="test" placeholder="Input component..." />
      <Input id="test2" placeholder="Input component..." clear value={test} onChange={(e) => setTest(e.target.value)} />
      <Input id="test3" type="password" placeholder="Password" />
    </div>
  );
}

export default App;
