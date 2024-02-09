import { useEffect, useState } from "react";
import axios from "axios";

export function Content() {
  const [plant, setPlant] = useState({});
  const [uploadedFile, setUploadedFile] = useState({});
  useEffect(() => {
    const accessToken = "NGWphc2bBSqgWV6";
    const apiUrl = `https://plant.id/api/v3/identification/${accessToken}`;

    const params = {
      details:
        "common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods",
      language: "en",
    };

    const headers = {
      "Api-Key": "DBtTY2wyOYZeqs7L1naVhRKNR9HPlyA7AamvpkSPoWjndd7gwI",
    };

    axios
      .get(apiUrl, {
        headers,
        params,
      })
      .then((response) => {
        setPlant(response.data.result.classification.suggestions[0].details);
        console.log(response.data.result.classification.suggestions[0].details);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }, []);

  function handleImageUpload(event) {
    event.preventDefault();
    console.log("event", event.target[0].files[0]);

    setUploadedFile();
  }
  // console.log("Plant", plant);
  // console.log("Details", plant?.common_names[0]);

  return (
    <div className="w-screen">
      {Object.keys(plant).length > 0 && (
        <div className="flex flex-col justify-center">
          <form onSubmit={handleImageUpload}>
            <input type="file" />
            <button type="submit">what-dis-plant</button>
          </form>
          <h1 className="bg-red-500 text-center">{plant.common_names}</h1>
          <img className="p-20" src={plant.image.value} />
        </div>
      )}
    </div>
  );
}

// file upload box
