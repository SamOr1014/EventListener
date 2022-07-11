// import { client } from "../server";
// import { event } from "./event";
// import { account } from "./account";


// event.get("/allEvents", async (req, res) => {
//   const getEventDetails = await client.query(
//     /*sql */ `SELECT * FROM EVENTS WHERE ID =$1`[req.session["user"].ID]
//   );
//   res.json(getEventDetails.rows);
// });

// // account.get("/userdetail", async (req, res) => {
// //   const userID = req.session["user"].ID; //later substitute by req.session["userID"]
// //   const userINFO = await client.query("SELECT * FROM users where id = $1", [userID]);
// //   res.json(userINFO.rows[0]);
// // });
