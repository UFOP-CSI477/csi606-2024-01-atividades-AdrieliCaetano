const getAllPessoas = async () => {

    const response = await fetch('http://localhost:5000/pessoas', {
        cache: 'no-cache'
    })

    return response.json();

}

const getByIdPessoa = async (id : string) => {

    const response = await fetch(`http://localhost:5000/pessoas/${id}`, {
        cache: 'no-cache'
    })

    return response.json();

}

export { getAllPessoas, getByIdPessoa }