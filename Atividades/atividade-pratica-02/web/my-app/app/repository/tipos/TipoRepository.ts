const getAllTipos = async () => {

    const response = await fetch('http://localhost:5000/tipossanguineos', {
        cache: 'no-cache'
    })

    return response.json();

}

const getByIdTipo = async (id : string) => {

    const response = await fetch(`http://localhost:5000/tipossanguineos/${id}`, {
        cache: 'no-cache'
    })

    return response.json();

}

export { getAllTipos, getByIdTipo }