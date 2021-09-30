# Attendant

## Implemented Features are :

 #### Users
   - Punch form with fields for inputting employee ID and PIN code
   - On successful validation:
      In case of new user, user will be aable to register(id automatically assigned to user, username and password are entered by user) and login again
      In case this is not the first login(i.e. not a new user), user will be able to see his/her punch card:
        - Containing an avatar with his/her name
        - A button for punch in/out
        - A button for applying for leave, (leave form when submitted is stored in gists, with a pending status)
        - A button/icon for viewing all records table 
        Records page contains a tabular view of all records showing (date, punch in and punch outs) Also, there is a date based search field at the top of the table + buttons to logout and go back
   - On validation failure, user will be shown an error
   - Below the punch form, there is a link leading to admin login form

 #### Admin
   - Login form with fields for inputting admin ID and PIN code
   - On successful login, the admin will be routed to the dashboard:
      - Contains split screen and a button for accessing settings
      - Split screen' description:
      - Today's Availability: a 3-tabbed view containing list of available, unavailable and on-leave employees;
      - Overall Stats: a sortable list of all employees containing their total working hours and average working hours, admin is  able to sort list based  total working hours. 
      - Settings view contains the list of all employees,this list enables admin to delete the employees & buttons to log out and go back to previous page
   - On validation failure, admin will be shown an error
   - Below the login form, there is a link leading to punch form of employees
#### Rules & Validations
- All data is stored in gists
- Validations on forms 
- Employee IDs are generated automatically according to the provided department (e.g SE-122)
- PIN code should be 6 digits long; 
- Logical validations on inputs
## Project Structure:
- Src
    - Redux
         - Store
            - store
         - Slices (to hold the reducer functions of admin and users respectively, initial states are updated via data stored in gists)
            - adminSlice
            - userSlice
    - Components
         - NavBar
         - Admin
             - AdminLogin
             - AdminDashboard
             - Admin Settings
         - User
            - Login
            - Register
            - UserDashboard
            - UserRecords
            - Leave Requests
         - gists.js (a file containing helper function of storing and retreiving data from gists)
   - Routes.js
   - history.js

   
 ## Missing features:
 - To allow admin to add/edit employees + an inline form in the list for adding an employee's info with the following fields: first and last name, email, department and role
 - Inputs for changing office hours
 - Input for changing minimum working hours
 - Working hours consolidated over a period of 1, 3, 6 or 12 months & enable users to select time period using a button group or dropdown at the top of the widget.
 - Modal not used, instead user is routed to seperate component to view records
 - To allow users to apply for leave once only at the start of the day.
  

      
   
    
