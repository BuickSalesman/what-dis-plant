import { useEffect, useState } from "react";

export function Content() {
  const [plant, setPlant] = useState({});

  useEffect(() => {
    console.log("Put request here", plant);
    setPlant({
      name: "Plant",
      id: 1,
    });
  }, []);

  console.log("Plant", plant);

  return (
    <div>
      <h1>{plant.name}</h1>
      <h1>{plant.id}</h1>
    </div>
  );
}

// file upload box
