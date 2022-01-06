import countryService from "../../services/country-service.js";
import {verifyToken} from "../../middleware/auth.js";
import express from 'express';
let countryRouter = express.Router();
countryRouter.use(verifyToken);

countryRouter.post('/', async (req, res, next) => {
    try{
        let country = await countryService.createCountry(req.body);
        return res.status(200).json(country.toJSON());
    }
    catch(e){
        next(e);
    }
});

countryRouter.get('/', async (req, res, next) => {
    try{
        let countries = await countryService.findCountries();
        return res.status(200).json(JSON.stringify(countries));
    }
    catch(e){
        next(e);
    }
});

countryRouter.get('/:countryId', async (req, res, next) => {
    try{
        let country = await countryService.findCountry(req.params.countryId);
        if(country !== null){
            return res.status(200).json(country.toJSON());
        }
        else{
            return res.sendStatus(404);
        }
    }
    catch(e){
        next(e);
    }
});

countryRouter.delete('/:countryId', async (req, res, next) => {
    try{
        await countryService.deleteCountry(req.params.countryId);
        return res.sendStatus(200);
    }
    catch(e){
        next(e);
    }
});

countryRouter.put('/:countryId', async (req, res, next) => {
    try{
        let [_, countries] = await countryService.updateCountry(req.params.countryId, req.body);
        return res.status(200).json(JSON.stringify(countries));
    }
    catch(e){
        next(e);
    }
});


export default countryRouter;
