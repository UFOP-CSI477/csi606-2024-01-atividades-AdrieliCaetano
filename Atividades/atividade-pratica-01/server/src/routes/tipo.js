import { Router } from "express";
import { CreateTipoController } from "../controller/tipos/CreateTipoController.js";
import { GetAllTipoController } from "../controller/tipos/GetAllTipoController.js";
import { GetByIdTipoController } from "../controller/tipos/GetByIdTipoController.js";
import { UpdateTipoController } from "../controller/tipos/UpdateTipoController.js";
import { DeleteTipoController } from "../controller/tipos/DeleteTipoController.js";

const tipoRouter = Router()

// Get All
const getAllTipoController =  new GetAllTipoController()
tipoRouter.get('/tipossanguineos', getAllTipoController.handle)

//Get by Id
const getByIdTipoController = new GetByIdTipoController()
tipoRouter.get('/tipossanguineos/:id', getByIdTipoController.handle)

// Create
const createTipoController = new CreateTipoController()
tipoRouter.post('/tipossanguineos', createTipoController.handle)

// Update
const updateTipoController = new UpdateTipoController()
tipoRouter.patch('/tipossanguineos', updateTipoController.handle)

// Delete
const deleteTipoController = new DeleteTipoController()
tipoRouter.delete('/tipossanguineos', deleteTipoController.handle)
export { tipoRouter }