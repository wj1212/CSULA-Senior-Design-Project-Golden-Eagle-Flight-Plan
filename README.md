![Golden Eagle Flight Plan Logo](./assets/logo.png)
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

    If you used the command line to clone, you'll need to navigate into the new folder. If you used GitHub Desktop, you can open a terminal directly from the app by going to `Repository` > `Open in Command Prompt/Terminal`.
    ```bash
    cd CSULA-Senior-Design-Project-Golden-Eagle-Flight-Plan
    ```

3.  **Install all the required dependencies:**
    This command reads the `package.json` file and downloads all the necessary packages into a `node_modules` folder.
    ```bash
    npm install
    ```

### **Running the Development Server**

Once the setup is complete, we can start the application's development server.

1.  **Start the server:**
    ```bash
    npm start
    ```

2.  **View the application:**
    After running the command, the Metro Bundler will start in the terminal and display a QR code. We have several options to view the app:
    * **On the Web:** Press the `w` key in the terminal. This will open the application in a default web browser.
    * **On a Mobile Device:**
        1.  First, install the **Expo Go** app on your phone from the Apple App Store or Google Play Store.
        2.  Ensure your phone and computer are connected to the **same Wi-Fi network**.
        3.  **For iOS:** Open the phone's built-in **Camera app** and point it at the QR code. A notification will appear—tap it to open the project in Expo Go.
        4.  **For Android:** Open the **Expo Go app** and use the "Scan" feature to scan the QR code.

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

- **Backend Development:**
  - Perla Reyes-Ortega
  - Jose Oscanoa

- **To Be Determined:**
  - Rana Ashour
  - Jose Mateo Ayala
  - Jael Estrada
  - Arman Mahmoodzadeh
  - Adan Trejo

---

## 🛠️ Core Technology Stack

### 1. Node.js

* **What it is:** The JavaScript runtime environment. This is the absolute foundation for both our backend and frontend development, so it must be installed first.
* **How to get it:** Download and install the **LTS (Long-Term Support)** version from the official website.
* **Link:** **[https://nodejs.org/en/download](https://nodejs.org/en/download)**

### 2. MongoDB

* **What it is:** Our project's database, used to store all application data like user profiles and course information.
* **How to get it:** Download and install the free **Community Server** edition for the team's respective operating systems (Mac/Windows).
* **Link:** **[https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)**

### 3. Express.js

* **What it is:** A framework that runs on Node.js to help us build our backend server and API.
* **How to get it:** Express is **not** a standalone program. It is a package that we add to our backend project using a command in the terminal.
* **Command:** `npm install express`

### 4. React Native

* **What it is:** The framework we will use to build our mobile app for the frontend.
* **How to get it:** Similar to Express, React Native is **not** a standalone program. We will use the `npx` command (which comes with Node.js) to create our frontend project. We will be using the Expo framework to make this easier.
* **Command:** `npx create-expo-app <Our-App-Name-Here>`

## 🏁 Getting Started

To be determined


