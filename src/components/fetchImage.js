const apiKey = 'tiUuRMLmZxIVYPUMyHJgwX7UcQACrbdSeO3ep0omXNoTcGXbWUOQS0kt'

export const fetchBoardCards = async (query, numPhotos) => {
    try {
        const response = await fetch (`https://api.pexels.com/v1/search?query=${query}&per_page=${numPhotos}`, {
            headers: {
                Authorization: apiKey
            }
        });
        const data = await response.json();
        return data.photos.map((image,index)=>({
            id: index + 1,
            name: image.photographer,
            src: image.src.medium
        })) 
    } catch (error) {
        console.error(error);
        return [];
    }
}

