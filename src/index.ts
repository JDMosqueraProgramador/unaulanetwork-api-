import app from './app';

import dotenv from 'dotenv';

dotenv.config();

import './database';

const main = async () => {

    const PORT = app.get('PORT') || 3000;
    
    await app.listen(PORT, () => {

        console.log('Conect in port ' + PORT);
    });

}

main();