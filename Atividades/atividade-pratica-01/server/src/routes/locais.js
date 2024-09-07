import { Router } from "express";
import { GetAllLocalController } from "../controller/locais/GetAllLocalController.js";
import { GetByIdLocalController } from "../controller/locais/GetByIdLocalController.js";
import { CreateLocalController } from "../controller/locais/CreateLocalController.js";
import { UpdateLocalController } from "../controller/locais/UpdateLocalController.js";
import { DeleteLocalController } from "../controller/locais/DeleteLocalController.js";

const localRouter = Router()

// Get All
const getAllLocalController = new GetAllLocalController()
localRouter.get('/locaiscoleta', getAllLocalController.handle)

// Get by Id
const getByIdLocalController = new GetByIdLocalController()
localRouter.get('/locaiscoleta/:id', getByIdLocalController.handle)

// Create
const createLocalController =  new CreateLocalController()
localRouter.post('/locaiscoleta', createLocalController.handle)

// Update
const updateLocalController = new UpdateLocalController()
localRouter.patch('/locaiscoleta', updateLocalController.handle)

// Delete 
const deleteLocalController = new DeleteLocalController()
localRouter.delete('/locaiscoleta', deleteLocalController.handle)

export { localRouter }