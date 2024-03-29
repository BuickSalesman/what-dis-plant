import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "flowbite-react";

const accessTokens = ["NbssSTEtdUABkUN", "SS4hTbbCJ0LveRJ", "vWwySsSLymlsRur"];

export function Content() {
  const [plant, setPlant] = useState({});

  const apiKey = "DBtTY2wyOYZeqs7L1naVhRKNR9HPlyA7AamvpkSPoWjndd7gwI";

  useEffect(() => {
    const accessToken = "NbssSTEtdUABkUN";
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
        console.log(response);
        setPlant(response.data.result.classification.suggestions[0]);
        console.log(response.data.result.classification.suggestions[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  async function handleImageUpload(event) {
    event.preventDefault();
    console.log("event", event.target[0].files);

    const filesObject = event.target[0].files;
    const files = Object.values(filesObject);

    const base64Files = await convertImageToBase64(files);
    console.log(base64Files);

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
    <div>
      {Object.keys(plant).length > 0 && (
        <>
          <div className="w-screen">
            <div className="flex flex-col justify-center">
              <form onSubmit={handleImageUpload}>
                <input type="file" multiple />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded border">
                  what-dis-plant?
                </button>
              </form>
              <h1 className="bg-red-500 text-center">{plant.name}</h1>
            </div>
          </div>

          {/* <Card
            href="#"
            className="max-w-sm"
            imgAlt="dis plant is da greatest"
            imgSrc={plant.details.image.value}
            horizontal
          ></Card> */}

          <Card className="max-w-sm" imgSrc={plant.details.image.value} horizontal>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
            </p>
          </Card>
        </>
      )}
    </div>
  );
}
