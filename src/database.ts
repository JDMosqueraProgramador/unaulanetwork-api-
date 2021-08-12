import  mongoose  from 'mongoose';

const URI : string = process.env.CONNECTION || "";

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const mongooseConnect = mongoose.connection;
mongooseConnect.once('open', () => {
    console.log('datebase connect')
});

