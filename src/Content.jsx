import { useEffect, useState } from "react";
import axios from "axios";

export function Content() {
  const [plant, setPlant] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const apiKey = "DBtTY2wyOYZeqs7L1naVhRKNR9HPlyA7AamvpkSPoWjndd7gwI";

  useEffect(() => {
    const accessToken = "SS4hTbbCJ0LveRJ";
    const apiUrl = `https://plant.id/api/v3/identification/${accessToken}`;

    const params = {
      details:
        "common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,synonyms,edible_parts,watering,propagation_methods",
      language: "en",
    };

    const headers = {
      "Api-Key": apiKey,
    };

    axios
      .get(apiUrl, {
        headers,
        params,
      })
      .then((response) => {
        setPlant(response.data.result.classification.suggestions[0]);
        // console.log(response.data.result.classification.suggestions[0].details);
        console.log(response.data.result.classification.suggestions[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function handleImageUpload(event) {
    event.preventDefault();
    // console.log("event", event.target[0].files);

    const filesObject = event.target[0].files;
    const files = Object.values(filesObject);

    const base64Files = await convertImageToBase64(files);
    // console.log(base64Files);

    axios
      .post(
        "https://plant.id/api/v3/identification",

        { images: base64Files },

        {
          headers: {
            "Api-Key": apiKey,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function convertImageToBase64(files) {
    const base64Files = await Promise.all(
      files.map(async (file) => {
        const reader = new FileReader();
        const fileReadPromise = new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);
        });
        reader.readAsDataURL(file);
        return fileReadPromise;
      })
    );
    return base64Files;
  }

  return (
    <div className="w-screen">
      {Object.keys(plant).length > 0 && (
        <div className="flex flex-col justify-center">
          <form onSubmit={handleImageUpload}>
            <input type="file" multiple />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded border">
              what-dis-plant?
            </button>
          </form>
          <h1 className="bg-red-500 text-center">{plant.name}</h1>
          <img className="p-20" src={plant.details.image.value} />
        </div>
      )}
    </div>
  );
}
