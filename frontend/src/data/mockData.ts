import { User, Opportunity, Course } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@university.edu',
  major: 'Computer Science',
  year: 'Junior',
  gpa: 3.7,
  credits: 85,
};

export const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Software Engineer, Intern (Summer 2026)',
    company: 'DoorDash',
    type: 'Internship',
    deadline: 'April 1, 2026',
    match: 92,
    description: '**About the Team & Role**\n' +
      'DoorDash is building the world\'s most reliable on-demand logistics engine. Our product engineers create scalable backend architectures and intuitive user flows for our three-sided marketplace.\n\n' +
      'We believe interns are essential to our mission. During this 12-week internship, you\'ll be fully embedded in a team, with the opportunity to directly contribute to and ship products that solve real-world problems.\n\n' +
      '**What You\'ll Do**\n' +
      '• Develop and ship technical components with guidance from your mentor and team.\n' +
      '• Actively learn and apply feedback, presenting your work in a final presentation.\n' +
      '• Collaborate to solve real business challenges, making a direct impact on our platform.\n\n' +
      '**Who We\'re Looking For**\n' +
      '• Pursuing a B.S. or M.S. in Computer Science, graduating between Fall 2026 and Summer 2027.\n' +
      '• A solid understanding of algorithms and data structures.\n' +
      '• Proficient in at least one object-oriented language (e.g., Python, Java).\n' +
      '• Experience with databases (e.g., AWS, SQL), version control, and unit testing.\n\n' +
      '**Preferred but not required**\n' +
      '• Previous software engineering internship experience.\n' +
      '• Experience with large-scale web applications, service-oriented architecture, or real-time technology problems.\n' +
      '• Participation in technical projects, hackathons, or relevant extracurricular activities.',
    link: 'https://csula.joinhandshake.com/job-search/10384501?page=1&per_page=25',
  },
  {
    id: '2',
    title: 'Software Engineer, Intern (Summer 2026)',
    company: 'Roblox',
    type: 'Internship',
    deadline: 'February 7, 2026',
    match: 87,
    description: '**About the Role**\n' +
      'As a Software Engineer Intern at Roblox, you\'ll spend 12 weeks tackling some of the hardest problems in tech, from distributed systems and real-time communication to extensive data processing and 3D co-experience. You will be at the forefront of our platform\'s unprecedented growth, directly impacting millions of daily active users.\n\n' +
      '**What You\'ll Do**\n' +
      '• Join a supportive software engineering team and collaborate directly with top-tier engineers.\n' +
      '• Take full ownership of a project, seeing it through from beginning to end, and present your work to peers and leaders.\n' +
      '• Contribute to the full software development lifecycle, from coding and testing to deploying to production.\n' +
      '• Work closely with diverse cross-functional teams, including Design, Product, and Data.\n' +
      '• Investigate and experiment with cutting-edge technologies like machine learning frameworks and LLMs to solve complex problems.\n\n' +
      '**Who We\'re Looking For**\n' +
      '• You are pursuing an undergraduate or graduate degree in computer science, engineering, or a related field.\n' +
      '• You are proficient in one or more programming languages such as Go, Node.js, Ruby, Python, C++, or Java.\n' +
      '• You are passionate about games, user-generated content, and social networking.\n' +
      '• You are excited about learning and collaborating to build great experiences.\n\n' +
      '**What This Job Offers**\n' +
      '• Competitive salary of $62/hr.\n' +
      '• Relocation assistance, commuter assistance, and a home office stipend.\n' +
      '• Gym membership and other benefits.',
    link: 'https://csula.joinhandshake.com/job-search/10122065?page=1&per_page=25',

  },
  {
    id: '3',
    title: 'Research Assistant',
    company: 'USC Center for Education, Identity and Social Justice',
    type: 'Research',
    deadline: 'March 17, 2026',
    match: 75,
    description: '**Summary:**\nWe are hiring a motivated undergraduate or graduate research assistant to work with two education professors—one at the University of Southern California (USC) and one in Arizona. The research aims to explore how a sense of belonging among Asian and Latinx undergraduates impacts their academic help-seeking behaviors in the classroom.\n\n' +
      'This is a unique opportunity for a student who is eager to learn and already has knowledge about the unique experiences and needs of Asian American and Latinx students. Comprehensive research training will be provided online.\n\n' +
      '**Responsibilities:**\n' +
      '• Assist with key aspects of the research process, including **participant recruitment** and **survey building**.\n' +
      '• Help with facilitating **online focus groups** to gather qualitative data.\n' +
      '• Provide support for **data analysis** to help interpret findings.\n\n' +
      '**Qualifications:**\n' +
      '• Must be an undergraduate or graduate student.\n' +
      '• A strong interest in the research topic and a willingness to learn.\n' +
      '• Knowledge of the unique experiences of Asian American and Latinx students is highly valued.\n' +
      '• This is a **volunteer** position (5 hours per week) and does not require U.S. work authorization.\n\n' +
      '**Details:**\n' +
      '• **Duration:** October 1, 2025 to March 31, 2026.\n' +
      '• **Location:** Remote or hybrid, based in Los Angeles, CA.',
    link: 'https://app.joinhandshake.com/job-search/10314353?query=Research&per_page=25&sort=relevance&locationFilter=%7B%22label%22%3A%22Los+Angeles%2C+California%2C+United+States%22%2C%22point%22%3A%2234.053691%2C-118.242766%22%2C%22type%22%3A%22place%22%2C%22id%22%3A%22147677689%22%2C%22distance%22%3A%2250mi%22%7D&page=1',

  },
];

export const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CS 301',
    name: 'Algorithms & Data Structures',
    credits: 3,
    priority: 'High',
  },
  {
    id: '2',
    code: 'CS 320',
    name: 'Software Engineering',
    credits: 3,
    priority: 'High',
  },
  {
    id: '3',
    code: 'MATH 280',
    name: 'Statistics',
    credits: 3,
    priority: 'Medium',
  },
];