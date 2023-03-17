const mySql = require("mysql");
let instance = null;

const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "hoardingloc",
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }
  async getData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM billboardinfo WHERE Status = 1";
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }
  async postData(Name,date,route,marker_type,distance) {
    try {
      const InsertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO markerdistancedata (Name,date,route,marker_type,distance) VALUES (?,?,?,?,?);";
        connection.query(
          query,
          [Name, date, route, marker_type, distance],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.InsertId);
        });
    });
    return{
        id: InsertId,
        Name: Name,
        date : date,
        route: route,
        marker_type: marker_type,
        distance: distance,
    }
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = DbService;
