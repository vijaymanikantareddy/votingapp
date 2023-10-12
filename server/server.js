const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/Users");
const projectModel = require("./models/Projects");
const nodemailer = require("nodemailer");
const voterModel = require("./models/Voters");
const app = express();
app.use(cors());
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // Parse JSON requests
// app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests
// app.options("*", cors());
const port = process.env.PORT || 5000;

// Connect to your database
mongoose.connect(
  "mongodb+srv://vijaymanikantareddy:vijay123@cluster0.uqabqth.mongodb.net/voting"
);

app.listen(5000, () => {
  console.log("Server is Running");
});

if (mongoose) {
  console.log("db connected");
} else {
  console.log("db not connected");
}

app.post("/createuser", (req, res) => {
  userModel
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/votesubmit", async (req, res) => {
  try {
    const { name, rollnumber, email, selectedTeam, phone } = req.body;

    // Operation 1: Save the user's information in the "voterModel"
    // voterModel.create({
    //   name,
    //   rollnumber,
    //   email,
    //   phone,
    //   selectedTeam,
    // });
    // const voter = new voterModel({
    //   name,
    //   rollnumber,
    //   email,
    //   phone,
    //   votedteam: selectedTeam,
    // });
    // await voter.save();

    // Operation 2: Update the "voters" array in the "projectModel"
    const project = await projectModel.findOne({ _id: selectedTeam });

    if (project) {
      // Append the email to the "voters" array
      voterModel.create({
        name,
        rollnumber,
        email,
        phone,
        votedteam: project.teamnumber,
      });

      project.voters.push(email);

      // Save the updated project document
      await project.save();

      // Send a response indicating success
      res
        .status(200)
        .json({ message: "User information and email added successfully" });
    } else {
      // Handle the case where the team number is not found
      res.status(404).json({ error: "Team Number not found" });
    }
  } catch (error) {
    console.error("Error updating user information and email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/createproject", (req, res) => {
  const {
    teamnumber,
    teamcount,
    names,
    emails,
    projectdomain,
    description,
    teamtitle,
  } = req.body;

  projectModel
    .create({
      teamnumber,
      teamcount,
      teamtitle,
      projectdomain,
      description,
      tlname: names[0], // Assuming the first name corresponds to the team leader
      tlmail: emails[0], // Assuming the first email corresponds to the team leader
      tm1name: names[1] || "", // Handle if there are fewer than 2 team members
      tm1mail: emails[1] || "",
      tm2name: names[2] || "",
      tm2mail: emails[2] || "",
      tm3name: names[3] || "",
      tm3mail: emails[3] || "",
    })
    .then((project) => res.json(project))
    .catch((err) => res.json(err));
});

app.get("/projects", (req, res) => {
  projectModel
    .find({})
    .then((projects) => res.json(projects))
    .catch((err) => res.json(err));
});

app.get("/next-team-number", (req, res) => {
  // Query the database to find the highest team number
  projectModel.findOne(
    {},
    { teamnumber: 1 },
    { sort: { teamnumber: -1 } },
    (err, team) => {
      if (err) {
        console.error("Error fetching next team number: " + err);
        res.status(500).send("Error fetching next team number");
      } else {
        // Calculate the next available team number
        const nextTeamNumber = team ? team.teamnumber + 1 : 1;
        res.json({ nextTeamNumber });
      }
    }
  );
});

app.get("/getProject/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findById({ _id: id })
    .then((projects) => res.json(projects))
    .catch((err) => res.json(err));
});

app.put("/updateProject/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndUpdate(
      { _id: id },
      {
        teamnumber: req.body.teamnumber,
        teamtitle: req.body.teamtitle,
        projectdomain: req.body.projectdomain,
        description: req.body.description,
        teamcount: req.body.teamcount,
        tlname: req.body.tlname,
        tlmail: req.body.tlmail,
        tm1name: req.body.tm1name,
        tm1mail: req.body.tm1mail,
        tm2name: req.body.tm2name,
        tm2mail: req.body.tm2mail,
        tm3name: req.body.tm3name,
        tm3mail: req.body.tm3mail,
      }
    )
    .then((projects) => res.json(projects))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  cmsModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        if (user.type === "user") {
          res.json("successuser");
        } else if (user.type === "admin") {
          res.json("successadmin");
        }
      } else {
        res.json("Incorrect Password");
      }
    } else {
      res.json("No such record exists");
    }
  });
});

app.delete("/deleteProject/:id", (req, res) => {
  const id = req.params.id;
  projectModel
    .findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((res) => res.json(err));
});

app.get("/", (req, res) => {
  userModel
    .find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndUpdate(
      { _id: id },
      { name: req.body.name, email: req.body.email, age: req.body.age }
    )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((res) => res.json(err));
});

const savedOTPS = {};

//sending mail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "******@gmail.com",
    pass: "***********",
  },
});

