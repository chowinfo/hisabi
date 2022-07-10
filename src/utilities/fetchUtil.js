const fetchData = async (filename) => {
    const response = await fetch(`${process.env.PUBLIC_URL}/data/${filename}.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
};

export { fetchData };
