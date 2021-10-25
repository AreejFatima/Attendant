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
        - To allow users to apply for leave once only at the start of the day.
        - A button/icon for viewing all records table 
        Records page contains a tabular view of all records showing (date, punch in and punch outs) Also, there is a date based search field at the top of the table + buttons to logout and go back
   - On validation failure, user will be shown an error
   - Below the punch form, there is a link leading to admin login form
   - Extend employees information to other fields such as email address, profile pictures and phone number (make sure fields are properly validated). Employee should be able  to      upload a profile picture (figure out the way to store the uploaded images)
   - Make an employee profile page where an employee can see his/her work hours (daily/weekly/monthly basis) both graphical and tabular form and other personal details (profile      pic, address, department, etc). Each employee can only see his/her profile page

 #### Admin
   - Login form with fields for inputting admin ID and PIN code
   - On successful login, the admin will be routed to the dashboard:
      - Contains split screen and a button for accessing settings
      - Split screen' description:
      - Today's Availability: a 3-tabbed view containing list of available, unavailable and on-leave employees;
      - Overall Stats: a sortable list of all employees containing their total working hours and average working hours, admin is  able to sort list based  total working hours. 
      - Settings view contains the list of all employees,this list enables admin to add/edit/delete employees
      - An inline form in the list for adding an employee's info with the following fields: first and last name, email, department and role
      - Inputs for changing office hours
      - Input for changing minimum working hours
      - Working hours consolidated over a period of 1, 3, 6 or 12 months & enable users to select time period using a button group or dropdown at the top of the widget.
   - On validation failure, admin will be shown an error
   - Below the login form, there is a link leading to punch form of employees
   - In Admin's view update employees info table to add profile pics as well. Also admin should be able to see each employee’s profile page. Clicking on the profile picture will      navigate the admin to the respective employee's profile page.
   - Add an illustration (could be red/green or up/down arrows) in employees' table (for admin view) showing number of hours short/exceeded for each employee on weekly/monthly        basis
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
         - Shared
              - ErrorDiv
              - NavBar
              - Editable Form
              - GraphicalTabs
              - HourlyTabs
              - LineChart
              - NavBar
              - Tab
              - TabButtons
              - Tabs
              - TabularView
              - UploadingImage
              - UserProfile
              - WorkHours
         - Admin
              - AvailabilityTabs
              - DisplayTab
              - Editable Row
              - ReadOnly Row
              - Settings
              - Modal
              - EmployeeTable
              - WorkHourTable
         - User
             - RecordsRow
             - RecordsTable
             - SearchBar
    - Adapter
         - gists
    - Routing
         - Routes
    - Pages
         - adminLoginPage
         - adminDashboardPage
         - adminSettingsPage
         - userLoginPage
         - userRegisterPage
         - userDashboardPage
         - userLeavePage
         - userRecordsPage 
         - userProfilePage

  
  

      
   
    
