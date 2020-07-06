import { getRepository, Repository } from 'typeorm';
import { Request, Response } from 'express';
import { Plant, User } from '../entity';
import axios from 'axios';
import aws from 'aws-sdk';
import jwt from 'jsonwebtoken';

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
        const plantRepository: Repository<Plant> = getRepository(Plant, process.env.APP_ENV);
        return await plantRepository
            .find({
                where: { uuid: (request.user as any).uuid },
            })
            .then(result => response.json(result).status(200))
            .catch(error => response.status(500).json(error));
    };
    // Get Plant by id
    static one = async (
        request: Request,
        response: Response,
    ): Promise<Response> => {
        const plantRepository: Repository<Plant> = getRepository(Plant, process.env.APP_ENV);
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
                return response.json(data).status(200);
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
        const { brightness, name, nextWatering, repetition, shift, temperature } = request.body;
        const plant = new Plant();
        plant.brightness = brightness;
        plant.name = name;
        plant.nextWatering = nextWatering;
        plant.repetition = repetition;
        plant.shift = shift;
        plant.temperature = temperature;
        plant.user= request.user as User

        return await getRepository(Plant, process.env.APP_ENV)
            .save(plant)
            .then(async (plant) => {
                const token = jwt.sign(
                    plant,
                    `${process.env.jwtSecret as string}`,
                );
                return response.status(200).json({ data: plant, meta:{token} });
            }).catch((err: Error) => {
                return response.json({ err }).status(500);
            });
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
                return response.json(data).status(200);
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
                            return response.status(200).json(data);
                        })
                        .catch(async (error: Error) => {
                            return response.status(500).json(error);
                        });

                }
            }
        });
    };
}
