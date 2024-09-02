import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Trainning, Exercises } from '@prisma/client';
import { createExercise } from './exercise/create';
import { deleteExercise } from './exercise/delete';
import { getExercise } from './exercise/read';
import { deleteTrainning } from './trainning/delete';
import { getTrainning } from './trainning/read';
import { updateTrainning } from './trainning/update';
import { updateManyTrainning } from './trainning/updateMany';
import { updateState } from './trainning/updateState';
import { getTypeTrainning } from './typeTrainning/read';
import { updateTypeTrainning } from './typeTrainning/update';

  
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

app.put('/updateTrainning', async (req: Request, res: Response) => {
  const trainning:Trainning = req.body;
  const updatedTrainning = await updateTrainning(trainning);
  res.send(updatedTrainning);
});

app.put('/updateManyTrainning', async (req: Request, res: Response) => {
  const trainning:Trainning[] = req.body.data;
  console.log(trainning);
  
  const updatedTrainning = await updateManyTrainning(trainning);
  res.send(updatedTrainning);
});

app.delete('/deleteManyTrainings', async (req:Request, res:Response) => {
  const trainning:Trainning[] = req.body.exercisesForDelete;
  console.log(trainning);

  trainning.forEach((exercise:Trainning) =>{
    deleteTrainning(exercise.id);
  });
  
});


app.post('/updateTypeTrainning', async (req: Request, res: Response) => {
  const typeTrainning = req.body;
  
  const currentExercises = await getTrainning(typeTrainning.currentType.id);
  let filtredExercises: Trainning[] = [];
  let updatedType: any = null;

  currentExercises.forEach((exercise: Trainning) => {
    if (exercise.subType === typeTrainning.subTypeSelected) {
      filtredExercises.push(exercise);
    }
  });
  
  typeTrainning.newExercises.forEach((exercise: Exercises) => {
    let repetition = false;
    filtredExercises.forEach((filtredExercise: Trainning) => {
      if (exercise.name === filtredExercise.exercise) {
        repetition = true;
      }

      console.log(`nome: ${exercise.name}, filtredExercises: ${filtredExercise.exercise}`);
    });

    if (!repetition) {
      updatedType = updateTypeTrainning(exercise, typeTrainning.currentType, typeTrainning.subTypeSelected);
    }
  });

  res.send(updatedType);
});

app.patch('/updateStateExercises/:exerciseId/:typeTrainningId', async (req: Request, res: Response) => {
  const idExercise: number = parseInt(req.params.exerciseId, 10);
  const typeTrainningId: number = parseInt(req.params.typeTrainningId, 10);
  console.log(`typeTrainningId: ${req.params.typeTrainningId}`);
  
  const { status } = req.body;

  if (isNaN(idExercise) || isNaN(typeTrainningId) || typeof status !== 'boolean') {
    return res.status(400).send('Invalid parameters');
  }

  try {
    const updatedExercise = await updateState(idExercise, status, typeTrainningId);
    res.json(updatedExercise);
  } catch (error) {
    res.status(500).send('Error updating exercise state');
  }
});

app.put('/resetStates', async (req: Request, res: Response) => {
  const typeTrainningId = parseInt(req.body.typeTrainningId, 10);
  const exercises: Trainning[] = req.body.exercises;
  const newState: boolean = req.body.state;

  
  exercises.forEach((exercise: Trainning) => updateState(exercise.id, newState, typeTrainningId));

  res.send({ success: true, state: newState });
});

app.post('/createExercise', (req, res) =>{
  const exercise = req.body.exercise;
  console.log(exercise);
  
  createExercise(exercise);
});

app.delete('/deleteExercises', (req, res) =>{
  const exerciseId: number = req.body.id;
  console.log(exerciseId);
  
  deleteExercise(exerciseId);
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});