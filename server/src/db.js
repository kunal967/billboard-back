const mySql = require("mysql2");
let instance = null;
require('dotenv').config()

const connection = mySql.createPool({
connectionLimit : 10,
host : process.env.HOST,
user : process.env.USER_NAME,
password: process.env.PASSWORD,
database: process.env.DATABASE
});


class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }
  async getData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM reference_hoarding_deni`;
        
        connection.query(query, (err, result) => {
          console.log("database connected succesfully");
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }
  async postData(Name, Date, Trip, MarkerType, Distance, TotalFare) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO markerdistancedata (Name, Date,Trip,MarkerType,Distance, TotalFare) VALUES (?,?,?,?,?,?);";
        connection.query(
          query,
          [Name, Date, Trip, MarkerType, Distance, TotalFare],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.insertId);
        });
    });
    return{
        id: insertId,
        Name: Name,
        Date : Date,
        Trip: Trip,
        MarkerType: MarkerType,
        Distance: Distance,
        TotalFare:TotalFare,
    }
    } catch (error) {
      console.log(error.message);
    }
  }
}

module.exports = DbService;