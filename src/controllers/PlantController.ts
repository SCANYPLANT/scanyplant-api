import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Plant } from '../entity';

export default class PlantController {
    private static plantRepository: Repository<Plant>;

    constructor() {
        PlantController.plantRepository = getRepository(Plant);
    }

    // Get ALL Plant
    static all = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const plantRepository: Repository<Plant> = getRepository(Plant);
        return await plantRepository
            .find()
            .then(result => response.json(result).status(200))
            .catch(error => response.status(500).json(error));
    };
    // Get Plant by id
    static one = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const plantRepository: Repository<Plant> = getRepository(Plant);
        return await plantRepository
            .findOne({
                where: { uuid: request.params.id },
                relations: ['buckets'],
            })
            .then(result => {
                return response.json(result).status(200);
            })
            .catch(error => {
                return response.status(500).json(error);
            });
    };
    // Get Post Plant
    static post = async (
        request: Request,
        response: Response,

    ): Promise<Response> => {
        console.log(request.body);
        console.log(request.file);
        return response.json({ status: 'ok' });
    };
}
