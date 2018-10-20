import { Request, Response, Router } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send('hello Harish! welcome to express typeScript');
});

router.get('/:name', (req: Request, res: Response) => {
    const name = req.params.name;
    res.send(`hello ${name}`);
});

export const welcomeController: Router = router;
