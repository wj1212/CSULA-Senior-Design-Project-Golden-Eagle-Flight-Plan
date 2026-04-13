const curriculumData = [
  // --- A ---
 {
  major: "Anthropology",

  sections: [
    {
      title: "Lower Division Core Courses (12 units)",
      courses: [
        "ANTH 1500 - Introduction to Cultural Anthropology [3]",
        "ANTH 1700 - Archaeology and World Prehistory [3]",
        "ANTH 2300 - Language and Society (also listed as ENGL 2100) [3]",
        "ANTH 2600 - Biological Anthropology [3]"
      ]
    },
    {
      title: "Upper Division Courses", courses: []

    },

    {
      title: "Area 1: Human Physical Variation (Choose 1)",
      courses: [
        "ANTH 3610 - Race, Racism, and Human Variation [3]",
        "ANTH 3850 - Measurement of Human Difference (also listed as PHIL 3850) [3]"
      ]
    },

    {
      title: "Area 2: Ethnography",
      courses: [
        "ANTH 3790 - Writing Community Stories [3]"
      ]
    },

    {
      title: "Area 3: Archaeological Perspectives",
      courses: [
        "ANTH 3700 - Perspectives and Methods of Archaeological Science [3]"
      ]
    },

    {
      title :"Upper Division Requirements (26 -28 units)", courses: []
    },

    {
      title: "Area 4: Upper Division Writing Requirement",
      courses: [
        "ANTH 4810 - Academic Literacy In Anthropology [3]"
      ]
    },

    {
      title: "Area 5: Professional Development",
      courses: [
        "ANTH 4000 - Professional Development for Anthropologists [1]"
      ]
    },

    {
      title: "Research Methods (Choose any 2)",
      courses: [
        "ANTH 4240 - Archaeological Field School [4]",
        "ANTH 4460 - Anthropological Film [4]",
        "ANTH 4640 - Methods and Techniques in Biological Anthropology [4]",
        "ANTH 4720 - Linguistic Field Methods [4-8]",
        "ANTH 4800 - Ethnographic Research Methods [5]",
        "ANTH 4850 - Archaeological Laboratory Analysis [4]"
      ]
    },

    {
      title: "History & Theory - Archaeology",
      courses: [
        "ANTH 4190 - The History of Archaeological Thought [3]"
      ]
    },

    {
      title: "History & Theory - Biological Anthropology (Choose 1)",
      courses: [
        "ANTH 4600 - Human Evolution [3]",
        "ANTH 4660 - Paleopathology [3]",
        "ANTH 4770 - Anthropological Genetics [3]"
      ]
    },

    {
      title: "History & Theory - Linguistic Anthropology",
      courses: [
        "ANTH 4700 - Language and Culture (also listed as ENGL 4130) [3]"
      ]
    },

    {
      title: "History & Theory - Sociocultural Anthropology",
      courses: [
        "ANTH 4970 - History of Ethnological Theory [3]"
      ]
    },

    {
      title: "Skills Requirement",
      description: "*Courses marked cannot be double-counted with Research Methods.",
      courses: [
        "ANTH 4460 - Anthropological Film [4] *",
        "ANTH 4720 - Linguistic Field Methods [4-8] *",
        "BIOL 3000 - Biostatistics [4]",
        "GEOG 3690 - Fundamentals of Geographic Information Systems [3]",
        "GEOG 4660 - Remote Sensing [3]",
        "GEOG 4690 - Spatial Analysis and GIS Modeling [3]",
        "GEOG 4700 - GIS Programming and Customization [3]",
        "PH 3130 - Data Analysis for Public Health [3]",
        "PSY 4310 - Statistical Methods in Psychological Assessment [4]"
      ]
    },

    {
      title: "Elective Courses (9 units)",
      description: "Select any 9 units not used in other requirements.",
      courses: [
        "ANTH 4000 - Professional Development for Anthropologists [1]",
        "ANTH 4010 - Comparative Cultures [3]",
        "ANTH 4040 - Peoples of South America [3]",
        "ANTH 4060 - Indians of North America [3]",
        "ANTH 4070 - Indians of California [3]",
        "ANTH 4080 - Peoples of Mesoamerica [3]",
        "ANTH 4130 - Peoples of Africa [3]",
        "ANTH 4140 - Peoples of Asia [3]",
        "ANTH 4150 - Asian American Communities in Southern California (also listed as AAAS 4150) [3]",
        "ANTH 4210 - Archaeology of North America [3]",
        "ANTH 4220 - The Archaeology of Islands and Coastlines [3]",
        "ANTH 4230 - Material Culture [3]",
        "ANTH 4240 - Archaeological Field School [4]",
        "ANTH 4250 - Archaeology of the Old World [3]",
        "ANTH 4260 - Perspectives and Methods in Environmental Archaeology [3]",
        "ANTH 4270 - Cultural Resources Management [3]",
        "ANTH 4280 - Civilizations of Western Mesoamerica [3]",
        "ANTH 4290 - Maya Civilization [3]",
        "ANTH 4300 - Social Organization [3]",
        "ANTH 4320 - Anthropology of Wealth and Power [3]",
        "ANTH 4330 - Urban Anthropology [3]",
        "ANTH 4340 - Globalization and Cultural Change [3]",
        "ANTH 4350 - Culture and the Individual [3]",
        "ANTH 4360 - Ethnicity and Nationalism [3]",
        "ANTH 4370 - Magic, Witchcraft, and Religion [3]",
        "ANTH 4400 - Applied Anthropology [3]",
        "ANTH 4410 - Anthropology and Identity [3]",
        "ANTH 4420 - Anthropology of Rights [3]",
        "ANTH 4440 - Medical Anthropology [3]",
        "ANTH 4450 - Myth and Folklore [3]",
        "ANTH 4460 - Anthropological Film [4]",
        "ANTH 4470 - Anthropology of Media [3]",
        "ANTH 4480 - Sexualities and Gender Diversity in Global Perspective (also listed as WGSS 4480) [3]",
        "ANTH 4490 - Anthropology of Race and Racism (also listed as AAAS 4491, CLS 4490, LAS 4490) [3]",
        "ANTH 4500 - Human Physical Growth and Development [3]",
        "ANTH 4510 - Death and Dying in the Ancient World [3]",
        "ANTH 4520 - Bioarchaeology of Asia [3]",
        "ANTH 4530 - Bioarchaeology of Identity [3]",
        "ANTH 4540 - Special Topics in Anthropology [1-5]",
        "ANTH 4541 - Special Topics in Anthropology [1-5]",
        "ANTH 4590 - Human Osteology [4]",
        "ANTH 4600 - Human Evolution [3]",
        "ANTH 4620 - Human Ecology and Adaptation [3]",
        "ANTH 4630 - Forensic Anthropology [3]",
        "ANTH 4640 - Methods and Techniques in Biological Anthropology [4]",
        "ANTH 4660 - Paleopathology [3]",
        "ANTH 4670 - Human Evolution in Pop Culture [3]",
        "ANTH 4710 - Introduction to Linguistics (also listed as ENGL 4100) [3]",
        "ANTH 4720 - Linguistic Field Methods [4-8]",
        "ANTH 4750 - Primate Behavior [3]",
        "ANTH 4760 - Primate Sexuality [3]",
        "ANTH 4770 - Anthropological Genetics [3]",
        "ANTH 4800 - Ethnographic Research Methods [5]",
        "ANTH 4850 - Archaeological Laboratory Analysis [4]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34292"
},
    {
  major: "Applied Science",

  sections: [
    {
      title: "Lower Division Core Courses (37–38 units)",
      description: "*Select either MATH 1090 or MATH 1092.",
      courses: [
        "BIOL 1000 - Biology for Life [3]",
        "BIOL 1001 - Biology for Life Laboratory [1]",
        "BIOL 2030 - Human Anatomy [4]",
        "BIOL 2040 - Human Physiology [4]",
        "CHEM 1010 - Fundamentals of Chemistry [4]",
        "CHEM 1020 - Fundamentals of Organic Chemistry [4]",
        "MATH 1090 - Quantitative Reasoning with Statistics, with Lab [4] *",
        "MATH 1092 - Quantitative Reasoning with Statistics [3] *",
        "MICR 2010 - Microbiology for Health Related Sciences [3]",
        "MICR 2020 - Microbiology Laboratory for Health Related Sciences [1]",
        "PHYS 1560 - Physics for the Twenty-First Century [3]",
        "PHYS 1570 - Physics for the Twenty-first Century Laboratory [1]",
        "PSY 1500 - Introductory Psychology [3]",
        "SOC 2010 - Introduction to Sociology [3]"
      ]
    },

    {
      title: "Upper Division Core Courses (16 units)",
      courses: [
        "CHEM 3000 - Nutritional Aspects of Biochemistry [4]",
        "NTRS 3170 - Introduction to Nutrition and Metabolism [3]",
        "NATS 4100 - The Nature of Science [3]",
        "NATS 4950 - Natural Science Field Studies [3]",
        "PH 3120 - Introduction to Epidemiology [3]"
      ]
    },

    {
      title: "Electives (18–19 units)",
      courses: [
        "ANTH 4440 - Medical Anthropology [3]",
        "BIOL 3084 - Biology of Human Aging [3]",
        "KIN 3000 - Physiological Bases of Nutrition, Physical Fitness, and Health [3]",
        "KIN 3820 - Principles of Sport and Exercise Psychology [3]",
        "KIN 4360 - Principles of Mobility Training [4]",
        "KIN 4380 - Principles of Exercise for Older Adults [4]",
        "MGMT 3070 - Management and Organizational Behavior [3]",
        "MGMT 4315 - Comparative Healthcare Organizing [3]",
        "MGMT 4330 - Healthcare Regulations and Ethics [3]",
        "MGMT 4335 - Financial Management of Health Care Institutions [3]",
        "NATS 4200 - Cultures of Science (also listed as LBS 4200) [3]",
        "NTRS 3510 - Adult Nutrition [3]",
        "NTRS 3570 - The Changing Food Supply: Impact on Health [3]",
        "NTRS 4120 - Nutrition Through the Lifespan [3]",
        "NTRS 4300 - Sports Nutrition [3]",
        "NTRS 4630 - Functional Foods for Health [3]",
        "NTRS 4650 - Medicinal Herbs and Nutrition [3]",
        "PH 4140 - General Principles of Environmental Health [3]",
        "PH 4210 - Community, Environmental Safety and Public Health Law [3]",
        "PH 4220 - Vulnerable Populations [3]",
        "PH 4230 - Sexuality and Sexual Health [3]",
        "PH 4240 - Drugs and Health [3]",
        "PH 4260 - Consumer Health [3]",
        "PH 4320 - Introduction to International and Global Health [3]",
        "PHIL 4290 - Bioethics [3]",
        "PSY 3030 - Positive Psychology [3]",
        "PSY 3230 - Psychology of Emotion and Motivation [3]",
        "PSY 3620 - Psychology of Adult Development and Aging [3]",
        "PSY 4120 - Psychology of Human Development: Infancy and Childhood [3]",
        "PSY 4130 - Psychology of Human Development: Adolescence and Young Adulthood [3]",
        "PSY 4350 - Behavior Analysis & Treatment of Developmental Disabilities [3]",
        "PSY 4500 - Principles of Health Psychology [3]",
        "PSY 4450 - Community Psychology - Service Learning [3]",
        "SOC 4500 - Sociology of Aging [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34598&returnto=10734"
},
 {
  major: "Art",

  sections: [
    {
      title: "Requirements for the Art B.A. Major (57 units)"
    },

    // 🔹 CORE
    {
      title: "Required Lower Division Core Courses (21 units)",
      courses: [
        "ART 1011 - World Art History I: Ancient to Gothic [3]",
        "ART 1012 - World Art History II: Renaissance to Contemporary [3]",
        "ART 1030 - Two-Dimensional Art Fundamentals [3]",
        "ART 1090 - Three-Dimensional Art Fundamentals [3]",
        "ART 1590 - Survey and Studio: Introduction to Drawing [3]",
        "ART 1800 - Digital Art Fundamentals [3]",
        "ART 2330 - Color Theory and Perception [3]"
      ]
    },

    {
      title: "Required Upper Division Core Courses (9 units)",
      courses: [
        "ART 3600 - Visual & Critical Studies in Contemporary Art & Design [3]",
        "ART 3900 - Art and Design in the Community [3]",
        "ART 4020 - Dialogues in Art and Design [3]"
      ]
    },

    // 🔹 ANIMATION OPTION
    {
      title: "Animation Option - Lower Division (6 units)",
      courses: [
        "ART 2440 - Introduction to Life Composition [3]",
        "ART 2800 - World Animation History [3]"
      ]
    },

    {
      title: "Animation Option - Upper Division (21 units)",
      courses: [
        "ART 3760 - Story and Visualization [3]",
        "ART 3800 - Two-Dimensional Animation [3]",
        "ART 4940 - Three-Dimensional Animation [3]",
        "ART 4960 - Advanced Animation [3]",
        "ART 4921 - Capstone Animation Project [3]"
      ]
    },

    {
      title: "Animation Option - Choose One",
      courses: [
        "ART 3780 - Art and Motion [3]",
        "ART 3810 - Experimental Animation [3]",
        "ART 3830 - Digital Modeling [3]"
      ]
    },

    // 🔹 ART EDUCATION OPTION
    {
      title: "Art Education Option - Lower Division Electives (6 units)",
      description: "*Select either ART 2870 or ART 2871, not both.",
      courses: [
        "ART 1500 - Introduction to Sculpture [3]",
        "ART 1520 - Introduction to Ceramics [3]",
        "ART 1550 - Introduction to Painting [3]",
        "ART 2440 - Introduction to Life Composition [3]",
        "ART 2870 - Introduction to Photographic Processes [3] *",
        "ART 2871 - Introduction to Digital Photography [3] *"
      ]
    },

    {
      title: "Art Education Option - Upper Division (18 units)",
      courses: [
        "ART 3160 - Foundations of Art [3]",
        "ART 4000 - Teaching Methods for Elementary Education: Art [3]",
        "ART 4600 - Multicultural Approaches to Visual Arts [3]",
        "ART 4750 - Visual Arts and Human Development [3]",
        "ART 4911 - Global Contemporary Art [3]",
        "ART 4922 - Capstone - Art Education [3]"
      ]
    },

    {
      title: "Art Education Option - Service Learning (Choose 1)",
      courses: [
        "ART 2090 - Perspectives on Art and Cultural Diversity [3]",
        "ART 3170 - Visual Arts in Urban Contexts [3]",
        "ART 4950 - Directed Fieldwork In Art [3]"
      ]
    },

    // 🔹 ART HISTORY OPTION
    {
      title: "Art History Option - Lower Division Electives (3 units)",
      courses: [
        "ART 1500 - Introduction to Sculpture [3]",
        "ART 1520 - Introduction to Ceramics [3]",
        "ART 1550 - Introduction to Painting [3]",
        "ART 2130 - Historic Survey of Fashion, Fiber and Materials [3]",
        "ART 2440 - Introduction to Life Composition [3]"
      ]
    },

    {
      title: "Art History Option - Group A (Ancient & Non-Western)",
      courses: [
        "ART 4060 - Ancient Near Eastern Art and Archaeology [3]",
        "ART 4110 - Greek and Roman Art [3]",
        "ART 4311 - Arts of Asia: India and Iran [3]",
        "ART 4312 - Arts of Asia: China and Japan [3]",
        "ART 4810 - African Art [3]"
      ]
    },

    {
      title: "Art History Option - Group B (Western Art)",
      courses: [
        "ART 4160 - Medieval Art [3]",
        "ART 4210 - Baroque Art [3]",
        "ART 4215 - From Rococo to Revolution [3]",
        "ART 4360 - Renaissance Art [3]",
        "ART 4510 - Mannerism [3]",
        "ART 4760 - Early Christian and Byzantine Art [3]"
      ]
    },

    {
      title: "Art History Option - Group C (Latin American Art)",
      courses: [
        "ART 4460 - Art of Latin America [3]",
        "ART 4470 - Art of Mesoamerica [3]",
        "ART 4500 - Colonial Art of Mexico [3]",
        "ART 4530 - Aztec Art [3]",
        "ART 4560 - Art of the Andes [3]",
        "ART 4570 - Mexican Muralists [3]"
      ]
    },

    {
      title: "Art History Option - Group D (Modern & Contemporary)",
      courses: [
        "ART 4260 - Modern Art [3]",
        "ART 4410 - American Art [3]",
        "ART 4660 - 19th Century Art [3]",
        "ART 4910 - Art Since 1945 [3]",
        "ART 4911 - Global Contemporary Art [3]"
      ]
    },

    {
      title: "Art History Option - Upper Division Electives",
      courses: [
        "ART 4541 - Special Topics in Art [1-3]",
        "ART 4770 - History of Photography [3]"
      ]
    },

    // 🔹 DESIGN OPTION
    {
      title: "Design Option - Lower Division (6 units)",
      courses: [
        "ART 2200 - Concept Development [3]",
        "ART 2370 - History of Design [3]"
      ]
    },

    {
      title: "Design Option - Upper Division (21 units)",
      courses: [
        "ART 3080 - Graphic Design I [3]",
        "ART 3130 - Typography I [3]",
        "ART 3220 - Interaction Design I [3]",
        "ART 4080 - Graphic Design II [3]",
        "ART 4130 - Typography II [3]",
        "ART 4220 - Interaction Design II [3]",
        "ART 4925 - Senior Studio: Design [3]"
      ]
    },

    // 🔹 FASHION OPTION
    {
      title: "Fashion, Fiber, and Materials - Lower Division (15 units)",
      courses: [
        "ART 2100 - Intro to Fashion, Fiber, and Materials [3]",
        "ART 2111 - Structure Studio [3]",
        "ART 2112 - Surface Studio [3]",
        "ART 2130 - Historic Survey [3]",
        "ART 2140 - Body, Appearance and Adornment [3]"
      ]
    },

    {
      title: "Fashion, Fiber, and Materials - Upper Division (12 units)",
      courses: [
        "ART 3050 - Soft Technology [3]",
        "ART 3113 - Form Studio [3]",
        "ART 4114 - Critical Design [3]",
        "ART 4924 - Capstone [3]"
      ]
    },

    // 🔹 STUDIO ARTS OPTION
    {
      title: "Studio Arts - Lower Division Electives (12 units)",
      description: "*Select either ART 2870 or ART 2871.",
      courses: [
        "ART 1500",
        "ART 1520",
        "ART 1550",
        "ART 2440",
        "ART 2870 *",
        "ART 2871 *"
      ]
    },

    {
      title: "Studio Arts - Required Upper Division",
      courses: [
        "ART 4911 - Global Contemporary Art [3]",
        "ART 4926 - Capstone - Studio Arts [3]"
      ]
    },

    {
      title: "Studio Arts - Upper Division Electives",
      courses: [
        "ART 3070 - Intermediate Ceramic Art [3]",
        "ART 3140 - Intermediate Sculpture [3]",
        "ART 3640 - Intermediate Drawing [3]",
        "ART 3740 - Intermediate Painting [3]",
        "ART 3780 - Art and Motion [3]",
        "ART 3870 - Color and Digital Photography [3]",
        "ART 4120 - Advanced Ceramic Art [3]",
        "ART 4140 - Advanced Painting [3]",
        "ART 4170 - Advanced Ceramic Processes [3]",
        "ART 4290 - Advanced Sculpture [3]",
        "ART 4340 - Advanced Painting Processes [3]",
        "ART 4490 - Video for Artists [3]",
        "ART 4540 - Special Topics in Art [1-3]",
        "ART 4541 - Special Topics in Art [1-3]",
        "ART 4740 - Printmaking [3]",
        "ART 4770 - History of Photography [3]",
        "ART 4820 - Photographic Manipulations [3]",
        "ART 4840 - Advanced Sculpture Processes [3]",
        "ART 4870 - Advanced Photography [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34254"
},
 {
  major: "Asian and Asian American Studies",

  sections: [
    {
      title: "Core Requirements (21 units)",
      courses: [
        // Lower Division
        "AAAS 2000 - Pacific Asian Culture, People, and Society [3]",
        "AAAS 2100 - Introduction to Asian American Studies [3]",
        "AAAS 2400 - Asian American and Pacific Islander Social Movements [3]",

        // Upper Division
        "AAAS 3000 - Research Methods and Writing [3]",
        "AAAS 3480 - Race, Class, and Gender (also listed as CLS 3300, PAS 3480) [3]",
        "AAAS 4970 - Leadership in API Communities [1-3] (complete 3 units)",
        "AAAS 4990 - Senior Capstone [3]"
      ]
    },

    {
      title: "Directed Electives - Asian American Studies (15 units)",
      courses: [
        "AAAS 1300 - Asian Americans, Pacific Islanders, Equity, and U.S. Constitution [3]",
        "AAAS 1400 - Introduction to Globalization, Race, and Place (also listed as LAS 1400, PAS 1400) [3]",
        "AAAS 1500 - Asian-American History (also listed as HIST 1500) [3]",
        "AAAS 1800 - Asian and Pacific Islander Migrations [3]",
        "AAAS 2150 - Introduction to Comparative Ethnic Studies [3]",
        "AAAS 2200 - Asian & Asian American Popular Culture [3]",
        "AAAS 2250 - Asian American, Pacific Islander Foodways, Identity, and Culture [3]",
        "AAAS 2300 - Introduction to Filipino/a/x Studies [3]",
        "AAAS 2500 - Asian and Asian Americans in Latin America [3]",
        "AAAS 2900 - Asian American, Pacific Islander Stories & Storytelling [3]",
        "AAAS 3400 - Multiracial Asians and Asian Americans [3]",
        "AAAS 3510 - Food, Race, and the Environment [3]",
        "AAAS 3520 - Oral History of Asian America (also listed as HIST 3520) [3]",
        "AAAS 3530 - Asian and Asian American Literature [3]",
        "AAAS 3540 - Asian American Consumerism and Capitalism [3]",
        "AAAS 3550 - Asians in the Global World [3]",
        "AAAS 3590 - Current Topics in Asia [3]",
        "AAAS 3730 - Asian Americans, Families, and Community (also listed as CHDV 3730) [3]",
        "AAAS 3800 - Current Asian American Issues [3]",
        "AAAS 4080 - Comparative Diaspora Studies [3]",
        "AAAS 4150 - Asian American Communities in Southern California (also listed as ANTH 4150) [3]",
        "AAAS 4500 - Advanced Seminar in Asian and Asian-American Studies - Research Method [3]",
        "AAAS 4510 - Advanced Seminar in Asian and Asian American Studies- Community Service [3]",
        "AAAS 4530 - Cultural Competency for Professionals: Understanding Asia and Asian America [3]",
        "AAAS 4722 - Women, Gender, and Sexuality in Asian American Communities (also listed as WGSS 4722) [3]",
        "AAAS 4540 - Special Topics in Asian & Asian-American Studies [3]",
        "AAAS 4850 - Anti-Colonial Movements (also listed as LAS 4850, PAS 4850) [3]",
        "AAAS 4980 - Cooperative Education [1-3] (complete 3 units)",
        "AAAS 4999 - Undergraduate Directed Study [1-3] (complete 3 units)"
      ]
    },

    {
      title: "Directed Electives - Ethnic Studies (3 units)",
      courses: [
        "AIIS 3600 - Comparative Analysis of Indigenous Women Experiences in the Americas (also listed as CLS 3600) [3]",
        "AIIS 3870 - American Indian Literature and Theatre (also listed as ENGL 3870, TA 3870) [3]",
        "AIIS 3875 - American Indian and Indigenous Performance (also listed as TA 3875) [3]",
        "CLS 3009 - Mexico City in Contemporary Mexican Cinema (also listed as ML 3009) [3]",
        "CLS 3100 - Introduction to Critical Education: Theory & Praxis [3]",
        "CLS 3120 - Chicanx/Latinx Parent, Community, & School Partnerships [3]",
        "CLS 3130 - Diversity, Intersectionality, Major Racial/Ethnic Groups in U.S. Schooling, and Equality of Educational Opportunity and Social Justice (also listed as EDFN 3130) [3]",
        "CLS 3200 - Pre-Columbian Narratives in Latin American Literature [3]",
        "CLS 3220 - Race, Gender, and Hybridity in the Americas [3]",
        "CLS 3320 - Indigenous, Central American, and Mexican Migrants in Transnational Networks [3]",
        "CLS 3400 - Chicanx/Latinx/Indigenous Refusal, Resistance, & Praxis [3]",
        "CLS 3700 - Introduction to Central America (also listed as LAS 3700) [3]",
        "CLS 3720 - American Indian Families (also listed as CHDV 3720) [3]",
        "CLS 3750 - Health Disparities in Urban Communities (also listed as CHDV 3750, PH 3750) [3]",
        "CLS 3770 - Environmental Justice (also listed as PH 3770) [3]",
        "PAS 3020 - Black and Latino and Latin American Relations (also listed as LAS 3020) [3]",
        "PAS 3050 - Black Feminism and Womanism (also listed as WGSS 3050) [3]",
        "PAS 3070 - Black Manhood and Masculinity [3]",
        "PAS 3350 - Race and Culture in the Americas (also listed as LAS 3350) [3]",
        "PAS 3420 - Cultural Impact of Development (also listed as LAS 3420) [3]",
        "PAS 3600 - Dynamics of Change in the Developing World (also listed as LAS 3600, POLS 3600) [3]",
        "PAS 3690 - Race, Activism, and Emotions [3]",
        "PAS 3715 - Rethinking the Welfare Queen: Race, Gender, and Poverty in the US (also listed as WGSS 3715) [3]",
        "PAS 3800 - Education and Development in Africa [3]",
        "PAS 3810 - Literary Explorations of Racism and Justice (also listed as ENGL 3810) [3]",
        "PAS 3822 - Ethnicity and Emotions in U.S. Film (also listed as ENGL 3822) [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34257"
},
{
  major: "Aviation Administration",

  sections: [
    {
      title: "Lower Division Core Courses (21 units)",
      courses: [
        "ACCT 2100 - Principles of Financial Accounting [3]",
        "CIS 1200 - Information and Technology Literacy (also listed as CS 1200) [3]",
        "ECON 2090 - Applied Business and Economic Statistics I [3]",
        "GEOG 1700 - Weather and Climate [3]",
        "TECH 1100 - Introduction to Design Application and 3D Modeling (also listed as ETEC 1100) [3]",
        "TECH 1400 - General Aeronautics [3]",
        "TECH 1430 - Airport Operations [3]"
      ]
    },

    {
      title: "Upper Division Core Courses (45 units)",
      courses: [
        "GEOG 4570 - Transportation Geography [3]",
        "MGMT 3060 - Operations Management [3]",
        "MGMT 4500 - Case Studies in Operations Management [3]",
        "MGMT 4504 - Supply Chain Management [3]",
        "MKT 3100 - Principles of Marketing [3]",
        "TECH 3410 - General Aviation Operations and Administration [3]",
        "TECH 3420 - Airline Administration [3]",
        "TECH 3430 - Airport Administration [3]",
        "TECH 3440 - Aviation Law [3]",
        "TECH 3450 - Air Cargo [3]",
        "TECH 4000 - Written Communication Skills for Technology [3]",
        "TECH 4400 - Safety Factors in Aviation [3]",
        "TECH 4420 - Airport Planning [3]",
        "TECH 4460 - Airport Finance [3]",
        "TECH 4470 - Senior Seminar: Aviation Problems [3]"
      ]
    },

    {
      title: "Directed Electives - Aviation Operations (3 or 6 units)",
      courses: [
        "TECH 3400 - Airline Operations [3]",
        "TECH 3460 - National Airspace System and Air Traffic Control [3]",
        "TECH 4410 - Aviation Sales [3]",
        "TECH 4430 - Air Transportation [3]",
        "TECH 4480 - Case Studies in Airline Finance [3]"
      ]
    },

    {
      title: "Directed Electives - Operations and Supply Chain Management (3 or 6 units)",
      courses: [
        "MGMT 3070 - Management and Organizational Behavior [3]",
        "MGMT 4105 - Managerial Leadership and Motivation [3]",
        "MGMT 4501 - Process Design and Improvement [3]",
        "MGMT 4502 - Production and Inventory Management [3]",
        "MGMT 4503 - Total Quality Management [3]",
        "MGMT 4505 - Project Management [3]",
        "MGMT 4506 - Service Management [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php"
},
  // --- B ---
 {
  major: "Biochemistry",

  sections: [
    {
      title: "Lower Division Core Courses (44 units)",
      courses: [
        "BIOL 1100 - Cellular Basis of Life [5]",
        "BIOL 1200 - Diversity of Life [5]",
        "CHEM 1100 - General Chemistry I [5]",
        "CHEM 1110 - General Chemistry II [5]",
        "CHEM 2200 - Organic Chemistry I [4]",
        "CHEM 2201 - Organic Chemistry Laboratory I [1]",
        "CHEM 2211 - Organic Chemistry Laboratory II [1]",
        "CHEM 2300 - Introduction to Biomolecules [2]",
        "MATH 2110 - Calculus I [4]",
        "MATH 2120 - Calculus II [4]",
        "PHYS 2100 - General Physics I: Mechanics [4]",
        "PHYS 2200 - General Physics II: Electromagnetism and Circuits [4]"
      ]
    },

    {
      title: "Upper Division Core Courses (31 units)",
      courses: [
        "CHEM 3100 - Writing for Chemists [3]",
        "CHEM 3200 - Organic Chemistry II [4]",
        "CHEM 3500 - Quantitative Analysis [4]",
        "CHEM 3600 - Inorganic Chemistry [4]",
        "CHEM 4310 - Biochemistry I [3]",
        "CHEM 4311 - Biochemistry Laboratory I [2]",
        "CHEM 4320 - Biochemistry II [3]",
        "CHEM 4321 - Biochemistry Laboratory II [2]",
        "CHEM 4420 - Physical Chemistry: Thermodynamics [3]",
        "CHEM 4890 - Molecular Science Capstone [3]"
      ]
    },

    {
      title: "Chemistry Electives (2–7 units)",
      courses: [
        "BINF 4500 - Advanced Topics in Bioinformatics and Computational Biology [1]",
        "BINF 4540 - Special Topics in Bioinformatics [1-3] (complete 2 units)",
        "CHEM 4200 - Advanced Organic Chemistry I [3]",
        "CHEM 4210 - Polymer Chemistry [3]",
        "CHEM 4410 - Physical Chemistry: Quantum Mechanics and Kinetics [4]",
        "CHEM 4430 - Physical Chemistry: Quantum Chemical Methods [1]",
        "CHEM 4431 - Physical Chemistry Laboratory [2]",
        "CHEM 4460 - Drug Delivery [3]",
        "CHEM 4510 - Advanced Analytical Chemistry: Optical Spectroscopy [2]",
        "CHEM 4520 - Advanced Analytical Chemistry: Analytical Separations and Mass Spectrometry [2]",
        "CHEM 4530 - Advanced Analytical Chemistry: Electrochemistry and Surface Techniques [2]",
        "CHEM 4800 - Special Topics in Advanced Chemistry Lecture [1-3] (complete 3 units)",
        "CHEM 4830 - History of Chemistry [3]",
        "CHEM 4840 - Drug Discovery and Development (also listed as BIOL 4440) [3]",
        "CHEM 4850 - Bioinorganic and Bioorganic Chemistry [3]",
        "CHEM 4860 - Bioinformatics (also listed as BINF 4000) [3]",
        "CHEM 4990 - Undergraduate Directed Study [1-3]",
        "PHYS 4430 - Biophysics [3]"
      ]
    },

    {
      title: "Biology and Microbiology Electives (2–7 units)",
      courses: [
        "BINF 4500 - Advanced Topics in Bioinformatics and Computational Biology [1]",
        "BINF 4540 - Special Topics in Bioinformatics [1-3] (complete 2 units)",
        "BIOL 3000 - Biostatistics [4]",
        "BIOL 3400 - Principles of Genetics [3]",
        "BIOL 4130 - Molecular Diagnostics [3]",
        "BIOL 4150 - Population Genetics [3]",
        "BIOL 4160 - Molecular Genetics [3]",
        "BIOL 4170 - Gene Editing Theory and Applications [3]",
        "BIOL 4180 - Advanced Evolutionary Biology [3]",
        "BIOL 4240 - Developmental Biology [4]",
        "BIOL 4300 - Fundamental Research in Plant Ecological Physiology [4]",
        "BIOL 4320 - Fundamentals of Toxicology [3]",
        "BIOL 4330 - Integrative Human Physiology [3]",
        "BIOL 4340 - Fundamentals Research in Human Physiology [2]",
        "BIOL 4360 - Neurobiology: Cellular and Molecular Physiology of the Nervous System [3]",
        "BIOL 4370 - Cell Signaling [3]",
        "BIOL 4390 - Endocrinology [3]",
        "MICR 3100 - General Microbiology (also listed as BIOL 3100) [4]",
        "MICR 3300 - Microbial Genetics [3]",
        "MICR 3500 - Bacterial Physiology [3]",
        "MICR 3700 - Medical Microbiology [4]",
        "MICR 4100 - General Virology [3]",
        "MICR 4600 - Theoretical and Applied Immunology [4]"
      ]
    }
  ],

  description: "Electives must total 9 units, including at least 2 units from Chemistry and 2 units from Biology/Microbiology. Maximum of 3 units of CHEM 4990 allowed. Some electives may require prerequisites not included in the major.",

  curriculumLink: "https://ecatalog.calstatela.edu"
},
  {
  major: "Biology",

  description: `
Course Denotations:
1 - Minimum grade of C or higher required
2 - AP score of 4 or 5 fulfills BIOL 1100
5 - Organic chemistry equivalency allowed
7 - CR/NC grading must be requested at enrollment
* - Restricted: only one of the courses marked with * can be selected
`,

  sections: [

    // 🔹 LOWER DIVISION CORE
    {
      title: "Lower Division Core Courses (38 units)",
      courses: [
        "BIOL 1100 - Cellular Basis of Life [5] (1,2)",
        "BIOL 1200 - Diversity of Life [5] (1)",
        "CHEM 1100 - General Chemistry I [5]",
        "CHEM 1110 - General Chemistry II [5]",
        "CHEM 2200 - Organic Chemistry I [4] (5)",
        "CHEM 2201 - Organic Chemistry Laboratory I [1] (5)",
        "MATH 2045 - Calculus for the Life Sciences [5]",
        "PHYS 1100 - Physics for the Life Sciences I [4]",
        "PHYS 1200 - Physics for the Life Sciences II [4]",
      ],
    },

    // 🔹 UPPER DIVISION CORE
    {
      title: "Upper Division Core Courses (16 units)",
      courses: [
        "BIOL 3000 - Biostatistics [4] (1)",
        "BIOL 3200 - Professional Writing in the Life Sciences [3] (1)",
        "BIOL 3400 - Principles of Genetics [3] (1)",
        "BIOL 3500 - Evolution [3] (1)",
        "BIOL 3600 - Functional Biology [3]",
      ],
    },

    // 🔹 EEE OPTION
    {
      title: "Ecology, Evolution, and the Environment (EEE Option)",
      courses: [
        "BIOL 3800 - Ecology [3]",
        "BIOL 3801 - Field Ecology [1]",
        "BIOL 4300 - Plant Ecological Physiology [4]",
        "BIOL 4400 - Plant Systematics [3]",
        "BIOL 4510 - Ornithology [3]",
        "BIOL 4530 - Ichthyology [3]",
        "BIOL 4550 - Mammalogy [3]",
        "BIOL 4560 - Comparative Vertebrate Anatomy [4]",
        "BIOL 4570 - Marine Invertebrate Zoology [4]",
        "MICR 3100 - General Microbiology [4]",
        "BIOL 4080 - Advanced Biostatistics [3]",
        "BIOL 4800 - Modeling Biological Systems [3]",
        "CHEM 3200 - Organic Chemistry II [4]",
        "GEOG 4660 - Remote Sensing [3]",
        "GEOG 4690 - Spatial Analysis and GIS Modeling [3]",
        "PHYS 3200 - Scientific Computing in Python [3]",
        "BIOL 4620 - Plant Ecology [4]",
        "BIOL 4700 - Conservation Biology [3]",
        "BIOL 4720 - Marine Ecology [3]",
        "BIOL 4740 - Ecosystems of California [4]",
        "BIOL 4150 - Population Genetics [3]",
        "BIOL 4180 - Advanced Evolutionary Biology [3]",
      ],
    },

    // 🔹 MICROBIOLOGY OPTION
    {
      title: "Microbiology Option",
      courses: [
        "CHEM 3200 - Organic Chemistry II [4]",
        "MICR 3100 - General Microbiology [4]",
        "MICR 3300 - Microbial Genetics [3]",
        "MICR 3500 - Bacterial Physiology [3]",
        "MICR 3700 - Medical Microbiology [4]",
        "MICR 3900 - Applied and Environmental Microbiology [3]",
        "BIOL 2030 - Human Anatomy [4]",
        "BIOL 2040 - Human Physiology [4]",
        "BIOL 4450 - Bioscience Companies [3]",
        "BIOL 4460 - Biotechnology Applications [3]",
        "CHEM 3500 - Quantitative Analysis [4]",
        "CHEM 4300 - Intro to Biochemistry [3] *",
        "CHEM 4310 - Biochemistry I [3] *",
        "MICR 4100 - General Virology [3]",
        "MICR 4200 - Emerging Infectious Diseases [3]",
        "MICR 4300 - Hematology [3]",
        "MICR 4400 - Mycology [3]",
        "MICR 4600 - Immunology [4]",
      ],
    },

    // 🔹 MCD OPTION
    {
      title: "Molecular, Cellular, & Developmental Biology (MCD Option)",
      courses: [
        "CHEM 3200 - Organic Chemistry II [4]",
        "BIOL 3401 - Molecular & Cellular Lab [2]",
        "BIOL 3900 - Molecular & Cellular Biology I [3]",
        "BIOL 4000 - Molecular & Cellular Biology II [3]",
        "BIOL 4130 - Molecular Diagnostics [3]",
        "BIOL 4240 - Developmental Biology [4]",
        "BIOL 4290 - Animal Histology [4]",
        "BIOL 4370 - Cell Signaling [3]",
        "BIOL 4170 - Gene Editing [3]",
        "BIOL 4360 - Neurobiology [3]",
        "BIOL 4390 - Endocrinology [3]",
        "CHEM 4300 - Intro to Biochemistry [3] *",
      ],
    },

    // 🔹 PHYSIOLOGY OPTION
    {
      title: "Physiology Option",
      courses: [
        "CHEM 3200 - Organic Chemistry II [4]",
        "BIOL 3900 - Molecular Biology I [3]",
        "BIOL 4280 - Plant Physiology [3]",
        "BIOL 4330 - Human Physiology [3]",
        "BIOL 4300 - Plant Ecological Physiology [4]",
        "BIOL 4340 - Human Physiology Lab [2]",
        "BIOL 4370 - Cell Signaling [3]",
        "BIOL 4560 - Comparative Vertebrate Anatomy [4]",
        "BIOL 4350 - Neuroanatomy [3]",
        "BIOL 4360 - Neurobiology [3]",
        "BIOL 4390 - Endocrinology [3]",
      ],
    },

    // 🔹 GENERAL OPTION
    {
      title: "General Option",
      courses: [
        "CHEM 3200 - Organic Chemistry II [4]",
        "BIOL 3800 - Ecology [3]",
        "BIOL 3900 - Molecular Biology I [3]",
        "MICR 3100 - General Microbiology [4]",
        "BIOL 3401 - Molecular Lab [2]",
        "BIOL 4130 - Molecular Diagnostics [3]",
        "BIOL 4240 - Developmental Biology [4]",
        "BIOL 4290 - Animal Histology [4]",
        "BIOL 4300 - Plant Ecological Physiology [4]",
        "BIOL 4320 - Toxicology [3]",
        "BIOL 4370 - Cell Signaling [3]",
        "BIOL 4700 - Conservation Biology [3]",
        "BIOL 4720 - Marine Ecology [3]",
      ],
    },

  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34265",
},
  {
  major: "Business Administration",

  description: "BUS 4970 is the capstone course and should be taken at the end after completing all core courses. Recommended sequence: CIS 3010 → BUS 3050 → FIN 3030 → ECON 3060 → MKT 3100 → MGMT 3060 → MGMT 3070 → MGMT 3080 → BUS 4150 → BUS 4970. Some courses double-count for GE requirements.",

  sections: [
    {
      title: "Lower Division Core Courses (15 units)",
      courses: [
        "ACCT 2100 - Principles of Financial Accounting [3]",
        "ACCT 2110 - Principles of Managerial Accounting [3]",
        "ECON 2010 - Principles of Economics I: Microeconomics [3]",
        "ECON 2020 - Principles of Economics II: Macroeconomics [3]",
        "FIN 2050 - Legal and Regulatory Environment of Business I [3]"
      ]
    },

    {
      title: "Upper Division Core Courses (30 units)",
      courses: [
        "BUS 3050 - Business Communications [3]",
        "BUS 4150 - Contemporary Issues in Global Business [3]",
        "BUS 4970 - Strategic Management (Capstone) [3]",
        "CIS 3010 - Management Information Systems [3]",
        "ECON 3060 - Statistics for Business Analysis and Decision Making [3]",
        "FIN 3030 - Business Finance [3]",
        "MGMT 3060 - Operations Management [3]",
        "MGMT 3070 - Management and Organizational Behavior [3]",
        "MGMT 3080 - Business Responsibilities in Society [3]",
        "MKT 3100 - Principles of Marketing [3]"
      ]
    },

    {
      title: "Options (Choose a Concentration – View Catalog)",
      courses: [
        "Accounting → https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34270",
        "Business Economics → https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34272",
        "Business Prelegal → https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34271",
        "General Business → https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34282",
        "Entrepreneurship → https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34273",
        "Finance → https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34274",
        "Healthcare Administration → https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34525",
        "Human Resources Management → https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34275",
        "International Business → https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34276",
        "Management → https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34277",
        "Marketing → https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34278",
        "Operations and Supply Chain Management → https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34279",
        "Real Estate → https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34280",
        "Retailing → https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34281"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php"
},

  // --- C ---
  {
  "major": "Chemistry (B.S.)",
  "description": "Requirements for the Major (81 units)",
  "sections": [
    {
      "title": "Lower Division Core Courses (38 units)",
      "courses": [
        "CHEM 1100 - General Chemistry I [5]",
        "CHEM 1110 - General Chemistry II [5]",
        "CHEM 2200 - Organic Chemistry I [4]",
        "CHEM 2201 - Organic Chemistry Laboratory I [1]",
        "CHEM 2211 - Organic Chemistry Laboratory II [1]",
        "MATH 2110 - Calculus I [4]",
        "MATH 2120 - Calculus II [4]",
        "MATH 2130 - Calculus III [3]",
        "MATH 2150 - Differential Equations [3]",
        "PHYS 2100 - General Physics I: Mechanics [4]",
        "PHYS 2200 - General Physics II: Electromagnetism and Circuits [4]"
      ]
    },
    {
      "title": "Upper Division Core Courses (38 units)",
      "courses": [
        "CHEM 3100 - Writing for Chemists [3]",
        "CHEM 3200 - Organic Chemistry II [4]",
        "CHEM 3500 - Quantitative Analysis [4]",
        "CHEM 3600 - Inorganic Chemistry [4]",
        "CHEM 4300 - Introduction to Biochemistry [3]",
        "CHEM 4410 - Physical Chemistry: Quantum Mechanics and Kinetics [4]",
        "CHEM 4420 - Physical Chemistry: Thermodynamics [3]",
        "CHEM 4430 - Physical Chemistry: Quantum Chemical Methods [1]",
        "CHEM 4431 - Physical Chemistry Laboratory [2]",
        "CHEM 4432 - Physical Chemistry: Quantum Chemical Methods Laboratory [1]",
        "CHEM 4810 - Advanced Synthetic Methods [2]",
        "CHEM 4890 - Molecular Science Capstone [3]"
      ]
    },
    {
      "title": "Advanced Analytical Chemistry Requirement (4 units)",
      "courses": [
        "CHEM 4510 - Advanced Analytical Chemistry: Optical Spectroscopy [2]",
        "CHEM 4520 - Advanced Analytical Chemistry: Analytical Separations and Mass Spectrometry [2]",
        "CHEM 4530 - Advanced Analytical Chemistry: Electrochemistry and Surface Techniques [2]"
      ]
    },
    {
      "title": "Upper Division Electives (5 units)",
      "courses": [
        "CHEM 3810 - Honors Studies in Chemistry [2]",
        "CHEM 3820 - Special Topics in Chemistry [1-3]",
        "CHEM 3821 - Special Topics in Chemistry Laboratory [1]",
        "CHEM 4200 - Advanced Organic Chemistry I [3]",
        "CHEM 4210 - Polymer Chemistry [3]",
        "CHEM 4310 - Biochemistry I [3]",
        "CHEM 4311 - Biochemistry Laboratory I [2]",
        "CHEM 4320 - Biochemistry II [3]",
        "CHEM 4321 - Biochemistry Laboratory II [2]",
        "CHEM 4450 - Introduction to Atmospheric Chemistry [3]",
        "CHEM 4460 - Drug Delivery [3]",
        "CHEM 4510 - Advanced Analytical Chemistry: Optical Spectroscopy [2]",
        "CHEM 4520 - Advanced Analytical Chemistry: Analytical Separations and Mass Spectrometry [2]",
        "CHEM 4530 - Advanced Analytical Chemistry: Electrochemistry and Surface Techniques [2]",
        "CHEM 4800 - Special Topics in Advanced Chemistry Lecture [1-3]",
        "CHEM 4801 - Special Topics in Advanced Chemistry Laboratory [1]",
        "CHEM 4830 - History of Chemistry [3]",
        "CHEM 4840 - Drug Discovery and Development (also listed as BIOL 4440) [3]",
        "CHEM 4850 - Bioinorganic and Bioorganic Chemistry [3]",
        "CHEM 4860 - Bioinformatics (also listed as BINF 4000) [3]",
        "CHEM 4980 - Cooperative Education (also listed as UNIV 3980) [1]",
        "CHEM 4990 - Undergraduate Directed Study [1-3]",
        "PHYS 4430 - Biophysics [3]"
      ]
    }
  ],
  "notes": [
    "Advanced Analytical Chemistry courses cannot be double-counted for electives if used in the core.",
    "Electives require advisor approval."
  ]
},
  {
  "major": "Chicana/o and Latina/o Studies (M.A.)",
  "description": "Requirements for the Degree (30 units). At least 15 units must be in 5000-level courses.",
  "sections": [
    {
      "title": "Core Courses (18 units)",
      "courses": [
        "Complete one of the following:",
        "CLS 4290 - Chicana Feminisms: History, Theory, Praxis (also listed as WGSS 4290) [3]",
        "CLS 4400 - Joteria Expressions in Las Americas [3]",
        "AND complete all of the following:",
        "CLS 5010 - Seminar: Theoretical Frameworks in Chicanx and Latinx Studies [3]",
        "CLS 5030 - Seminar: Community-Engaged Research Methods [3]",
        "CLS 5050 - Seminar: Interdisciplinary Approaches to the field of Chicanx & Latinx Studies [3]",
        "CLS 5100 - Teaching Seminar: Race, Gender, & Queer Pedagogies [3]",
        "CLS 5110 - Seminar: Praxis in Chicana/o/x & Latina/o/x Communities [3]"
      ]
    },
    {
      "title": "Directed Electives (9–12 units)",
      "courses": [
        "Note: Courses used for core cannot be double-counted.",
        "CLS 4000 - Indigenous Peoples of Mexico & Central America: Land, History, Culture (also listed as AIIS 4000) [3]",
        "CLS 4010 - Chicana/o Latina/o Culture and Media [3]",
        "CLS 4020 - Literatures of Resistance: Chicanx & Latinx Voices [3]",
        "CLS 4030 - Chicanas/os Latinas/os and La Cultura of Public Spaces [3]",
        "CLS 4080 - The Central American Experience in the US (also listed as LAS 4080) [3]",
        "CLS 4100 - Latina/o/x Communities in U.S. Society [3]",
        "CLS 4110 - Latina/o/x Immigration, History and Politics [3]",
        "CLS 4170 - Critical Analysis of Inequality and Educational Policy [3]",
        "CLS 4180 - Public Health Issues in Latina/o Communities [3]",
        "CLS 4200 - History of Chicanx Latinx People in California [3]",
        "CLS 4240 - Exploring Afro-Latino/a Identities [3]",
        "CLS 4250 - Chicanas & Latinas: Social Movements in the Americas [3]",
        "CLS 4255 - Chicana/x and Latina/x Political Participation and Social Movements [3]",
        "CLS 4260 - The Chicana/o Movement (1960s - 1970s) (also listed as HIST 4600) [3]",
        "CLS 4270 - Modern Mexico and the Chicano People (also listed as HIST 4670) [3]",
        "CLS 4280 - Migration, Identity, and Religion (also listed as LAS 4280, RELS 4230) [3]",
        "CLS 4290 - Chicana Feminisms: History, Theory, Praxis (also listed as WGSS 4290) [3]",
        "CLS 4300 - Community-Engaged Research in Chicanx and Latinx Communities [3]",
        "CLS 4400 - Joteria Expressions in Las Americas [3]",
        "CLS 4450 - Indigenous Experiences in Contemporary Mexico and Latin America (also listed as LAS 4450) [3]",
        "CLS 4660 - Colonial Mexico (also listed as HIST 4660) [3]",
        "CLS 4900 - Special Topics [1-3]",
        "CLS 5980 - Graduate Directed Study [1-3]"
      ]
    },
    {
      "title": "Culminating Experience (0–3 units)",
      "courses": [
        "Complete one of the following:",
        "CLS 5960 - Comprehensive Examination [0]",
        "CLS 5990 - Thesis [3-9] (complete 3 units)",
        "CLS 5995 - Project [1-3] (complete 3 units)"
      ]
    }
  ],
  "notes": [
    "Total units required: 30.",
    "At least 15 units must be at the 5000 level.",
    "CLS 5990 students complete 9 elective units.",
    "CLS 5960 students complete 12 elective units."
  ]
},
  {
  major: "Child Development",

  description: "Requirements for the Major (75–94 units). Students complete core CHDV courses, select foundation sets, and choose an academic option pathway (General Option or Elementary Subject Matter Teacher Preparation Option).",

  sections: [
    {
      title: "Child Development Core Courses (45 units)",
      courses: [
        "CHDV 1400 - Development Across the Lifespan (Conception to Adolescence) [3]",
        "CHDV 2000 - Techniques for the Study of Children [3]",
        "CHDV 2250 - Child and Family Development in Diverse Cultural Contexts [3]",
        "CHDV 3000 - Child Development Research Methods and Critical Analysis [3]",
        "CHDV 3210 - Urban Families and Resilience [3]",
        "CHDV 3430 - Child and Adolescent Cognition [3]",
        "CHDV 3500 - Social and Emotional Development [3]",
        "CHDV 4120 - Issues in Child Abuse, Interpersonal Violence [3]",
        "CHDV 4300 - Parent-Child Development Over the Family Life Cycle [3]",
        "CHDV 4920 - Language Development (also listed as COMD 4560) [3]",
        "CHDV 4960 - Senior Seminar [3]",
        "COMM 1100 - Oral Communication [3]"
      ]
    },

    {
      title: "Foundation Requirement – Set A (3 units)",
      courses: [
        "CHDV 2100 - Infant Development [3]",
        "CHDV 3400 - Middle Childhood and Adolescence [3]"
      ]
    },

    {
      title: "Foundation Requirement – Set B (3 units)",
      courses: [
        "ENGL 1005B - College Writing II [3]",
        "ENGL 1010 - Accelerated College Writing [3]"
      ]
    },

    {
      title: "Foundation Requirement – Set C (3 units)",
      courses: [
        "ENGL 1050 - Argumentative Writing and Critical Thinking [3]",
        "COMM 1200 - Argumentation [3]",
        "PHIL 1600 - Critical Thinking and Composition [3]"
      ]
    },

    {
      title: "General Option – Required Courses (9 units)",
      courses: [
        "CHDV 1200 - Intimate Relationships in Our Diverse Society (also listed as SOC 1200) [3]",
        "CHDV 3410 - Development in Adulthood and Aging [3]",
        "CHDV 4440 - Family Life Education Methods and Professional Ethics [3]"
      ]
    },

    {
      title: "General Option – Advanced Electives (21–23 units)",
      courses: [
        "CHDV 2100 - Infant Development [3]",
        "CHDV 2200 - Early Childhood Development and Field Experience [3]",
        "CHDV 2300 - Early Childhood Curriculum and Programs [3]",
        "CHDV 2310 - Administration of Preschool and Child Care Programs [3]",
        "CHDV 2500 - Child, Family, and Community [3]",
        "CHDV 3400 - Middle Childhood and Adolescence [3]",
        "CHDV 3420 - Development of Sexuality across the Lifespan [3]",
        "CHDV 3440 - Family Resource and Case Management [3]",
        "CHDV 3470 - Culture and Wellness across the Lifespan [3]",
        "CHDV 3480 - Fatherhood and the Child Development Cycle [3]",
        "CHDV 3720 - American Indian Families (also listed as CLS 3720) [3]",
        "CHDV 3730 - Asian Americans, Families, and Community (also listed as AAAS 3730) [3]",
        "CHDV 3750 - Health Disparities in Urban Communities (also listed as CLS 3750, PH 3750) [3]",
        "CHDV 3780 - Graduate School and Professional Development Training [3]",
        "CHDV 4240 - Effects of Family Transitions on Children [3]",
        "CHDV 4260 - The Hospitalized Child [3]",
        "CHDV 4270 - Disability Across the Lifespan [3]",
        "CHDV 4290 - Family Interactions and Communication [3]",
        "CHDV 4360 - Family Stress and Resilience: Cultural Considerations [3]",
        "CHDV 4460 - Therapeutic Play and Play Therapy [3]",
        "CHDV 4540L - Special Topics in Child Development [1–3]",
        "CHDV 4700 - The Family and the Law [3]",
        "CHDV 4800 - Loss and Grief Experiences in Families [3]",
        "CHDV 4930 - Multilingual Acquisition and Development in Childhood [3]",
        "CHDV 4950 - Directed Field Experience [3]",
        "CHDV 4980 - Cooperative Education [3]",
        "CHDV 4990 - Undergraduate Directed Study [1–3]",
        "EDCI 4000 - Transformative Teaching in Diverse Urban Classrooms [3]",
        "EDEL 4020 - Instructional Design and Classroom Management [3]",
        "EDFN 4131 - Psychological Foundations of Education [3]",
        "EDSP 4000 - Foundations of Special Education [3]",
        "HHS 4950 - Field Work in Health and Human Services [1–3]",
        "NTRS 4130 - Maternal and Child Nutrition [3]",
        "SOC 4500 - Sociology of Aging [3]",
        "SW 3650 - Social Policy and Aging [3]",
        "YAA 2900 - Youth Agency Administration [3]",
        "YAA 4670 - Administration of Youth-Serving Nonprofit Organizations [3]",
        "YAA 4950 - Directed Field Experience [3]"
      ]
    },

    {
      title: "Elementary Subject Matter Teacher Prep – Required Courses (6 units)",
      courses: [
        "CHDV 2200 - Early Childhood Development and Field Experience [3]",
        "CHDV 4930 - Multilingual Acquisition and Development in Childhood [3]"
      ]
    },

    {
      title: "Reading, Language & Literature (3 units)",
      courses: [
        "ENGL 2700 - Why Literature Matters [3]",
        "ENGL 2600 - Literary Los Angeles [3]",
        "ENGL 2710 - Contemporary World Literature [3]",
        "ENGL 2730 - Fictions of Gender and Sexuality [3]",
        "ENGL 2760 - Pulp Fictions and Popular Literatures [3]",
        "CLS 2010 - Mexican and Central American Literature Sin Fronteras [3]",
        "PAS 2010 - Third World Literature [3]",
        "SPAN 2420 - Hispanic Societies through Literature [3]"
      ]
    },

    {
      title: "History and Social Science – Required Course",
      courses: [
        "HIST 2010 - Early American History [3]"
      ]
    },

    {
      title: "History and Social Science – Set Options",
      courses: [
        "HIST 1010 - World History to 1500 CE [3]",
        "HIST 1020 - World History Since 1500 CE [3]",
        "HIST 2080 - California [3]",
        "CLS 4200 - History of Chicanx Latinx People in California [3]",
        "CLS 1300 - The Constitution, Law, & Chicanx/Latinx Communities [3]",
        "POLS 1000 - Power, Politics and Engagement in US Government [3]"
      ]
    },

    {
      title: "Mathematics (9–10 units)",
      courses: [
        "MATH 1100 - Foundations of the Real Number System for Teachers [3]",
        "MATH 2250 - Geometry for Teachers [3]",
        "MATH 1150 - Elements of Algebra and Statistics [3]",
        "EDFN 1090 - Intro to Statistics and Data Interpretation [4]",
        "EDFN 1092 - Intro to Statistics and Data Interpretation [3]",
        "MATH 1090 - Quantitative Reasoning with Statistics, with Lab [4]",
        "MATH 1092 - Quantitative Reasoning with Statistics [3]"
      ]
    },

    {
      title: "Science (9–10 units)",
      courses: [
        "BIOL 1030 - Life Science [4]",
        "BIOL 1010 - General Biology [3]",
        "NATS 1010 - Physical Science [3]",
        "CHEM 1000 - Molecules Matter [3]",
        "PHYS 1560 - Physics for the Twenty-First Century [3]",
        "PHYS 1570 - Physics Lab [1]",
        "NATS 1020 - Earth and Space Science [3]",
        "GEOG 1600 - Physical Geography [3]",
        "GEOL 1500 - The Planet Earth [3]",
        "GEOL 1550 - Oceanography [3]",
        "ASTR 1600 - Space, Time and the Universe [3]",
        "ASTR 1510 - Astronomy [3]",
        "ASTR 1520 - Astronomy Lab [1]"
      ]
    },

    {
      title: "Visual & Performing Arts (5–6 units)",
      courses: [
        "LBS 2340 - Multicultural Arts - LA [3]",
        "EDCI 3020 - Arts in Elementary Classroom [3]",
        "ART 4000 - Teaching Methods for Art [3]",
        "DANC 4000 - Creative Dance [2]",
        "MUS 4000 - Elementary Music [2]",
        "TA 4000 - Creative Drama [3]"
      ]
    },

    {
      title: "Physical Education (2 units)",
      courses: [
        "KIN 4200 - Development of Physical Activity [2]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34292"
},
  {
  major: "Chinese",

  description: "",

  sections: [
    {
      title: "Chinese Language and Linguistics Courses",
      courses: [
        "CHIN 3050 - Introduction To Chinese Linguistics [3]",
        "CHIN 4030 - Contrastive Analysis Of Chinese And English Structures [3]",
        "CHIN 4510 - Proseminar: Chinese Linguistics [3]"
      ]
    },

    {
      title: "Advanced Language and Professional Chinese",
      courses: [
        "CHIN 3220 - Newspaper Chinese [3]",
        "CHIN 3250 - Teaching Chinese as a Second Language [3]",
        "CHIN 3800 - Business Chinese [3]"
      ]
    },

    {
      title: "Chinese Culture, Film, and Literature",
      courses: [
        "CHIN 4260 - Chinese Film [3]",
        "CHIN 4280 - Chinese Women’s Literature [3]",
        "CHIN 4520 - Proseminar: Yuan Ming Drama [3]",
        "CHIN 4600 - Proseminar: Masters Of Chinese Culture And Thought [3]"
      ]
    },

    {
      title: "Special Topics Courses",
      courses: [
        "CHIN 4540 - Special Topics In Chinese [1-3]",
        "CHIN 4541 - Special Topics In Chinese [1-4]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34296"
},
  {
  major: "Civil Engineering",

  description: "Requirements for the Major (101 units). Includes lower division core, upper division core, electives, and laboratory requirements covering structural, environmental, geotechnical, transportation, and construction engineering foundations.",

  sections: [
    {
      title: "Lower Division Core Courses (44 units)",
      courses: [
        "CE 1900 - Introduction To Computer Aided Design for Civil Engineers [1]",
        "CE 2010 - Statics (also listed as ME 2010) [3]",
        "CE 2020 - Plane Surveying [2]",
        "CE 2050 - Strength of Materials I (also listed as ME 2050) [3]",
        "CE 2120 - Matrix Algebra and Statistics for Engineers [3]",
        "CE 2800 - Numerical Methods for Engineers I (also listed as ME 2800) [1]",
        "CE 2840 - Environmental Engineering I [1]",
        "CE 2900 - Fundamentals of Civil Engineering Design [2]",
        "CHEM 1040 - General Chemistry for Engineers [4]",
        "ENGL 2030 - Introduction to Technical Writing [3]",
        "MATH 2110 - Calculus I [4]",
        "MATH 2120 - Calculus II [4]",
        "MATH 2130 - Calculus III [3]",
        "MATH 2150 - Differential Equations [3]",
        "PHYS 2100 - General Physics I: Mechanics [4]"
      ]
    },

    {
      title: "Natural Science Elective (Select One)",
      courses: [
        "BIOL 1010 - General Biology [3]",
        "GEOL 1500 - The Planet Earth [3]",
        "GEOL 1550 - Oceanography [3]",
        "GEOL 1580 - Natural Disasters [3]",
        "MICR 1010 - Introduction To Microbiology [3]"
      ]
    },

    {
      title: "Upper Division Core Courses (47 units)",
      courses: [
        "CE 3000 - Economics for Engineers (also listed as EE 3000, ME 3000) [3]",
        "CE 3030 - Fluid Mechanics I (also listed as ME 3030) [3]",
        "CE 3060 - Communication for Civil Engineers [2]",
        "CE 3120 - Strength of Materials Laboratory I (also listed as ME 3120) [1]",
        "CE 3140 - Hydraulics Laboratory I [1]",
        "CE 3200 - Dynamics for Civil Engineers [3]",
        "CE 3220 - Statistics and Data Analysis for Engineers [2]",
        "CE 3600 - Structural Mechanics I [3]",
        "CE 3610 - Introduction To Structural Design [3]",
        "CE 3650 - Fundamentals of Construction Management [3]",
        "CE 3660 - Geotechnical Engineering I [3]",
        "CE 3680 - Geotechnical Engineering Laboratory [1]",
        "CE 3700 - Transportation Engineering [3]",
        "CE 3740 - Civil Engineering Materials [3]",
        "CE 3800 - Numerical Methods for Engineers II (also listed as ME 3800) [2]",
        "CE 3840 - Environmental Engineering II [3]",
        "CE 3860 - Water Resources Engineering [3]",
        "CE 4970 - Civil Engineering Design Project [2]",
        "ENGR 3010 - Ethics and Professionalism in Engineering [3]"
      ]
    },

    {
      title: "Design Electives",
      courses: [
        "CE 4610 - Design of Steel Structures [3]",
        "CE 4620 - Reinforced Concrete Design I [3]",
        "CE 4630 - Timber and Masonry Design [3]",
        "CE 4650 - Seismic Design [3]",
        "CE 4670 - Geotechnical Engineering Design I [3]",
        "CE 4710 - Highway Engineering [3]",
        "CE 4720 - Highway and Airport Pavement Design [3]",
        "CE 4840 - Environmental Engineering Design [3]"
      ]
    },

    {
      title: "Lecture Electives",
      courses: [
        "CE 4020 - Strength of Materials II [3]",
        "CE 4540 - Special Topics in Civil Engineering [1-3]",
        "CE 4560 - Construction Project Planning, Scheduling, and Control [3]",
        "CE 4570 - Construction Cost Estimation & Financial Management [3]",
        "CE 4600 - Structural Mechanics II [3]",
        "CE 4740 - Traffic Engineering [3]",
        "CE 4750 - Advanced Geomatics [3]",
        "CE 4790 - Groundwater Contamination and Remediation [3]",
        "CE 4800 - Environmental Modeling [3]",
        "CE 4810 - Environmental Sustainability and Renewable Energy [3]",
        "CE 4830 - Hydrology I [3]",
        "CE 4870 - Hydraulics I [3]"
      ]
    },

    {
      title: "Laboratory Electives",
      courses: [
        "CE 3720 - Asphaltic Materials Laboratory [1]",
        "CE 3810 - Computer Aided Design Laboratory [1]",
        "CE 3820 - Computer Aided Structural Analysis, Design and Experimentation Laboratory [1]",
        "CE 3900 - Civil Engineering Design Through Competition [3]",
        "CE 4140 - Hydraulics Laboratory II [1]",
        "CE 4540L - Special Topics in Civil Engineering [1]",
        "CE 4730 - Pavement Design Laboratory [1]",
        "CE 4990 - Undergraduate Directed Study [1-3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34297"
},
  {
  major: "Communication",

  description: "Requirements for the Major (45 units). Includes core communication theory, methods, and elective pathways across interpersonal, organizational, intercultural, health, mass, and social justice communication studies.",

  sections: [
    {
      title: "Core Requirement (24 units) - Lower Division Core Courses (9 units)",
      courses: [
        "COMM 1200 - Argumentation [3]",
        "COMM 1800 - Introduction to Human Communication [3]",
        "COMM 2890 - Introduction to Intercultural Communication [3]"
      ]
    },

    {
      title: "Core Requirement - Upper Division Foundation Core Courses (15 units)",
      courses: [
        "COMM 3000 - Applied Writing in Communication [3]",
        "COMM 3100 - Theories of Communication: Social Sciences [3]",
        "COMM 3200 - Theories of Communication: Humanities [3]",
        "COMM 3300 - Methods of Communication: Social Sciences [3]",
        "COMM 3400 - Methods of Communication: Humanities [3]"
      ]
    },

    {
      title: "Electives for the Core - Lower Division Options (Select 3 units)",
      courses: [
        "COMM 2100 - Communication Strategies in Conflict Management [3]",
        "COMM 2200 - Argumentation and Reasoned Advocacy [3]",
        "COMM 2300 - Interpersonal Communication [3]",
        "COMM 2400 - Problem Solving through Group Discussion [3]",
        "COMM 2600 - Forensics [3]",
        "COMM 2700 - Introduction to Oral Interpretation [3]",
        "COMM 2900 - Mediated Communication [3]"
      ]
    },

    {
      title: "Electives for the Core - Upper Division Courses (Select 9 units)",
      courses: [
        "COMM 3500 - Interviewing [3]",
        "COMM 3600 - Advanced Forensics [3]",
        "COMM 3670 - Performance Studies [3]",
        "COMM 3890 - Intercultural Communication in Civic Contexts [3]",
        "COMM 4100 - Classical Approaches to Organizational Communication [3]",
        "COMM 4110 - Critical Approaches to Organizational Communication [3]",
        "COMM 4120 - Business and Professional Communications [3]",
        "COMM 4140 - Communication and Leadership [3]",
        "COMM 4150 - Communication Consulting and Training in Organizations [3]",
        "COMM 4160 - Intercultural Business Communication (also listed as MKT 4510) [3]",
        "COMM 4180 - Internship in Communication Studies [3]",
        "COMM 4200 - Human Side of Computers and Information [3]",
        "COMM 4300 - Mass Communication Theory [3]",
        "COMM 4310 - Principles and Practices of Public Relations [3]",
        "COMM 4320 - Advertising as a Communication Processes [3]",
        "COMM 4330 - Children and Mass Communication [3]",
        "COMM 4340 - Technology and Human Interaction [3]",
        "COMM 4350 - Persuasive Communication [3]",
        "COMM 4360 - Writing for Public Relations [3]",
        "COMM 4370 - Public Relations and Event Planning [3]",
        "COMM 4400 - Foundations: Social Justice Communication [3]",
        "COMM 4410 - Intercultural Communication [3]",
        "COMM 4420 - Feminism and Communication [3]",
        "COMM 4430 - Relational Communication [3]",
        "COMM 4440 - Sex Roles in Communication [3]",
        "COMM 4450 - Family Communication and Conflict [3]",
        "COMM 4460 - Communication and Social Movements [3]",
        "COMM 4500 - Health Communication [3]",
        "COMM 4510 - Health Communication and New Media [3]",
        "COMM 4520 - Narrative Health Communication [3]",
        "COMM 4530 - Health Education and Clinical Care [3]",
        "COMM 4540 - Selected Studies in Communication [1-3]",
        "COMM 4620 - Nonverbal Communication [3]",
        "COMM 4630 - Language and Communication Behavior [3]",
        "COMM 4780 - Group Communication: Dynamics of Leadership and Participation [3]",
        "COMM 4820 - Studies in National and International Public Discourse [3]",
        "COMM 4830 - Performance and Social Change [3]",
        "COMM 4840 - Campaign Communication [3]",
        "COMM 4850 - Political Communication [3]",
        "COMM 4860 - Communication and Cultural Studies [3]",
        "COMM 4910 - Communication Education [3]",
        "COMM 4940 - Communication Behavior in Childhood [3]",
        "COMM 4990 - Undergraduate Directed Study [1-3]"
      ]
    },

    {
      title: "Option Requirement - Health Communication Option (9 units)",
      courses: [
        "COMM 4500 - Health Communication [3]",
        "COMM 4520 - Narrative Health Communication [3]",
        "COMM 4590 - Capstone: Health Communication Option [3]",
        "COMM 4980 - Capstone in Communication [3]"
      ]
    },

    {
      title: "Option Requirement - Organizational Communication Option (9 units)",
      courses: [
        "COMM 4100 - Classical Approaches to Organizational Communication [3]",
        "COMM 4110 - Critical Approaches to Organizational Communication [3]",
        "COMM 4190 - Capstone: Organizational Communication Option [3]",
        "COMM 4980 - Capstone in Communication [3]"
      ]
    },

    {
      title: "Option Requirement - Mass Communication Option (9 units)",
      courses: [
        "COMM 4300 - Mass Communication Theory [3]",
        "COMM 4310 - Principles and Practices of Public Relations [3]",
        "COMM 4320 - Advertising as a Communication Processes [3]",
        "COMM 4390 - Capstone: Mass Communication Option [3]",
        "COMM 4980 - Capstone in Communication [3]"
      ]
    },

    {
      title: "Option Requirement - Social Justice Communication Option (9 units)",
      courses: [
        "COMM 4400 - Foundations: Social Justice Communication [3]",
        "COMM 4460 - Communication and Social Movements [3]",
        "COMM 4490 - Capstone: Social Justice Communication [3]",
        "COMM 4980 - Capstone in Communication [3]"
      ]
    }
  ],

  curriculumLink: ""
},
 {
  major: "Communicative Disorders",

  description: "Requirements for the Major (60 units). Includes lower division foundations, upper division core coursework in audiology, language science, speech and hearing mechanisms, and electives supporting clinical preparation in communicative disorders.",

  sections: [
    {
      title: "Lower Division Core (6 units)",
      courses: [
        "COMD 1700 - Introduction to Communication Disorders [3]",
        "MATH 1090 - Quantitative Reasoning with Statistics, with Lab [4] *"
      ]
    },

    {
      title: "Upper Division Core (39 units)",
      courses: [
        "COMD 4000 - Hearing Science [3]",
        "COMD 4020 - Audiology and Audiometry [3]",
        "COMD 4200 - Rehabilitative Audiology [3]",
        "COMD 4510 - Psychosocial Considerations in Communication Disorders [3]",
        "COMD 4520 - Professional Issues and Writing in Communication Disorders [3]",
        "COMD 4560 - Language Development (also listed as CHDV 4920) [3]",
        "COMD 4600 - Introduction to Language Science [3]",
        "COMD 4610 - Descriptive Phonetics [3]",
        "COMD 4620 - Anatomy and Physiology of the Speech Mechanism [3]",
        "COMD 4630 - Neuroscience of Communication [3]",
        "COMD 4710 - Primary and Secondary Language Disorders in Children and Adolescents [3]",
        "COMD 4720 - Fluency and Speech Sound Disorders [3]",
        "COMD 4750 - Cultural/Linguistic Diversity in Communication Disorders [3]"
      ]
    },

    {
      title: "Electives (15 units) - ASL and Communication Foundations",
      courses: [
        "COMD 1500 - Introduction to American Sign Language [3] *",
        "COMD 2500 - American Sign Language II [3]",
        "COMD 3190 - Communicating with Abused Children and Violent Families [3] *",
        "COMD 3500 - American Sign Language III [3]",
        "COMD 3540 - Employment Practices in Health-Related Professions [3]",
        "COMD 3900 - Communication Disorders in Aging [3] *",
        "COMD 4220 - Advanced Audiology [3]",
        "COMD 4500 - American Sign Language IV [3]",
        "COMD 4540 - Selected Topics in Communication Disorders [1-3]",
        "COMD 4730 - Communication Disorders in Voice, Cleft Palate, and Cerebral Palsy [3] **",
        "COMD 4740 - Acquired Speech, Language, Cognitive, and Swallowing Disorders [3] **",
        "COMD 4800 - Research Methods in Communication Disorders [3] **",
        "CHDV 1400 - Development Across the Lifespan (Conception to Adolescence) [3] *",
        "CHDV 2000 - Techniques for the Study of Children [3]",
        "CHDV 3430 - Child and Adolescent Cognition [3]",
        "CHDV 4300 - Parent-Child Development Over the Family Life Cycle [3]",
        "CHDV 4930 - Multilingual Acquisition and Development in Childhood [3]",
        "EDSP 4000 - Foundations of Special Education [3]"
      ]
    }
  ],

  curriculumLink: ""
},
  {
  major: "Computer Information Systems",

  description: "Requirements for the Major (72 units). Includes core business, programming, systems analysis, database, networking, and capstone coursework with optional specialization tracks in Cybersecurity, Data Analytics, Software Development, and Enterprise Systems.",

  sections: [
    {
      title: "Lower Division Core Courses (12 units)",
      courses: [
        "CIS 1200 - Information and Technology Literacy (also listed as CS 1200) [3]",
        "CIS 2830 - Introduction to Application Programming [3]",
        "ACCT 2100 - Principles of Financial Accounting [3]",
        "ECON 2010 - Principles of Economics I: Microeconomics [3]"
      ]
    },

    {
      title: "Upper Division Core Courses (27 units)",
      courses: [
        "BUS 3050 - Business Communications [3]",
        "CIS 3010 - Management Information Systems [3]",
        "CIS 3050 - Database Design and Development [3]",
        "CIS 3060 - Systems Analysis and Design [3]",
        "CIS 4100 - Hardware and Software Architecture [3]",
        "CIS 4840 - Communications Systems [3]",
        "CIS 4900 - Capstone: Information Systems [3]",
        "ECON 3060 - Statistics for Business Analysis and Decision Making [3] *",
        "MGMT 3080 - Business Responsibilities in Society [3] *"
      ]
    },

    {
      title: "Cybersecurity Option Required Courses (15 units)",
      courses: [
        "CIS 3850 - Systems and Network Administration [3]",
        "CIS 4370 - Security Risk Management and Internal Controls [3]",
        "CIS 4380 - Computer Forensics and Investigations (also listed as ACCT 4380) [3]",
        "CIS 4730 - Network Security Essentials and Practice [3]",
        "CIS 4880 - Information Security [3]"
      ]
    },

    {
      title: "Cybersecurity / Data Analytics / Software Development / Enterprise Systems Electives",
      courses: [
        "CIS 3200 - Data Processing and Analytics [3]",
        "CIS 4150 - Foundations of Business Intelligence [3]",
        "CIS 4200 - Business Intelligence and Data Warehouse [3]",
        "CIS 4210 - Healthcare Data Analytics [3]",
        "CIS 4250 - Business Intelligence Applications [3]",
        "CIS 4560 - Introduction to Big Data [3]",
        "CIS 4870 - Decision Support Systems [3]",
        "CIS 3610 - Web Design and Development [3]",
        "CIS 3620 - Mobile Web Development [3]",
        "CIS 3830 - Multimedia and Game Application Programming [3]",
        "CIS 4450 - Network Application Development [3]",
        "CIS 4510 - Fundamentals of ERP Technology [3]",
        "CIS 4550 - Visual Basic .NET Database Application [3]",
        "CIS 4570 - Advanced Java Programming [3]",
        "CIS 4580 - E-business Application Development with Oracle [3]",
        "CIS 4590 - Advanced Information Systems Development [3]",
        "CIS 4760 - Project Planning with Microsoft Project [3]",
        "CIS 4810 - Healthcare Application Systems [3]",
        "CIS 4860 - Managing Information Systems Projects [3]",
        "CIS 4220 - Routing Configuration and Router Administration [3]",
        "CIS 4230 - Intermediate Routing and LAN Switching [3]",
        "CIS 4240 - Wide Area Networks [3]",
        "CIS 4720 - Wireless Communications and Networks [3]",
        "CIS 4850 - Computer Networks [3]",
        "CIS 4540 - Special Topics in Computer Information Systems [3]",
        "CIS 4980 - Cooperative Education in Information Systems (also listed as UNIV 4980) [1-3]"
      ]
    },

    {
      title: "Data Analytics Option Required Courses",
      courses: [
        "CIS 3200 - Data Processing and Analytics [3]",
        "CIS 4250 - Business Intelligence Applications [3]",
        "CIS 4150 - Foundations of Business Intelligence [3]",
        "CIS 4200 - Business Intelligence and Data Warehouse [3]",
        "CIS 4560 - Introduction to Big Data [3]",
        "CIS 4870 - Decision Support Systems [3]"
      ]
    },

    {
      title: "Software Development Option Required Courses (15 Units)",
      courses: [
        "CIS 3610 - Web Design and Development [3]",
        "CIS 4510 - Fundamentals of ERP Technology [3]",
        "CIS 4570 - Advanced Java Programming [3]",
        "CIS 4580 - E-business Application Development with Oracle [3]",
        "CIS 4590 - Advanced Information Systems Development [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34309"
},
  {
  major: "Computer Science",

  description: "Requirements for the Major (93 units). Includes foundational programming, mathematics, systems, algorithms, software engineering, and upper-division electives in advanced computing topics such as AI, security, networking, and graphics.",

  sections: [
    {
      title: "Lower Division Core Courses (43 units)",
      courses: [
        "CS 1222 - Introduction to Relational Databases [3]",
        "CS 2011 - Introduction to Programming I [4]",
        "CS 2012 - Introduction to Programming II [4]",
        "CS 2013 - Programming with Data Structures [4]",
        "CS 2148 - Discrete Structures [4]",
        "CS 2445 - Introduction to Computer Systems [3]",
        "CS 2470 - Fundamentals of Network Systems and Cybersecurity [3]",
        "ENGL 2030 - Introduction to Technical Writing [3]",
        "MATH 2110 - Calculus I [4]",
        "MATH 2120 - Calculus II [4]",
        "MATH 2740 - Introduction to Data Science and Statistics [3]",
        "PHYS 2100 - General Physics I: Mechanics [4]"
      ]
    },

    {
      title: "Upper Division Core Courses (32 units)",
      courses: [
        "CS 3035 - Programming Paradigms [3]",
        "CS 3112 - Analysis of Algorithms [3]",
        "CS 3186 - Introduction to Automata Theory [3]",
        "CS 3220 - Web and Internet Programming [4]",
        "CS 3337 - Software Engineering [3]",
        "CS 3338 - Software Engineering Tools [1]",
        "CS 3801 - Societal and Ethical Issues in Computing [3]",
        "CS 4440 - Introduction to Operating Systems [3]",
        "CS 4961 - Software Design Laboratory I [3]",
        "CS 4962 - Software Design Laboratory II [3]",
        "CS 4963 - Computer Science Recapitulation [3]"
      ]
    },

    {
      title: "Electives (18 units) - Upper Division CS Electives",
      courses: [
        "CS 4075 - Concurrent and Distributed Programming [3]",
        "CS 4188 - Compilers [3]",
        "CS 4220 - Current Trends in Web Design and Development [3]",
        "CS 4222 - Principles of Data Base Systems [3]",
        "CS 4470 - Computer Networking Protocols [3]",
        "CS 4471 - Computer Networks Configuration and Management [3]",
        "CS 4472 - Computer and Cyber Security [3]",
        "CS 4540 - Topics in Advanced Computer Science [1-3]",
        "CS 4550 - Computer Graphics [3]",
        "CS 4551 - Multimedia Software Systems [3]",
        "CS 4555 - Introduction to 3D Computer Game Programming [3]",
        "CS 4635 - Modeling and Simulation [3]",
        "CS 4660 - Artificial Intelligence [3]",
        "CS 4661 - Introduction to Data Science [3]",
        "CS 4662 - Advanced Machine Learning and Deep Learning [3]",
        "CS 4665 - Introduction to Data Visualization [3]",
        "CS 4780 - Cryptography and Information Security [3]",
        "CS 4875 - Human Centered Computing [3]",
        "EE 3445 - Computer Organization [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34312&returnto=10865"
},
 {
  major: "Criminal Justice",

  description: "Requirements for the Major (60 units). Includes foundational coursework in law enforcement, courts, corrections, criminal law, theory, ethics, research methods, and applied criminal justice policy, plus electives and directed study in related fields.",

  sections: [
    {
      title: "Lower Division Core Courses (21 units)",
      courses: [
        "CRIM 1010 - Introduction to Administration of Justice [3]",
        "CRIM 1260 - Concepts of Criminal Law [3]",
        "CRIM 2010 - Correctional Systems [3]",
        "CRIM 2020 - Police and Society [3]",
        "CRIM 2030 - Judicial Organization [3]",
        "CRIM 2080 - Introduction to Forensic Science for Criminal Justice Majors [3]",
        "CRIM 2100 - Multiculturalism and the Criminal Justice System [3]"
      ]
    },

    {
      title: "Upper Division Core Courses (24 units)",
      courses: [
        "CRIM 3010 - Introduction to the Discipline of Criminal Justice [3]",
        "CRIM 3030 - Theories and Perspectives in Criminal Justice [3]",
        "CRIM 3090 - Juvenile Justice [3]",
        "CRIM 3100 - Ethics and Professional Responsibility [3]",
        "CRIM 3300 - Criminal Justice Research [3]",
        "CRIM 4280 - California Criminal Justice Policy [3]",
        "CRIM 4830 - Statistics in Criminal Justice [3]",
        "CRIM 4920 - Applied Criminal Justice Practice and Policy [3]"
      ]
    },

    {
      title: "Selected Electives (9 units)",
      courses: [
        "CRIM 3070 - Forensic Mental Health [3]",
        "CRIM 4010 - Gangs [3]",
        "CRIM 4020 - Substance Use and Crime [3]",
        "CRIM 4030 - Violence [3]",
        "CRIM 4110 - Interpretation of Evidence in the Courtroom [3]",
        "CRIM 4120 - Crime Scene Management [3]",
        "CRIM 4450 - Legal Issues for Police Officers [3]",
        "CRIM 4460 - Community Policing and Problem Solving [3]",
        "CRIM 4480 - Police and the Media [3]",
        "CRIM 4540 - Special Topics in Criminal Justice [3]",
        "CRIM 4600 - Hate Crimes [3]",
        "CRIM 4610 - Offender Reentry [3]",
        "CRIM 4700 - Women and Crime [3]",
        "CRIM 4910 - Special Problems in Criminal Justice [3]",
        "CRIM 4930 - Civic Engagement in Criminal Justice [3]",
        "CRIM 4940 - Criminal Justice Leadership [3]",
        "CRIM 4950 - Professional Training Portfolio [3]",
        "CRIM 4990 - Undergraduate Directed Study [1-3]"
      ]
    },

    {
      title: "Directed Electives in Criminal Justice or Related Fields (6 units)",
      courses: [
        "AAAS 4870 - Psychosocial Aspects & Collectivism in Asian and Asian American Societies (also listed as COUN 4870) [3]",
        "ANTH 3150 - Evolutionary Perspectives on Violence [3]",
        "CHDV 3400 - Middle Childhood and Adolescence [3]",
        "CHDV 3430 - Child and Adolescent Cognition [3]",
        "PSY 3430 - Child and Adolescent Cognition [3]",
        "CHDV 4120 - Issues in Child Abuse, Interpersonal Violence [3]",
        "CHDV 4700 - The Family and the Law [3]",
        "COMM 4350 - Persuasive Communication [3]",
        "COMM 4410 - Intercultural Communication [3]",
        "COUN 4030 - Child Maltreatment and Domestic Violence (also listed as PSY 4030) [3]",
        "COUN 4480 - Career Assessment and Development [3]",
        "HIST 4790 - Constitutional History of United States [3]",
        "PAS 4400 - Power and the African American Community I [3]",
        "PH 4240 - Drugs and Health [3]",
        "PHIL 4100 - Social and Political Philosophy [3]",
        "PHIL 4900 - Philosophy of Law [3]",
        "POLS 4450 - Judicial Behavior [3]",
        "POLS 4460 - Global Legal Studies [3]",
        "POLS 4620 - Public Policy [3]",
        "PSY 3100 - Abnormal Psychology I [3]",
        "PSY 3220 - Social Psychology [3]",
        "PSY 3300 - Psychology of Prejudice and Discrimination [3]",
        "PSY 4120 - Psychology of Human Development: Infancy and Childhood [3]",
        "PSY 4640 - Psychology and the Law [3]",
        "SW 4560 - Multidisciplinary Teams, Child Maltreatment, and Family Violence [3]",
        "SOC 4260 - Deviant Behavior [3]",
        "SOC 4480 - Social Class and Inequality [3]",
        "SOC 4850 - Domestic Violence [3]",
        "SOC 4880 - Sociology of Law [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34319"
},

  // --- E ---
  {
  major: "Economics",

  description: "Requirements for the Major (54–61 units). Includes core coursework in microeconomics, macroeconomics, statistics, money and banking, and data analysis, with option-based specialization in Applied Economics or Social and Behavioral Sciences.",

  sections: [
    {
      title: "Lower Division Core Courses (15 units)",
      courses: [
        "ACCT 2100 - Principles of Financial Accounting [3]",
        "CIS 1200 - Information and Technology Literacy (also listed as CS 1200) [3]",
        "ECON 2010 - Principles of Economics I: Microeconomics [3]",
        "ECON 2020 - Principles of Economics II: Macroeconomics [3]",
        "ECON 2090 - Applied Business and Economic Statistics I [3]"
      ]
    },

    {
      title: "Upper Division Core Courses (15 units)",
      courses: [
        "ECON 3030 - Money, Banking, and the Economy [3]",
        "ECON 3090 - Applied Business and Economic Statistics II [3]",
        "ECON 4030 - Macroeconomics [3]",
        "ECON 4910 - Data Analysis, Reporting and Presentation [3]",
        "Select One: ENGL 3010 - Advanced College Writing [3] OR BUS 3050 - Business Communications [3]"
      ]
    },

    {
      title: "Option 1: Applied Economics - Upper Division Required Courses (12 units)",
      courses: [
        "ECON 4010 - Mathematical Economics [3]",
        "ECON 4100 - Microeconomics [3]",
        "ECON 4140 - Econometrics I [3]",
        "ECON 4150 - Applied Economic and Business Forecasting [3]"
      ]
    },

    {
      title: "Option 1: Applied Economics - Elective Field Courses (15 units)",
      courses: [
        "ECON 4600 - Economics of Developing Countries [3]",
        "ECON 4610 - Economics of International Trade [3]",
        "ECON 4620 - International Monetary Economics [3]",
        "ECON 4650 - Current Issues in Latin American Economies [3]",
        "ECON 4900 - Issues in the Economics of Globalization [3]",
        "ECON 3500 - Economics of Poverty and Inequality in the U.S. [3]",
        "ECON 4110 - Market Structure and Strategic Firm Behavior [3]",
        "ECON 4300 - Labor Economics [3]",
        "ECON 4330 - Economics of the Public Sector [3]",
        "ECON 4340 - Environmental Economics [3]",
        "ECON 4400 - Urban and Regional Economics [3]",
        "ECON 4720 - Labor Relations and Collective Bargaining [3]",
        "ECON 4800 - Economics of Health Care [3]",
        "GEOG 3690 - Fundamentals of Geographic Information Systems [3]",
        "FIN 3030 - Business Finance [3]",
        "FIN 3320 - Investments [3]",
        "FIN 4400 - Futures and Options [3]",
        "FIN 4500 - Fixed Income Securities, Analysis and Strategies [3]"
      ]
    },

    {
      title: "Option 2: Social and Behavioral Sciences - Upper Division Required Course",
      courses: [
        "ECON 4110 - Market Structure and Strategic Firm Behavior [3]"
      ]
    },

    {
      title: "Option 2: Social and Behavioral Sciences - Electives on Economics Issues (9 units)",
      courses: [
        "ECON 3500 - Economics of Poverty and Inequality in the U.S. [3]",
        "ECON 4300 - Labor Economics [3]",
        "ECON 4330 - Economics of the Public Sector [3]",
        "ECON 4340 - Environmental Economics [3]",
        "ECON 4400 - Urban and Regional Economics [3]",
        "ECON 4650 - Current Issues in Latin American Economies [3]",
        "ECON 4720 - Labor Relations and Collective Bargaining [3]",
        "ECON 4800 - Economics of Health Care [3]",
        "ECON 4900 - Issues in the Economics of Globalization [3]"
      ]
    },

    {
      title: "Option 2: Social and Behavioral Sciences - General Electives (12 units)",
      courses: [
        "ECON 4600 - Economics of Developing Countries [3]",
        "ECON 4610 - Economics of International Trade [3]",
        "ECON 4350 - Market Indicators and Federal Reserve Policy [3]",
        "ECON 4620 - International Monetary Economics [3]",
        "POLS 4040 - Urban Government and Politics [3]",
        "POLS 4090 - Minority Politics in the U.S. [3]",
        "POLS 4620 - Public Policy [3]",
        "PSY 4280 - Introduction to Analysis of Behavior [3]",
        "SOC 4150 - Political Sociology [3]",
        "SOC 4180 - Crowd Behavior and Social Movements [3]",
        "SOC 4220 - Social Psychology [3]",
        "ANTH 4300 - Social Organization [3]",
        "ANTH 4320 - Anthropology of Wealth and Power [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34325"
},
  {
  major: "Electrical Engineering",

  description: "Requirements for the Major (101 units). Includes foundational coursework in mathematics, physics, circuits, electronics, signals and systems, embedded programming, and upper-division specialization tracks such as biomedical engineering, communication systems, computer engineering, control systems, electronics, and power systems.",

  sections: [
    {
      title: "Lower Division Core Courses (40 units)",
      courses: [
        "CHEM 1040 - General Chemistry for Engineers [4] (CHEM 1040 waived if CHEM 1100 used for admission criteria)",
        "EE 2040 - Circuit Analysis I [3]",
        "EE 2049 - Electrical Measurements and Circuits Laboratory [1]",
        "EE 2440 - Digital Engineering [3]",
        "EE 2449 - Digital Logic Laboratory [1]",
        "EE 2450 - Embedded System Programming I [3]",
        "ENGL 2030 - Introduction to Technical Writing [3]",
        "MATH 2110 - Calculus I [4]",
        "MATH 2120 - Calculus II [4]",
        "MATH 2130 - Calculus III [3]",
        "MATH 2150 - Differential Equations [3]",
        "PHYS 2100 - General Physics I: Mechanics [4]",
        "PHYS 2200 - General Physics II: Electromagnetism and Circuits [4]"
      ]
    },

    {
      title: "Upper Division Core Courses (45 units)",
      courses: [
        "EE 3000 - Economics for Engineers (also listed as CE 3000, ME 3000) [3]",
        "EE 3003 - Linear Algebra and Numerical Analysis in Electrical and Computer Engineering [3]",
        "EE 3020 - Signals and Systems [3]",
        "EE 3030 - Circuit Analysis II [3]",
        "EE 3040 - Probability, Random Variable, and Random Processes [3]",
        "EE 3050 - Electric and Magnetic Fields [3]",
        "EE 3200 - Analog Communication Systems [3]",
        "EE 3300 - Electric Machines [3]",
        "EE 3450 - Embedded System Programming II [3]",
        "EE 3600 - Control Systems [3]",
        "EE 3700 - Electronics I [3]",
        "EE 3810 - Sensors, Data Acquisition, and Instrumentation with Applications in Biomedical Engineering [3]",
        "EE 4961 - Senior Design I [3]",
        "EE 4962 - Senior Design II [3]",
        "ENGR 3010 - Ethics and Professionalism in Engineering [3]"
      ]
    },

    {
      title: "Upper Division Electives (16 units) - Biomedical Engineering Option",
      courses: [
        "EE 4810 - Biomedical Devices [3]",
        "EE 4820 - Biomedical Signal Processing [3]",
        "EE 4220 - Digital Signal Processing [3]",
        "EE 4450 - Embedded Architectures [3]",
        "EE 4600 - Applied Control System Design and Simulation [3]",
        "EE 4610 - Digital Control Systems [3]",
        "EE 4710 - Analog Integrated Circuits [3]",
        "EE 4229 - Digital Signal Processing Laboratory [1]",
        "EE 4459 - Systems Design Tools and Implementation Laboratory [1]",
        "EE 4689 - Control Systems Laboratory [1]"
      ]
    },

    {
      title: "Upper Division Electives - Communication Systems Option",
      courses: [
        "EE 4200 - Digital Communication Systems [3]",
        "EE 4220 - Digital Signal Processing [3]",
        "EE 4230 - Antennas [3]",
        "EE 4400 - Data Communications and Networking [3]",
        "EE 4630 - Machine Learning Principles and Application [3]",
        "EE 3209 - Communications Laboratory [1]",
        "EE 4229 - Digital Signal Processing Laboratory [1]"
      ]
    },

    {
      title: "Upper Division Electives - Computer Engineering Option",
      courses: [
        "EE 3420 - Introduction to Autonomous Robotic Systems (also listed as CS 3420, ME 3420) [3]",
        "EE 4400 - Data Communications and Networking [3]",
        "EE 4440 - Computer Organization [3]",
        "EE 4450 - Embedded Architectures [3]",
        "EE 4480 - Advanced Digital Design [3]",
        "EE 4630 - Machine Learning Principles and Application [3]",
        "EE 4229 - Digital Signal Processing Laboratory [1]",
        "EE 4459 - Systems Design Tools and Implementation Laboratory [1]"
      ]
    },

    {
      title: "Upper Division Electives - Control Systems Option",
      courses: [
        "EE 4600 - Applied Control System Design and Simulation [3]",
        "EE 4689 - Control Systems Laboratory [1]",
        "EE 3420 - Introduction to Autonomous Robotic Systems (also listed as CS 3420, ME 3420) [3]",
        "EE 4130 - Systems Engineering [3]",
        "EE 4610 - Digital Control Systems [3]",
        "EE 4620 - Modern Control Systems [3]",
        "EE 4630 - Machine Learning Principles and Application [3]"
      ]
    },

    {
      title: "Upper Division Electives - Electronics Option",
      courses: [
        "EE 3710 - Electronics II [3]",
        "EE 3720 - Digital Electronics [3]",
        "EE 4330 - Power Electronics [3]",
        "EE 4710 - Analog Integrated Circuits [3]",
        "EE 4720 - CMOS VLSI Design [3]",
        "EE 3709 - Electronics Laboratory [1]"
      ]
    },

    {
      title: "Upper Division Electives - Power Systems Option",
      courses: [
        "EE 4300 - Introduction to Power Systems Engineering [3]",
        "EE 4310 - Power Systems Analysis [3]",
        "EE 3309 - Electromagnetic Energy Conversion Laboratory [1]",
        "EE 4320 - Electric Power Distribution [3]",
        "EE 4330 - Power Electronics [3]"
      ]
    },

    {
      title: "Optional Courses",
      courses: [
        "EE 1540 - Special Topics in Electrical Engineering [1-3]",
        "EE 2540 - Special Topics in Electrical Engineering [1-3]",
        "EE 3540 - Special Topics in Electrical Engineering [1-3]",
        "EE 4009 - Professional Engineering Practice [1]",
        "EE 4130 - Systems Engineering [3]",
        "EE 4540 - Special Topics in Electrical Engineering [1-3]",
        "EE 4990 - Undergraduate Directed Study [1-3]",
        "ENGR 4970 - Seminar in Interdisciplinary STEM Research [1]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34334"
},
  {
  major: "English",

  description: "Requirements for the Major (49–56 units). Includes core study of literature, language, writing, theory, and genre across historical periods, plus directed electives, engaged English requirements, and a senior culminating experience. Students may also choose an option in General English Studies or Single Subject Credential Teaching.",

  sections: [
    {
      title: "Upper Division Core Courses (22 units)",
      courses: [
        "ENGL 3000 - English Tutorial: Reading and Writing in the Major [3]",
        "ENGL 3100 - Readings on the English Language [3]",
        "ENGL 3200 - Readings in Theory [3]",
        "ENGL 3300 - Readings in Ancient World and Medieval British Literatures [3]",
        "ENGL 3400 - Readings in British Literature: Renaissance to Modern [3]",
        "ENGL 3600 - Readings in American Literature(s) [3]",
        "ENGL 3700 - Readings in Modern and Contemporary World Literatures [3]",
        "ENGL 4950 - Senior Capstone [1]"
      ]
    },

    {
      title: "Directed Electives for Core (12 units)",
      courses: [
        "ENGL 3010 - Advanced College Writing [3]",
        "ENGL 3030 - Professional and Technical Writing [3]",
        "ENGL 3050 - Issues in Writing Pedagogy [3]",
        "ENGL 3060 - Discourse Analysis for Language Studies [3]",
        "ENGL 3900 - Research Tutorial and Symposium [3]",
        "ENGL 4020 - Evolving Literacies, Cultures, and Writing Technologies [3]",
        "ENGL 4060 - Writing Nonfiction [3]",
        "ENGL 4070 - Writing Fiction [3]",
        "ENGL 4080 - Writing Poetry [3]",
        "ENGL 4100 - Introduction to Linguistics (also listed as ANTH 4710) [3]",
        "ENGL 4101 - Introduction to English Linguistics [3]",
        "ENGL 4110 - History of the English Language [3]",
        "ENGL 4111 - Topics in the History of the English Language [3]",
        "ENGL 4120 - Language in Space and Time [3]",
        "ENGL 4130 - Language and Culture (also listed as ANTH 4700) [3]",
        "ENGL 4170 - Modern English Grammar [3]",
        "ENGL 4180 - Issues in English Language Teaching [3]",
        "ENGL 4200 - Topics in Theory [3]",
        "ENGL 4205 - Signs, Texts, Meaning: An Introduction to Semiotics [3]",
        "ENGL 4210 - Cultural Studies and Literature [3]",
        "ENGL 4260 - Film and Literature [3]",
        "ENGL 4303 - The Bible as Literature: Old and New Testaments [3]",
        "ENGL 4305 - The Medieval Amatory Tradition [3]",
        "ENGL 4306 - The Arthurian Tradition [3]",
        "ENGL 4320 - Anglo-American Modernism [3]",
        "ENGL 4330 - Transnational Women Writers [3]",
        "ENGL 4340 - Diasporic Literatures [3]",
        "ENGL 4370 - Greek and Roman Drama in Translation [3]",
        "ENGL 4371 - Medieval Drama [3]",
        "ENGL 4379 - Modern and Contemporary Poetry [3]",
        "ENGL 4401 - Medieval English Literature [3]",
        "ENGL 4402 - Dramatic Literature of the English Renaissance [3]",
        "ENGL 4403 - The English Renaissance [3]",
        "ENGL 4404 - Seventeenth-Century Literature [3]",
        "ENGL 4405 - The Augustan Age [3]",
        "ENGL 4406 - The Romantic Age [3]",
        "ENGL 4407 - The Victorian Age [3]",
        "ENGL 4408 - Modern British Literature [3]",
        "ENGL 4409 - Contemporary British Literature [3]",
        "ENGL 4421 - Chaucer [3]",
        "ENGL 4422 - Piers Plowman [3]",
        "ENGL 4423 - Shakespeare I: Poetry and Performance [3]",
        "ENGL 4424 - Shakespeare II [3]",
        "ENGL 4425 - Milton [3]",
        "ENGL 4460 - The British Novel: The Eighteenth Century [3]",
        "ENGL 4461 - The British Novel: The Nineteenth Century [3]",
        "ENGL 4462 - The British Novel: The Twentieth Century [3]",
        "ENGL 4510 - Approaches to Teaching Shakespeare’s Plays [3]",
        "ENGL 4540 - Selected Topics in Literature and Language [3]",
        "ENGL 4601 - American Literary History Before 1877 [3]",
        "ENGL 4602 - American Literary History After 1877 [3]",
        "ENGL 4630 - American Women Writers [3]",
        "ENGL 4660 - The American Novel I [3]",
        "ENGL 4661 - The American Novel II [3]",
        "ENGL 4680 - The Politics of American Literature [3]",
        "ENGL 4690 - Ethnic Literature in the U.S. [3]",
        "ENGL 4691 - Black American Literature [3]",
        "ENGL 4692 - U.S. Latino/a Literature [3]",
        "ENGL 4693 - Asian American Literature [3]",
        "ENGL 4760 - Major Continental Fiction: Cervantes to Balzac [3]",
        "ENGL 4761 - Major Continental Fiction: Stendhal to Tolstoy [3]",
        "ENGL 4762 - Twentieth Century Continental Fiction [3]",
        "ENGL 4778 - Contemporary Drama: Continental, English, and American [3]",
        "ENGL 4780 - Latin American Literature in Translation [3]",
        "ENGL 4785 - Postcolonial Literature and Criticism [3]",
        "ENGL 4801 - The English Court in Literature, Art, and Culture [3]",
        "ENGL 4840 - Environment, Ecology, and Literature [3]",
        "ENGL 4860 - Fictions of Finance: Economic Criticism [3]",
        "ENGL 4880 - Children’s Literature [3]"
      ]
    },

    {
      title: "Option Requirements - General Option Electives (9 units)",
      courses: [
        "ENGL 2070 - Beginning Creative Writing [3]",
        "ENGL 2090 - Introduction to Playwriting (also listed as TA 2760) [3]",
        "ENGL 2100 - Language and Society (also listed as ANTH 2300) [3]",
        "ENGL 2260 - A Journey Through World Cinema (also listed as TVF 2260) [3]",
        "ENGL 2310 - Gods, Monsters, and Heroes in World Mythology [3]",
        "ENGL 2600 - Literary Los Angeles [3]",
        "ENGL 2665 - Race and Ethnicity in Science Fiction (also listed as LBS 2665) [3]",
        "ENGL 2700 - Why Literature Matters [3]",
        "ENGL 2710 - Contemporary World Literature [3]",
        "ENGL 2730 - Fictions of Gender and Sexuality [3]",
        "ENGL 2760 - Pulp Fictions and Popular Literatures [3]",
        "ENGL 2800 - Shakespeare and Popular Culture [3]",
        "ENGL 3810 - Literary Explorations of Racism and Justice (also listed as PAS 3810) [3]",
        "ENGL 3815 - Money and Meaning [3]",
        "ENGL 3820 - The Body in Literature and Culture [3]",
        "ENGL 3822 - Ethnicity and Emotions in U.S. Film (also listed as PAS 3822) [3]",
        "ENGL 3825 - Psychology in Fairy Tales and Fantasy Literature [3]",
        "ENGL 3830 - Gender and Sexuality in Popular Culture (also listed as TVF 3830) [3]",
        "ENGL 3835 - Sex and Gender in Language and Literature [3]",
        "ENGL 3840 - Aging in Literature [3]",
        "ENGL 3850 - Violence, Ethics and Literature [3]",
        "ENGL 3855 - Crimes, Scenes, Interpretations: Literature and the Law [3]",
        "ENGL 3920 - Statement and Literary Magazine Editing [1-3]",
        "ENGL 3930 - Introduction to Archival Research [2]",
        "ENGL 3940 - Introduction to Grant Writing as Community Engagement [3]",
        "ENGL 3960 - Introduction to Narrative Practices of Healing [2]",
        "ENGL 3970 - Internship Supervision [1-3]",
        "ENGL 3980 - Cooperative Education [1-6]",
        "ENGL 4855 - Words Uncaged Journal Production: The Humanities as Social Practice [3]"
      ]
    },

    {
      title: "Engaged English Requirement (3–4 units)",
      courses: [
        "ENGL 3950 - English Major Mentorship and Professionalization [1]",
        "ENGL 3900 - Research Tutorial and Symposium [3]",
        "ENGL 3910 - Engaged English Studies [1-3]",
        "ENGL 3920 - Statement and Literary Magazine Editing [1-3]",
        "ENGL 3930 - Introduction to Archival Research [2]",
        "ENGL 3940 - Introduction to Grant Writing as Community Engagement [3]",
        "ENGL 3960 - Introduction to Narrative Practices of Healing [2]",
        "ENGL 3970 - Internship Supervision [1-3]",
        "ENGL 3980 - Cooperative Education [1-6]",
        "ENGL 4855 - Words Uncaged Journal Production: The Humanities as Social Practice [3]"
      ]
    },

    {
      title: "Senior-Level Culminating Course (3 units)",
      courses: [
        "ENGL 4910 - Practicum in the Teaching of Literature [3]",
        "ENGL 4920 - Seminar in Literature and Language [3]",
        "ENGL 4925 - Practicum in Literature and Language [3]"
      ]
    },

    {
      title: "Single Subject Credential Teaching Option - Upper Division Required Courses (15 units)",
      courses: [
        "ENGL 3050 - Issues in Writing Pedagogy [3]",
        "ENGL 4180 - Issues in English Language Teaching [3]",
        "ENGL 4910 - Practicum in the Teaching of Literature [3]",
        "ENGL 4423 - Shakespeare I: Poetry and Performance [3]",
        "ENGL 4510 - Approaches to Teaching Shakespeare’s Plays [3]",
        "ENGL 4690 - Ethnic Literature in the U.S. [3]",
        "ENGL 4691 - Black American Literature [3]",
        "ENGL 4692 - U.S. Latino/a Literature [3]",
        "ENGL 4693 - Asian American Literature [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34341"
},
  {
  major: "Exercise Science",

  description: "Requirements for the Major (83–86 units). Includes foundational coursework in biology, chemistry, physics, kinesiology, psychology, mathematics, biomechanics, physiology of exercise, fitness assessment, and directed electives in health, science, and sport-related disciplines.",

  sections: [
    {
      title: "Lower Division Required Courses (50–53 units)",
      courses: [
        "BIOL 1100 - Cellular Basis of Life [5]",
        "BIOL 1200 - Diversity of Life [5]",
        "BIOL 2030 - Human Anatomy [4]",
        "BIOL 2040 - Human Physiology [4]",
        "CHEM 1100 - General Chemistry I [5]",
        "CHEM 1110 - General Chemistry II [5]",
        "KIN 2500 - Introduction to Kinesiology [2]",
        "PHYS 1100 - Physics for the Life Sciences I [4]",
        "PHYS 1200 - Physics for the Life Sciences II [4]",
        "PSY 1500 - Introductory Psychology [3]"
      ]
    },

    {
      title: "Group A Credits / Units (6–8 units) - Precalculus Requirement",
      courses: [
        "MATH 1040 - Precalculus: Functions and Trigonometry [6]",
        "MATH 1083 - Precalculus: Trigonometry [4]",
        "ESM 1082 - Early Start PreCalculus: Functions [3]",
        "MATH 1081 - Precalculus: Functions [3]",
        "MATH 1082 - Precalculus: Functions, with Lab [4]"
      ]
    },

    {
      title: "Group B Credits / Units (3–4 units) - Statistics Requirement",
      courses: [
        "EDFN 1090 - Introduction to Statistics and Data Interpretation [4]",
        "EDFN 1092 - Introduction to Statistics and Data Interpretation [3]",
        "ESM 1090 - Early Start Quantitative Reasoning with Statistics [3]",
        "MATH 1090 - Quantitative Reasoning with Statistics, with Lab [4]",
        "MATH 1092 - Quantitative Reasoning with Statistics [3]",
        "MATH 2740 - Introduction to Data Science and Statistics [3]"
      ]
    },

    {
      title: "Upper Division Required Courses (27 units)",
      courses: [
        "KIN 3100 - Written Communication for Kinesiology [3]",
        "KIN 3400 - Applied Biomechanics [4]",
        "KIN 3600 - Physiology of Exercise and Physical Activity [4]",
        "KIN 4600 - Principles of Physical Fitness Assessment [4]",
        "KIN 4610 - Advanced Exercise Physiology [3]",
        "KIN 4650 - Principles of Exercise Prescription [5]"
      ]
    },

    {
      title: "Upper Division Elective (4 units)",
      courses: [
        "KIN 4360 - Principles of Mobility Training [4]",
        "KIN 4365 - Neurorehabilitation [4]",
        "KIN 4400 - Advanced Movement Analysis in Sport, Performance and Injury [4]"
      ]
    },

    {
      title: "Directed Electives (6–7 units)",
      courses: [
        "CHEM 2201 - Organic Chemistry Laboratory I [1]",
        "CHEM 2211 - Organic Chemistry Laboratory II [1]",
        "CHEM 3200 - Organic Chemistry II [4]",
        "CHEM 3500 - Quantitative Analysis [4]",
        "KIN 2150 - Anatomical Kinesiology [5]",
        "KIN 4370 - Disease and Plasticity in Neuromuscular Systems [3]",
        "MICR 1010 - Introduction to Microbiology [3]",
        "NTRS 4300 - Sports Nutrition [3]",
        "PSY 3100 - Abnormal Psychology I [3]",
        "PSY 4100 - Abnormal Psychology II [3]",
        "SOC 4250 - Medical Sociology [3]",
        "SOC 4500 - Sociology of Aging [3]",
        "CHEM 2200 - Organic Chemistry I [4]",
        "MATH 1085 - Discrete Mathematical Models [4]",
        "BIOL 3000 - Biostatistics [4]",
        "BIOL 3400 - Principles of Genetics [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34345"
},

  // --- F ---
  {
  "major": "Fire Protection Administration & Technology ",
  "description": "For transfer students only. Requirements for the Major (48 -49 units)",
  "sections": [
    {
      "title": "Requirements for the Core (39 units)",
      "courses": [
        "FPAT 3500 - Community Fire/Emergency Medical Services Risk Reduction [3]",
        "FPAT 3510 - Fire Defense Planning [3]",
        "FPAT 3520 - Fire Protection in Building Design and Construction [3]",
        "FPAT 3530 - Fire and Emergency Services Administration [3]",
        "FPAT 3540 - Human Behavior and Fire Protection [3]",
        "FPAT 3550 - Political and Legal Foundations for Fire Protection [3]",
        "FPAT 3570 - Wildland Fire: Science and Strategy [3]",
        "FPAT 4520 - Fire Prevention Organization and Management [3]",
        "FPAT 4560 - Fire Finance [3]",
        "FPAT 4570 - Fire Service Ethics [3]",
        "FPAT 4580 - Applications of Fire Research [3]",
        "FPAT 4590 - Personnel Management for the Fire Service [3]"
      ]
    },
    {
      "title": "Select One Communication Course",
      "courses": [
        "BUS 3050 - Business Communications [3]",
        "FPAT 4000 - Written Communication for Fire Protection/EMS [3]",
        "TECH 4000 - Written Communication Skills for Technology [3]"
      ]
    },
    {
      "title": "Directed Electives (9 -10 units)",
      "courses": [
        "FPAT 3580 - Advanced Hazardous Materials [3]",
        "FPAT 3590 - Fire Cause Investigation [3]",
        "FPAT 4510 - Fire Safety Codes and Standards: Interpretation and Enforcement [3]",
        "FPAT 4530 - Advanced Fire Protection Equipment and Systems [3]",
        "FPAT 4550 - Fire Protection of Building Structural Members & Other Building Components [3]",
        "FPAT 3560 - Wildland/Urban Interface Administration [3]",
        "POLS 2810 - Quantitative Research Design in Political Science [4]",
        "POLS 4610 - Dynamics of Urban Administration [3]",
        "POLS 4720 - Organization and Management [3]"
      ]
    }
  ],
  "curriculumLink": "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34350&returnto=10734"
},
  {
  "major": "French",
  "description": "Requirements for the Major (45 units)",
  "sections": [
    {
      "title": "Common Core (30 units)",
      "courses": [
        "ML 1010 - Introduction to Higher Education for MLL Majors [3]",
        "FREN 3001 - Advanced Grammar and Composition [3] *",
        "FREN 3002 - Introduction to Literary Analysis [3]",
        "FREN 3050 - French Phonetics [3]",
        "FREN 3101 - The Evolution of France: Culture and Society [3]",
        "FREN 3102 - Contemporary France: Culture and Society [3]",
        "FREN 4101 - Survey of French Literature I [3]",
        "FREN 4102 - Survey of French Literature II [3]",
        "FREN 4130 - Panorama de la Francophonie [3]",
        "ML 4000 - Senior Thesis in Modern Languages and Literatures [3]"
      ]
    },
    {
      "title": "Electives (15 units)",
      "courses": [
        "FREN 3010 - Contemporary Spoken French [3]",
        "FREN 3800 - Commercial French [3]",
        "FREN 4030 - Topics in French Applied Linguistics [3]",
        "FREN 4050 - Translation [3]",
        "FREN 4120 - Survey of French Poetry from the Medieval Lyric to the Symbolists [3]",
        "FREN 4500 - Selected Topics in French Literary Prose [3]",
        "FREN 4510 - Selected Topics in French Dramatic Literature [3]",
        "FREN 4560 - Senior Seminar in French [3]",
        "FREN 2500 - Hip Hop as Cultural Critique in the Francophone World [3]",
        "FREN 3001 - Advanced Grammar and Composition [3]",
        "FREN 4318 - Francophone Caribbean Literature and Culture [3]",
        "FREN 4328 - Quebecois Literature and Culture [3]",
        "FREN 4338 - Francophone African Literature [3]",
        "FREN 4540 - Special Topics in French [1-4]",
        "FREN 3719 - The French Film [3]",
        "FREN 3729 - Islam in the Francophone World [3]",
        "FREN 3739 - Images of Women in French Literature and Society [3]"
      ]
    }
  ],
  "curriculumLink": "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34355&returnto=10632"
},
  // --- G ---
  {
  "major": "Geography",
  "description": "Requirements for the Major (43-44 units)",
  "sections": [
    {
      "title": "Requirements for the Core (28-29 units)",
      "courses": [
        "GEOG 1550 - Society and Nature: Human Geography [3]",
        "GEOG 1600 - Nature and Society: Physical Geography [3]",
        "GEOG 1605 - Nature and Society: Physical Geography Lab [1]",
        "GEOG 2820 - Spatial Measurement and Elementary Statistics [3]",
        "MATH 1090 - Quantitative Reasoning with Statistics, with Lab [4]",
        "MATH 1092 - Quantitative Reasoning with Statistics [3]",
        "SOC 1090 - Introduction to Statistics for the Social Sciences, with Lab [4]",
        "SOC 1092 - Introduction to Statistics for the Social Sciences [3]",
        "GEOG 3120 - Global Climate Change (also listed as GEOL 3120) [3]",
        "GEOG 3690 - Fundamentals of Geographic Information Systems [3]",
        "GEOG 3700 - World Regional Geography [3]",
        "GEOG 4460 - U.S. Ethnic Communities [3]",
        "GEOG 4900 - Research Design [3]",
        "GEOG 4950 - Senior Thesis [3]"
      ]
    },
    {
      "title": "Directed Electives (15 units)",
      "courses": [
        "GEOG 1700 - Weather and Climate [3]",
        "GEOG 2680 - Introduction to Geospatial Sciences [4]",
        "GEOL 1500 - The Planet Earth [3]",
        "GEOL 1550 - Oceanography [3]",
        "GEOL 1580 - Natural Disasters [3]",
        "URBA 1800 - The Urban World [3]",
        "GEOG 3090 - Urban Environmental Pollution [3]",
        "GEOG 3100 - Urban Climatology [3]",
        "GEOG 3130 - Climate Change and Migration (also listed as LAS 3130) [3]",
        "GEOG 3330 - Environment and Development in the Global South (also listed as GEOL 3330) [3]",
        "GEOG 3760 - Cities and Society [3]",
        "GEOG 4020 - Geomorphology [3]",
        "GEOG 4030 - Environment and Food Customs [3]",
        "GEOG 4070 - Biogeography [3]",
        "GEOG 4100 - Applied Climatology [3]",
        "GEOG 4120 - Climate Change Resilience through Mitigation and Adaptation [3]",
        "GEOG 4150 - Perspectives on Environment [3]",
        "GEOG 4310 - California [3]",
        "GEOG 4510 - Historical Geography of North America [3]",
        "GEOG 4540 - Special Topics in Geography [3]",
        "GEOG 4570 - Transportation Geography [3]",
        "GEOG 4580 - Urban Transportation [3]",
        "GEOG 4620 - Geographic Information Systems (GIS) Applications [3]",
        "GEOG 4660 - Remote Sensing [3]",
        "GEOG 4690 - Spatial Analysis and GIS Modeling [3]",
        "GEOG 4700 - GIS Programming and Customization [3]",
        "GEOG 4760 - Urban Geography [3]",
        "GEOG 4800 - GIS for Community Advocacy [3]",
        "GEOG 4820 - Multivariate Statistics in Geospatial Sciences [3]",
        "GEOG 4990 - Undergraduate Directed Study [1-6]",
        "GEOL 3570 - Urban Geology [3]",
        "GEOL 4350 - Coastal Processes and Environments [3]",
        "GEOL 4870 - Watershed Analysis [3]",
        "POLS 4040 - Urban Government and Politics [3]",
        "POLS 4060 - Los Angeles City Politics [3]",
        "POLS 4610 - Dynamics of Urban Administration [3]",
        "SOC 4300 - Urban Sociology [3]",
        "SOC 4870 - Environmental Policy, Law, and Society [3]"
      ]
    }
  ],
  "curriculumLink": "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34361&returnto=10865"
},
  {
  "major": "Geology",
  "description": "Requirements for the major (82 units)",
  "sections": [
    {
      "title": "Requirements for the Core Courses (73 units)",
      "courses": [
        "CHEM 1100 - General Chemistry I [5]",
        "CHEM 1110 - General Chemistry II [5]",
        "GEOG 1550 - Society and Nature: Human Geography [3]",
        "GEOL 1505 - The Planet Earth Lab [1]",
        "GEOG 2680 - Introduction to Geospatial Sciences [4]",
        "GEOL 1500 - The Planet Earth [3]",
        "GEOL 2520 - Historical Geology [4]",
        "MATH 2110 - Calculus I [4]",
        "MATH 2120 - Calculus II [4]",
        "PHYS 1100 - Physics for the Life Sciences I [4]",
        "PHYS 1200 - Physics for the Life Sciences II [4]",
        "GEOL 3120 - Global Climate Change (also listed as GEOG 3120) [3]",
        "GEOL 3330 - Environment and Development in the Global South (also listed as GEOG 3330) [3]",
        "GEOL 3010 - Mineralogy and Petrology [4]",
        "GEOL 3600 - Geological Mapping [4]",
        "GEOL 4010 - Igneous and Metamorphic Petrology [4]",
        "GEOL 4100 - Structural Geology [4]",
        "GEOL 4300 - Stratigraphy and Sedimentology [4]",
        "GEOL 4590 - Geologic Maps and Reports [3]",
        "GEOL 4600 - Advanced Undergraduate Field Geology [3]",
        "GEOL 4840 - Hydrogeology [3]"
      ]
    },
    {
      "title": "Electives (9 units)",
      "courses": [
        "GEOG 3690 - Fundamentals of Geographic Information Systems [3]",
        "GEOG 3695 - Map Design [3]",
        "GEOG 4020 - Geomorphology [3]",
        "GEOG 4660 - Remote Sensing [3]",
        "GEOG 4690 - Spatial Analysis and GIS Modeling [3]",
        "GEOL 3210 - Geology of Southern California [3]",
        "GEOL 3700 - Geochemistry [3]",
        "GEOL 4000 - Optical Mineralogy [3]",
        "GEOL 4220 - Environmental Geochemistry [3]",
        "GEOL 4222 - Forensic and Isotope Geochemistry [3]",
        "GEOL 4340 - Volcanic Processes and Hazards [3]",
        "GEOL 4350 - Coastal Processes and Environments [3]",
        "GEOL 4810 - Engineering Geology [3]",
        "GEOL 4830 - Photogeology [3]",
        "GEOL 4850 - Groundwater Management and Models [3]",
        "GEOL 4870 - Watershed Analysis [3]",
        "GEOL 4900 - Special Topics in Geology [1-4]",
        "GEOL 4910 - Special Laboratory Topics in Geology [1-2]",
        "GEOL 4990 - Undergraduate Directed Study [1-3]"
      ]
    }
  ],
  "curriculumLink": "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34366&returnto=10755"
},
  // --- H ---
  {
  "major": "History",
  "description": "Requirements for the Major (48 or 66 units)",
  "sections": [
    {
      "title": "Core Courses Requirements (36 units)",
      "courses": [
        "HIST 1010 - World History to 1500 CE [3]",
        "HIST 1020 - World History Since 1500 CE [3]",
        "HIST 2010 - Early American History [3]",
        "HIST 2020 - Recent United States History [3]",
        "HIST 3080 - Historiography [3]",
        "HIST 3090 - Historical Research and Writing [3]",
        "HIST 4900 - Research Capstone: Special Studies in History [3]",
        "HIST 3100 - Classical Civilization and the Modern World [3]",
        "HIST 4110 - History Of Ancient Greece: Bronze And Archaic Ages [3]",
        "HIST 4120 - Ancient Greece: Classical And Hellenistic Eras [3]",
        "HIST 4130 - Early Rome, The Republic [3]",
        "HIST 4140 - The Roman Empire [3]",
        "HIST 4150 - Ancient Religions (also listed as RELS 4150) [3]",
        "HIST 4220 - The Middle Ages [3]",
        "HIST 4225 - Religion and Society in Medieval Europe (also listed as RELS 4225) [3]",
        "HIST 4230 - Renaissance and Reformation [3]",
        "HIST 4240 - Science, Enlightenment, and Empire [3]",
        "HIST 4260 - Modern Europe [3]",
        "HIST 4310 - History of Modern Germany [3]",
        "HIST 4340 - The British Empire [3]",
        "HIST 4360 - Imperial Russia: 1801-1917 [3]",
        "HIST 4370 - The Soviet Union [3]",
        "HIST 4190 - Ancient Near East: 4000-323 B.C. [3]",
        "HIST 4410 - Pre-colonial Sub-Saharan Africa [3]",
        "HIST 4420 - History of Africa since 1800 [3]",
        "HIST 4450 - Islamic Empires in World History: 600s-1919 [3]",
        "HIST 4460 - The Islamic Middle East: 1258-1919 [3]",
        "HIST 4500 - Traditional China [3]",
        "HIST 4510 - Modern China [3]",
        "HIST 4540 - Modern Japan [3]",
        "HIST 4090 - Sexuality in the Americas [3]",
        "HIST 4600 - The Chicano Movement (also listed as CLS 4260) [3]",
        "HIST 4610 - Early Latin America: Conquest to 1850s [3]",
        "HIST 4620 - Modern Latin America: 1860s to the present [3]",
        "HIST 4630 - Mapping the Recent History of Latin America: From the 1990s to the present [3]",
        "HIST 4640 - History of Central America and the Caribbean [3]",
        "HIST 4650 - Brazil [3]",
        "HIST 4660 - Colonial Mexico (also listed as CLS 4660) [3]",
        "HIST 4665 - Modern Mexico (also listed as CLS 4665) [3]",
        "HIST 4670 - Modern Mexico and the Chicano People (also listed as CLS 4670) [3]",
        "HIST 4690 - Indigenous Peoples of the Americas [3]",
        "HIST 3400 - History of U.S. Civil Rights Movements [3]",
        "HIST 3405 - LGBT Political History in the US (also listed as WGSS 3400) [3]",
        "HIST 3450 - Rise of Urban America [3]",
        "HIST 4700 - Early American History [3]",
        "HIST 4710 - Revolutionary America [3]",
        "HIST 4750 - The United States since the 1960s [3]",
        "HIST 4760 - Economic History of United States [3]",
        "HIST 4775 - American Religious History (also listed as RELS 4775) [3]",
        "HIST 4780 - History of United States International Relations [3]",
        "HIST 4790 - Constitutional History of United States [3]",
        "HIST 4800 - Ethnicity and Immigration in American History [3]",
        "HIST 4820 - History of US Popular Culture [3]",
        "HIST 4840 - Civil War and Reconstruction [3]",
        "HIST 4850 - U.S. Women to 1877 [3]",
        "HIST 4860 - U.S. Women, 1877 to the Present [3]",
        "HIST 4870 - History of U.S. Work and Working People [3]",
        "HIST 4890 - Los Angeles [3]"
      ]
    },
    {
      "title": "Option Requirements (12 or 30 units)",
      "courses": [
        "HIST 3050 - Digital and Public History [3]",
        "HIST 3085 - Early Field Experience in History-Social Science Education [3]",
        "HIST 3300 - Big History: From The Big Bang Until the Present [3]",
        "HIST 3350 - Global History of World War II [3]",
        "HIST 3510 - A History of Violence: Conflict, War, and Resolution [3]",
        "HIST 3520 - Oral History of Asian America (also listed as AAAS 3520) [3]",
        "HIST 3560 - History of Emotions [3]",
        "HIST 3570 - Gender and Sex in History (also listed as WGSS 3570) [3]",
        "HIST 3600 - Revolution in History [3]",
        "HIST 3800 - Ancient and Modern Science (also listed as CHEM 3800, PHIL 3800) [3]",
        "HIST 4000 - Special Lectures in History [1-3]",
        "HIST 4010 - History of Globalization: Themes and Continuities [3]",
        "HIST 4920 - Power, Knowledge, Community and the University (also listed as LAS 4750, SOC 4750) [3]",
        "HIST 4030 - Piracy in World History [3]",
        "HIST 4950 - Internship in Applied History [1-3]",
        "HIST 4960 - Issues in Teaching History-Social Science [3]",
        "HIST 4970 - Editing and Publishing Perspectives [3]",
        "HIST 4990 - Undergraduate Directed Study [1-3]",
        "ECON 1500 - Economics for the Citizen [3]",
        "ECON 3600 - Developing Countries and the New Global Economy [3]",
        "ECON 4260 - International Political Economy (also listed as POLS 4260) [3]",
        "GEOG 3700 - World Regional Geography [3]",
        "GEOG 1550 - Society and Nature: Human Geography [3]",
        "PHIL 2000 - Introduction to Comparative Religions (also listed as RELS 2000) [3]",
        "GEOG 4310 - California [3]",
        "GEOG 4510 - Historical Geography of North America [3]",
        "POLS 1000 - Power, Politics and Engagement in US Government [3]",
        "POLS 3730 - Foundations of Comparative Politics [3]",
        "HIST 2080 - California [3]"
      ]
    }
  ],
  "curriculumLink": "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34373"
},

  // --- J ---
 {
  major: "Japanese",

  description: "Requirements for the Major (36 units). Includes core Japanese language proficiency, advanced communication skills, cultural and literary studies, linguistics, and directed electives covering Japanese media, history, literature, and society.",

  sections: [
    {
      title: "Requirements for the Core Courses (21 units)",
      courses: []
    },

    {
      title: "Lower Division Core Course (3 units)",
      courses: [
        "ML 1010 - Introduction to Higher Education for MLL Majors [3]"
      ]
    },

    {
      title: "Upper Division Core Courses (18 units)",
      courses: [
        "JAPN 3001 - Advanced Japanese [3]",
        "JAPN 3500 - Advanced Oral Communication [3]",
        "JAPN 3600 - Advanced Reading and Composition [3]",
        "JAPN 3800 - Business Japanese [3]",
        "JAPN 4030 - Contrastive Analysis of Japanese and English Languages [3]",
        "ML 4000 - Senior Thesis in Modern Languages and Literatures [3]"
      ]
    },

    {
      title: "Directed Electives (15 units)",
      courses: [
        "Select 6 units from Lower Division Electives and 9 units from Upper Division Electives"
      ]
    },

    {
      title: "Lower Division Electives (6 units)",
      courses: [
        "JAPN 2500 - Japanese Culture through Anime and Manga [3]",
        "JAPN 2600 - Japanese Culture through Films [3]",
        "JAPN 2700 - Japanese Culture through Games and Music [3]"
      ]
    },

    {
      title: "Upper Division Electives (9 units)",
      courses: [
        "JAPN 3070 - Japanese Literature in Translation [3]",
        "JAPN 3100 - Pre-Modern Japanese Civilization [3]",
        "JAPN 3110 - Modern Japanese Civilization [3]",
        "JAPN 3150 - Japanese Language, Culture, and Society [3]",
        "JAPN 3200 - Introduction to Japanese Linguistics [3]",
        "JAPN 4054 - Special Topics in Japanese [3]",
        "JAPN 4080 - Classical Japanese Literature [3]",
        "JAPN 4100 - Modern Japanese Literature [3]",
        "JAPN 4500 - Proseminar: Japanese Linguistics [3]",
        "JAPN 4600 - Proseminar: Masters of Japanese Culture and Thought [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34384"
},
  {
  major: "Journalism",

  description: "Requirements for the Major (42 units). Includes media literacy, news writing, reporting, production skills, ethical and cultural awareness in journalism, advanced reporting and investigative work, and a capstone experience. Students should plan their programs with careful attention to prerequisites for upper division courses.",

  sections: [
    {
      title: "Core Requirements (36 units)",
      courses: []
    },

    {
      title: "Lower Division Core Courses (12 units)",
      courses: [
        "JOUR 1000 - Media Literacy [3]",
        "JOUR 2920 - Introduction to News Writing and Reporting [3]",
        "JOUR 2950 - Journalism Production [3]",
        "JOUR 2490 - Announcing [3]"
      ]
    },

    {
      title: "Upper Division Core Courses (24 units)",
      courses: [
        "JOUR 3400 - Interviewing for News Media [3]",
        "JOUR 3500 - Race, Class and Gender in American Journalism [3]",
        "JOUR 4740 - Television News Field Production [3]",
        "JOUR 3910 - University Times Community News [3-6]",
        "JOUR 4750 - Television News Studio Production [3]",
        "JOUR 4820 - Digital Journalism [3]",
        "JOUR 4920 - Advanced News Writing, Reporting & Investigating [3]",
        "JOUR 4970 - Journalism Capstone [3]"
      ]
    },

    {
      title: "Electives (6 units)",
      courses: [
        "Select two of the following courses (3 units of JOUR 3910 may be applied toward elective credit only after Upper Division requirement is satisfied)",
        "JOUR 3910 - University Times Community News [3-6]",
        "TVF 4000 - Community Impact Media [4-8]",
        "TVF 4540 - Selected Studies in Television and Film [1-3]",
        "JOUR 4950 - Sports Broadcasting [3]"
      ]
    }
  ],

  curriculumLink: ""
},

  // --- K ---
  {
  major: "Kinesiology",

  description: "Requirements for the Major (69-75 units). Includes foundational science and health courses, core kinesiology theory and applied movement science, and one of four specialized options: Exercise and Human Performance, Rehabilitation and Therapeutic Exercise, Subject Matter Preparation for Teaching, or Community Leadership of Physical Activity.",

  sections: [
    {
      title: "Requirements for the Core Courses (50 or 54 units)",
      courses: []
    },

    {
      title: "Lower Division Core Courses (25 or 29 units)",
      courses: [
        "KIN 2500 - Introduction to Kinesiology [2]",
        "KIN 2600 - Computer Applications in Kinesiology and Statistics [3]",
        "MATH 1081 - Precalculus: Functions [3]",
        "PHYS 1560 - Physics for the Twenty-First Century [3]",
        "PHYS 1570 - Physics for the Twenty-first Century Laboratory [1]",
        "PSY 1500 - Introductory Psychology [3]",
        "SOC 2010 - Introduction to Sociology [3]"
      ]
    },

    {
      title: "Group A (12 units)",
      courses: [
        "BIOL 2030 - Human Anatomy [4]",
        "BIOL 2040 - Human Physiology [4]",
        "CHEM 1010 - Fundamentals of Chemistry [4]"
      ]
    },

    {
      title: "Group B (8 units)",
      courses: [
        "KIN 2150 - Anatomical Kinesiology [5]",
        "KIN 2250 - Principles of Physical Fitness [3]"
      ]
    },

    {
      title: "Upper Division Core Courses (25 units)",
      courses: [
        "KIN 3100 - Written Communication for Kinesiology [3]",
        "KIN 3400 - Applied Biomechanics [4]",
        "KIN 3600 - Physiology of Exercise and Physical Activity [4]",
        "KIN 3650 - Motor Learning and Development [4]",
        "KIN 3750 - Socio-Historical Analyses of Human Movement [4]",
        "KIN 3820 - Principles of Sport and Exercise Psychology [3]",
        "KIN 4250 - Dimensions of Kinesiology for Individuals with Disabilities [3]"
      ]
    },

    {
      title: "Requirements for the Options (19-21 units)",
      courses: [
        "Select one of the following four options and complete required courses"
      ]
    },

    {
      title: "Option I: Exercise and Human Performance (21 units)",
      courses: [
        "KIN 4560 - Sport and Exercise Ergogenic Aids [3]",
        "KIN 4580 - Environmental Exercise Physiology [3]",
        "KIN 4600 - Principles of Physical Fitness Assessment [4]",
        "KIN 4610 - Advanced Exercise Physiology [3]",
        "KIN 4650 - Principles of Exercise Prescription [5]",
        "KIN 4960 - Capstone Seminar in Exercise and Human Performance [3]"
      ]
    },

    {
      title: "Option II: Rehabilitation and Therapeutic Exercise (19-20 units) - Group A (Select 3 courses)",
      courses: [
        "KIN 4100 - Neurophysiological Basis of Movement [3]",
        "KIN 4230 - Biopsychosocial Model: Case-Based Application [3]",
        "KIN 4370 - Disease and Plasticity in Neuromuscular Systems [3]",
        "KIN 4500 - Effects of Exercise on Aging [3]",
        "KIN 4600 - Principles of Physical Fitness Assessment [4]",
        "NTRS 4300 - Sports Nutrition [3]",
        "KIN 4540 - Special Topics in Physical Education [1-3]"
      ]
    },

    {
      title: "Option II: Rehabilitation and Therapeutic Exercise - Group B (Select 2 courses)",
      courses: [
        "KIN 4300 - Care and Prevention of Athletic Injuries [4]",
        "KIN 4360 - Principles of Mobility Training [4]",
        "KIN 4365 - Neurorehabilitation [4]",
        "KIN 4380 - Principles of Exercise for Older Adults [4]",
        "KIN 4400 - Advanced Movement Analysis in Sport, Performance and Injury [4]",
        "KIN 4350 - Motivational Interviewing for Exercise Psychology [4]"
      ]
    },

    {
      title: "Option II: Rehabilitation and Therapeutic Exercise - Group C (Select 1 course)",
      courses: [
        "KIN 4390 - Rehabilitation Exercise Machines [2]",
        "KIN 4420 - Practicum in Rehabilitation and Therapeutic Exercise [2]",
        "KIN 4425 - Group Exercise Interventions for Wheelchair Users [2]",
        "KIN 4430 - Practicum in Performance Medicine [2]",
        "KIN 4850 - Field Experience in Kinesiology [2]",
        "KIN 4450 - Practicum in Exercise Psychology [2]"
      ]
    },

    {
      title: "Option III: Subject Matter Preparation for Teaching Credential (21 units)",
      courses: [
        "KIN 3180 - Assessment of Student Learning in Physical Education [4]",
        "KIN 3190 - Instructional Strategies in Inclusive Physical Education [3]",
        "KIN 3200 - Professional Invasion and Net Activities for Inclusive PE [3]",
        "KIN 3210 - Professional Racquet and Target Activities for Inclusive PE [3]",
        "KIN 3220 - Professional Aesthetic, Cooperative and Adventure Activities for Inclusive PE [4]",
        "KIN 4015 - Elementary and Secondary Inclusive School Physical Education [4]"
      ]
    },

    {
      title: "Option IV: Community Leadership of Physical Activity (21 units)",
      courses: [
        "KIN 3190 - Instructional Strategies in Inclusive Physical Education [3]",
        "KIN 4010 - Creating Developmentally-Appropriate Games/Activities [3]",
        "KIN 4210 - Youth Development of Physical Activity [3]",
        "KIN 4220 - Community Service Learning and Physical Activity Programs [3]",
        "YAA 2900 - Introduction to Youth Agency Administration [3]",
        "YAA 4670 - Administration of Youth-Serving Nonprofit Organizations [3]",
        "YAA 4950 - Directed Field Experience [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34386"
},

  // --- L ---
  {
  major: "Latin American Studies",

  description: "Requirements for the Degree (30-32 units). Includes interdisciplinary core seminars, research methods training, thematic seminars across multiple disciplines focused on Latin America, elective coursework across humanities and social sciences, and a culminating experience completed via comprehensive exams, thesis, or project.",

  sections: [
    {
      title: "Core Courses (18-20 units)",
      courses: []
    },

    {
      title: "I. Latin American Studies Seminars (6 units)",
      courses: [
        "LAS 5080 - Seminar: Latin American Social Systems [3]",
        "LAS 5900 - Interdisciplinary Seminar: Latin American Studies [3]"
      ]
    },

    {
      title: "II. Research Methods (3-5 units)",
      courses: [
        "Select one course from the following (3–5 units):",
        "ANTH 4800 - Ethnographic Research Methods [5]",
        "ANTH 5800 - Ethnographic Field School [4]",
        "CLS 4300 - Community-Engaged Research in Chicanx and Latinx Communities [3]",
        "CLS 5030 - Seminar: Community-Engaged Research Methods [3]",
        "EDFN 5050 - Qualitative Research in Education [3]",
        "LAS 4971 - Interdisciplinary Research and Writing in Latin American Studies [3]",
        "SOC 5010 - Qualitative Research Methods in Sociology [3]",
        "WGSS 4000 - Knowledge, Power, and Research Justice in Women’s, Gender, and Sexuality Studies [3]"
      ]
    },

    {
      title: "III. Seminars on Latin America (9 units)",
      courses: [
        "Select 3 seminars from at least two different disciplines:",
        "ANTH 5940 - Seminar: Problems in Anthropology [3]",
        "ART 5540 - Special Topics in Art [1-3]",
        "CLS 5010 - Seminar: Theoretical Frameworks in Chicanx and Latinx Studies [3]",
        "CLS 5030 - Seminar: Community-Engaged Research Methods [3]",
        "CLS 5050 - Seminar: Interdisciplinary Approaches to Chicanx & Latinx Studies [3]",
        "CLS 5100 - Teaching Seminar: Race, Gender, & Queer Pedagogies [3]",
        "CLS 5110 - Seminar: Praxis in Chicana/o/x & Latina/o/x Communities [3]",
        "ECON 5600 - Seminar: Current Issues in Economic Development [3]",
        "ECON 5610 - Seminar: International Economics [3]",
        "HIST 5600 - History of Colonial Latin America [3]",
        "HIST 5610 - History of Modern Latin America [3]",
        "HIST 5650 - Seminar: History of Mexico [3]",
        "LAS 5080 - Seminar: Latin American Social Systems [3] (repeatable up to 9 units if topic differs)",
        "LAS 5900 - Interdisciplinary Seminar: Latin American Studies [3] (repeatable up to 9 units if topic differs)",
        "MUS 5570 - Seminar: Afro-Latin Music [3]",
        "MUS 5580 - Histories and Literature of Afro-Latin Music [3]",
        "POLS 5310 - Seminar: Latin American Government [3]",
        "SPAN 5830 - Seminar: Contemporary Hispanic Prose [3]",
        "SPAN 5450 - Seminar: Contemporary Spanish-American Poetry After Ruben Dario [3]"
      ]
    },

    {
      title: "Electives (9 units)",
      courses: [
        "Select 9 units of electives (3 units must be LAS coursework):",
        "AAAS 4080 - Comparative Diaspora Studies [3]",
        "AAAS 4491 - Anthropology of Race and Racism [3]",
        "AAAS 4850 - Anti-Colonial Movements [3]",
        "ANTH 4040 - Peoples of South America [3]",
        "ANTH 4080 - Peoples of Mesoamerica [3]",
        "ANTH 4280 - Civilizations of Western Mesoamerica [3]",
        "ANTH 4290 - Maya Civilization [3]",
        "ART 4460 - Art of Latin America [3]",
        "ART 4470 - The Art of Mesoamerica and the Southwest [3]",
        "ART 4500 - The Colonial Art of Mexico and Guatemala [3]",
        "ART 4530 - Aztec Art and Culture [3]",
        "ART 4560 - Art of the Ancient Andes [3]",
        "ART 4570 - Mexican Muralists and Frida Kahlo [3]",
        "CLS 4000 - Indigenous Peoples of Mexico & Central America [3]",
        "CLS 4010 - Chicana/o Latina/o Culture and Media [3]",
        "CLS 4020 - Literatures of Resistance [3]",
        "CLS 4030 - Chicanx/Latinx Public Spaces [3]",
        "CLS 4080 - Central American Experience in the US [3]",
        "CLS 4100 - Latina/o/x Communities in U.S. Society [3]",
        "CLS 4110 - Immigration, History and Politics [3]",
        "CLS 4170 - Inequality and Educational Policy [3]",
        "CLS 4180 - Public Health Issues in Latina/o Communities [3]",
        "CLS 4200 - Chicanx Latinx History in California [3]",
        "CLS 4240 - Afro-Latino/a Identities [3]",
        "CLS 4250 - Chicanas & Latinas Social Movements [3]",
        "CLS 4260 - The Chicana/o Movement [3]",
        "CLS 4270 - Modern Mexico and the Chicano People [3]",
        "CLS 4280 - Migration, Identity, and Religion [3]",
        "CLS 4290 - Chicana Feminisms [3]",
        "CLS 4300 - Community-Engaged Research in Chicanx and Latinx Communities [3]",
        "CLS 4320 - Abolitionist Critique of Drug War [3]",
        "CLS 4400 - Joteria Expressions in Las Americas [3]",
        "CLS 4450 - Indigenous Experiences in Mexico and Latin America [3]",
        "CLS 4660 - Colonial Mexico [3]",
        "CLS 4665 - Modern Mexico [3]",
        "ECON 4600 - Economics of Developing Countries [3]",
        "ECON 4650 - Current Issues in Latin American Economies [3]",
        "EDFN 5050 - Qualitative Research in Education [3]",
        "ENGL 4692 - U.S. Latino/a Literature [3]",
        "ENGL 4780 - Latin American Literature in Translation [3]",
        "HIST 4610 - Early Latin America [3]",
        "HIST 4620 - Modern Latin America [3]",
        "HIST 4630 - Recent Latin American History [3]",
        "HIST 4640 - Central America and Caribbean History [3]",
        "HIST 4650 - Brazil [3]",
        "HIST 4670 - Modern Mexico and the Chicano People [3]",
        "HIST 4690 - Indigenous Peoples of the Americas [3]",
        "HIST 4800 - Ethnicity and Immigration in American History [3]",
        "LAS 4250 - Latin American Responses to Imperialism and Globalization [3]",
        "LAS 4280 - Migration, Identity, and Religion [3]",
        "LAS 4300 - Cuba and the World [3]",
        "LAS 4350 - Philosophy and Praxis of Liberation in Latin America [3]",
        "LAS 4400 - Indigenous Movements in Latin America [3]",
        "LAS 4450 - Indigenous Experiences in Latin America [3]",
        "LAS 4600 - Food Justice in Latin America [3]",
        "LAS 4650 - Gender, Sexuality, and Transnational Migration [3]",
        "LAS 4700 - Labor and Social Movements in the Americas [3]",
        "LAS 4750 - Power, Knowledge, Community and the University [3]",
        "LAS 4800 - Afro-Latin America [3]",
        "LAS 4820 - Latin American Women’s Movements [3]",
        "LAS 4850 - Anti-colonial Movements [3]",
        "LAS 4990 - Undergraduate Directed Study [1-3]",
        "ML 4100 - Chicana and Mexican Women Writers [3]",
        "MUS 4580 - Music of Latin America [3]",
        "MUS 5570 - Seminar: Afro-Latin Music [3]",
        "MUS 5580 - Histories and Literature of Afro-Latin Music [3]",
        "PAS 4120 - Third World Women and Development [3]",
        "PAS 4160 - Pan Africanism and World Politics [3]",
        "PAS 4560 - Politics of the Caribbean and Central America [3]",
        "PHIL 4330 - Latin American Philosophy [3]",
        "POLS 4510 - Latin American Politics [3]",
        "POLS 5310 - Seminar: Latin American Government [3]",
        "SOC 4230 - Sociology of Globalization and Resistance [3]",
        "SOC 4830 - Sociology of Human Rights [3]",
        "SPAN 4110 - Spanish-American Literature I [3]",
        "SPAN 4130 - Spanish-American Literature II [3]",
        "SPAN 4170 - Spanish-American Short Story [3]",
        "SPAN 4210 - Mexican Literature [3]",
        "SPAN 4310 - Spanish-American Testimony [3]",
        "SPAN 4441 - Masterworks of Spanish American Literature [3]",
        "SPAN 4750 - Spanish American Theater [3]",
        "SPAN 4830 - Intellectuals and Ideas in Latin America [3]",
        "SPAN 4850 - Southern Cone Fiction [3]",
        "SPAN 5450 - Seminar: Contemporary Spanish-American Poetry [3]",
        "SPAN 5830 - Seminar: Contemporary Hispanic Prose [3]",
        "WGSS 4840 - Chicana/Latina Narratives and Community History [3]"
      ]
    },

    {
      title: "Culminating Experience (3 units)",
      courses: [
        "Select one set (A, B, or C):",
        "Set A: LAS 5910 - Capstone Preparation for Comprehensive Exams [1] + LAS 5960 - Comprehensive Examination [0] (total 3 units)",
        "Set B: LAS 5990 - Thesis [1-6] (complete 3 units)",
        "Set C: LAS 5995 - Project [1-3] (complete 3 units)"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34389&returnto=10632"
},
  {
  major: "Liberal Studies",

  description: "Requirements for the Major (48–85 units). Includes interdisciplinary core coursework in writing, research, theory, race/class/gender analysis, and senior project work, plus breadth courses across multiple disciplines. Students choose one of several depth-area options including American Studies, Cultural Studies, Race and Ethnicity Studies, Science/Technology/Medicine Studies, or Women’s Gender and Sexuality Studies, followed by additional option-based coursework and a culminating experience or teacher preparation pathway.",

  sections: [
    {
      title: "Core Requirements (27 units)",
      courses: []
    },

    {
      title: "I. Liberal Studies Core Courses (18 units)",
      courses: [
        "LBS 3010 - Interdisciplinary Investigation [3]",
        "LBS 3020 - Writing the Interdisciplinary Essay [3]",
        "LBS 3600 - Interdisciplinary Approaches to Culture and Society [3]",
        "LBS 4050 - Race, Class, and Gender in the Classroom [3]",
        "LBS 4890 - Senior Project [3]",
        "LBS 4900 - Proseminar in Liberal Studies [3]"
      ]
    },

    {
      title: "II. Liberal Studies Breadth Courses (9 units)",
      courses: [
        "Select one course from each group (A, B, C):"
      ]
    },

    {
      title: "A. Interdisciplinary Foundations (3 units)",
      courses: [
        "LBS 2340 - Multicultural Arts - L.A. [3]",
        "LBS 2400 - Introduction to Environmental Humanities [3]",
        "LBS 2500 - Social Change and Social Movements in the U.S. [3]",
        "LBS 2665 - Multicultural Science Fiction (also listed as ENGL 2665) [3]",
        "WGSS 2030 - Intersectionality and U.S. Women of Color [3]"
      ]
    },

    {
      title: "B. Intermediate Interdisciplinary Studies (3 units)",
      courses: [
        "LBS 3200 - Disability Studies (also listed as WGSS 3200) [3]",
        "LBS 3665 - Gender and Sexuality in Science Fiction (also listed as WGSS 3665) [3]",
        "LBS 3860 - Gender in Science (also listed as WGSS 3860) [3]",
        "WGSS 4050 - Queer Theory [3]"
      ]
    },

    {
      title: "C. Advanced Interdisciplinary Studies (3 units)",
      courses: [
        "LBS 4060 - Service Learning in Educational Settings [3]",
        "LBS 4100 - National Identity, Race, and Popular Culture [3]",
        "LBS 4200 - Cultures of Science (also listed as NATS 4200) [3]",
        "LBS 4340 - Public Culture [3]",
        "LBS 4540 - Selected Topics in Liberal Studies [1-3]",
        "LBS 4600 - Cultural Studies: Theories and Methods [3]",
        "LBS 4610 - Public Humanities and Community Learning [3]",
        "LBS 4665 - Science Fiction Across Media (also listed as TVF 4665) [3]"
      ]
    },

    {
      title: "Option Requirements (21–58 units)",
      courses: [
        "Select one of the three options below:"
      ]
    },

    {
      title: "Option I: Interdisciplinary Studies in Culture and Society (21 units)",
      courses: [
        "Depth Area 1: American Studies",
        "A. Interdisciplinary Approaches (3 units): Select one course",
        "LBS 4100 - National Identity, Race, and Popular Culture [3]",
        "LBS 4340 - Public Culture [3]",
        "LBS 4610 - Public Humanities and Community Learning [3]",
        "LBS 4665 - Science Fiction Across Media (also listed as TVF 4665) [3]",
        "B. Social Science Perspectives (3 units): Select one course (advisor approval required)",
        "C. Arts and Humanities Perspectives (3 units): Select one course (advisor approval required)",
        "D. Electives (0–12 units): Advisor-approved American Studies electives"
      ]
    },

    {
      title: "Depth Area 2: Cultural Studies",
      courses: [
        "A. Required Course (3 units)",
        "LBS 4600 - Cultural Studies: Theories and Methods [3]",
        "B. Electives (6–18 units): Advisor-approved cultural studies courses across multiple departments"
      ]
    },

    {
      title: "Depth Area 3: Race and Ethnicity Studies",
      courses: [
        "A. Required Course (3 units)",
        "LBS 4100 - National Identity, Race, and Popular Culture [3]",
        "B. Electives (6–18 units): Advisor-approved courses in race and ethnicity studies"
      ]
    },

    {
      title: "Depth Area 4: Science, Technology, and Medicine Studies",
      courses: [
        "A. Required Course (3 units): Select one",
        "LBS 3860 - Gender in Science (also listed as WGSS 3860) [3]",
        "LBS 4200 - Cultures of Science (also listed as NATS 4200) [3]",
        "B. Electives (6–18 units): Advisor-approved STEM-related humanities and social science courses"
      ]
    },

    {
      title: "Depth Area 5: Women’s Gender and Sexuality Studies",
      courses: [
        "WGSS 2000 - Introduction to Women’s, Gender, and Sexuality Studies [3]",
        "WGSS 3000 - Theories in Women’s, Gender, and Sexuality Studies [3]",
        "WGSS 4000 - Knowledge, Power, and Research Justice in Women’s, Gender, and Sexuality Studies [3]",
        "Electives (0–12 units): Advisor-approved WGSS-related coursework"
      ]
    },

    {
      title: "Option II: Elementary Subject Matter Teacher Preparation (Traditional Option)",
      courses: [
        "Depth Areas 6–10 (9 units total)",
        "Directed Electives (12 units)",
        "Credential coursework (Multiple Subject or Special Education pathway)"
      ]
    },

    {
      title: "Depth Area 6: Creativity and Performance",
      courses: [
        "LBS 4340 - Public Culture [3]",
        "ART 4000 - Teaching Methods for Elementary Education: Art [3]",
        "DANC 4000 - Creative Dance in the Elementary Classroom [2]",
        "MUS 4000 - Elementary Classroom Music [2]",
        "TA 4000 - Creative Drama for the Elementary Classroom [3]"
      ]
    },

    {
      title: "Depth Area 7: Language Arts",
      courses: [
        "LBS 4600 - Cultural Studies: Theories and Methods [3]",
        "LBS 4665 - Science Fiction Across Media (also listed as TVF 4665) [3]",
        "EDCI 4010 - English Language Development [3]",
        "ENGL 4101 - Introduction to English Linguistics [3]",
        "ENGL 4880 - Children’s Literature [3]"
      ]
    },

    {
      title: "Depth Area 8: Mathematics and Quantitative Reasoning",
      courses: [
        "LBS 3860 - Gender in Science (also listed as WGSS 3860) [3]",
        "MATH 1100 - Foundations of the Real Number System for Elementary and Middle School Teachers [3]",
        "MATH 2250 - Explorations in Geometry for Elementary and Middle School Teachers [3]"
      ]
    },

    {
      title: "Depth Area 9: Natural Science",
      courses: [
        "LBS 4200 - Cultures of Science (also listed as NATS 4200) [3]",
        "NATS 1010 - Physical Science [3]",
        "NATS 1020 - Earth and Space Science [3]",
        "NATS 4000 - Crosscutting Concepts in Natural Science [3]",
        "NATS 4100 - The Nature of Science [3]"
      ]
    },

    {
      title: "Depth Area 10: Social Science",
      courses: [
        "COMM 3840 - Globalization, Culture and Communication (also listed as LBS 3840) [3]",
        "LBS 4100 - National Identity, Race, and Popular Culture [3]",
        "HIST 1010 - World History to 1500 CE [3]",
        "HIST 1020 - World History Since 1500 CE [3]",
        "HIST 2080 - California [3]"
      ]
    },

    {
      title: "Directed Electives (Elementary Subject Matter Courses) (12 units)",
      courses: [
        "Courses vary based on CSET pathway and advisor approval across reading, math, science, social science, arts, and human development areas"
      ]
    },

    {
      title: "Option III: Elementary Subject Matter Teacher Preparation (Integrated Option)",
      courses: [
        "Depth Area (9 units)",
        "Directed Electives (12 units)",
        "Credential coursework (Elementary Education or Special Education pathway)"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34393&returnto=10632"
},

  // --- M ---
  {
  major: "Mathematics",

  description: "Requirements for the Major (76–90 units). Includes foundational coursework in calculus, linear algebra, discrete mathematics, differential equations, probability, and physics, followed by advanced analysis and algebra. Students select one of four options: Applied Mathematics, General Mathematics, Integrated Teaching, or Traditional Teaching, each with specialized upper-division coursework and electives.",

  sections: [
    {
      title: "Major Core Requirements (39 units)",
      courses: []
    },

    {
      title: "Lower Division Core Courses (32 units)",
      courses: [
        "BIOL 1100 - Cellular Basis of Life [5]",
        "MATH 2110 - Calculus I [4]",
        "MATH 2120 - Calculus II [4]",
        "MATH 2130 - Calculus III [3]",
        "MATH 2150 - Differential Equations [3]",
        "MATH 2450 - Foundations of Mathematics I: Discrete Mathematics [3]",
        "MATH 2550 - Introduction to Linear Algebra [3]",
        "MATH 2740 - Introduction to Data Science and Statistics [3]",
        "PHYS 2100 - General Physics I: Mechanics [4]"
      ]
    },

    {
      title: "Upper Division Core Courses (7 units)",
      courses: [
        "MATH 3450 - Foundations of Mathematics II: Math Reasoning [4]",
        "MATH 4650 - Analysis I [3]"
      ]
    },

    {
      title: "Option Requirements (37–51 units)",
      courses: [
        "Select one of the four options below"
      ]
    },

    {
      title: "I. Applied Mathematics Option (37–39 units)",
      courses: [
        "Required Courses (7 units)",
        "MATH 4570 - Linear Algebra [3]",
        "MATH 4900 - Senior Seminar in Mathematics [4]",

        "Group 1 (Select 3 courses / 9 units)",
        "MATH 4700 - Numerical Linear Algebra [3]",
        "MATH 4710 - Numerical Methods [3]",
        "MATH 4720 - Linear Optimization [3]",
        "MATH 4800 - Mathematical Modeling [3]",

        "Group 2 (Select 3 courses / 9 units)",
        "MATH 4010 - Ordinary Differential Equations [3]",
        "MATH 4030 - Partial Differential Equations [3]",
        "MATH 4100 - Vector Analysis [3]",
        "MATH 4740 - Theory of Probability [3]",
        "MATH 4750 - Mathematical Statistics [3]",

        "Group 3 (Select 1 course / 3–5 units)",
        "BINF 4000 - Bioinformatics (also CHEM 4860) [3]",
        "BIOL 1200 - Diversity of Life [5]",
        "CHEM 1100 - General Chemistry I [5]",
        "CS 2011 - Introduction to Programming I [4]",
        "ECON 2090 - Applied Business and Economic Statistics I [3]",
        "MATH 2170 - Computer Algebra Systems [3]",
        "PHYS 2200 - General Physics II: Electromagnetism and Circuits [4]",

        "Upper Division Electives (9 units)",
        "Select 9 units (min 6 units must be MATH)"
      ]
    },

    {
      title: "II. General Mathematics Option (37–39 units)",
      courses: [
        "Required Courses (10 units)",
        "MATH 4550 - Modern Algebra I [3]",
        "MATH 4570 - Linear Algebra [3]",
        "MATH 4900 - Senior Seminar in Mathematics [4]",

        "Group I (Select 1 course)",
        "MATH 4200 - Mathematical Logic [3]",
        "MATH 4300 - Modern Geometry [3]",
        "MATH 4460 - Theory of Numbers [3]",
        "MATH 4840 - Graph Theory [3]",

        "Group II (Select 1 course)",
        "MATH 4700 - Numerical Linear Algebra [3]",
        "MATH 4710 - Numerical Methods [3]",
        "MATH 4720 - Linear Optimization [3]",
        "MATH 4740 - Probability [3]",

        "Group III (Select 1 course)",
        "MATH 4560 - Modern Algebra II [3]",
        "MATH 4660 - Analysis II [3]",
        "MATH 4670 - Multivariate Analysis [3]",
        "MATH 4680 - Complex Analysis [3]",
        "MATH 4690 - Topology [3]",
        "MATH 4750 - Mathematical Statistics [3]",

        "Group IV (Select 1 course)",
        "BINF 4000 - Bioinformatics [3]",
        "BIOL 1200 - Diversity of Life [5]",
        "CHEM 1100 - General Chemistry I [5]",
        "CS 2011 - Introduction to Programming I [4]",
        "ECON 2090 - Applied Statistics I [3]",
        "MATH 2170 - Computer Algebra Systems [3]",
        "PHYS 2200 - General Physics II [4]",

        "Upper Division Electives (15 units)",
        "Select 15 units (min 12 units must be MATH)"
      ]
    },

    {
      title: "III. Integrated Teaching Option (51 units)",
      courses: [
        "Required Mathematics Courses (24 units)",
        "MATH 3950 - Field Experience I [3]",
        "MATH 3960 - Field Experience II [2]",
        "MATH 4300 - Modern Geometry [3]",
        "MATH 4460 - Theory of Numbers [3]",
        "MATH 4600 - Analytic Geometry [3]",
        "MATH 4740 - Probability [3]",
        "MATH 4901 - Capstone for Teachers [4]",
        "Plus one:",
        "MATH 4550 - Modern Algebra I [3] OR MATH 4570 - Linear Algebra [3]",

        "Professional Education (27 units)",
        "EDCI 4000 - Transformative Teaching [3]",
        "EDFN 4131 - Psychological Foundations of Education [3]",
        "EDFN 4400 - Educational Foundations [3]",
        "EDSE 4212M - Math Instruction Methods [3]",
        "EDSE 4301 - Academic Language Development for ELs [3]",
        "EDSE 4502 - Academic Language Development [3]",
        "EDSE 5000 - Classroom Instruction & Management [3]",
        "EDSE 5002 - Advanced Instruction Strategies [3]",
        "EDSP 4000 - Foundations of Special Education [3]"
      ]
    },

    {
      title: "IV. Traditional Teaching Option (39–40 units)",
      courses: [
        "Required Courses (27–28 units)",
        "MATH 3950 - Field Experience I [3]",
        "MATH 3960 - Field Experience II [2]",
        "MATH 4300 - Modern Geometry [3]",
        "MATH 4460 - Theory of Numbers [3]",
        "MATH 4600 - Analytic Geometry [3]",
        "MATH 4740 - Probability [3]",
        "MATH 4901 - Capstone for Teachers [4]",
        "Plus one:",
        "MATH 4550 - Modern Algebra I [3] OR MATH 4570 - Linear Algebra [3]",

        "Elective Option (Select 1 course)",
        "BINF 4000 - Bioinformatics [3]",
        "CS 2011 - Introduction to Programming I [4]",
        "MATH 2170 - Computer Algebra Systems [3]",

        "Upper Division Electives (12 units)",
        "Select 12 units (min 9 units must be MATH)"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34401"
},
  {
  major: "Mechanical Engineering",

  description: "Requirements for the Major (101 units). Includes foundational engineering, mathematics, physics, and chemistry coursework; core mechanical engineering theory and laboratory applications; professional ethics and design; and advanced electives in areas such as thermofluids, dynamics, materials, control systems, robotics, and biomechanics. A grade of C or better is required for courses marked with (*).",

  sections: [
    {
      title: "Requirements for the Core (92 units)",
      courses: []
    },

    {
      title: "Lower Division Required Courses (46 units)",
      courses: [
        "CHEM 1040 - General Chemistry for Engineers [4] *",
        "ME 1030 - Engineering Graphics and Computer-Aided Drafting (CAD) [1] *",
        "ME 2010 - Statics (also listed as CE 2010) [3] *",
        "ME 2030 - Introduction to Mechanical Design [3] *",
        "ME 2040 - Circuit Analysis for Mechanical Engineers [3] *",
        "ME 2050 - Strength of Materials I (also listed as CE 2050) [3] *",
        "ME 2070 - Materials Science and Engineering [3] *",
        "ME 2800 - Numerical Methods for Engineers I (also listed as CE 2800) [1] *",
        "MATH 2110 - Calculus I [4] *",
        "MATH 2120 - Calculus II [4] *",
        "MATH 2130 - Calculus III [3] *",
        "MATH 2190 - Differential Equations and Linear Algebra [3] *",
        "PHYS 2100 - General Physics I: Mechanics [4] *",
        "PHYS 2200 - General Physics II: Electromagnetism and Circuits [4] *",
        "ENGL 2030 - Introduction to Technical Writing [3]"
      ]
    },

    {
      title: "Upper Division Required Courses (46 units)",
      courses: [
        "ME 3000 - Economics for Engineers (also listed as CE 3000, EE 3000) [3] *",
        "ENGR 3010 - Ethics and Professionalism in Engineering [3] *",
        "ME 3030 - Fluid Mechanics I (also listed as CE 3030) [3] *",
        "ME 3040 - Statistical Analysis of Experimental Data for Engineers [3] *",
        "ME 3120 - Strength of Materials Laboratory I (also listed as CE 3120) [1]",
        "ME 3140 - Machine Design Laboratory [1]",
        "ME 3200 - Dynamics [3] *",
        "ME 3210 - Kinematics and Dynamics of Mechanisms [3] *",
        "ME 3230 - Machine Design I [3] *",
        "ME 3260 - Thermodynamics [3] *",
        "ME 3270 - Manufacturing Processes [3] *",
        "ME 3800 - Numerical Methods for Engineers II (also listed as CE 3800) [2] *",
        "ME 4061 - Heat Transfer I [3] *",
        "ME 4079 - Thermal-Fluids Laboratory [1]",
        "ME 4140 - Machine Design II [3]",
        "ME 4310 - Material Laboratory [1]",
        "ME 4960 - Engineer-in-Training (EIT) Certification Exam Preparation [1]",
        "ME 4971 - Mechanical Engineering Senior Project I [3] *",
        "ME 4972 - Mechanical Engineering Senior Project II [3] *"
      ]
    },

    {
      title: "Electives (9 units)",
      courses: [
        "Select at least 9 units in consultation with academic advisor:",
        "ME 4020 - Strength of Materials II [3]",
        "ME 4030 - Aerodynamics [3]",
        "ME 4040 - Propulsion Systems [3]",
        "ME 4062 - Heat Transfer II [3]",
        "ME 4070 - Heating, Ventilation, and Air Conditioning Systems [3]",
        "ME 4090 - Mechanical Engineering Analysis [3]",
        "ME 4110 - Vibrational Analysis [3]",
        "ME 4120 - Control of Mechanical Systems [3]",
        "ME 4180 - Energy Systems and Sustainability [3]",
        "ME 4210 - Dynamics of Mechanisms [3]",
        "ME 4220 - Optimization of Mechanical Engineering Systems [3]",
        "ME 4230 - Finite Element Analysis [3]",
        "ME 4260 - Advanced Thermodynamics and Fluid Mechanics [3]",
        "ME 4300 - Properties and Selection of Engineering Materials [3]",
        "ME 4500 - Biomechanics of Human Movement [3]",
        "ME 4510 - Mechanics of Biological Tissues [3]",
        "ME 4520 - Impact Biomechanics [3]",
        "ME 4540 - Special Topics in Mechanical Engineering [1-3]",
        "ME 4590 - Biomechanical Engineering Design [3]",
        "ME 4810 - Introduction to Robotics [3]",
        "ME 4990 - Undergraduate Directed Study [1-3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34403&returnto=10734"
},
  {
  major: "Music BA",

  description: "Requirements for the Major (61 units). Includes lower and upper division core coursework in music theory, musicianship, history, applied performance, and ensembles. Students must select one option: General Studies in Music or Music Technology.",

  sections: [
    {
      title: "Requirements for the Core Courses (35 units)",
      courses: []
    },
    {
      title: "Lower Division Required Core (21 units)",
      courses: [
        "MUS 1000 - Concert/Recital Attendance [0]",
        "MUS 1011 - Theory and Musicianship I [3]",
        "MUS 1012 - Theory and Musicianship II [3]",
        "MUS 1021 - Musicianship Lab I [1]",
        "MUS 1022 - Musicianship Lab II [1]",
        "MUS 1031 - Class Piano Instruction I [1]",
        "MUS 1032 - Class Piano Instruction II [1]",
        "MUS 1880 - Introduction to Music: Music Technology I [2]",
        "MUS 2701 - History of Western Classical Music (Medieval to Baroque) [3]",
        "MUS 2702 - History of Western Classical Music (Classical to Modern) [3]",
        "Select one of the following:",
        "MUS 1500 - Music in World Culture [3]",
        "MUS 1510 - Classical Music in Western Culture [3]",
        "MUS 1520 - The Roots of Rock and Pop Music in American Culture [3]",
        "MUS 1560 - Jazz in American Culture [3]",
        "MUS 1570 - Musical Expressions of the Latino Communities in the USA [3]"
      ]
    },
    {
      title: "Lower Division Applied Music (4 units)",
      courses: [
        "Select area of specialization:",
        "MUS 1151 - Strings [1]",
        "MUS 1161 - Woodwinds [1]",
        "MUS 1171 - Brass [1]",
        "MUS 1181 - Percussion [1]",
        "MUS 1351 - Voice [1]",
        "MUS 1451 - Piano [1]",
        "MUS 2151 - Strings [1]",
        "MUS 2161 - Woodwinds [1]",
        "MUS 2171 - Brass [1]",
        "MUS 2181 - Percussion [1]",
        "MUS 2300 - Group Instruction: Voice [2]",
        "MUS 2310 - Group Keyboard Instruction [1]",
        "MUS 2320 - Group Instrumental Instruction [1]",
        "MUS 2351 - Voice [1]",
        "MUS 2451 - Piano [1]"
      ]
    },
    {
      title: "Upper Division Required Core (6 units)",
      courses: [
        "MUS 3000 - Career Planning and Working in the Community [2]",
        "MUS 4020 - World Musics [2]",
        "MUS 4870 - Senior Project [1-3] (repeat for 2 units total)"
      ]
    },
    {
      title: "Upper Division Ensemble (4 units)",
      courses: [
        "With advisor approval:",
        "MUS 3209 - Symphonic Band [1]",
        "MUS 3269 - Concert Choir [1]",
        "MUS 4209 - Wind Ensemble [1]",
        "MUS 4239 - Exploration Ensemble [1]",
        "MUS 4249 - Jazz Ensemble [1]",
        "MUS 4259 - Chamber Singers [1]",
        "MUS 4279 - Afro-Latin Ensemble [1]",
        "MUS 4289 - New Music Ensemble [1]",
        "MUS 4309 - Mariachi Ensemble [1]",
        "MUS 4329 - Orchestra [1]",
        "MUS 4449 - Commercial Music Ensemble [1]",
        "MUS 4859 - Chamber Music [1]"
      ]
    },
    {
      title: "Requirements for the Options (26 units)",
      courses: [
        "Select one option"
      ]
    },
    {
      title: "Option I - General Studies in Music (26 units)",
      courses: [
        "Note: Must pass MUS 2033 or complete MUS 2032 before graduation",
        "MUS 2011 - Theory and Musicianship III [3]",
        "MUS 2012 - Theory and Musicianship IV [3]",
        "MUS 2021 - Musicianship Lab III [1]",
        "MUS 2022 - Musicianship Lab IV [1]",
        "MUS 2031 - Class Piano Instruction III [1]",
        "MUS 2032 - Class Piano Instruction IV [1]",
        "Select 16 units from the following:",
        "MUS 2630 - Introduction to Composition [2]",
        "MUS 3121 - String Methods [1]",
        "MUS 3122 - Woodwind Methods [1]",
        "MUS 3123 - Brass Methods [1]",
        "MUS 3124 - Percussion Methods [1]",
        "MUS 3125 - Guitar Methods [1]",
        "MUS 3301 - Vocal Pedagogy I [2]",
        "MUS 3500 - Women in Music [3]",
        "MUS 3520 - History of American Rock and Pop Music [3]",
        "MUS 3600 - Music Technology Sandbox [3]",
        "MUS 3620 - Orchestration and Arranging [2]",
        "MUS 3660 - Commercial Harmony [3]",
        "MUS 3671 - Jazz, Rock, and Pop Piano I [1]",
        "MUS 3672 - Jazz, Rock, and Pop Piano II [1]",
        "MUS 3681 - Jazz Improvisation I [2]",
        "MUS 3682 - Jazz Improvisation II [2]",
        "MUS 3800 - Beginning Conducting [2]",
        "MUS 2860 - Introduction to Recording [2]",
        "MUS 3900 - Performance Techniques for the Recording Studio and the Stage [2]",
        "MUS 4010 - Elementary General Music Techniques [2]",
        "MUS 4071 - Instrumental Techniques [2]",
        "MUS 4080 - Choral Techniques [2]",
        "MUS 4520 - History of Jazz [3]",
        "MUS 4600 - Composition [3]",
        "MUS 4602 - World Music Applications [1]",
        "MUS 4650 - Contemporary Techniques [3]",
        "MUS 4661 - Jazz Arranging: Beginning [2]",
        "MUS 4662 - Jazz Arranging: Advanced [2]",
        "MUS 4670 - Music Composition for Media [2]",
        "MUS 4680 - Jazz Pedagogy [2]",
        "MUS 4800 - Choral Conducting [2]",
        "MUS 4810 - Instrumental Conducting [2]",
        "MUS 4840 - Commercial Songwriting [2]",
        "MUS 4860 - Recording Techniques [2]",
        "MUS 4880 - Music Technology II [2]",
        "MUS 4881 - Music Technology III [2]"
      ]
    },
    {
      title: "Option II - Music Technology (26 units)",
      courses: [
        "MUS 3520 - History of American Rock and Pop Music [3]",
        "MUS 3600 - Music Technology Sandbox [3]",
        "MUS 3660 - Commercial Harmony [3]",
        "MUS 2860 - Introduction to Recording [2]",
        "MUS 4860 - Recording Techniques [2]",
        "MUS 4880 - Music Technology II [2]",
        "MUS 4881 - Music Technology III [2]",
        "Select 7 units from the following:",
        "MUS 2011 - Theory and Musicianship III [3]",
        "MUS 2012 - Theory and Musicianship IV [3]",
        "MUS 2021 - Musicianship Lab III [1]",
        "MUS 2022 - Musicianship Lab IV [1]",
        "MUS 2031 - Class Piano Instruction III [1]",
        "MUS 2032 - Class Piano Instruction IV [1]",
        "MUS 2630 - Introduction to Composition [2]",
        "MUS 3620 - Orchestration and Arranging [2]",
        "MUS 3671 - Jazz, Rock, and Pop Piano I [1]",
        "MUS 3672 - Jazz, Rock, and Pop Piano II [1]",
        "MUS 3681 - Jazz Improvisation I [2]",
        "MUS 3682 - Jazz Improvisation II [2]",
        "MUS 3900 - Performance Techniques for the Recording Studio and the Stage [2]",
        "MUS 4520 - History of Jazz [3]",
        "MUS 4600 - Composition [3]",
        "MUS 4602 - World Music Applications [1]",
        "MUS 4650 - Contemporary Techniques [3]",
        "MUS 4661 - Jazz Arranging: Beginning [2]",
        "MUS 4662 - Jazz Arranging: Advanced [2]",
        "MUS 4670 - Music Composition for Media [2]",
        "MUS 4840 - Commercial Songwriting [2]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34415"
},

{
  major: "Music BM",

  description: "Requirements for the Major (80–87 units). Includes comprehensive training in music theory, musicianship, history, applied performance, ensembles, and professional preparation. Students select one option: Composition, Jazz Studies, Performance, Music Education, or Commercial Music.",

  sections: [
    {
      title: "Core Requirements (44–45 units)",
      courses: []
    },

    {
      title: "Lower Division Core Courses (11 units)",
      courses: [
        "MUS 1880 - Introduction to Music: Music Technology I [2]",
        "MUS 2701 - History of Western Classical Music (Medieval to Baroque) [3]",
        "MUS 2702 - History of Western Classical Music (Classical to Modern) [3]",
        "Select one:",
        "MUS 1500 - Music in World Culture [3]",
        "MUS 1510 - Classical Music in Western Culture [3]",
        "MUS 1520 - The Roots of Rock and Pop Music in American Culture [3]",
        "MUS 1560 - Jazz in American Culture [3]",
        "MUS 1570 - Musical Expressions of the Latino Communities in the USA [3]"
      ]
    },

    {
      title: "Upper Division Core Courses (6 units)",
      courses: [
        "MUS 3000 - Career Planning and Working in the Community [2]",
        "MUS 3800 - Beginning Conducting [2]",
        "MUS 4020 - World Musics [2]"
      ]
    },

    {
      title: "Musicianship Courses (19 units)",
      courses: [
        "MUS 1000 - Concert/Recital Attendance [0]",
        "MUS 1011 - Theory and Musicianship I [3]",
        "MUS 1012 - Theory and Musicianship II [3]",
        "MUS 1021 - Musicianship Lab I [1]",
        "MUS 1022 - Musicianship Lab II [1]",
        "MUS 1031 - Class Piano Instruction I [1]",
        "MUS 1032 - Class Piano Instruction II [1]",
        "MUS 2011 - Theory and Musicianship III [3]",
        "MUS 2012 - Theory and Musicianship IV [3]",
        "MUS 2021 - Musicianship Lab III [1]",
        "MUS 2022 - Musicianship Lab IV [1]",
        "MUS 2031 - Class Piano Instruction III [1]"
      ]
    },

    {
      title: "Piano Proficiency Requirement (0–1 units)",
      courses: [
        "Complete one:",
        "MUS 2032 - Class Piano Instruction IV [1]",
        "MUS 2033 - Piano Proficiency Examination [0]"
      ]
    },

    {
      title: "Lower Division Applied Music Courses (4 units)",
      courses: [
        "Complete 4 units in one auditioned category:",
        "MUS 1151 - Strings [1]",
        "MUS 1152 - Strings [2]",
        "MUS 2151 - Strings [1]",
        "MUS 1161 - Woodwinds [1]",
        "MUS 1162 - Woodwinds [2]",
        "MUS 2161 - Woodwinds [1]",
        "MUS 1171 - Brass [1]",
        "MUS 1172 - Brass [2]",
        "MUS 2171 - Brass [1]",
        "MUS 1181 - Percussion [1]",
        "MUS 1182 - Percussion [2]",
        "MUS 2181 - Percussion [1]",
        "MUS 1191 - Applied Music: Commercial Music [1]",
        "MUS 1192 - Applied Music: Commercial Music [2]",
        "MUS 2191 - Applied Music: Commercial Music [1]",
        "MUS 1351 - Voice [1]",
        "MUS 1352 - Voice [2]",
        "MUS 2351 - Voice [1]",
        "MUS 1451 - Piano [1]",
        "MUS 1452 - Piano [2]",
        "MUS 2451 - Piano [1]"
      ]
    },

    {
      title: "Ensemble Performance Courses (4 units)",
      courses: [
        "Placement based on instrument and option:",
        "MUS 3209 - Symphonic Band [1]",
        "MUS 3269 - Concert Choir [1]",
        "MUS 4209 - Wind Ensemble [1]",
        "MUS 4219 - Woodwind Ensemble [1]",
        "MUS 4249 - Jazz Ensemble [1]",
        "MUS 4259 - Chamber Singers [1]",
        "MUS 4269 - Opera Ensemble [1]",
        "MUS 4279 - Afro-Latin Ensemble [1]",
        "MUS 4289 - New Music Ensemble [1]",
        "MUS 4299 - Jazz Ensemble: Small [1]",
        "MUS 4329 - Orchestra [1]",
        "MUS 4449 - Commercial Music Ensemble [1]",
        "MUS 4859 - Chamber Music [1]"
      ]
    },

    {
      title: "Options Requirements (36–42 units)",
      courses: [
        "Select one option"
      ]
    },

    {
      title: "Option I - Composition",
      courses: [
        "MUS 2630 - Introduction to Composition [2]",
        "MUS 3600 - Music Technology Sandbox [3]",
        "MUS 3620 - Orchestration and Arranging [2]",
        "MUS 4600 - Composition [3]",
        "MUS 4601 - Applied Composition [2]",
        "MUS 4602 - World Music Applications [1]",
        "MUS 4630 - Counterpoint [3]",
        "MUS 4640 - Musical Form [3]",
        "MUS 4650 - Contemporary Techniques [3]",
        "MUS 4780 - 20th and 21st Century Music [3]",
        "Select electives (10 units)",
        "MUS 4400 - BM Senior Recital [0]"
      ]
    },

    {
      title: "Option II - Jazz Studies",
      courses: [
        "MUS 3660 - Commercial Harmony [3]",
        "MUS 3681 - Jazz Improvisation I [2]",
        "MUS 3682 - Jazz Improvisation II [2]",
        "MUS 4520 - History of Jazz [3]",
        "MUS 4661 - Jazz Arranging: Beginning [2]",
        "MUS 4662 - Jazz Arranging: Advanced [2]",
        "MUS 4680 - Jazz Pedagogy [2]",
        "Applied Music (12 units)",
        "Ensemble Courses (8 units)",
        "MUS 3400 - BM Junior Recital [0]",
        "MUS 4400 - BM Senior Recital [0]"
      ]
    },

    {
      title: "Option III - Performance",
      courses: [
        "Applied Music (12 units)",
        "Ensemble Courses (8 units)",
        "Pedagogy Courses (2 units)",
        "Directed Electives (18 units)",
        "MUS 3400 - BM Junior Recital [0]",
        "MUS 4400 - BM Senior Recital [0]"
      ]
    },

    {
      title: "Option IV - Music Education (Pre-Credential)",
      courses: [
        "MUS 3301 - Vocal Pedagogy I [2]",
        "MUS 3620 - Orchestration and Arranging [2]",
        "MUS 4010 - Elementary General Music Techniques [2]",
        "MUS 4071 - Instrumental Techniques [2]",
        "MUS 4080 - Choral Techniques [2]",
        "MUS 4800 - Choral Conducting [2]",
        "MUS 4810 - Instrumental Conducting [2]",
        "Instrument Pedagogy (4 units)",
        "Applied Music (12 units)",
        "Ensemble Courses (8 units)",
        "Directed Electives (4 units)"
      ]
    },

    {
      title: "Option V - Commercial Music",
      courses: [
        "MUS 2860 - Introduction to Recording [2]",
        "MUS 3520 - History of American Rock and Pop Music [3]",
        "MUS 3660 - Commercial Harmony [3]",
        "MUS 4450 - Introduction to the Business of Music [2]",
        "MUS 4660 - Commercial Harmony II [3]",
        "MUS 4860 - Recording Techniques [2]",
        "MUS 4886 - Studio Practicum [2]",
        "Directed Electives (5 units)",
        "Applied Music (12 units)",
        "Ensemble Courses (8 units)",
        "MUS 3400 - BM Junior Recital [0]",
        "MUS 4400 - BM Senior Recital [0]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34416"
},

  // --- N ---
  {
  major: "Natural Science",

  description: "Requirements for the Major (77–83 units). Includes interdisciplinary foundational coursework in biology, chemistry, physics, mathematics, and earth sciences, followed by advanced study in one selected option: Biology, Chemistry, Geoscience, or Physics.",

  sections: [
    {
      title: "Core Requirement (48–54 units)",
      courses: []
    },

    {
      title: "Lower Division Core Courses (42–48 units)",
      courses: [
        "BIOL 1100 - Cellular Basis of Life [5]",
        "BIOL 1200 - Diversity of Life [5]",
        "MATH 2110 - Calculus I [4]",
        "MATH 2120 - Calculus II [4]",
        "GEOL 1500 - The Planet Earth [3]",
        "GEOL 1505 - The Planet Earth Lab [1]",
        "Complete any three sets from the following:"
      ]
    },

    {
      title: "Set 1",
      courses: [
        "GEOL 1550 - Oceanography [3]",
        "GEOL 1555 - Oceanography Lab [1]"
      ]
    },

    {
      title: "Set 2",
      courses: [
        "CHEM 1100 - General Chemistry I [5]",
        "CHEM 1110 - General Chemistry II [5]"
      ]
    },

    {
      title: "Set 3",
      courses: [
        "GEOG 2680 - Introduction to Geospatial Sciences [4]",
        "GEOL 2520 - Historical Geology [4]"
      ]
    },

    {
      title: "Set 4",
      courses: [
        "Option A:",
        "PHYS 1100 - Physics for the Life Sciences I [4]",
        "PHYS 1200 - Physics for the Life Sciences II [4]",
        "Option B:",
        "PHYS 2100 - General Physics I: Mechanics [4]",
        "PHYS 2200 - General Physics II: Electromagnetism and Circuits [4]"
      ]
    },

    {
      title: "Upper Division Elective Core Course (3 units)",
      courses: [
        "Select one:",
        "NATS 4000 - Crosscutting Concepts in Natural Science [3]",
        "NATS 4100 - The Nature of Science [3]",
        "NATS 4200 - Cultures of Science (also listed as LBS 4200) [3]",
        "NATS 4540 - Current Topics in Natural Science [3]"
      ]
    },

    {
      title: "Capstone Course (3 units)",
      courses: [
        "NATS 4950 - Natural Science Field Studies [3]"
      ]
    },

    {
      title: "Option Requirements (29 units)",
      courses: [
        "Select one option"
      ]
    },

    {
      title: "I. Biology Option",
      courses: [
        "BIOL 3000 - Biostatistics [4]",
        "BIOL 3200 - Professional Writing in the Life Sciences [3]",
        "BIOL 3400 - Principles of Genetics [3]",
        "BIOL 3800 - Ecology [3]",
        "CHEM 2200 - Organic Chemistry I [4]",
        "MICR 3100 - General Microbiology (also BIOL 3100) [4]",
        "Select 8 units from the following:",
        "BIOL 3900 - Molecular & Cellular Biology I [3]",
        "BIOL 4000 - Molecular & Cellular Biology II [3]",
        "BIOL 4120 - Human Genetics [3]",
        "BIOL 4150 - Population Genetics [3]",
        "BIOL 4160 - Molecular Genetics [3]",
        "BIOL 4180 - Advanced Evolutionary Biology [3]",
        "BIOL 4200 - Global Change [3]",
        "BIOL 4280 - Plant Physiology [3]",
        "BIOL 4300 - Plant Ecological Physiology [4]",
        "BIOL 4330 - Integrative Human Physiology [3]",
        "BIOL 4350 - Neurobiology: Neuroanatomy [3]",
        "BIOL 4360 - Neurobiology: Cellular Physiology [3]",
        "BIOL 4370 - Cell Signaling [3]",
        "BIOL 4390 - Endocrinology [3]",
        "BIOL 4530 - Ichthyology [3]",
        "BIOL 4540 - Special Topics [1-3]",
        "BIOL 4541 - Special Activity Topics [1-3]",
        "BIOL 4560 - Comparative Vertebrate Anatomy [4]",
        "BIOL 4620 - Plant Ecology [4]",
        "BIOL 4700 - Conservation Biology [3]",
        "BIOL 4720 - Marine Ecology [3]",
        "BIOL 4990 - Undergraduate Directed Study [1-3]"
      ]
    },

    {
      title: "II. Chemistry Option",
      courses: [
        "CHEM 2200 - Organic Chemistry I [4]",
        "CHEM 3100 - Writing for Chemists [3]",
        "CHEM 3200 - Organic Chemistry II [4]",
        "CHEM 3500 - Quantitative Analysis [4]",
        "CHEM 3600 - Inorganic Chemistry [4]",
        "CHEM 4300 - Introduction to Biochemistry [3]",
        "Select 7 units from the following:",
        "CHEM 4310 - Biochemistry I [3]",
        "CHEM 4311 - Biochemistry Lab I [2]",
        "CHEM 4320 - Biochemistry II [3]",
        "CHEM 4400 - Physical Chemistry [3]",
        "CHEM 4430 - Quantum Methods [1]",
        "CHEM 4431 - Physical Chemistry Lab [2]",
        "CHEM 4450 - Atmospheric Chemistry [3]",
        "CHEM 4460 - Drug Delivery [3]",
        "CHEM 4510 - Optical Spectroscopy [2]",
        "CHEM 4520 - Analytical Separations [2]",
        "CHEM 4530 - Electrochemistry [2]",
        "CHEM 4800 - Special Topics [1-3]",
        "CHEM 4810 - Advanced Synthetic Methods [2]",
        "CHEM 4830 - History of Chemistry [3]",
        "CHEM 4840 - Drug Discovery (also BIOL 4440) [3]",
        "CHEM 4850 - Bioinorganic Chemistry [3]",
        "CHEM 4990 - Undergraduate Directed Study [1-3]"
      ]
    },

    {
      title: "III. Geoscience Option",
      courses: [
        "GEOL 3600 - Geological Mapping [4]",
        "GEOG 3690 - GIS Fundamentals [3]",
        "GEOG 4100 - Applied Climatology [3]",
        "GEOL 3010 - Mineralogy and Petrology [4]",
        "GEOL 3210 - Geology of Southern California [3]",
        "GEOL 4350 - Coastal Processes [3]",
        "Select 9 units from the following:",
        "GEOG 4020 - Geomorphology [3]",
        "GEOG 4660 - Remote Sensing [3]",
        "GEOG 4690 - GIS Modeling [3]",
        "GEOL 3700 - Geochemistry [3]",
        "GEOL 3980 - Cooperative Education [1-3]",
        "GEOL 4000 - Optical Mineralogy [3]",
        "GEOL 4010 - Petrology [4]",
        "GEOL 4100 - Structural Geology [4]",
        "GEOL 4840 - Hydrogeology [3]",
        "GEOL 4870 - Watershed Analysis [3]",
        "GEOL 4900 - Special Topics [1-4]",
        "GEOL 4990 - Undergraduate Directed Study [1-3]"
      ]
    },

    {
      title: "IV. Physics Option",
      courses: [
        "ASTR 3600 - Views of the Universe [3]",
        "MATH 2130 - Calculus III [3]",
        "PHYS 3200 - Scientific Computing in Python [3]",
        "PHYS 3300 - Waves and Relativity [4]",
        "PHYS 3400 - Modern Physics and Thermodynamics [4]",
        "Select 12 units from the following:",
        "ASTR 4000 - Modern Astronomy [3]",
        "ASTR 4110 - Astrophysics [3]",
        "ASTR 4900 - Astrophysics Project [3]",
        "PHYS 4200 - Machine Learning [3]",
        "PHYS 4251 - Classical Mechanics I [3]",
        "PHYS 4252 - Classical Mechanics II [3]",
        "PHYS 4261 - Electricity and Magnetism I [3]",
        "PHYS 4262 - Electricity and Magnetism II [3]",
        "PHYS 4310 - Modern Optics [3]",
        "PHYS 4430 - Biophysics [3]",
        "PHYS 4440 - Nuclear Physics [3]",
        "PHYS 4700 - Advanced Lab [3]",
        "PHYS 4710 - Applied Physics Lab [3]",
        "PHYS 4880 - General Relativity [2]",
        "PHYS 4910 - Experimental Physics Topics [1-3]",
        "PHYS 4920 - Theoretical Physics Topics [1-3]",
        "PHYS 4970 - Undergraduate Research [1-3]",
        "PHYS 4990 - Undergraduate Directed Study [1-3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34589"
},

  // --- P ---
  {
  major: "Pan African Studies",

  description: "Requirements for the Major (45 units). Includes foundational coursework in African, African American, and Diaspora studies, upper-division theory and thematic distribution courses, and directed electives with emphasis on race, gender, activism, culture, and global perspectives.",

  sections: [
    {
      title: "Core Courses Requirements (24 units)",
      courses: []
    },

    {
      title: "Lower Division (12 units)",
      courses: [
        "PAS 1020 - The African Diaspora in the Americas (also listed as LAS 1020) [3]",
        "PAS 1510 - African American History [3]",
        "PAS 1800 - Critical Race Theory [3]",
        "PAS 2500 - African History [3]"
      ]
    },

    {
      title: "Upper Division (12 units)",
      courses: []
    },

    {
      title: "Theory Course (3 units)",
      courses: [
        "PAS 4030 - The Black Intellectual Tradition [3]"
      ]
    },

    {
      title: "Area Distribution Requirement (9 units)",
      courses: [
        "Select one course from each group (A, B, C)"
      ]
    },

    {
      title: "Group A - Gender and Sexuality",
      courses: [
        "PAS 3050 - Black Feminism and Womanism (also listed as WGSS 3050) [3]",
        "PAS 3070 - Black Manhood and Masculinity [3]",
        "PAS 3715 - Race, Gender, and Poverty (also WGSS 3715) [3]",
        "PAS 4060 - Black Women Leaders in Thought and Politics [3]",
        "PAS 4080 - Black Sexuality [3]",
        "PAS 4120 - Third World Women and Development [3]"
      ]
    },

    {
      title: "Group B - Activism and Organizing",
      courses: [
        "PAS 3690 - Race, Activism, and Emotions [3]",
        "PAS 4400 - Power and the African American Community I [3]"
      ]
    },

    {
      title: "Group C - Capstone",
      courses: [
        "PAS 4410 - Power and African American Communities II: Field Research [3]",
        "PAS 4950 - Senior Thesis [3]"
      ]
    },

    {
      title: "Directed Electives (21 units)",
      courses: [
        "Select 21 units total, including at least 12 upper-division units"
      ]
    },

    {
      title: "Lower Division Electives (0–9 units)",
      courses: [
        "PAS 1100 - Racial Equality, Government and the Constitution [3]",
        "PAS 1200 - Elementary African Language and Culture [3]",
        "PAS 1400 - Globalization, Race, and Place (also AAAS 1400, LAS 1400) [3]",
        "PAS 1500 - Black Oral Traditions and Communication [3]",
        "PAS 2010 - Third World Literature [3]",
        "PAS 2020 - African American Religion as Civic Culture [3]",
        "PAS 2210 - African American Music [3]",
        "PAS 2600 - Third World Images in Film [3]"
      ]
    },

    {
      title: "Upper Division Electives (12–21 units)",
      courses: [
        "PAS 3020 - Black and Latino Relations (also LAS 3020) [3]",
        "PAS 3050 - Black Feminism and Womanism [3]",
        "PAS 3070 - Black Manhood and Masculinity [3]",
        "PAS 3350 - Race and Culture in the Americas [3]",
        "PAS 3420 - Cultural Impact of Development [3]",
        "PAS 3480 - Race, Class, and Gender [3]",
        "PAS 3600 - Dynamics of Change in the Developing World [3]",
        "PAS 3690 - Race, Activism, and Emotions [3]",
        "PAS 3715 - Race, Gender, and Poverty [3]",
        "PAS 3800 - Education and Development in Africa [3]",
        "PAS 3810 - Racism and Justice Literature [3]",
        "PAS 3822 - Ethnicity in U.S. Film [3]",
        "PAS 4000 - Psychology and African Americans [3]",
        "PAS 4010 - Education and African American Advancement [3]",
        "PAS 4020 - Black Political Economy [3]",
        "PAS 4040 - The Black Family [3]",
        "PAS 4060 - Black Women Leaders [3]",
        "PAS 4080 - Black Sexuality [3]",
        "PAS 4090 - Black Labor [3]",
        "PAS 4100 - Black People and Islam [3]",
        "PAS 4110 - African Spirituality [3]",
        "PAS 4120 - Third World Women and Development [3]",
        "PAS 4160 - Pan Africanism and World Politics [3]",
        "PAS 4170 - Hip-Hop as Political Expression [3]",
        "PAS 4200 - African Foundations of African American Culture [3]",
        "PAS 4220 - Themes in Black Literature [3]",
        "PAS 4270 - Black Film [3]",
        "PAS 4400 - Power and the African American Community I [3]",
        "PAS 4410 - Field Research [3]",
        "PAS 4560 - Caribbean and Central America Politics [3]",
        "PAS 4800 - Afro-Latin America [3]",
        "PAS 4850 - Anti-colonial Movements [3]",
        "PAS 4900 - Special Topics [3]",
        "PAS 4950 - Senior Thesis [3]",
        "PAS 4990 - Directed Study [3]",
        "Non-PAS courses with advisor approval (3–6 units)"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34244"
},
  {
  major: "Philosophy",

  description: "Requirements for the Major (39–48 units). Provides foundational and advanced study in philosophical traditions, ethics, metaphysics, epistemology, and critical reasoning, with options for General or Pre-Law emphasis.",

  sections: [
    {
      title: "Core Courses for the Major (33 units)",
      courses: []
    },

    {
      title: "Lower Division Core (3 units)",
      courses: [
        "PHIL 1510 - Introduction to Philosophy [3]"
      ]
    },

    {
      title: "Upper Division Core (21 units)",
      courses: []
    },

    {
      title: "Required Courses (9 units)",
      courses: [
        "PHIL 3000 - Philosophical Research and Writing [3]",
        "PHIL 3040 - Ethics I [3]",
        "PHIL 4960 - Senior Seminar [3]"
      ]
    },

    {
      title: "History Requirement I (3 units)",
      courses: [
        "Select one:",
        "PHIL 3110 - History of Ancient Philosophy [3]",
        "PHIL 3130 - History of Modern Philosophy [3]",
        "PHIL 3540 - Special Topics in Philosophy [1-4]"
      ]
    },

    {
      title: "Metaphysics/Epistemology Requirement I (3 units)",
      courses: [
        "Select one:",
        "PHIL 4050 - Symbolic Logic [3]",
        "PHIL 4600 - Metaphysics [3]",
        "PHIL 4700 - Theory of Knowledge [3]"
      ]
    },

    {
      title: "Metaphysics/Epistemology Requirement II (3 units)",
      courses: [
        "Select one (not used above):",
        "PHIL 4050 - Symbolic Logic [3]",
        "PHIL 4600 - Metaphysics [3]",
        "PHIL 4700 - Theory of Knowledge [3]",
        "PHIL 4710 - Philosophy of Mind [3]",
        "PHIL 4800 - Philosophy of Language [3]",
        "PHIL 4850 - Philosophy of Science [3]"
      ]
    },

    {
      title: "Values Requirement I (3 units)",
      courses: [
        "Select one:",
        "PHIL 4100 - Social and Political Philosophy [3]",
        "PHIL 4130 - Issues in Feminist Philosophy (also WGSS 4130) [3]",
        "PHIL 4200 - Ethics II [3]",
        "PHIL 4750 - Aesthetics [3]",
        "PHIL 4900 - Philosophy of Law [3]"
      ]
    },

    {
      title: "Directed Electives for the Major (9 units)",
      courses: []
    },

    {
      title: "Elective I (3 units)",
      courses: [
        "PHIL 2200 - Contemporary Moral and Social Issues [3]",
        "PHIL 2230 - Diversity and Justice [3]",
        "PHIL 2300 - Meanings of Human Life [3]",
        "PHIL 2400 - Philosophy of Film [3]",
        "PHIL 3250 - Violence and Ethics [3]",
        "PHIL 3270 - Philosophy, Gender and Culture [3]",
        "PHIL 3290 - Philosophy, Race, and Ethnicity [3]",
        "PHIL 3330 - Engaged Philosophy [3]",
        "PHIL 3690 - Philosophy of Sex [3]",
        "PHIL 3730 - Adult Life and Aging [3]",
        "PHIL 3850 - Measurement of Human Difference (also ANTH 3850) [3]"
      ]
    },

    {
      title: "Elective II (6 units)",
      courses: [
        "Select two (not used in core):",
        "PHIL 4002 - Advanced Philosophical Writing [3]",
        "PHIL 4050 - Symbolic Logic [3]",
        "PHIL 4100 - Social and Political Philosophy [3]",
        "PHIL 4130 - Issues in Feminist Philosophy [3]",
        "PHIL 4200 - Ethics II [3]",
        "PHIL 4290 - Bioethics [3]",
        "PHIL 4330 - Latin American Philosophy [3]",
        "PHIL 4470 - Hermeneutics and Critical Theory [3]",
        "PHIL 4480 - Postmodernism [3]",
        "PHIL 4515 - Ancient Thought [3]",
        "PHIL 4520 - Medieval Philosophy [3]",
        "PHIL 4580 - Major Figures in Modern Philosophy [3]",
        "PHIL 4590 - 19th Century Philosophy [3]",
        "PHIL 4600 - Metaphysics [3]",
        "PHIL 4700 - Theory of Knowledge [3]",
        "PHIL 4710 - Philosophy of Mind [3]",
        "PHIL 4750 - Aesthetics [3]",
        "PHIL 4800 - Philosophy of Language [3]",
        "PHIL 4850 - Philosophy of Science [3]",
        "PHIL 4900 - Philosophy of Law [3]",
        "PHIL 4990 - Undergraduate Directed Study [1-3]"
      ]
    },

    {
      title: "Option Requirements (6–15 units)",
      courses: [
        "Select one option"
      ]
    },

    {
      title: "I. General Option (6 units)",
      courses: [
        "Formal Reasoning Requirement:",
        "PHIL 1080 - Quantitative Reasoning [3]",
        "PHIL 2500 - Symbolic Logic and Composition II [3]",
        "History Requirement II (not used above):",
        "PHIL 3110 - History of Ancient Philosophy [3]",
        "PHIL 3130 - History of Modern Philosophy [3]",
        "PHIL 4480 - Postmodernism [3]",
        "PHIL 4515 - Ancient Thought [3]",
        "PHIL 4520 - Medieval Philosophy [3]",
        "PHIL 4580 - Major Figures in Modern Philosophy [3]",
        "PHIL 4590 - 19th Century Philosophy [3]"
      ]
    },

    {
      title: "II. Pre-Law Option (15 units)",
      courses: [
        "Formal Reasoning Requirement:",
        "PHIL 1600 - Critical Thinking and Composition [3]",
        "PHIL 1080 - Quantitative Reasoning [3]",
        "PHIL 2500 - Symbolic Logic and Composition II [3]",
        "Values Requirement II (not used above):",
        "PHIL 4100 - Social and Political Philosophy [3]",
        "PHIL 4130 - Issues in Feminist Philosophy [3]",
        "PHIL 4200 - Ethics II [3]",
        "PHIL 4750 - Aesthetics [3]",
        "PHIL 4900 - Philosophy of Law [3]",
        "Directed Electives:",
        "Select 3 upper-division non-PHIL courses with advisor approval"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34430#core_237421"
},
  {
  major: "Physics",

  description: "Requirements for the Major (79–82 units). Provides a strong foundation in classical and modern physics, mathematics, and computational methods, with options in General Physics or Biophysics.",

  sections: [
    {
      title: "Requirements for the Core (44 units)",
      courses: []
    },

    {
      title: "Lower Division Core Courses (27 units)",
      courses: [
        "CHEM 1100 - General Chemistry I [5]",
        "MATH 2110 - Calculus I [4]",
        "MATH 2120 - Calculus II [4]",
        "MATH 2130 - Calculus III [3]",
        "MATH 2150 - Differential Equations [3]",
        "PHYS 2100 - General Physics I: Mechanics [4]",
        "PHYS 2200 - General Physics II: Electromagnetism and Circuits [4]"
      ]
    },

    {
      title: "Upper Division Core Courses (17 units)",
      courses: [
        "ASTR 3601 - Ancient and Modern Views of the Universe [3]",
        "PHYS 3200 - Scientific Computing in Python [3]",
        "PHYS 3300 - Oscillations, Waves, and Special Relativity [4]",
        "PHYS 3400 - Modern Physics and Thermodynamics [4]",
        "PHYS 4270 - Thermal and Statistical Physics [3]"
      ]
    },

    {
      title: "Option Requirements (35–38 units)",
      courses: [
        "Select one option"
      ]
    },

    {
      title: "Option I - General Option (35 units)",
      courses: []
    },

    {
      title: "Upper Division Required Courses (16 units)",
      courses: [
        "PHYS 3120 - Basic Electronics [4]",
        "PHYS 4251 - Classical Mechanics I [3]",
        "PHYS 4261 - Electricity and Magnetism I [3]",
        "PHYS 4321 - Introductory Quantum Mechanics I [3]",
        "PHYS 4700 - Advanced Physics Laboratory and Applications [3]"
      ]
    },

    {
      title: "PHYS / ASTR Electives (9 units)",
      courses: [
        "ASTR 4000 - Elements of Modern Astronomy [3]",
        "ASTR 4110 - Introduction to Astrophysics [3]",
        "ASTR 4900 - Community Astrophysics Project [3]",
        "PHYS 4142 - Chemistry and Physics of Materials [3]",
        "PHYS 4200 - Machine Learning for the Sciences [3]",
        "PHYS 4252 - Classical Mechanics II [3]",
        "PHYS 4262 - Electricity and Magnetism II [3]",
        "PHYS 4280 - Advanced Statistical Physics [3]",
        "PHYS 4310 - Modern Optics [3]",
        "PHYS 4322 - Introductory Quantum Mechanics II [3]",
        "PHYS 4330 - Solid State Physics I [3]",
        "PHYS 4430 - Biophysics [3]",
        "PHYS 4440 - Nuclear Physics [3]",
        "PHYS 4710 - Applied Physics Laboratory [3]",
        "PHYS 4880 - General Relativity [2]",
        "PHYS 4910 - Experimental Physics Topics [1-3]",
        "PHYS 4920 - Theoretical Physics Topics [1-3]"
      ]
    },

    {
      title: "Science Electives (10 units)",
      courses: [
        "Select 10 units (≥6 units upper division, advisor approval required)",
        "Includes courses from ASTR, BIOL, CE, CHEM, EE, GEOG, GEOL, MATH, ME, PHYS"
      ]
    },

    {
      title: "Option II - Biophysics Option (38 units)",
      courses: []
    },

    {
      title: "Lower Division Required Courses (15 units)",
      courses: [
        "BIOL 1100 - Cellular Basis of Life [5]",
        "BIOL 1200 - Diversity of Life [5]",
        "CHEM 1110 - General Chemistry II [5]"
      ]
    },

    {
      title: "Upper Division Required Courses (9–10 units)",
      courses: [
        "PHYS 4430 - Biophysics [3]",
        "Select one:",
        "PHYS 4251 - Classical Mechanics I [3]",
        "PHYS 4261 - Electricity and Magnetism I [3]",
        "Select one:",
        "CHEM 4410 - Physical Chemistry: Quantum Mechanics and Kinetics [4]",
        "PHYS 4321 - Introductory Quantum Mechanics I [3]"
      ]
    },

    {
      title: "Directed Electives (13–14 units)",
      courses: [
        "Select remaining units with advisor approval (≥6 upper division)",
        "Includes courses from ASTR, BIOL, BINF, CHEM, MATH, PHYS"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34434"
},
  {
  major: "Political Science",

  description: "Requirements for the Major (43 units). Includes a core foundation in American politics, political theory, comparative and global politics, and research methods, followed by an option in General Political Science, Global Politics, Prelegal Studies, or Public Administration.",

  sections: [
    {
      title: "Core Requirements (22 units)",
      courses: [
        "POLS 1000 - Power, Politics and Engagement in US Government [3]",
        "POLS 2810 - Quantitative Research Design in Political Science [4]",
        "POLS 3710 - Foundations of American Politics [3]",
        "POLS 3720 - Foundations of Political Theory [3]",
        "POLS 3730 - Foundations of Comparative Politics [3]",
        "POLS 3740 - Foundations of Global Politics [3]",
        "Select one capstone:",
        "POLS 4980 - Senior Capstone Seminar [3]",
        "POLS 4981 - Senior Service Learning/Community Engagement Capstone [3]",
        "POLS 4982 - Senior Capstone Research Seminar [3]"
      ]
    },

    {
      title: "Options (21 units)",
      courses: [
        "Select one option"
      ]
    },

    {
      title: "General Political Science Option (21 units)",
      courses: [
        "Select 7 courses (max one at 3000-level):",
        "POLS 3100 - Gender, Politics, and Government [3]",
        "POLS 3290 - Class, Civil Rights, and Gender [3]",
        "POLS 3300 - Politics of Aging [3]",
        "POLS 3420 - Rights and Justice [3]",
        "POLS 3450 - The Politics of Science [3]",
        "POLS 3500 - State Politics and Policy [3]",
        "POLS 3580 - Environmental Policy [3]",
        "POLS 3600 - Dynamics of Change in the Developing World [3]",
        "POLS 4000 - Congress and the President [3]",
        "POLS 4030 - State and Local Government [3]",
        "POLS 4040 - Urban Government and Politics [3]",
        "POLS 4060 - Los Angeles City Politics [3]",
        "POLS 4080 - Political Socialization [3]",
        "POLS 4090 - Minority Politics in the U.S. [3]",
        "POLS 4140 - Politics and the Media [3]",
        "POLS 4180 - Political Parties and Elections [3]",
        "POLS 4201 - The United Nations [3]",
        "POLS 4202 - Model United Nations [3]",
        "POLS 4250 - U.S. Foreign Policy [3]",
        "POLS 4260 - International Political Economy [3]",
        "POLS 4270 - International Relations [3]",
        "POLS 4290 - Global Challenges [3]",
        "POLS 4310 - Classical Political Theory [3]",
        "POLS 4330 - Modern Political Theory [3]",
        "POLS 4350 - American Political Thought [3]",
        "POLS 4370 - Continental Political Thought [3]",
        "POLS 4400 - Judicial Process [3]",
        "POLS 4410 - Constitutional Law: Federalism [3]",
        "POLS 4420 - Constitutional Law: Civil Rights [3]",
        "POLS 4430 - Constitutional Law: Civil Liberties [3]",
        "POLS 4440 - Legal Advocacy [3]",
        "POLS 4450 - Judicial Behavior [3]",
        "POLS 4460 - Global Legal Studies [3]",
        "POLS 4500 - European Politics [3]",
        "POLS 4510 - Latin American Politics [3]",
        "POLS 4520 - Politics of China [3]",
        "POLS 4530 - Politics of Africa and Middle East [3]",
        "POLS 4540 - Selected Topics in Global Politics [3]",
        "POLS 4580 - Immigration Politics [3]",
        "POLS 4590 - Politics of East Asia [3]",
        "POLS 4600 - Foundations of Public Administration [3]",
        "POLS 4610 - Urban Administration [3]",
        "POLS 4620 - Public Policy [3]",
        "POLS 4640 - GIS Applications in Political Science [3]",
        "POLS 4670 - Nonprofit Organizations [3]",
        "POLS 4720 - Organization and Management [3]",
        "POLS 4810 - Advanced Quantitative Methods [3]",
        "POLS 4900 - Special Studies [3]"
      ]
    },

    {
      title: "Global Politics Option (21 units)",
      courses: [
        "Select one from each group:",
        "Global Politics:",
        "POLS 4250 - U.S. Foreign Policy [3]",
        "POLS 4260 - International Political Economy [3]",
        "POLS 4270 - International Relations [3]",
        "Transnational and Global Politics:",
        "POLS 4201 - The United Nations [3]",
        "POLS 4290 - Global Challenges [3]",
        "POLS 4460 - Global Legal Studies [3]",
        "POLS 4540 - Topics in Global Politics [3]",
        "POLS 4580 - Immigration Politics [3]",
        "Comparative Politics:",
        "POLS 4500 - European Politics [3]",
        "POLS 4510 - Latin American Politics [3]",
        "POLS 4520 - Politics of China [3]",
        "POLS 4530 - Politics of Africa and Middle East [3]",
        "POLS 4590 - Politics of East Asia [3]",
        "Electives (12 units): Select 4 POLS courses"
      ]
    },

    {
      title: "Prelegal Studies Option (21 units)",
      courses: [
        "POLS 4400 - Judicial Process [3]",
        "Select two:",
        "POLS 4410 - Constitutional Law: Federalism [3]",
        "POLS 4420 - Constitutional Law: Civil Rights [3]",
        "POLS 4430 - Constitutional Law: Civil Liberties [3]",
        "POLS 4440 - Legal Advocacy [3]",
        "POLS 4450 - Judicial Behavior [3]",
        "POLS 4460 - Global Legal Studies [3]",
        "PHIL 4900 - Philosophy of Law [3]",
        "HIST 4790 - Constitutional History [3]",
        "Electives (12 units): Select 4 POLS courses"
      ]
    },

    {
      title: "Public Administration Option (21 units)",
      courses: [
        "POLS 4600 - Foundations of Public Administration [3]",
        "Select two:",
        "POLS 4030 - State and Local Government [3]",
        "POLS 4040 - Urban Government and Politics [3]",
        "POLS 4060 - Los Angeles City Politics [3]",
        "POLS 4090 - Minority Politics [3]",
        "POLS 4610 - Urban Administration [3]",
        "POLS 4620 - Public Policy [3]",
        "POLS 4670 - Nonprofit Organizations [3]",
        "POLS 4720 - Organization and Management [3]",
        "Electives (12 units): Select 4 POLS courses"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34439"
},
  {
  major: "Psychology",

  description: "Requirements for the Major (50–51 units). Includes foundational coursework in psychological science, research methods, and statistics, along with upper-division electives across developmental, social, cognitive, and clinical areas. A grade of C- or higher is required in all psychology courses.",

  sections: [
    {
      title: "Lower Division Core Courses (9 units)",
      courses: [
        "PSY 1500 - Introductory Psychology [3]",
        "PSY 1700 - Introductory Behavioral Neuroscience [3]",
        "PSY 2000 - Introduction to Psychological Science [3]"
      ]
    },

    {
      title: "Upper Division Core Courses (17–18 units)",
      courses: [
        "PSY 3020 - Statistics in Psychology [4]",
        "PSY 3040 - Research Methods in Psychology [4]",
        "PSY 3080 - History and Systems of Psychology [3]",
        "Select one from Group V (3–4 units)",
        "Select one from Group VI (3 units)"
      ]
    },

    {
      title: "Group V - Methodology",
      courses: [
        "PSY 4110 - Advanced Research Methods in Psychology [3]",
        "PSY 4140 - Analysis of Variance [3]",
        "PSY 4170 - Assessment and Research Designs in ABA [3]",
        "PSY 4310 - Statistical Methods in Psychological Assessment [4]",
        "PSY 4650 - Multicultural Psychology [3]",
        "PSY 4910 - Multivariate Statistics [4]"
      ]
    },

    {
      title: "Group VI - Applied Psychology / Community Engagement",
      courses: [
        "PSY 3090 - Human Violence and Individual Change [3]",
        "PSY 3250 - Psychology of Social Justice [3]",
        "PSY 4450 - Community Psychology - Service Learning [3]"
      ]
    },

    {
      title: "Upper Division Electives (24 units)",
      courses: [
        "Select two courses from each Group I–IV (24 units total)",
        "Optional substitutions allowed from Group V or VI"
      ]
    },

    {
      title: "Group I - Developmental",
      courses: [
        "PSY 3620 - Adult Development and Aging [3]",
        "PSY 3880 - Sex and Gender [3]",
        "PSY 4030 - Child Maltreatment and Domestic Violence [3]",
        "PSY 4120 - Infancy and Childhood [3]",
        "PSY 4130 - Adolescence and Young Adulthood [3]",
        "PSY 4400 - Behavior Analysis and Autism [3]"
      ]
    },

    {
      title: "Group II - Social / Community",
      courses: [
        "PSY 3030 - Positive Psychology [3]",
        "PSY 3070 - Violence and Aggression [3]",
        "PSY 3220 - Social Psychology [3]",
        "PSY 3300 - Prejudice and Discrimination [3]",
        "PSY 4020 - Media Psychology [3]",
        "PSY 4150 - Interpersonal Relationships [3]",
        "PSY 4190 - Psychology of Gender [3]",
        "PSY 4500 - Health Psychology [3]",
        "PSY 4640 - Psychology and the Law [3]",
        "PSY 4770 - Ethics in ABA [3]",
        "PSY 4850 - Field Experience in Community Clinical Psychology [3]"
      ]
    },

    {
      title: "Group III - Brain, Behavior, and Cognition",
      courses: [
        "PSY 3230 - Emotion and Motivation [3]",
        "PSY 3430 - Child and Adolescent Cognition [3]",
        "PSY 4010 - Physiological Psychology [3]",
        "PSY 4210 - Learning and Behavior [3]",
        "PSY 4240 - Cognitive Psychology [3]",
        "PSY 4250 - Sensation and Perception [3]",
        "PSY 4280 - Analysis of Behavior [3]",
        "PSY 4350 - Behavior Analysis & Treatment [3]",
        "PSY 4900 - Eyewitness Memory [3]"
      ]
    },

    {
      title: "Group IV - Individual / Abnormal",
      courses: [
        "PSY 3100 - Abnormal Psychology I [3]",
        "PSY 3180 - Personality [3]",
        "PSY 4100 - Abnormal Psychology II [3]",
        "PSY 4160 - Human Sexuality [3]",
        "PSY 4260 - Family Therapy [3]",
        "PSY 4360 - Clinical/Counseling Psychology [3]",
        "PSY 4370 - Counseling and Psychotherapy [3]",
        "PSY 4390 - Minority Mental Health [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34445"
},
  {
  major: "Public Health",

  description: "Requirements for the Major (55 units). Includes foundational coursework in health, statistics, and social sciences, followed by upper-division study in epidemiology, health systems, environmental health, and community health, along with directed electives.",

  sections: [
    {
      title: "Requirements for the Core (46 units)",
      courses: []
    },

    {
      title: "Lower Division Core Courses (10 units)",
      courses: [
        "PH 1500 - Health and Wellness [3]",
        "Select one:",
        "EDFN 1090 - Introduction to Statistics and Data Interpretation [4]",
        "MATH 1090 - Quantitative Reasoning with Statistics [4]",
        "Select one:",
        "ANTH 1500 - Introduction to Cultural Anthropology [3]",
        "PSY 1500 - Introductory Psychology [3]",
        "SOC 2010 - Introduction to Sociology [3]"
      ]
    },

    {
      title: "Upper Division Core Courses (36 units)",
      courses: [
        "PH 3100 - Reading and Writing in Public Health [3]",
        "PH 3110 - Introduction to Community Health [3]",
        "PH 3120 - Introduction to Epidemiology [3]",
        "PH 3130 - Data Analysis for Public Health [3]",
        "PH 3140 - Health Care Delivery System [3]",
        "PH 4140 - General Principles of Environmental Health [3]",
        "PH 4340 - Health Promotion [3]",
        "PH 4370 - Proseminar: Current Issues in Health [3]",
        "PH 4960 - Internship in Public Health [3]",
        "Select three (9 units):",
        "PH 4150 - Critical Issues in Health Policy [3]",
        "PH 4160 - Public Health Research Methods [3]",
        "PH 4170 - Public Health Administration [3]",
        "PH 4320 - Introduction to Global Health [3]",
        "PH 4360 - Public Health Communication [3]"
      ]
    },

    {
      title: "Directed Electives (9 units)",
      courses: [
        "Select 3 courses total (no double-counting with core)"
      ]
    },

    {
      title: "Public Health Electives",
      courses: [
        "PH 3750 - Health Disparities in Urban Communities [3]",
        "PH 3760 - Issues in Global Health [3]",
        "PH 3780 - Current Issues in Urban Health [3]",
        "PH 3770 - Environmental Justice [3]",
        "PH 4150 - Critical Issues in Health Policy [3]",
        "PH 4160 - Public Health Research Methods [3]",
        "PH 4170 - Public Health Administration [3]",
        "PH 4220 - Vulnerable Populations [3]",
        "PH 4230 - Sexuality and Sexual Health [3]",
        "PH 4240 - Drugs and Health [3]",
        "PH 4260 - Consumer Health [3]",
        "PH 4320 - Introduction to Global Health [3]",
        "PH 4360 - Public Health Communication [3]"
      ]
    },

    {
      title: "Non-PH Electives (3 units)",
      courses: [
        "Select one:",
        "AAAS 3510 - Food, Race, and the Environment [3]",
        "ANTH 4440 - Medical Anthropology [3]",
        "CHDV 3210 - Urban Families and Resilience [3]",
        "CHDV 3420 - Development of Sexuality [3]",
        "CHDV 3470 - Culture and Wellness [3]",
        "CHDV 4120 - Child Abuse and Violence [3]",
        "CHDV 4270 - Disability Across the Lifespan [3]",
        "CLS 4180 - Public Health Issues in Latina/o Communities [3]",
        "CLS 4300 - Community-Engaged Research [3]",
        "COMM 4510 - Health Communication and New Media [3]",
        "COMM 4520 - Narrative Health Communication [3]",
        "COMM 4530 - Health Education and Clinical Care [3]",
        "GEOG 3090 - Urban Environmental Pollution [3]",
        "LAS 4490 - Anthropology of Race and Racism [3]",
        "MGMT 4300 - Healthcare Management [3]",
        "MGMT 4330 - Healthcare Regulations and Ethics [3]",
        "MKT 3950 - Community Based Social Marketing [3]",
        "NTRS 3510 - Adult Nutrition [3]",
        "NTRS 3570 - Food Supply and Health [3]",
        "NTRS 4130 - Maternal and Child Nutrition [3]",
        "PSY 4390 - Minority Mental Health [3]",
        "PSY 4500 - Health Psychology [3]",
        "SOC 4500 - Sociology of Aging [3]",
        "SOC 4560 - Global Aging [3]",
        "SOC 4570 - Women and Aging [3]",
        "SW 3650 - Social Policy and Aging [3]",
        "SW 3820 - Community Organizing [3]",
        "SW 3850 - Homelessness in Society [3]",
        "SW 4560 - Family Violence and Child Maltreatment [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34370"
},

  // --- R ---
  {
  major: "Rehabilitation Services",

  description: "Requirements for the Major (72–73 units). Includes foundational coursework in counseling, disability studies, and social sciences, followed by advanced training in rehabilitation practices with options in General Rehabilitation or Applied Behavior Analysis.",

  sections: [
    {
      title: "Requirements for the Core (49–50 units)",
      courses: []
    },

    {
      title: "Lower Division Required Courses (24–25 units)",
      courses: [
        "COUN 2000 - Introduction to Rehabilitation Services [3]",
        "COUN 2010 - Foundations of Lifespan Human Development [3]",
        "COUN 2020 - Integration of Adults with Disabilities in U.S. Society [3]",
        "COUN 2250 - Diversity and Awareness for Helping Professionals [3]",
        "COUN 2500 - Introduction to Individual and Group Counseling [3]",
        "PSY 1500 - Introductory Psychology [3]",
        "SOC 2010 - Introduction to Sociology [3]",
        "Select one:",
        "EDFN 1090 - Introduction to Statistics and Data Interpretation [4]",
        "EDFN 1092 - Introduction to Statistics and Data Interpretation [3]"
      ]
    },

    {
      title: "Upper Division Required Core (25 units)",
      courses: [
        "COUN 3010 - Writing for Rehabilitation Services [3]",
        "COUN 3201 - Introduction to Applied Behavior Analysis [3]",
        "COUN 4000 - Case Management in Rehabilitation Services [3]",
        "COUN 4420 - Disability and Function [3]",
        "COUN 4480 - Career Assessment and Development [3]",
        "COUN 4490 - Job Development and Placement [3]",
        "COUN 4940A - Senior Capstone Seminar [1]",
        "EDSP 4000 - Foundations of Special Education [3]",
        "Select one:",
        "COUN 4650 - Addiction Counseling [3]",
        "PH 4240 - Drugs and Health [3]"
      ]
    },

    {
      title: "Requirements for Options (23 units)",
      courses: [
        "Select one option"
      ]
    },

    {
      title: "I. General Option (23 units)",
      courses: [
        "COUN 4110 - Introduction to Mental Health for Counselors [3]",
        "Directed Electives (12 units):",
        "COUN 3202 - Behaviorism [3]",
        "COUN 3203 - Ethics in Applied Behavior Analysis [3]",
        "COUN 4010 - Boots to Books [3]",
        "COUN 4030 - Child Maltreatment and Domestic Violence [3]",
        "COUN 4330 - Trauma & Crisis Counseling [3]",
        "COUN 4470 - Return to Work [3]",
        "COUN 4500 - Counseling Theories [3]",
        "COUN 4870 - Psychosocial Aspects in Asian American Societies [3]",
        "EDFN 3520 - Applied Statistics [3]",
        "EDIT 4150 - Instructional Technology [3]",
        "EDSP 3010 - Individuals with Disabilities [3]",
        "EDSP 4030 - Behavior Supports and Classroom Management [3]",
        "EDFN 3010 - Language, Culture, Society [3]",
        "Fieldwork (8 units):",
        "COUN 4940 - Supervised Fieldwork & Seminar [4] (repeat for 8 units)"
      ]
    },

    {
      title: "II. Applied Behavior Analysis Option (23 units)",
      courses: [
        "COUN 3202 - Behaviorism [3]",
        "COUN 3203 - Ethics in Applied Behavior Analysis [3]",
        "COUN 4204 - Behavioral Assessment and Intervention [3]",
        "COUN 4205 - Experimental Analysis of Behavior [3]",
        "COUN 4206 - Behavior Analytic Research Methods [3]",
        "Fieldwork (8 units):",
        "COUN 4942 - Practice Seminar in ABA I [4]",
        "COUN 4943 - Practice Seminar in ABA II [4]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34452"
},

  // --- S ---
  {
  major: "Social Work",

  description: "Requirements for the Major (72–73 units)",
  sections: [
    {
      title: "Core Requirements (51–52 units)",
      courses: []
    },

    {
      title: "Prerequisite Courses (6–7 units)",
      courses: [
        "Select one:",
        "PSY 1500 - Introductory Psychology [3]",
        "SOC 2010 - Introduction to Sociology [3]",
        "Select one:",
        "EDFN 3520 - Applied Statistics [3]",
        "HHS 4000 - Statistics in Health and Human Services [1-3]",
        "MATH 1090 - Quantitative Reasoning with Statistics, with Lab [4]"
      ]
    },

    {
      title: "Upper Division Core Courses (45 units)",
      courses: [
        "Select one:",
        "SW 3761 - Child Welfare [3]",
        "SW 3762 - Cross Cultural Practice with Older Adults [3]",
        "SW 3763 - Forensic Social Work Practice [3]",
        "SW 3010 - Writing and Computers in Social Work [3]",
        "SW 3700 - Field of Social Work [3]",
        "SW 3710 - Culturally Competent Social Work Practice [3]",
        "SW 3711 - Human Behavior and Social Environment I [3]",
        "SW 3712 - Human Behavior and Social Environment II [3]",
        "SW 3720 - Interviewing Skills for Social Work Practice [3]",
        "SW 3820 - Community Organizing [3]",
        "SW 3910 - Social Work Research Methods [3]",
        "SW 4630 - Diversity and Intersectionality in Social Work [3]",
        "SW 4740 - Practice with Individuals and Families [3]",
        "SW 4750 - Practice with Groups [3]",
        "SW 4780 - Social Welfare Policy and Services [3]",
        "SW 4951 - Integrative Field Practicum I [3]",
        "SW 4952 - Integrative Field Practicum II [3]"
      ]
    },

    {
      title: "Electives (21 units)",
      courses: []
    },

    {
      title: "Social Work & Related Electives (6 units)",
      courses: [
        "SW 3550 - Violence and Maltreatment in Families [3]",
        "SW 3620 - Institutional Racism to Cultural Competency [3]",
        "SW 3630 - Immigration and Social Policy [3]",
        "SW 3650 - Social Policy and Aging [3]",
        "SW 3850 - Homelessness in Society [3]",
        "SW 4540 - Selected Topics in Social Work [1-4]",
        "SW 4560 - Multidisciplinary Teams and Family Violence [3]",
        "SW 4580 - Role of Men and Fathers in Society [3]",
        "SW 4830 - Financial Empowerment [3]",
        "SW 4840 - Community Engagement with Youth [3]",
        "SW 4850 - Practice with Military and Veterans [3]",
        "SW 4860 - Practice with LGBTQ+ Populations [3]",
        "SW 4870 - Forensic Social Work [3]",
        "SW 4900 - Latino Mental Health [3]",
        "SW 4990 - Undergraduate Directed Study [1-3]"
      ]
    },

    {
      title: "Free Electives (15 units)",
      courses: [
        "Additional courses from any discipline to meet GE and 120-unit graduation requirement"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34462"
},
 {
  major: "Sociology",

  description: "Requirements for the Major (51–52 units). Includes a core of 27–28 units and 24 units in one selected option: General Sociology, Inequalities and Diversity, Law and Society, or Social Gerontology.",

  sections: [
    {
      title: "Lower Division Core Courses (6–7 units)",
      courses: [
        "SOC 1090 - Introduction to Statistics for the Social Sciences, with Lab [4]",
        "or SOC 1092 - Introduction to Statistics for the Social Sciences [3]",
        "SOC 2010 - Introduction to Sociology [3]"
      ]
    },
    {
      title: "Upper Division Core Courses (21 units)",
      courses: [
        "SOC 3100 - Intermediate Statistics [3]",
        "SOC 3200 - Pre-Career Sociologists [3]",
        "SOC 3480 - Sociology of Race/Ethnicity, Class, and Gender [3]",
        "SOC 3700 - Civic Learning [3]",
        "SOC 3900 - Quantitative Research and Writing [3]",
        "SOC 3910 - Qualitative Research and Writing [3]",
        "SOC 4120 - Sociological Theory [3]"
      ]
    },

    {
      title: "Option I: General Sociology (24 units)",
      courses: [
        "Select 24 units from:",
        "SOC 3000 - Cultural Emotions [3]",
        "SOC 3150 - Global Social Thought and The Good Life [3]",
        "SOC 3220 - Socialization: Childhood and Adolescence [3]",
        "SOC 3230 - Adult Life in a Diverse World [3]",
        "SOC 3300 - Social Issues in the Urban Setting [3]",
        "SOC 3310 - The Dynamics of Poverty [3]",
        "SOC 3410 - Sociology of Gender [3]",
        "SOC 3500 - International Migration [3]",
        "SOC 3830 - Violence and Society [3]",
        "SOC 4050 - Sociology Internships and Service Learning [3]",
        "SOC 4150 - Political Sociology [3]",
        "SOC 4170 - Sociology of Education [3]",
        "SOC 4180 - Crowd Behavior and Social Movements [3]",
        "SOC 4200 - Group Processes [3]",
        "SOC 4220 - Social Psychology [3]",
        "SOC 4250 - Medical Sociology [3]",
        "SOC 4260 - Deviant Behavior [3]",
        "SOC 4280 - Self and Identity [3]",
        "SOC 4300 - Urban Sociology [3]",
        "SOC 4320 - Digital Sociology, Technology and Society [3]",
        "SOC 4340 - Population and Society [3]",
        "SOC 4380 - Sociology of Sport [3]",
        "SOC 4400 - Partnership, Marriage, and Families [3]",
        "SOC 4440 - Sociology of Popular Culture [3]",
        "SOC 4470 - Work and the Workplace [3]",
        "SOC 4480 - Social Class and Inequality [3]",
        "SOC 4600 - Race and Ethnic Relations [3]",
        "SOC 4800 - Criminology [3]",
        "SOC 4830 - Sociology of Human Rights [3]",
        "SOC 4950 - Senior Capstone Seminar [3]"
      ]
    },

    {
      title: "Option II: Inequalities and Diversity (24 units)",
      courses: [
        "Required:",
        "SOC 4600 - Race and Ethnic Relations [3]",
        "Select 9 units from option-specific electives",
        "Select 12 units of additional upper-division SOC electives"
      ]
    },

    {
      title: "Option III: Law and Society (24 units)",
      courses: [
        "Required:",
        "SOC 4880 - Sociology of Law [3]",
        "Select 9 units from option-specific electives",
        "Select 12 units of additional upper-division SOC electives"
      ]
    },

    {
      title: "Option IV: Social Gerontology (24 units)",
      courses: [
        "Required:",
        "SOC 4500 - Sociology of Aging [3]",
        "Select 9 units from option-specific electives",
        "Select 12 units of additional upper-division SOC electives"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34464"
},
  {
  major: "Spanish",

  description: "Requirements for the Major (48 units). Includes core coursework in language, linguistics, culture, and literature, plus electives across five groups (A–E) with at least 3 units each from Groups A, B, and C. No more than 9 units may be taken from courses taught in English.",

  sections: [
    {
      title: "Lower Division Core Course (3 units)",
      courses: [
        "ML 1010 - Introduction to Higher Education for MLL Majors [3]"
      ]
    },

    {
      title: "Upper Division Core Courses (24 units)",
      courses: [
        "SPAN 3001 - Advanced Composition and Grammar [3]",
        "SPAN 3050 - Introduction to Spanish Linguistics [3]",
        "SPAN 3100 - Spanish History and Culture [3]",
        "SPAN 3150 - Spanish-American Civilization [3]",
        "SPAN 4010 - Introduction to Literary Analysis [3]",
        "SPAN 4080 - Spanish Literature I [3]",
        "SPAN 4130 - Spanish-American Literature II [3]",
        "ML 4000 - Senior Thesis in Modern Languages and Literatures [3]"
      ]
    },

    {
      title: "Electives (21 units)",
      courses: [
        "Select 21 units total from Groups A–E",
        "At least 3 units must be taken from each of Groups A, B, and C",
        "No more than 9 units may be from courses taught in English"
      ]
    },

    {
      title: "Group A: Linguistics and Language (3–15 units)",
      courses: [
        "SPAN 3002 - Applied Spanish Composition in the Community [3]",
        "SPAN 3020 - Spanish in the United States [3]",
        "SPAN 3200 - Spanish Usage in the Americas [3]",
        "SPAN 3800 - Business Spanish [3]",
        "SPAN 4000 - Spanish Morphology and Syntax [3]"
      ]
    },

    {
      title: "Group B: Spanish Literature (3–15 units)",
      courses: [
        "SPAN 4100 - Spanish Literature II [3]",
        "SPAN 4140 - Don Quixote de la Mancha [3]",
        "SPAN 4181 - Golden Age Culture and Literature [3]",
        "SPAN 4260 - Peninsular Literature: Enlightenment to Generation of 98 [3]",
        "SPAN 4540 - Special Topics in Spanish - Peninsular [1-3]",
        "SPAN 4720 - Peninsular Literature: Vanguardismo to Present [3]"
      ]
    },

    {
      title: "Group C: Spanish-American Literatures (3–15 units)",
      courses: [
        "ML 4100 - Chicana and Mexican Women Writers [3]",
        "SPAN 4110 - Spanish-American Literature I [3]",
        "SPAN 4170 - Spanish-American Short Story [3]",
        "SPAN 4210 - Mexican Literature of Twentieth Century [3]",
        "SPAN 4310 - Spanish-American Testimony [3]",
        "SPAN 4441 - Masterworks of Spanish American Literature [3]",
        "SPAN 4541 - Special Topics - Latin America [1-3]",
        "SPAN 4750 - Spanish American Theater [3]",
        "SPAN 4830 - Intellectuals and Ideas in Latin America [3]",
        "SPAN 4850 - Southern Cone Fiction [3]"
      ]
    },

    {
      title: "Group D: Miscellaneous Hispanic Themes (0–12 units)",
      courses: [
        "SPAN 3950 - Spanish in Community Service [1-3]",
        "SPAN 3970 - Field Work in Spanish [1-3]",
        "SPAN 4450 - Journalism in Spanish [3]",
        "SPAN 4590 - Hispanic Play Production [3]",
        "SPAN 4600 - Editing a Bilingual Cultural Magazine [3]"
      ]
    },

    {
      title: "Group E: Courses Taught in English (0–9 units)",
      courses: [
        "ML 3003 - Contemporary Spain: Culture and Society [3]",
        "ML 3009 - Mexico City in Contemporary Mexican Cinema [3]",
        "SPAN 2420 - Hispanic Societies through Literature [3]",
        "SPAN 3400 - Hispanic Film [3]",
        "Select one:",
        "MUS 3580 - Music of the Oppressed in Latin America [3]",
        "MUS 4580 - Music of Latin America [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34467"
},

  // --- T ---
  {
  major: "Television, Film and Media (TVFM)",

  description: "Requirements for the Major (52 units). Includes foundational production, writing, media studies, and specialized option tracks in Production, Post Production, Writing, or Media Studies.",

  sections: [
    {
      title: "Lower Division Core Requirements (15 units)",
      courses: [
        "TVF 1100 - Media Writing [3]",
        "TVF 1200 - Introduction to Pre-Production and Production [3]",
        "TVF 2000 - Introduction to Post Production [3]",
        "TVF 2280 - Film History [3]",
        "TVF 2650 - Introduction to Scriptwriting [3]"
      ]
    },

    {
      title: "Upper Division Core Requirements (19 units)",
      courses: [
        "TVF 3100 - Introduction to Television, Film and Media Studies [1]",
        "TVF 3340 - Race, Justice and the Media [3]",
        "TVF 4200 - Media Law [3]",
        "TVF 4230 - Gender and Sexuality in the Media [3]",
        "TVF 4270 - Television History and Programming [3]",
        "TVF 4800 - New Media [3]",
        "TVF 4970 - TVF Portfolio [3]"
      ]
    },

    {
      title: "Option I: Production (18 units)",
      courses: [
        "Required:",
        "TVF 3970 - Cinematography [3]",
        "TVF 3990 - Intermediate Production [3]",
        "Select 9 units from Production Electives",
        "TVF 3980 - Cooperative Education [1-3]",
        "TVF 4000 - Community Impact Media [4-8]",
        "TVF 4010 - Advanced Production [3]",
        "TVF 4300 - Documentary Field Production [3]",
        "TVF 4540L - Selected Studies in Production [3]",
        "TVF 4710 - Advanced Cinematography [4-8]",
        "TVF 4720 - Directing for Camera [4]",
        "TVF 4730 - Producing [4]",
        "TVF 4801 - Short Film Incubator [4-8]",
        "TVF 4830 - Interactive Media Design Project [3]",
        "Select 3 units from Media Studies Electives"
      ]
    },

    {
      title: "Option II: Post Production (18 units)",
      courses: [
        "Required:",
        "TVF 3030 - Picture Editing [3]",
        "TVF 3031 - Sound Editing [3]",
        "Select 9 units from Post Production Electives",
        "TVF 3200 - Sound Design for Entertainment Media [3]",
        "TVF 3980 - Cooperative Education [1-3]",
        "TVF 4000 - Community Impact Media [4-8]",
        "TVF 4010 - Advanced Production [3]",
        "TVF 4300 - Documentary Field Production [3]",
        "TVF 4540L - Selected Studies in Production [3]",
        "TVF 4740 - Advanced Picture Editing [4-8]",
        "TVF 4750 - Avid Certification [4]",
        "TVF 4802 - Short Film Incubator Post-Production [4]",
        "TVF 4830 - Interactive Media Design Project [3]",
        "Select 3 units from Media Studies Electives"
      ]
    },

    {
      title: "Option III: Writing (18 units)",
      courses: [
        "Required:",
        "TVF 3630 - Interactive Storytelling for Games [3]",
        "TVF 3640 - Television Spec Writing [3]",
        "TVF 3650 - Intermediate Scriptwriting [3]",
        "TVF 4650 - Advanced Screenwriting [3]",
        "Select 6 units from:",
        "TVF 4540 - Selected Studies in Television and Film [1-3]",
        "TVF 4640 - Television Pilot Writing [3]",
        "TVF 4645 - Introduction to the Writers Room [3]",
        "TVF 4801 - Short Film Incubator [4-8]"
      ]
    },

    {
      title: "Option IV: Media Studies (18 units)",
      courses: [
        "Required:",
        "TVF 4042 - Media Fandoms [3]",
        "TVF 4530 - International Media [3]",
        "TVF 4600 - Media Theory [3]",
        "TVF 4620 - Criticism of Film and Television [3]",
        "Select 6 units from:",
        "TVF 3240 - Third Cinema/Video [3]",
        "TVF 3300 - Documentary in Film and Media [3]",
        "TVF 3540 - Selected Studies [1-3]",
        "TVF 3640 - Television Spec Writing [3]",
        "TVF 3650 - Intermediate Scriptwriting [3]",
        "TVF 3660 - Violence, Culture and the Media [3]",
        "TVF 3980 - Cooperative Education [1-3]",
        "TVF 4300 - Documentary Field Production [3]",
        "TVF 4400 - Non-Commercial Broadcasting and Film [3]",
        "TVF 4450 - Film Festivals and Conferences [3]",
        "TVF 4540 - Selected Studies in Television and Film [1-3]",
        "TVF 4650 - Advanced Screenwriting [3]",
        "TVF 4700 - Media Professions [3]",
        "TVF 4830 - Interactive Media Design Project [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34472"
},
  {
  major: "Theatre",

  description: "Requirements for the Major (53 units). Includes foundational acting, theory, technical production, and specialization in either Performance or Design and Production.",

  sections: [
    {
      title: "Lower Division Core Courses (14 units)",
      courses: [
        "TA 1410 - Acting I [3]",
        "TA 1500 - Theatre Analysis [3]",
        "Select one Dance course:",
        "DANC 1000 - Beginning Ballet [2]",
        "DANC 1400 - Contemporary Dance [2]",
        "DANC 2000 - Intermediate Ballet [2]",
        "DANC 2400 - Intermediate Contemporary Dance [2]",
        "Select 6 units from two of the following areas:",
        "Stagecraft: TA 1301, TA 1310",
        "Lighting: TA 1302, TA 1320",
        "Costume: TA 1303, TA 1330",
        "Sound: TA 1304, TA 1340"
      ]
    },

    {
      title: "Upper Division Core Courses (15 units)",
      courses: [
        "TA 3110 - Development of World Theatre I [3]",
        "TA 3120 - Development of World Theatre II [3]",
        "TA 3900 - Performance Research and Writing [3]",
        "TA 4450 - Principles of Directing [3]",
        "TA 4670 - Praxis: Theory and Practice in Performance [3]"
      ]
    },

    {
      title: "Option I: Performance (24 units)",
      courses: [
        "Required:",
        "TA 1420 - Acting II [3]",
        "TA 2430 - Voice and Speech Work [3]",
        "TA 3480 - Viewpoints [3]",
        "Participation Requirement (6 units):",
        "TA 2000 - Basic Production Participation [1-2]",
        "TA 2100 - Basic Performance Participation [1-2]",
        "TA 3000 - Production Participation [1-2]",
        "TA 4100 - Performance Participation [1-2]",
        "TA 4500 - Design Practicum [1-2]",
        "TA 4490 - Management Practicum [2]",
        "DANC 4100 - Performance Participation [1-2]",
        "Option Electives (9 units):",
        "TA 3390 - Stage Management [3]",
        "TA 3410 - Acting III [3]",
        "TA 4420 - Acting Studio [2]",
        "TA 4440 - Acting for Camera [3]",
        "TA 4460 - Advanced Directing [3]",
        "TA 4470 - Commedia Dell’Arte [3]",
        "TA 4480 - Stage Combat [3]",
        "TA 4750 - Dramaturgy [3]",
        "TA 4760 - Playwriting [3]",
        "TA 4810 - Devised Theatre [3]"
      ]
    },

    {
      title: "Option II: Design and Production (24 units)",
      courses: [
        "Required:",
        "TA 1620 - History of Styles [3]",
        "TA 3390 - Stage Management [3]",
        "TA 4390 - Arts Management [3]",
        "Participation Requirement (6 units):",
        "TA 2000 - Basic Production Participation [1-2]",
        "TA 2100 - Basic Performance Participation [1-2]",
        "TA 3000 - Production Participation [1-2]",
        "TA 4100 - Performance Participation [1-2]",
        "TA 4500 - Design Practicum [1-2]",
        "TA 4490 - Management Practicum [2]",
        "DANC 4100 - Performance Participation [1-2]",
        "Option Electives (9 units):",
        "TA 3310 - Advanced Stagecraft [3]",
        "TA 4220 - Advanced Makeup Design [3]",
        "TA 4260 - Costume Design [3]",
        "TA 4300 - Drafting for Theatre [3]",
        "TA 4320 - Advanced Scenic Design [3]",
        "TA 4340 - Lighting Design [3]",
        "TA 4350 - Advanced Lighting Design [3]",
        "TA 4370 - Introduction to 3D Printing [3]",
        "TA 4540L - Selected Topics in Theatre [1-3]",
        "TA 4540P - Selected Topics in Theatre [1-3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34476&returnto=10632"
},

  // --- U ---
 {
  major: "Urban Learning",

  description: "Requirements for the Major (79–95 units). Includes foundational coursework in urban education, pedagogy, and community-based teaching, with multiple credential pathway options.",

  sections: [
    {
      title: "Lower Division Core Courses (21 units)",
      courses: [
        "EDFN 2010 - Social and Demographic Landscapes of Urban Schooling [3]",
        "HIST 1020 - World History Since 1500 CE [3]",
        "HIST 2080 - California [3]",
        "MATH 1100 - Foundations of the Real Number System for Elementary and Middle School Teachers [3]",
        "MATH 2250 - Explorations in Geometry for Elementary and Middle School Teachers [3]",
        "NATS 1020 - Earth and Space Science [3]",
        "ULRN 2120 - Contemporary Issues in Knowledge, Culture, and Power [3]"
      ]
    },

    {
      title: "Upper Division Core Courses (40 units)",
      courses: [
        "Select one:",
        "EDCI 4010 - English Language Development [3]",
        "EDCI 4011 - Cognitive, Linguistic and Literacy Development of Diverse Learners [3]",
        "EDSP 4010 - Cognitive, Linguistic and Literacy Processes in Individuals with Special Needs [3]",
        "Required:",
        "CLS 3120 - Chicanx/Latinx Parent, Community, & School Partnerships [3]",
        "EDCI 3020 - Visual and Performing Arts in the Inclusive Elementary Classroom [3]",
        "EDFN 4131 - Psychological Foundations of Education [3]",
        "EDIT 4100 - Educational Technology for Urban Educators [3]",
        "EDSP 3010 - Individuals with Disabilities in Contemporary Society [3]",
        "EDSP 4000 - Foundations of Special Education [3]",
        "KIN 4200 - Development of Physical Activity [2]",
        "PAS 4010 - Topics on Education and African American Advancement [3]",
        "ULRN 3000 - College Success and Urban Teacher Preparation [2]",
        "ULRN 4130 - Literacy and the Urban Community [3]",
        "ULRN 4140 - Integrated STEM Project-Based Learning [3]",
        "ULRN 4160 - Ethnic Studies Pedagogies [3]",
        "ULRN 4190 - Senior Seminar in Urban Schooling [3]"
      ]
    },

    {
      title: "Option 1: Integrated Multiple Subject Credential (34 units)",
      courses: [
        "EDCI 4000 - Transformative Teaching in Diverse Urban Classrooms [3]",
        "EDEL 4020 - Instructional Design and Classroom Management [3]",
        "EDEL 4150 - Teaching Reading and Language Arts [3]",
        "EDEL 4160 - Teaching Writing/Language Arts [3]",
        "EDEL 4170 - Teaching Elementary Mathematics [3]",
        "EDEL 4180 - Teaching Elementary Science [3]",
        "EDEL 4190 - Teaching Social Science [3]",
        "EDEL 4880 - Directed Teaching [7]",
        "EDEL 4881 - Reflection and Assessment [3]",
        "ULRN 4170 - Childhood Studies: Race, Culture, and Power [3]"
      ]
    },

    {
      title: "Option 2: Bilingual (Spanish) Credential (34 units)",
      courses: [
        "EDCI 4575 - Foundations of Bilingual Education [3]",
        "EDCI 4000 - Transformative Teaching [3]",
        "EDEL 4020 - Instructional Design [3]",
        "EDEL 4150S - Teaching Reading (Spanish) [3]",
        "EDEL 4160S - Teaching Writing (Spanish) [3]",
        "EDEL 4880 - Directed Teaching [7]",
        "EDEL 4881 - Reflection and Assessment [3]",
        "Select Math, Science, and Social Science courses (Spanish or English versions)"
      ]
    },

    {
      title: "Option 3: Education Specialist Credential (28–32 units)",
      courses: [
        "EDCI 4000 - Transformative Teaching [3]",
        "EDSP 4050 - Instruction in English Language Arts [3]",
        "Sub-options:",
        "Mild to Moderate Support Needs",
        "Extensive Support Needs",
        "Visual Impairments"
      ]
    },

    {
      title: "Option 4: Accelerated Dual Credential (34 units)",
      courses: [
        "EDCI 4000 - Transformative Teaching [3]",
        "EDCI 4111 - Integrated Literacy and Communication [3]",
        "EDCI 4112 - STEM Education [3]",
        "EDCI 4113 - Social Studies and Humanities [3]",
        "EDEL 4455 - Fieldwork in Residency [3]",
        "EDSP 4020 - Assessment and Planning [3]",
        "EDSP 4030 - Behavior Supports [3]",
        "EDSP 4061 - Fieldwork [4]",
        "EDSP 4252 - Instructional Planning [3]",
        "EDSP 4257 - Advanced Literacy Instruction [3]",
        "EDSP 4455 - Residency Fieldwork [3]"
      ]
    },

    {
      title: "Option 5: Teaching and Learning (18 units)",
      courses: [
        "COMM 3890 - Intercultural Communication [3]",
        "ULRN 4170 - Childhood Studies [3]",
        "Select one:",
        "CHDV 4120 - Child Abuse and Violence [3]",
        "SW 3761 - Child Welfare [3]",
        "Electives (9 units) with advisor approval"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34477&returnto=10755"
},

  // --- W ---
  {
  major: "Women’s, Gender, and Sexuality Studies (WGSS)",

  description: "Requirements for the Major (45 units). Focuses on interdisciplinary approaches to gender, sexuality, power, and social justice through theory, research, and community engagement.",

  sections: [
    {
      title: "Core Courses (24 units)",
      courses: [
        "WGSS 2000 - Introduction to Women’s, Gender, and Sexuality Studies [3]",
        "WGSS 3000 - Theories in Women’s, Gender, and Sexuality Studies [3]",
        "WGSS 3150 - Gender, Sexuality, and U.S. Law [3]",
        "WGSS 3400 - LGBT Political History in the US (also listed as HIST 3405) [3]",
        "WGSS 3500 - Intersectionality and Feminist Movements [3]",
        "WGSS 3860 - Gender in Science (also listed as LBS 3860) [3]",
        "WGSS 4000 - Knowledge, Power, and Research Justice in WGSS [3]",
        "WGSS 4500 - Community Engagement and Internship in WGSS [3]"
      ]
    },

    {
      title: "Area of Emphasis (12 units)",
      courses: [
        "Select ONE area and complete 12 units:",

        "Feminist Studies:",
        "WGSS 3050 - Black Feminism and Womanism [3]",
        "WGSS 4160 - Feminist Theories and Contemporary Society [3]",
        "WGSS 4290 - Chicana Feminism: History, Theory, Praxis [3]",
        "WGSS 4710 - Global Feminisms [3]",
        "WGSS 4722 - WGSS in Asian American Communities [3]",
        "WGSS 4820 - Latin American Women’s Movements [3]",
        "WGSS 4830 - Native Feminist Theories and Practices [3]",
        "WGSS 4540 / 4990 - Special Topics / Directed Study [3]",

        "LGBTQ Studies:",
        "WGSS 3650 - LGBTQ Cultural Production [3]",
        "WGSS 4050 - Queer Theory [3]",
        "WGSS 4130 - Issues in Feminist Philosophy [3]",
        "WGSS 4480 - Sexualities and Gender Diversity in Global Perspective [3]",
        "WGSS 4540 / 4990 - Special Topics / Directed Study [3]",

        "Gender Studies:",
        "WGSS 2300 - Gender & American Indian Communities [3]",
        "WGSS 3100 - Critical Masculinities [3]",
        "WGSS 3200 - Disability Studies [3]",
        "WGSS 4480 - Gender Diversity in Global Perspective [3]",
        "WGSS 4650 - Gender, Sexuality, and Transnational Migration [3]",
        "WGSS 4540 / 4990 - Special Topics / Directed Study [3]"
      ]
    },

    {
      title: "Directed Electives (9 units)",
      courses: [
        "Select any 3 courses (9 units) from approved WGSS or related disciplines:",
        "WGSS 1010 - Gender and Sexuality in College [3]",
        "WGSS 2030 - Intersectionality and U.S. Women of Color [3]",
        "WGSS 2200 - Chicanas & Latinas in Contemporary US Society [3]",
        "WGSS 3050 - Black Feminism and Womanism [3]",
        "WGSS 3100 - Critical Masculinities [3]",
        "WGSS 3200 - Disability Studies [3]",
        "WGSS 3650 - LGBTQ Cultural Production [3]",
        "WGSS 3720 - Reproductive Justice [3]",
        "WGSS 4050 - Queer Theory [3]",
        "WGSS 4100 - Chicana and Mexican Women Writers [3]",
        "WGSS 4160 - Feminist Theories and Contemporary Society [3]",
        "WGSS 4290 - Chicana Feminism [3]",
        "WGSS 4480 - Gender Diversity in Global Perspective [3]",
        "WGSS 4650 - Gender & Transnational Migration [3]",
        "WGSS 4710 - Global Feminisms [3]",
        "WGSS 4722 - WGSS in Asian American Communities [3]",
        "WGSS 4820 - Latin American Women’s Movements [3]",
        "WGSS 4840 - Chicana/Latina Narratives [3]",
        "WGSS 4990 - Directed Study [3]",

        "Approved Related Courses:",
        "AAAS 3480 - Race, Class, and Gender [3]",
        "COMM 3835 - Sex and Gender in Language and Literature [3]",
        "COMM 4420 - Feminism and Communication [3]",
        "ENGL 3830 - Gender and Sexuality in Popular Culture [3]",
        "HIST 3570 - Gender and Sex in History [3]",
        "HIST 4090 - Sexuality in the Americas [3]",
        "HIST 4850 - U.S. Women to 1877 [3]",
        "HIST 4860 - U.S. Women, 1877 to Present [3]",
        "PAS 4060 - Black Women Leaders in Thought and Politics [3]",
        "PAS 4080 - Black Sexuality [3]",
        "PAS 4120 - Third World Women and Development [3]",
        "POLS 3100 - Gender, Politics, and Government [3]",
        "PSY 3880 - Sex and Gender [3]",
        "PSY 4160 - Human Sexuality [3]",
        "PSY 4190 - Psychology of Gender [3]",
        "RELS 3350 - Gender and Religion [3]",
        "SOC 3410 - Sociology of Gender [3]",
        "SOC 4210 - Social Sources of Human Sexuality [3]",
        "SOC 4410 - Researching Gender in Social Institutions [3]",
        "SOC 4430 - Social Policy and Families [3]",
        "SOC 4570 - Women and Aging [3]",
        "SW 4860 - Social Work Practice with LGBTQ Populations [3]"
      ]
    }
  ],

  curriculumLink: "https://ecatalog.calstatela.edu/preview_program.php?catoid=75&poid=34543"
}
];

export { curriculumData };