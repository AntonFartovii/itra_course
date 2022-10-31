import {Router} from 'express'
import {propController} from "../controllers/PropController.js";

const router = Router()

router.post('/entity/', await propController.createEntity)
router.get('/entity/', await propController.getAllEntity)
router.get('/entity/:id', await propController.getOneEntity)
router.delete('/entity/:id', await propController.deleteEntity)

router.post('/value/', await propController.createPropValue)
router.get('/value/', await propController.getAllPropValues)
router.get('/value/:id', await propController.getOnePropValue)
router.delete('/value/:id', await propController.deletePropValue)



export {router as propRouter}