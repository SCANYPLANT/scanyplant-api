import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Plant } from '../entity';
import axios from 'axios';
import aws from 'aws-sdk';
import { merge } from 'lodash';

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
            })
            .then(result => {
                return response.json(result).status(200);
            })
            .catch(error => {
                return response.status(500).json(error);
            });
    };
    // Get Plant by id
    static oneTrefle = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const { TREFLE_URL, TREFLE_TOKEN } = process.env;
        return await axios.get(`${TREFLE_URL}/plants/${request.params.id}?token=${TREFLE_TOKEN}`)
            .then(async ({ data }) => {
                return response.json({ data }).status(200);
            })
            .catch(async (error: Error) => {
                return response.json(error).status(500);
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
    // Get Post Plant
    static searchPlantByImage = async (
        request: Request,
        response: Response,
    ) => {
        return new aws.Rekognition().detectLabels({
            Image: {
                Bytes: request.file.buffer,
            },
            MinConfidence: 90,
        }, async (err, data) => {

            if (err) {
                return response.json(err);
            } else {
                const { TREFLE_URL, TREFLE_TOKEN } = process.env;
                if (data.Labels) {
                    const arrayPlant: aws.Rekognition.Label[] = [];
                    data.Labels.map(it => {
                        if (it.Parents && it.Parents.length >= 2) {
                            return arrayPlant.push(it);
                        }
                    });

                    return axios.get(`${TREFLE_URL}/plants?token=${TREFLE_TOKEN}&q=${arrayPlant[0].Name}`)
                        .then(({ data }) => {
                            // const newPlantData: any[] = [];
                            // return data.slice(0, 2).map((item: { id: any; }) => {
                            //     return axios.get(`${TREFLE_URL}/plants/${item.id}?token=${TREFLE_TOKEN}`)
                            //         .then(rep => newPlantData.push(merge(item, { image: rep.data.images[0]?.url })))
                            //         .catch(e => console.log(e))
                            //         .finally(() => console.log(newPlantData));
                            // });
                            return response.status(200).json(data)
                        })
                        .catch(async (error: Error) => {
                            return response.status(500).json(error);
                        });

                }
            }
        });
    };
}
