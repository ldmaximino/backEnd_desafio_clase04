const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8"); //almacena en el array products todos los objetos que están guardados en el archivo products.json.
        return JSON.parse(products);
      } else {
        return []; //si no existe el archivos products.json devuelve un array vacío.
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(objProd) {
    try {
      const products = await this.getProducts(); //almacena en el array products todos los objetos que están guardados en el archivo products.json.
      const product = { id: this.#getNextID(products), ...objProd }; //agrega el campo id (autoincrementable) al objeto producto
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products)); //graba el array products en formato JSON en el archivos products.json
      return console.log(
        `Product with ID ${product.id} was created successfully.`
      );
    } catch (error) {
      console.log(error);
    }
  }

  #getNextID(products) {
    let nextID = 0;
    products.map((product) => {
      if (product.id > nextID) nextID = product.id;
    });
    return nextID + 1;
  }

  async updateProduct(objProduct) {
    try {
      const products = await this.getProducts();
      const updateProd = products.map((product) => {
        if (product.id === objProduct.id) {
          return objProduct;
        } else {
          return product;
        }
      });
      await fs.promises.writeFile(this.path, JSON.stringify(updateProd));
      console.log(`Product with ID ${objProduct.id} was updated.`);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const newProducts = products.filter((product) => product.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
      console.log(`Product with ID Nº ${id} was deleted.`);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    this.#lineSep();
    console.log(`Find Product by ID Nº ${id}`);
    const products = await this.getProducts(); //almacena en el array products todos los objetos que están guardados en el archivo products.json.
    const product = await products.find((prod) => prod.id === id);
    if (!product) return console.log(`Product with ID ${id} does not exist.`);
    return product;
  }

  #lineSep() {
    console.log();
    console.log(
      "---------------------------------------------------------------"
    );
    console.log();
  }
}

const productManager = new ProductManager("./products.json");

const tester = async () => {
  console.log(await productManager.getProducts()); //Muestra el contenido del archivo products.json
  await productManager.addProduct(product1); //Agrega el primer producto
  await productManager.addProduct(product2); //Agrega el segundo producto
  await productManager.addProduct(product3); //Agrega el tercer producto
  await productManager.addProduct(product4); //Agrega el cuarto producto
  await productManager.addProduct(product5); //Agrega el quinto producto
  console.log(await productManager.getProducts()); //Muestra el contenido del archivo products.json
  console.log(await productManager.getProductById(4)); //Muestra el objeto con id Nº 4 en formato objeto js
  console.log(await productManager.getProductById(2)); //Muestra el objeto con id Nº 4 en formato objeto js
  console.log("----------------------------------");
  await productManager.updateProduct(product3_edit); //Modifica el producto con ID Nº 3 llevando el precio a 75 y el precio a 150
  console.log(await productManager.getProductById(3)); //Muestra el objeto con id 3 modificado
  console.log("----------------------------------");
  await productManager.deleteProduct(1); //Elimina el producto con ID Nº 1
  console.log(await productManager.getProducts()); //Muestra el array de objetos sin el objeto con ID Nº 1
};

//Ejecución de la app
tester();

const product1 = {
  title: "Notebook HP 360 Envy 15",
  description:
    'Notebook HP Envy x360 15-fe0053dx plateada táctil 15.6", Intel Core i7 1355U 16GB de RAM 512GB SSD, Gráficos Intel Iris Xe 1920x1080px Windows 11 Home',
  price: 2100,
  thumbnail: "http:/localhost:3000/img/img01.jpg",
  code: "fe0053dx",
  stock: 10,
};
const product2 = {
  title: "Tv 50 samsung",
  description: "Smart Tv Samsung 50 Un50cu7000gczb Led 4k",
  price: 600,
  thumbnail: "http:/localhost:3000/img/img02.jpg",
  code: "Un50cu",
  stock: 25,
};
const product3 = {
  title: "Smartwatch Mibro Watch C3",
  description:
    "Smartwatch Mibro Watch C3 Llamadas 70 Modos 47mm Amoled Hd Color de la caja Negro",
  price: 68,
  thumbnail: "http:/localhost:3000/img/img03.jpg",
  code: "MlbroC3",
  stock: 108,
};
const product4 = {
  title: 'Tablet Samsung 9"',
  description: "Samsung Galaxy Tab S9 Fe 128gb 6gb Ram Color Gray",
  price: 42,
  thumbnail: "http:/localhost:3000/img/img04.jpg",
  code: "GalaxyTabS9",
  stock: 800,
};
const product5 = {
  title: "Pen Drive 32GB",
  description: "Pen Drive 32GB",
  price: 120,
  thumbnail: "http:/localhost:3000/img/img05.jpg",
  code: "PD32",
  stock: 18,
};
const product3_edit = {
  id: 3,
  title: "Smartwatch Mibro Watch C3",
  description:
    "Smartwatch Mibro Watch C3 Llamadas 70 Modos 47mm Amoled Hd Color de la caja Negro",
  price: 75,
  thumbnail: "http:/localhost:3000/img/img03.jpg",
  code: "MlbroC3",
  stock: 150,
};
