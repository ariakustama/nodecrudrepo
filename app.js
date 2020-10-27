const express = require('express');
const app = express();

const db = require("./config/db");

app.get('/', (req, res) => res.send("its my first time :D!!!"));

app.use(express.urlencoded({extended:true}));

db.authenticate().then(() => 
    console.log("connection db success")
);

const Question = require("./models/question");
const RespondenOption = require("./models/respondenoption");

app.post("/insertquestion", async (req, res) => {
    try 
    {
        const {id, question, allownoneoftheabove, shuffletheorder} = req.body;
        const newQuestion = new Question({
            id, 
            question, 
            allownoneoftheabove, 
            shuffletheorder
        });

        await newQuestion.save();

        res.json(newQuestion);
    } 
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send("something wrong");
    }
});

app.post("/insertrespondenoption", async (req, res) => {
    try 
    {
        const {id, answer_option, question_id, name} = req.body;

        // const id = req.params.id;
        // const answer_option = req.params.answer_option;
        // const question_id = req.params.question_id;
        // const name = req.params.name;
        // const newRespondenOption = new RespondenOption({
        //     id = id, 
        //     answer_option = answer_option, 
        //     question_id = question_id, 
        //     name = name
        // });
 
        const newRespondenOption = new RespondenOption({
            id, 
            answer_option, 
            question_id, 
            name
        });

        await newRespondenOption.save();

        res.json(newRespondenOption);
    } 
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send("something wrong");
    }
});

app.get("/getquestion", async (req, res) => {
    try 
    {
        const dataQuestion = await Question.findAll({});

        res.json(dataQuestion);
    } 
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send("something wrong");
    }
});

app.get("/getrespondenoptionbyquestionid/:id", async (req, res) => {
    try 
    {
        const idquestion = req.params.id;
        const dataRespondenOption = await RespondenOption.findAll({
            where: {
                question_id: idquestion 
            }
          });

        res.json(dataRespondenOption);
    } 
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send("something wrong");
    }
});

app.delete("/deletequestion/:id", async (req, res) => {
    try 
    {
        const idquestion = req.params.id;
        const deletequestion = await Question.destroy({
            where: {
                id: idquestion 
            }
          });

          await deletequestion;

        res.json("Data Question Has Been Deleted");
    } 
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send("something wrong");
    }
});

app.delete("/deleteresponoption/:id", async (req, res) => {
    try 
    {
        const idresponoption = req.params.id;
        const deleterespononption = await RespondenOption.destroy({
            where: {
                id: idresponoption 
            }
          });

          await deleterespononption;

        res.json("Data Respon Option Has Been Deleted");
    } 
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send("something wrong");
    }
});

app.put("/updatequestion/:id", async (req, res) => {
    try 
    {
        const {question, allownoneoftheabove, shuffletheorder} = req.body;
        const idquestion = req.params.id;

        const updateData = await Question.update({
            question, 
            allownoneoftheabove, 
            shuffletheorder
        }, 
        {   where: { 
            id: idquestion
            }
        });

        await updateData;

        res.json("Data Question Has Been Updated");
    } 
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send("something wrong");
    }
});

app.put("/updaterespondenoption/:id", async (req, res) => {
    try 
    {
        const {answer_option, question_id, name} = req.body;
        const idresponoption = req.params.id;

        const updateData = await RespondenOption.update({
            answer_option, 
            question_id, 
            name
        }, 
        {   where: { 
            id: idresponoption
            }
        });

        await updateData;

        res.json("Data Respon Option Has Been Updated");
    } 
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send("something wrong");
    }
});

app.listen(3100, () => console.log('using port 3500'));
