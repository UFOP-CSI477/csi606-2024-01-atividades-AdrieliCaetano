const getAllLocais = async () => {

    const response = await fetch('http://localhost:5000/locaiscoleta', {
        cache: 'no-cache'
    })

    return response.json();

}

const getByIdLocal = async (id : string) => {

    const response = await fetch(`http://localhost:5000/locaiscoleta/${id}`, {
        cache: 'no-cache'
    })

    return response.json();

}

export { getAllLocais, getByIdLocal }