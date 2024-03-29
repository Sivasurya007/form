import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const pool = new pg.Pool({
    user: 'ul2z8bhtrhiy0m77pcbm',
    host: 'b77b2hodkk0w8htn89p8-postgresql.services.clever-cloud.com',
    password: 'bsxkPtu7YKDgeFAadWzizXOZ9eFria',
    database: 'b77b2hodkk0w8htn89p8',
    port: 50013, 
}); 

app.post('/page2', async (req, res) => {
    try {
        const { employeeName, employeeId, department, dob, gender, designation, salary ,phoneNumber,address } = req.body;
        console.log(employeeName,"safs")
        if(salary<0||salary>99999999) return res.json("0")
        const query = `
            INSERT INTO employee (employeename, employeeidnumber, department, dateofbirth, gender, designation, salary,phone_number,address)
            VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9)
        `;
        await pool.query(query, [employeeName, employeeId, department, dob, gender, designation, salary,phoneNumber,address]);

        res.status(200).send('Form data inserted successfully');
        console.log("data sent");
    } catch (error) {
        console.error('Error inserting form data:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/getdata", async (req, res) => {
    try {
        const getquery = "SELECT * FROM employee";
        const data = await pool.query(getquery);
        res.json(data.rows); 
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" }); 
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
