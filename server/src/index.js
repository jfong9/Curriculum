import app from "./server";
import { MongoClient } from "mongodb";
import SchoolsDAO from "./dao/schoolsDAO";
import StudentsDAO from "./dao/studentsDAO";
import StudentCurrDAO from "./dao/studentCurrDAO";

const port = process.env.PORT || 5000;

MongoClient.connect(
    process.env.TEST_DB_URI,
    {useNewUrlParser: true, wtimeout: 2500, useUnifiedTopology: true },
).catch(err => {
    console.error(err.stack);
    process.exit(1);
}).then(async client => {
    let databaseName = process.env.TEST_DB;
    await SchoolsDAO.injectDB(client, databaseName);
    await StudentsDAO.injectDB(client, databaseName);
    await StudentCurrDAO.injectDB(client, databaseName);
    app.listen(port, () => {
        console.log(`listening on port ${port}`);
    })
}).catch(err => {
    console.error(err.stack);
    process.exit(1);
})