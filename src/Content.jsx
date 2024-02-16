import { useEffect, useState } from "react";
import axios from "axios";

export function Content() {
  const [plant, setPlant] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const apiKey = "DBtTY2wyOYZeqs7L1naVhRKNR9HPlyA7AamvpkSPoWjndd7gwI";

  useEffect(() => {
    const accessToken = "NGWphc2bBSqgWV6";
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
        setPlant(response.data.result.classification.suggestions[0].details);
        console.log(response.data.result.classification.suggestions[0].details);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  }, []);

  async function handleImageUpload(event) {
    event.preventDefault();
    // console.log("event", event.target[0].files);

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
    <div className="w-screen">
      {Object.keys(plant).length > 0 && (
        <div className="flex flex-col justify-center">
          <form onSubmit={handleImageUpload}>
            <input type="file" multiple />
            <button type="submit">what-dis-plant</button>
          </form>
          <h1 className="bg-red-500 text-center">{plant.common_names}</h1>
          <img className="p-20" src={plant.image.value} />
        </div>
      )}
    </div>
  );
}

// 		// Prepare the request data with the Base64 encoded files
// 		const requestData = {
// 			api_key: "your_api_key_here",
// 			images: base64Files,
// 			modifiers: ["crops_fast", "similar_images"],
// 			plant_language: "en",
// 			plant_details: [
// 				"common_names",
// 				"url",
// 				"name_authority",
// 				"wiki_description",
// 				"taxonomy",
// 				"synonyms",
// 			],
// 		};

// 		// Send the identification request to the plant.id API
// 		const response = await fetch("https://api.plant.id/v2/identify", {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify(requestData),
// 		});
// 		const data = await response.json();
// 		// Process the successful identification response
// 		console.log("Success:", data);
// 		const firstSuggestion = data.suggestions[0];
// 		this.match = firstSuggestion["plant_details"];
// 		this.image = firstSuggestion["similar_images"][0]["url"];
// 		this.probability = firstSuggestion["probability"];
// 	} catch (error) {
// 		// Handle any errors in the process
// 		console.error("Error:", error);
// 	}
// }

// store response into state and display on screen
