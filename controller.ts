import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getTypeTrainning } from './api/typeTrainning/read';
import { getTrainning } from './api/trainning/read';
import { getExercise } from './api/exercise/read';
import { createTypeTrainning } from './api/typeTrainning/create';
import { Trainning, TypeTrainning } from '@prisma/client';
import { updateTypeTrainning } from './api/typeTrainning/update';
import { updateTrainning } from './api/trainning/update';
import { updateManyTrainning } from './api/trainning/updateMany';
  
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getTypeTrainning', async (req: Request, res: Response) => {
  const type = await getTypeTrainning();
  res.send(type);
});

app.get('/getExercises', async (req: Request, res: Response) => {
  const exercises = await getExercise();
  res.send(exercises);
});

app.post('/getTrainning', async (req: Request, res: Response) => {
  const id = req.body;
  const trainning = await getTrainning(id.id);
  
  res.send(trainning);
});

app.patch('/updateTrainning', async (req: Request, res: Response) => {
  const trainning:Trainning = req.body;
  const updatedTrainning = await updateTrainning(trainning);
  res.send(updatedTrainning);
});

app.patch('/updateManyTrainning', async (req: Request, res: Response) => {
  const trainning:Trainning[] = req.body.currentTrainning;
  console.log(trainning);
  
  const updatedTrainning = await updateManyTrainning(trainning);

  console.log(getTrainning(1));
  
  res.send(updatedTrainning);
});

app.post ('/updateTypeTrainning', async (req: Request, res: Response) => {
  const typeTrainning = req.body;
  const updatedType = await updateTypeTrainning(typeTrainning.newExercises, typeTrainning.currentType);
  res.send(updatedType);
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});