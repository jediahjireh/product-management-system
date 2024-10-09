// import express module
import express from "express";
// import file system module
import fs from "fs";
// import cors module
import cors from "cors";

const app = express();
const port = 3000;

// cors configuration - allow requests from frontend (http://localhost:4200)
const corsOptions = {
  origin: "https://grace-and-garments.vercel.app",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

// cors middleware
app.use(cors(corsOptions));

// express.json() middleware to parse JSON bodies of requests
app.use(express.json());

// GET request - get all the products
app.get("/clothes", (req, res) => {
  // localhost:3000/clothes?page=0&perPage=10
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 10;

  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const start = page * perPage;
    const end = start + perPage;

    const result = jsonData.products.slice(start, end);

    res.status(200).json({
      products: result,
      total: jsonData.products.length,
      page,
      perPage,
      totalPages: Math.ceil(jsonData.products.length / perPage),
    });
  });
});

// POST request - add a new product
app.post("/clothes", (req, res) => {
  const { image, name, price, rating } = req.body;

  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const maxId = jsonData.products.reduce(
      (max, product) => Math.max(max, product.id),
      0
    );

    const newProduct = {
      id: maxId + 1,
      image,
      name,
      price,
      rating,
    };

    jsonData.products.push(newProduct);

    fs.writeFile("products.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(201).json(newProduct);
    });
  });
});

// PUT request - update/edit a product
app.put("/clothes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { image, name, price, rating } = req.body;

  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const index = jsonData.products.findIndex((product) => product.id === id);

    if (index === -1) {
      res.status(404).send("Not Found");
      return;
    }

    jsonData.products[index] = {
      id,
      image,
      name,
      price,
      rating,
    };

    fs.writeFile("products.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(200).json(jsonData.products[index]);
    });
  });
});

// DELETE request - delete a product
app.delete("/clothes/:id", (req, res) => {
  // localhost:3000/clothes/5
  const id = parseInt(req.params.id);

  fs.readFile("products.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const index = jsonData.products.findIndex((product) => product.id === id);

    if (index === -1) {
      res.status(404).send("Not Found");
      return;
    }

    jsonData.products.splice(index, 1);

    fs.writeFile("products.json", JSON.stringify(jsonData), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(204).send();
    });
  });
});

// start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
