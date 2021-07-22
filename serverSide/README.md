# US-Consultancy
In order to run the ng-build output code with server just copy the dist folder from where its build paste it into the serverside folder. 
1. Config the .env file in side serverSide folder 
2. To run the server ``` npm start or node server.js ```
3.  to access the application in browser ``` http:\\localhost:6001\ ```
List of Api calls
1. insert data into DB: ``` http://<IP>:6001/insertData ``` 
   Method: 'POST'
   Payload: ``` {
      "name": "",
      "phoneNumber": ""
      "emailid": "",
      "message": "",
   }```
   Response_code: 201 crated and Error(400 to 500) 
2. Fetch all records from DB ```http://localhost:6001/getData```
    Method: "GET"
    Response: array of records []
    Response_code: 200 Ok  and Error (400 to 500)
 
License
----
ISC

# Patches 
22-07-2021 >>  Added server side (node js) 