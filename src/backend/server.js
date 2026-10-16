
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const JWT_SECRET =
  process.env.JWT_SECRET || "cinebook_dev_secret_change_me";

app.use(cors());
app.use(express.json());

// Demo user
const users = [
  {
    id: 1,
    name: "Pradeep",
    email: "pradeep@gmail.com",
    password: "123456",
  },
];

// Login API - JWT token generate
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (item) =>
      item.email === email &&
      item.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

// Movies API
app.get("/api/movies", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Leo",
      name: "Leo",
      genre: ["Action", "Thriller"],
      language: "Tamil",
      rating: 4.5,
      duration: "2h 44m",
      description: "An action thriller movie.",
    },
    {
      id: 2,
      title: "Vikram",
      name: "Vikram",
      genre: ["Thriller"],
      language: "Tamil",
      rating: 4.8,
      duration: "2h 55m",
      description: "A Tamil action thriller.",
    },
    {
      id: 3,
      title: "Interstellar",
      name: "Interstellar",
      genre: ["Sci-Fi"],
      language: "English",
      rating: 4.7,
      duration: "2h 49m",
      description: "A science fiction adventure.",
    },
  ]);
});

app.listen(PORT, () => {
  console.log(
    `CineBook API running at http://localhost:${PORT}`
  );
});
