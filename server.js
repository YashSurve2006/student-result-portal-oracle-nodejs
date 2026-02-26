const express = require("express");
const cors = require("cors");
const oracledb = require("oracledb");
const path = require("path");

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

/* Return rows as JS objects */
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

/* ================= ORACLE CONNECTION ================= */
/*
   Same service used by SQL*Plus (SYS$USERS)
*/
async function getConn() {
    return await oracledb.getConnection({
        user: "c##student",
        password: "student123",
        connectString: "localhost:1521"
    });
}

/* ================= ADD STUDENT ================= */
app.post("/add-student", async (req, res) => {
    let con;
    const { roll, name, stud_class } = req.body;

    try {
        con = await getConn();

        await con.execute(
            `BEGIN
                stud_pack.add_student(:r, :n, :c);
             END;`,
            { r: roll, n: name, c: stud_class }
        );

        res.redirect("/add-students.html?success=1");

    } catch (err) {
        console.error("ADD STUDENT ERROR:", err);

        // ORA-00001 → duplicate primary key
        if (err.errorNum === 1) {
            return res.redirect("/add-students.html?error=exists");
        }

        res.redirect("/add-students.html?error=failed");

    } finally {
        if (con) await con.close();
    }
});

/* ================= ADD MARKS ================= */
app.post("/add-marks", async (req, res) => {
    let con;
    const { roll, m1, m2, m3 } = req.body;

    try {
        con = await getConn();

        await con.execute(
            `BEGIN
                stud_pack.add_marks(:r, :a, :b, :c);
             END;`,
            { r: roll, a: m1, b: m2, c: m3 }
        );

        res.redirect("/add-marks.html?success=1");

    } catch (err) {
        console.error("ADD MARKS ERROR:", err);

        // ORA-00001 → marks already exist for this roll
        if (err.errorNum === 1) {
            return res.redirect("/add-marks.html?error=exists");
        }

        res.redirect("/add-marks.html?error=invalid");

    } finally {
        if (con) await con.close();
    }
});

/* ================= DELETE STUDENT ================= */
app.post("/delete-student", async (req, res) => {
    let con;
    const { roll } = req.body;

    try {
        con = await getConn();

        // Check student exists
        const check = await con.execute(
            `SELECT 1 FROM student WHERE roll = :roll`,
            { roll }
        );

        if (check.rows.length === 0) {
            return res.redirect("/add-students.html?error=notfound");
        }

        // 1️⃣ Delete marks first
        await con.execute(
            `DELETE FROM marks WHERE roll = :roll`,
            { roll }
        );

        // 2️⃣ Delete student
        await con.execute(
            `DELETE FROM student WHERE roll = :roll`,
            { roll }
        );

        await con.commit();

        res.redirect("/add-students.html?success=deleted");

    } catch (err) {
        console.error("DELETE STUDENT ERROR:", err);
        res.redirect("/add-students.html?error=failed");
    } finally {
        if (con) await con.close();
    }
});


/* ================= API : GET RESULT ================= */
/* JSON API consumed by frontend */
app.get("/api/result/:roll", async (req, res) => {
    let con;
    const roll = req.params.roll;

    try {
        con = await getConn();

        // IMPORTANT: USING clause → no alias on roll
        const result = await con.execute(
            `SELECT roll,
                    s.name,
                    s.stud_class,
                    m.m1,
                    m.m2,
                    m.m3,
                    m.total,
                    m.percent,
                    m.gr
             FROM student s
             JOIN marks m USING (roll)
             WHERE roll = :roll`,
            { roll }
        );

        if (result.rows.length === 0) {
            return res.json({ error: "Result not found" });
        }

        res.json(result.rows[0]);

    } catch (err) {
        console.error("GET RESULT ERROR:", err);
        res.status(500).json({ error: "Server error" });

    } finally {
        if (con) await con.close();
    }
});

/* ================= SERVER START ================= */
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
