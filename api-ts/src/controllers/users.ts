import bcrypt from 'bcryptjs';
import {
  Request,
  Response,
} from 'express';
import jwt from 'jsonwebtoken';

import { Users } from '../entities/users';

export default class UsersController {

  public async list(req: Request, res: Response): Promise<Response> {
    try {
      const users = await Users.createQueryBuilder().getMany()

      if (!users) {
        return res.status(404).json({message: 'No users were found'})
      }

      return res.send(users)
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: 'User id is required and must be a number' });
    }

    try {
      let userID = parseInt(id, 10)
      const user = await Users.findOneBy({ id: userID });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json(user);
    } catch (error) {
      console.error('Error getting user by id', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const { user, password } = req.body;

    try{
      const hashedPassword = await bcrypt.hash(password, 10)

      
      const userCreated = await Users.save({ user, password: hashedPassword });
      
      return res.json(userCreated)
    }
    catch(error){
      console.error('Failed to create user', error);
      return res.status(500).json({message: 'internal server error'})
    }
  }

  public async loginUser(req: Request, res: Response): Promise<Response>{
    const { user, password } = req.body

    console.log(req.body)

    try{
      const userDb = await Users.findOneBy({ user: user })

      if(!userDb){
        return res.status(401).json({ message: 'User not found!'})
      }
      
      const isMatch = await bcrypt.compare(password, userDb.password);

      if(isMatch){

        const secret = process.env.SECRET
        const token = jwt.sign({id: userDb.id}, secret || "none")
        return res.json({message: 'Login sucess: ', token})
      }
      return res.status(401).json({ message: 'invalid password' })
    }
    catch(error){
      console.error('Logon error', error)
      return res.status(500).json({message: 'Internal server error'})
    }
  }

  public async updateUser(req: Request, res: Response): Promise<Response>{
    
    const { id, user, password} = req.body

    let userDb = await Users.findOneBy(id);

    if(!userDb){
      return res.status(404).json({ message: 'User not found' });
    }

    userDb.user = req.body.user
    userDb.password = req.body.password

    let userUpdate = await userDb.save()

    return res.send(userUpdate);
  }

  public async deleteUser(req: Request, res: Response): Promise<Response>{
    const { id } = req.body 

    try{
      let result = await Users.delete(id)
      return res.send(result);
    }
    catch(error)
    {
      return res.status(500).json({message: 'Failed to delete user by id'})
    }
  }
}
