import provinceService from "../../services/province-service.js";
import {verifyToken} from "../../middleware/auth.js";
import express from 'express';
let provinceRouter = express.Router();
provinceRouter.use(verifyToken);

provinceRouter.post('/', async (req, res, next) => {
    try{
        let province = await provinceService.createProvince(req.body);
        return res.status(200).json(province.toJSON());
    }
    catch(e){
        next(e);
    }
});

provinceRouter.get('/', async (req, res, next) => {
    try{
        let provinces = await provinceService.findProvinces();
        return res.status(200).json(JSON.stringify(provinces));
    }
    catch(e){
        next(e);
    }
});

provinceRouter.get('/:provinceId', async (req, res, next) => {
    try{
        let province = await provinceService.findProvince(req.params.provinceId);
        if(province !== null){
            return res.status(200).json(province.toJSON());
        }
        else{
            return res.sendStatus(404);
        }
    }
    catch(e){
        next(e);
    }
});

provinceRouter.delete('/:provinceId', async (req, res, next) => {
    try{
        await provinceService.deleteProvince(req.params.provinceId);
        return res.sendStatus(200);
    }
    catch(e){
        next(e);
    }
});

provinceRouter.put('/:provinceId', async (req, res, next) => {
    try{
        let [_, provinces] = await provinceService.updateProvince(req.params.provinceId, req.body);
        return res.status(200).json(JSON.stringify(provinces));
    }
    catch(e){
        next(e);
    }
});


export default provinceRouter;
