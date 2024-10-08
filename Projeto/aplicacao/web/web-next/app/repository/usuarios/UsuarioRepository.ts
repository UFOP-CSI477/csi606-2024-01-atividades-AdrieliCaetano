const getAllUsuarios = async () => {
    
    const response = await fetch('http://localhost:5000/usuarios', { cache: 'no-cache'})

    return response.json()
}

const getByIdUsuario = async (id: string) => {

    const response = await fetch(`http://localhost:5000/usuarios/${id}`, {cache: 'no-cache'})

    return response.json()

}

export { getByIdUsuario, getAllUsuarios}