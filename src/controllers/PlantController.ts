import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Plant } from '../entity';
import axios from 'axios';

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
        console.log(request.body.benbeng);
        console.log(request.file);
        return response.json({ status: 'ok' });
    };
    // Get Post Plant
    static searchPlantByName = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const { name } = request.body;
        const { TREFLE_URL, TREFLE_TOKEN } = process.env;
        return await axios.get(`${TREFLE_URL}/plants?token=${TREFLE_TOKEN}&q=${name}`)
            .then(async ({ data }) => {
                return response.json({ data }).status(200);
            })
            .catch(async (error: Error) => {
                return response.json(error).status(500);
            });

    };
}