app.post("/checkEmail", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email exists in the "voterModel"
    const existingEmail = await voterModel.findOne({ email });

    if (existingEmail) {
      // Email exists in the "voterModel"
      res.json("exists");
    } else {
      // Email does not exist in the "voterModel"
      res.json("not found");
    }
  } catch (error) {
    console.error("Error checking email existence:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/sendemailtl", (req, res) => {
  const mailOptions = {
    from: "*****@gmail.com",
    to: email,
    subject: "Testing Node Mails",
    html: `<div>
    <p><strong>Team Number:</strong> ${teamnumber}</p>
    <p><strong>Team Title:</strong> ${teamtitle}</p>
    <p><strong>Project Domain:</strong> ${projectdomain}</p>
    <p><strong>Team Leader name:</strong> ${teamleadername} <-> ${email}</p>
  
    <p><strong>Team members details:</strong></p>
    <ul>
      {formData.teammemberData.map((teamMember, index) => (
        <li key=${index}>
          Person ${index + 1}: ${teamMember.name} <-> ${teamMember.email}
        </li>
      ))}
    </ul>
  </div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Couldn't send");
    } else {
      savedOTPS[email] = otp;
      setTimeout(() => {
        delete savedOTPS[email];
      }, 180000);
      res.send("Sent OTP");
    }
  });
});

app.post("/sendotp", (req, res) => {
  const email = req.body.email;
  const digits = "0123456789";
  const limit = 4;
  let otp = "";

  for (let i = 0; i < limit; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  const mailOptions = {
    from: "svmreddy7799@gmail.com",
    to: email,
    subject: "Testing Node Mails",
    html: `<p>Testing Backend OTP Generation. Enter the otp: <b><u>${otp}</u></b> to verify your email address</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Couldn't send");
    } else {
      savedOTPS[email] = otp;
      setTimeout(() => {
        delete savedOTPS[email];
      }, 60000);
      res.send("Sent OTP");
    }
  });
});

app.post("/verifyotp", (req, res) => {
  const otpReceived = req.body.otp;
  const email = req.body.email;

  if (savedOTPS[email] === otpReceived) {
    res.send("Verified");
  } else {
    res.status(500).send("Invalid OTP");
  }
});

//Get all the team numbers and names

app.get("/teams", async (req, res) => {
  try {
    // Fetch the teamtitle and teamnumber from your database
    // Replace 'Team' with your actual MongoDB collection/model name
    const teams = await projectModel.find({});
    // Send the team data as JSON response
    res.json(teams);
  } catch (error) {
    console.error("Error fetching team data:", error);
    res.status(500).send("Error fetching team data");
  }
});

/*
// const teamNumberRoute = require("./routes/teamNumber");
app.get("/getTeamNumber", async (req, res) => {
  try {
    // Find the maximum team number currently in use
    const maxTeamNumber = await Project.findOne({})
      .sort({ teamNumber: -1 })
      .select("teamNumber");

    // Calculate the next team number
    const nextTeamNumber = maxTeamNumber ? maxTeamNumber.teamNumber + 1 : 1;

    res.json({ teamNumber: nextTeamNumber });
  } catch (error) {
    console.error("Error getting team number:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
*/
/*
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const savedOTPS = {};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "svmreddy7799@gmail.com",
    pass: "tqxmbcczjurhpqen",
  },
});

app.post("/sendotp", (req, res) => {
  const email = req.body.email;
  const digits = "0123456789";
  const limit = 6;
  let otp = "";

  for (let i = 0; i < limit; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  const mailOptions = {
    from: "svmreddy7799@gmail.com",
    to: email,
    subject: "For Fun",
    html: `<p>Testing Backend OTP Generation. Enter the otp: <b><u>${otp}</u></b> to verify your email address</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Couldn't send");
    } else {
      savedOTPS[email] = otp;
      setTimeout(() => {
        delete savedOTPS[email];
      }, 60000);
      res.send("Sent OTP");
    }
  });
});

app.post("/verify", (req, res) => {
  const otpReceived = req.body.otp;
  const email = req.body.email;

  if (savedOTPS[email] === otpReceived) {
    res.send("Verified");
  } else {
    res.status(500).send("Invalid OTP");
  }
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
*/
// app.post("/getuser", (req, res) => {
//   const { roll } = req.body;
//   cmsModel.findOne({ roll: roll }).then((user) => {
//     if (user) {
//       res.json("exists");
//     } else {
//       res.json("Doesn't exist");
//     }
//   });
// });

// // Define a mongoose model for your user schema (adjust this to your actual schema)
// const User = mongoose.model("User", {
//   email: String,
//   // Other user fields
// });

// // Define an API route for checking if an email exists
// app.post("/checkEmail", (req, res) => {
//   const { email } = req.body;

//   // Use Mongoose to find a user with the given email
//   User.findOne({ email }, (err, user) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ error: "Internal Server Error" });
//       return;
//     }

//     if (user) {
//       // Email already exists
//       res.json({ exists: true });
//     } else {
//       // Email doesn't exist
//       res.json({ exists: false });
//     }
//   });
// });

// // Configure Nodemailer to send emails using your email service provider
// const transporter = nodemailer.createTransport({
//   service: "your_email_service_provider", // e.g., 'Gmail' or 'SendGrid'
//   auth: {
//     user: "your_email@example.com",
//     pass: "your_email_password",
//   },
// });

// app.post("/sendOTP", (req, res) => {
//   const { email, otp } = req.body;

//   const mailOptions = {
//     from: "your_email@example.com",
//     to: email,
//     subject: "Your OTP Code",
//     text: `Your OTP code is: ${otp}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending OTP email:", error);
//       res.status(500).json({ error: "Error sending OTP email" });
//     } else {
//       console.log("OTP email sent successfully");
//       res.json({ success: true });
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
