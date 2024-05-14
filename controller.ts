import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getTypeTrainning } from './api/typeTrainning/read';
import { getTrainning } from './api/trainning/read';
import { getExercise } from './api/exercise/read';
  
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
  console.log(id.id);
  
  const trainning = await getTrainning(id.id);
  console.log(trainning);
  
  res.send(trainning);
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});