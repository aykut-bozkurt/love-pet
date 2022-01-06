import breedService from "../../services/breed-service.js";
import {verifyToken} from "../../middleware/auth.js";
import express from 'express';
let breedRouter = express.Router();
breedRouter.use(verifyToken);

breedRouter.post('/', async (req, res, next) => {
    try{
        let breed = await breedService.createBreed(req.body);
        return res.status(200).json(breed.toJSON());
    }
    catch(e){
        next(e);
    }
});

breedRouter.get('/', async (req, res, next) => {
    try{
        let breeds = await breedService.findBreeds();
        return res.status(200).json(JSON.stringify(breeds));
    }
    catch(e){
        next(e);
    }
});

breedRouter.get('/:breedId', async (req, res, next) => {
    try{
        let breed = await breedService.findBreed(req.params.breedId);
        if(breed !== null){
            return res.status(200).json(breed.toJSON());
        }
        else{
            return res.sendStatus(404);
        }
    }
    catch(e){
        next(e);
    }
});

breedRouter.delete('/:breedId', async (req, res, next) => {
    try{
        await breedService.deleteBreed(req.params.breedId);
        return res.sendStatus(200);
    }
    catch(e){
        next(e);
    }
});

breedRouter.put('/:breedId', async (req, res, next) => {
    try{
        let [_, breeds] = await breedService.updateBreed(req.params.breedId, req.body);
        return res.status(200).json(JSON.stringify(breeds));
    }
    catch(e){
        next(e);
    }
});


export default breedRouter;
