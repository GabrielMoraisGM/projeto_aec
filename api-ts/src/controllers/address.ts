import {
  Request,
  Response,
} from 'express';

import { format } from '@fast-csv/format';

import { Address } from '../entities/address';
import { searchByZipCode } from '../services/zip-code';

type AddressKey = keyof Address;

export default class AddressController {

    public async createAddress(req: Request, res: Response): Promise<Response> {

        const { zipCode } = req.body;

        try {
            const newAddress = await searchByZipCode(zipCode)
            newAddress.number = req.body.number
            newAddress.complement = req.body.complement
            const addressSaved = await Address.save(newAddress);

            return res.json(addressSaved)
        }
        catch (error) {
            console.error('Failed to create user', error);
            return res.status(500).json({ message: 'internal server error' })
        }
    }

    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const addressList = await Address.createQueryBuilder().getMany()

            if (!addressList) {
                return res.status(404).json({ message: 'No users were found' })
            }

            return res.send(addressList)
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }


    public async exporCsv(req: Request, res: Response): Promise<Response> {
        try {
            const addressList = await Address.createQueryBuilder().getMany();

            if (addressList.length === 0) {
                return res.status(404).send({ message: 'No addresses found' });
            }

            const headers: { id: AddressKey; title: string }[] = [
                { id: 'id', title: 'ID' },
                { id: 'zipCode', title: 'ZIP' },
                { id: 'street', title: 'Street' },
                { id: 'number', title: 'Number' },
                { id: 'complement', title: 'Complement' },
                { id: 'neighborhood', title: 'Neighborhood' },
                { id: 'city', title: 'City' },
                { id: 'state', title: 'State' },
            ];

            res.setHeader('Content-Disposition', 'attachment; filename=dados.csv');
            res.setHeader('Content-Type', 'text/csv');

            const csvStream = format({ headers: headers.map(header => header.title), writeBOM: true });
            csvStream.pipe(res);

            addressList.forEach(address => {
                const rowData = headers.map(header => {
                    if (header.id in address) {
                        return address[header.id];
                    } else {
                        return '';
                    }
                });
                csvStream.write(rowData);
            });

            csvStream.end();
            console.log("CSV exportação finalizada.");
            return res;
        } catch (error) {
            console.error('Erro ao exportar CSV:', error);
            return res.status(500).send('Erro ao exportar CSV');
        }
    }

    public async getById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: 'Address id required and must be a number' })
        }

        try {
            let addressId = parseInt(id, 10)
            const address = await Address.findOneBy({ id: addressId })

            if (!address) {
                return res.status(404).json({ message: 'User not found' })
            }

            return res.json(address)
        }
        catch (error) {
            console.error('Error getting address by id', error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    public async updateAddress(req: Request, res: Response): Promise<Response> {

        const {
            id,
            zipCode,
            street,
            number,
            complement,
            neighborhood,
            city,
            state
        } = req.body

        const addressDb = await Address.findOneBy({ id: id })

        if (!addressDb) {
            return res.status(404).json({ message: 'Address not found' })
        }

        addressDb.zipCode = zipCode
        addressDb.street = street
        addressDb.number = number
        addressDb.complement = complement
        addressDb.neighborhood = neighborhood
        addressDb.city = city
        addressDb.state = state

        let updatedAdress = await addressDb.save()

        return res.send(updatedAdress)
    }

    public async deleteAddress(req: Request, res: Response): Promise<Response> {
        const { id } = req.body

        try {
            let result = await Address.delete(id)
            return res.send(result);
        }
        catch (error) {
            return res.status(500).json({ message: 'Failed to delete user by id' })
        }
    }
}