const getAllDoacoes = async () => {

    const response = await fetch('http://localhost:5000/doacoes', {
        cache: 'no-cache'
    })

    return response.json();

}

const getByIdDoacao = async (id : string) => {

    const response = await fetch(`http://localhost:5000/doacoes/${id}`, {
        cache: 'no-cache'
    })

    return response.json();

}

export { getAllDoacoes, getByIdDoacao }