![Golden Eagle Flight Plan Logo](./assets/logo-gefp.png)
# CSULA Senior Design Project

## ✨ Objective
The project aims to support student success by providing a comprehensive platform that addresses three key areas: **Academic Preparation**, **Career Development**, and **Leadership & Community Engagement**. Our goal is to create a dynamic, evidence-based system that guides students through their academic journey and prepares them for life after graduation.

---

## 🎯 Core Goals

* **Support Degree Completion ✅**: Offer personalized academic planning and guidance by connecting students with essential campus resources like advisors, tutors, food pantries, and financial aid offices.
* **Expose Advanced Opportunities 🚀**: Actively connect students to advanced opportunities, including research projects, internships, and competitions that align with their interests.
* **Career-Readiness Plan 💼**: Provide tailored recommendations for career skills and professional experiences based on the student's academic progress and goals.
* **Time Management ⏳**: Assist students in developing balanced schedules that incorporate study, rest, and recreation for overall well-being.
* **Evidence-Based Suggestions 📊**: Ensure all recommendations are supported by verifiable sources, such as university catalog rules, advisor input, and official campus/career resource sites.

---

## 🚀 Core Features

* **Student Profile Intake 📝**: A user-friendly interface for students to input their completed courses, career interests, and personal constraints (e.g., work hours, ADA requirements).
* **Opportunity Finder 🔍**: An intelligent system that recommends relevant research projects, internships, student clubs, and leadership activities based on the student's profile.
* **Plan Tracker 📈**: A dashboard that provides customized recommendations in three main areas: Academic Preparation, Career Development, and Leadership/Community Engagement.
* **Career ↔ Course Outcome Matching 🔗**: A feature that matches course learning outcomes and activities to specific job skills and career pathways.
* **University Rules Engine 🏛️**: A backend system that encodes key university policies (e.g., withdrawal, graduation requirements, financial aid limits) to provide proactive guidance and prevent students from getting off track.
* **Faculty/Advisor Opportunity Input 🧑‍🏫**: A simple interface for faculty and advisors to submit new opportunities for students, including a title, description, expiration date, and learning outcomes.
* **Student Support Services Integration ❤️**: Integration with various campus resources like tutoring centers, advising centers, and food pantries, linking them to a student's specific needs and major.
* **Advisor Dashboard 📊**: A dedicated view for advisors to monitor student profiles, track their progress, and provide comments or make adjustments to their plans.

---

## 💡 Other Considerations

* **Data Privacy 🔒**: Protecting student data is a top priority, and all platform features must comply with FERPA standards.
* **Explainability 🧐**: All AI-powered recommendations must be transparent, citing the specific rules, policies, or source documents used to generate the suggestion.
* **Scalability 🌐**: The platform should be designed to support multiple majors and departments across the entire campus.

---

🏁 Getting Started
---

To get the project running on a local machine for development and testing, we can follow these instructions.

### **Prerequisites**

First, we need to ensure the following software is installed on our system:

* **Git:** For cloning the repository. [Download Git](https://git-scm.com/)
* **Node.js:** We recommend using the latest LTS (Long-Term Support) version. This will also install `npm` (Node Package Manager). [Download Node.js](https://nodejs.org/)
* **(Recommended) GitHub Desktop:** A user-friendly graphical interface for Git. [Download GitHub Desktop](https://desktop.github.com/)
* **MongoDB:** We will need access to our shared **MongoDB Atlas** database and should have the connection string for the `.env` file.

### **Installation & Setup**

1.  **Clone the repository to a local machine:**

    We can do this in two ways. Choose the one you prefer.

    * **Option A: Using the Command Line**
        ```bash
        git clone [https://github.com/wj1212/CSULA-Senior-Design-Project-Golden-Eagle-Flight-Plan.git](https://github.com/wj1212/CSULA-Senior-Design-Project-Golden-Eagle-Flight-Plan.git)
        ```

    * **Option B: Using GitHub Desktop (Recommended for beginners)**
        1.  Open the GitHub Desktop app.
        2.  Go to `File` > `Clone Repository...` in the top menu.
        3.  Select the `URL` tab.
        4.  Paste the repository URL: `https://github.com/wj1212/CSULA-Senior-Design-Project-Golden-Eagle-Flight-Plan.git`
        5.  Choose a local path where you want to save the project and click `Clone`.

2.  **Navigate into the project directory:**

    If we used the command line to clone, we'll need to navigate into the new folder. If we used GitHub Desktop, we can open a terminal directly from the app by going to `Repository` > `Open in Command Prompt/Terminal`.
    ```bash
    cd CSULA-Senior-Design-Project-Golden-Eagle-Flight-Plan
    ```

3.  **Install Dependencies (Frontend & Backend)**

    * First, we'll install the **frontend** dependencies from the root directory:
        ```bash
        npm install
        ```
    * Next, we'll navigate into the `backend` directory and install its dependencies:
        ```bash
        cd backend
        npm install
        ```

4.  **Configure the Backend**
    * In the `backend` folder, we need to create a new file named `.env`.
    * Add the `DB_CONNECTION_STRING` we received from MongoDB Atlas to this file.
    * We can navigate back to the root directory when done:
        ```bash
        cd ..
        ```

### **Running the Development Server**

Our project requires **two terminal windows** running at the same time: one for the backend and one for the frontend.

#### **Terminal 1: Start the Backend Server**

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Start the server:
    ```bash
    node server.js
    ```
3.  We should see a confirmation that the server is running and connected to the database. **This terminal window should be kept running.**

#### **Terminal 2: Start the Frontend App**

1.  Open a **new** terminal window and navigate to the **project root directory**.
2.  Start the Expo development server:
    ```bash
    npm start
    ```
3.  A QR code will appear. We can then use the **Expo Go** app on a phone to scan it and open the application.

### **Troubleshooting**

* **PowerShell Error on Windows:** If anyone using Windows PowerShell encounters an error like `...npm.ps1 cannot be loaded because running scripts is disabled...`, the execution policy needs to be changed.
    1.  Open PowerShell **as an Administrator**.
    2.  Run the command: `Set-ExecutionPolicy RemoteSigned`
    3.  Confirm by typing `Y` and pressing Enter.
    4.  Close the administrator PowerShell and retry in the regular terminal.
---    

### 🧑‍🤝‍🧑 Team Members & Roles

- **Frontend Development:**
  - Brandon Jou
  - Kenny Jiang
  - Jayson Alfaro-Trujillo
  - Jose Mateo Ayala
  - Adan Trejo

- **Backend Development:**
  - Perla Reyes-Ortega
  - Jose Oscanoa

- **Frontend & Backend:**
  - Arman Mahmoodzadeh

- **To Be Determined:**
  - Rana Ashour
  - Jael Estrada

---




