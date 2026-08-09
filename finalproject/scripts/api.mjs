const apiKey = 'live_FcWfqIqWgS3UBJ9B3IJ7RF1Ps3wGoVwKZFYBU2MEIlMjwHXkLiOLSS64YL1a4byM';
const geoApiKey = '6c9d313d4543479186144f2e447cf470';

export async function getBreeds() {

    try {
        const response = await fetch("https://api.thedogapi.com/v1/breeds?limit=20", {
            headers: {
                "x-api-key": apiKey
            }
        });

        const breeds = await response.json();

        return breeds;

    } catch (error) {
        console.error(error);
    }

};

export async function getFacts() {

    try {
            const response = await fetch("https://dogapi.dog/api/v2/facts?limit=3");
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            return data.data;
            console.log(data);
            

    } catch (error) {
         console.error("Error geting facts:", error);
    }

};

export async function searchBreeds(query) {

    try {
        const response = await fetch(
            `https://api.thedogapi.com/v1/breeds/search?q=${query}`,
            {
                headers: {
                    "x-api-key": apiKey
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const results = await response.json();

        return results;

    } catch (error) {
        console.error("Error searching breeds:", error);
        throw error;
    }
}


export async function getPopularBreeds() {
    try {

        const response = await fetch("https://api.thedogapi.com/v1/breeds?limit=20", {
            headers: {
                "x-api-key": apiKey
            }
        });

        const breeds = await response.json();

        const spotlightBreeds = [...breeds].sort(() => Math.random() - 0.5).slice(0, 3);

        return spotlightBreeds;      

        } catch (error) {
        console.error(error);
    }
};



export async function getNearbyServices(latitude, longitude) {

    try {

        const radius = 15000;
        const url =
        `https://api.geoapify.com/v2/places?categories=pet.veterinary,pet.shop&filter=circle:${longitude},${latitude},${radius}&bias=proximity:${longitude},${latitude}&limit=20&apiKey=${geoApiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        return data.features;
        //console.log(data.features);

        // console.log("Resposta da API:", data);
        // console.log("Quantidade de serviços:", data.features.length);

        
    } catch (error) {
        console.error(error);

    }

};


export async function voteForBreed(imageId) {

    try {
        const response = await fetch(
            "https://api.thedogapi.com/v1/votes",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": apiKey
                },
                body: JSON.stringify({image_id: imageId,value: 1})
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();

    } catch (error) {
        console.error("Error voting for breed:", error);
        throw error;
    }
};

export async function getVotes() {

    try {
        const response = await fetch(
            "https://api.thedogapi.com/v1/votes?limit=100",
            {
                headers: {
                    "x-api-key": apiKey
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const votes = await response.json();

        return votes;

    } catch (error) {
        console.error("Error loading votes:", error);
        throw error;
    }
};

export async function getVoteBreed(imageId) {

    try {
        const response = await fetch(
            `https://api.thedogapi.com/v1/images/${imageId}`,
            {
                headers: {
                    "x-api-key": apiKey
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();

    } catch (error) {

        console.error("Error loading vote image:", error);
        return null;

    }
};
