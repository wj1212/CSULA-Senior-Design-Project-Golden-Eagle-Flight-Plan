const curriculumData = [
  // --- A ---
  {
    major: "Anthropology",
    lowerDivision: ["ANTH 1000 - Intro Anthropology"],
    upperDivision: ["ANTH 3000 - Archaeology", "ANTH 3200 - Cultural Anthropology"],
    electives: ["ANTH 4000 - Field Methods"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Applied Science",
    lowerDivision: ["SCI 1010 - Intro Applied Science"],
    upperDivision: ["SCI 3000 - Research Methods"],
    electives: ["SCI 4000 - Advanced Topics"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Art",
    lowerDivision: ["ART 1000 - Drawing I", "ART 1100 - Design"],
    upperDivision: ["ART 3000 - Painting", "ART 3200 - Sculpture"],
    electives: ["ART 4000 - Studio"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Asian and Asian American Studies",
    lowerDivision: ["AAAS 1000 - Intro"],
    upperDivision: ["AAAS 3000 - Communities"],
    electives: ["AAAS 4000 - Topics"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Aviation Administration",
    lowerDivision: ["AVIA 1000 - Intro Aviation"],
    upperDivision: ["AVIA 3000 - Aviation Mgmt"],
    electives: ["AVIA 4000 - Airline Ops"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- B ---
  {
    major: "Biochemistry",
    lowerDivision: ["CHEM 1100 - General Chem", "BIOL 1000 - Biology"],
    upperDivision: ["CHEM 3200 - Biochem I", "CHEM 3210 - Biochem II"],
    electives: ["CHEM 4000 - Advanced Biochem"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Biology",
    lowerDivision: ["BIOL 1000 - Biology", "CHEM 1100 - Chem"],
    upperDivision: ["BIOL 3400 - Genetics", "BIOL 3800 - Cell Bio"],
    electives: ["BIOL 4700 - Ecology"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Business Administration",
    lowerDivision: ["ACCT 2100 - Accounting", "ECON 2010 - Micro"],
    upperDivision: ["MGMT 3000 - Management", "FIN 3000 - Finance"],
    electives: ["MKTG 3000 - Marketing"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- C ---
  {
    major: "Chemistry",
    lowerDivision: ["CHEM 1100 - General Chem", "MATH 2110 - Calc I"],
    upperDivision: ["CHEM 3100 - Organic Chem", "CHEM 3200 - Physical Chem"],
    electives: ["CHEM 4000 - Advanced Chem"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Chicana(o) and Latina(o) Studies",
    lowerDivision: ["CLS 1000 - Intro"],
    upperDivision: ["CLS 3000 - Communities"],
    electives: ["CLS 4000 - Topics"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Child Development",
    lowerDivision: ["CD 1000 - Child Dev"],
    upperDivision: ["CD 3000 - Cognitive Dev"],
    electives: ["CD 4000 - Family Studies"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Chinese",
    lowerDivision: ["CHIN 1000 - Elementary Chinese"],
    upperDivision: ["CHIN 3000 - Advanced Chinese"],
    electives: ["CHIN 4000 - Literature"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Civil Engineering",
    lowerDivision: ["CE 2000 - Statics", "MATH 2110 - Calc I"],
    upperDivision: ["CE 3000 - Structures", "CE 3200 - Materials"],
    electives: ["CE 4000 - Transportation"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Communication",
    lowerDivision: ["COMM 1000 - Intro Communication"],
    upperDivision: ["COMM 3000 - Media Studies"],
    electives: ["COMM 4000 - Public Relations"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Communicative Disorders",
    lowerDivision: ["CDIS 1000 - Intro"],
    upperDivision: ["CDIS 3000 - Speech Science"],
    electives: ["CDIS 4000 - Clinical"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Computer Information Systems",
    lowerDivision: ["CIS 1000 - Intro Systems"],
    upperDivision: ["CIS 3000 - Databases"],
    electives: ["CIS 4000 - Cybersecurity"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Computer Science",
    lowerDivision: ["CS 2011 - Programming I", "CS 2012 - Programming II"],
    upperDivision: ["CS 3112 - Algorithms", "CS 3220 - Web Dev"],
    electives: ["CS 4660 - AI"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Criminal Justice",
    lowerDivision: ["CRJ 1000 - Intro"],
    upperDivision: ["CRJ 3000 - Law Enforcement"],
    electives: ["CRJ 4000 - Criminal Law"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- E ---
  {
    major: "Economics",
    lowerDivision: ["ECON 2010 - Micro", "ECON 2020 - Macro"],
    upperDivision: ["ECON 3000 - Intermediate"],
    electives: ["ECON 4000 - Advanced"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Electrical Engineering",
    lowerDivision: ["EE 2000 - Circuits"],
    upperDivision: ["EE 3000 - Electronics"],
    electives: ["EE 4000 - Embedded Systems"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "English",
    lowerDivision: ["ENGL 1010 - Composition"],
    upperDivision: ["ENGL 3000 - Literature"],
    electives: ["ENGL 4000 - Creative Writing"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Exercise Science",
    lowerDivision: ["KIN 1000 - Intro Kinesiology"],
    upperDivision: ["KIN 3000 - Physiology"],
    electives: ["KIN 4000 - Training"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- F ---
  {
    major: "Fire Protection Administration & Technology (for transfer students only)",
    lowerDivision: ["FIRE 1000 - Intro Fire Science"],
    upperDivision: ["FIRE 3000 - Fire Admin"],
    electives: ["FIRE 4000 - Safety"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "French",
    lowerDivision: ["FREN 1000 - Elementary French"],
    upperDivision: ["FREN 3000 - Advanced French"],
    electives: ["FREN 4000 - Literature"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- G ---
  {
    major: "Geography",
    lowerDivision: ["GEOG 1000 - Intro Geography"],
    upperDivision: ["GEOG 3000 - GIS"],
    electives: ["GEOG 4000 - Urban Planning"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Geology",
    lowerDivision: ["GEOL 1000 - Intro Geology"],
    upperDivision: ["GEOL 3000 - Earth Systems"],
    electives: ["GEOL 4000 - Field Geology"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- H ---
  {
    major: "History",
    lowerDivision: ["HIST 1000 - World History"],
    upperDivision: ["HIST 3000 - US History"],
    electives: ["HIST 4000 - Topics"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- J ---
  {
    major: "Japanese",
    lowerDivision: ["JAPN 1000 - Elementary Japanese"],
    upperDivision: ["JAPN 3000 - Advanced Japanese"],
    electives: ["JAPN 4000 - Culture"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Journalism",
    lowerDivision: ["JOUR 1000 - Intro Journalism"],
    upperDivision: ["JOUR 3000 - Reporting"],
    electives: ["JOUR 4000 - Media"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- K ---
  {
    major: "Kinesiology",
    lowerDivision: ["KIN 1000 - Intro"],
    upperDivision: ["KIN 3000 - Exercise Science"],
    electives: ["KIN 4000 - Coaching"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- L ---
  {
    major: "Latin-American Studies",
    lowerDivision: ["LAS 1000 - Intro"],
    upperDivision: ["LAS 3000 - Culture"],
    electives: ["LAS 4000 - Topics"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Liberal Studies",
    lowerDivision: ["LIB 1000 - Intro"],
    upperDivision: ["LIB 3000 - Interdisciplinary"],
    electives: ["LIB 4000 - Topics"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- M ---
  {
    major: "Mathematics",
    lowerDivision: ["MATH 2110 - Calc I", "MATH 2120 - Calc II"],
    upperDivision: ["MATH 3000 - Linear Algebra"],
    electives: ["MATH 4000 - Advanced Math"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Mechanical Engineering",
    lowerDivision: ["ME 2000 - Statics"],
    upperDivision: ["ME 3000 - Thermodynamics"],
    electives: ["ME 4000 - Robotics"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Music BA, BM",
    lowerDivision: ["MUS 1000 - Theory"],
    upperDivision: ["MUS 3000 - Performance"],
    electives: ["MUS 4000 - Composition"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- N ---
  {
    major: "Natural Science",
    lowerDivision: ["SCI 1000 - Intro Science"],
    upperDivision: ["SCI 3000 - Integrated Science"],
    electives: ["SCI 4000 - Topics"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- P ---
  {
    major: "Pan-African Studies",
    lowerDivision: ["PAS 1000 - Intro"],
    upperDivision: ["PAS 3000 - Culture"],
    electives: ["PAS 4000 - Topics"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Philosophy",
    lowerDivision: ["PHIL 1000 - Intro Philosophy"],
    upperDivision: ["PHIL 3000 - Ethics"],
    electives: ["PHIL 4000 - Logic"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Physics",
    lowerDivision: ["PHYS 2100 - Mechanics"],
    upperDivision: ["PHYS 3000 - Electricity"],
    electives: ["PHYS 4000 - Quantum"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Political Science",
    lowerDivision: ["POLS 1000 - Intro"],
    upperDivision: ["POLS 3000 - American Gov"],
    electives: ["POLS 4000 - Policy"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Psychology",
    lowerDivision: ["PSY 1000 - Intro"],
    upperDivision: ["PSY 3000 - Cognitive"],
    electives: ["PSY 4000 - Clinical"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Public Health",
    lowerDivision: ["PH 1000 - Intro"],
    upperDivision: ["PH 3000 - Epidemiology"],
    electives: ["PH 4000 - Community Health"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- R ---
  {
    major: "Rehabilitation Services",
    lowerDivision: ["RS 1000 - Intro"],
    upperDivision: ["RS 3000 - Counseling"],
    electives: ["RS 4000 - Case Mgmt"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- S ---
  {
    major: "Social Work",
    lowerDivision: ["SW 1000 - Intro"],
    upperDivision: ["SW 3000 - Practice"],
    electives: ["SW 4000 - Fieldwork"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Sociology",
    lowerDivision: ["SOC 1000 - Intro"],
    upperDivision: ["SOC 3000 - Theory"],
    electives: ["SOC 4000 - Urban"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Spanish",
    lowerDivision: ["SPAN 1000 - Elementary"],
    upperDivision: ["SPAN 3000 - Advanced"],
    electives: ["SPAN 4000 - Literature"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- T ---
  {
    major: "TV, Film, & Media Studies",
    lowerDivision: ["TVF 1000 - Intro"],
    upperDivision: ["TVF 3000 - Production"],
    electives: ["TVF 4000 - Editing"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },
  {
    major: "Theatre",
    lowerDivision: ["THEA 1000 - Acting"],
    upperDivision: ["THEA 3000 - Directing"],
    electives: ["THEA 4000 - Performance"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- U ---
  {
    major: "Urban Learning",
    lowerDivision: ["UL 1000 - Intro"],
    upperDivision: ["UL 3000 - Teaching"],
    electives: ["UL 4000 - Classroom"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  },

  // --- W ---
  {
    major: "Women's, Gender, and Sexuality Studies",
    lowerDivision: ["WGSS 1000 - Intro"],
    upperDivision: ["WGSS 3000 - Gender Studies"],
    electives: ["WGSS 4000 - Topics"],
    curriculumLink: "https://ecatalog.calstatela.edu"
  }
];

export { curriculumData };