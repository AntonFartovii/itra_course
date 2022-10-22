import {Router} from 'express'
import {likeController} from "../controllers/LikeController.js";

const router = Router()

router.post('/', await likeController.createLike)
router.get('/', await likeController.getLikes)
router.get('/:id', await likeController.getLike)
router.delete('/:id', await likeController.deleteLike)



export {router as likeRouter}