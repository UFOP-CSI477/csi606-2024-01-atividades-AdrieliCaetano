const getAllDisciplinas = async () => {
    
    const response = await fetch('http://localhost:5000/disciplinas', { cache: 'no-cache'})

    return response.json()
}

const getByIdDisciplina = async (id: string) => {

    const response = await fetch(`http://localhost:5000/disciplinas/${id}`, {cache: 'no-cache'})

    return response.json()

}

export { getByIdDisciplina, getAllDisciplinas}