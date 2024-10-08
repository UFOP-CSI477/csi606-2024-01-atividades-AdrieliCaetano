const getAllAtividades = async () => {
    
    const response = await fetch('http://localhost:5000/atividades', { cache: 'no-cache'})

    return response.json()
}

const getByIdAtividade = async (id: string) => {

    const response = await fetch(`http://localhost:5000/atividades/${id}`, {cache: 'no-cache'})

    return response.json()

}

export { getByIdAtividade, getAllAtividades}