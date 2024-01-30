import { useEffect, useState } from "react";
import axios from "axios";

export function Content() {
  const [plant, setPlant] = useState({});

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

  // console.log("Plant", plant);
  // console.log("Details", plant?.common_names[0]);

  return (
    <div>
      {Object.keys(plant).length > 0 && (
        <>
          <h1>{plant.common_names}</h1>
          <img src={plant.image.value} />
        </>
      )}
    </div>
  );
}

// file upload boxx
