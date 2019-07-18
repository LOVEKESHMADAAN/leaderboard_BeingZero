# leaderboard_BeingZero
 STEPS TO USE THIS
1. Clone This Repo 
2. Install all the modules that are in package.json file under the dependency part using command-> npm install module_name
3. For database connectivity make your own database on mlab and change the url string on line 32 in server.js or can change in mongo.js        file 
4. After succeessfull installation and connectivity , run server file using command -> node server.js ,server is running at port 3030 
5. Now enter following url in browser http://localhost:3030/

# 3 urls are used 
For User side use this  url -> http://localhost:3030/         by this we can add or update users  
For Admin side use this url -> http://localhost:3030/admin   here we can add new platforms and go for view all,list of platforms would be seen here update and delete can perform   
For showing Leaderboard use this url -> http://localhost:3030/leader 
