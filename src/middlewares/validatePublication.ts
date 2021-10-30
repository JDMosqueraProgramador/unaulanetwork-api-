import { checkSchema } from 'express-validator';
import Publication from '../models/publications.models';

const validateSchemaPublication = [
    checkSchema({
        user:{

        },
        visibility:{

        },
        group:{

        },
        publicationDate:{

        },
        category:{

        },
        description:{

        },
        reactions:{

        },
        comments:{

        },
        hashtags:{

        }
    })
]

export default validateSchemaPublication;