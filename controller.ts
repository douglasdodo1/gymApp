import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getTypeTrainning } from './api/typeTrainning/read';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getTypeTrainning', async (req: Request, res: Response) => {
  console.log("AQUI2");
  
  const type = await getTypeTrainning();
  res.send('Hello World!');
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});