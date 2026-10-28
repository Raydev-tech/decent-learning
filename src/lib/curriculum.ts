
export type Lesson = {
  title: string;
  duration: string;
  preview?: boolean;
};

export type Module = {
  title: string;
  description: string;
  lessons: Lesson[];
};

export type Curriculum = {
  subtitle: string;
  duration: string;
  level: string;
  outcomes: string[];
  requirements: string[];
  modules: Module[];
};

const frontendCurriculum: Curriculum = {
  subtitle: "Build modern, responsive websites from scratch.",
  duration: "8 weeks",
  level: "Beginner",
  outcomes: [
    "Structure web pages using semantic HTML.",
    "Style responsive layouts with modern CSS.",
    "Use JavaScript to add interactivity.",
    "Build and publish a portfolio website.",
  ],
  requirements: [
    "A laptop or desktop computer.",
    "A modern web browser.",
    "A willingness to practise and build projects.",
  ],
  modules: [
    {
      title: "Module 1: Introduction to Web Development",
      description: "Understand how websites work.",
      lessons: [
        { title: "Welcome to the programme", duration: "5 min", preview: true },
        { title: "How the internet and websites work", duration: "12 min", preview: true },
        { title: "Installing VS Code and browser tools", duration: "15 min" },
      ],
    },
    {
      title: "Module 2: HTML Fundamentals",
      description: "Create the structure of web pages.",
      lessons: [
        { title: "Your first HTML document", duration: "15 min" },
        { title: "Headings, paragraphs and links", duration: "18 min" },
        { title: "Images, lists and semantic elements", duration: "22 min" },
        { title: "Forms and input elements", duration: "25 min" },
      ],
    },
    {
      title: "Module 3: CSS and Responsive Design",
      description: "Make websites beautiful and adaptable.",
      lessons: [
        { title: "CSS selectors and styling", duration: "20 min" },
        { title: "Flexbox and CSS Grid", duration: "25 min" },
        { title: "Responsive design and media queries", duration: "25 min" },
      ],
    },
    {
      title: "Module 4: JavaScript Essentials",
      description: "Add logic and interactivity.",
      lessons: [
        { title: "Variables, data types and operators", duration: "25 min" },
        { title: "Functions and conditions", duration: "25 min" },
        { title: "Arrays, objects and loops", duration: "30 min" },
        { title: "DOM manipulation and events", duration: "30 min" },
      ],
    },
    {
      title: "Module 5: Build and Publish a Project",
      description: "Put your skills into practice.",
      lessons: [
        { title: "Plan your portfolio website", duration: "15 min" },
        { title: "Build the responsive interface", duration: "45 min" },
        { title: "Test and publish your project", duration: "25 min" },
      ],
    },
  ],
};

const javascriptCurriculum: Curriculum = {
  subtitle: "Master JavaScript through practical exercises and projects.",
  duration: "6 weeks",
  level: "Beginner",
  outcomes: [
    "Understand variables, types and operators.",
    "Write reusable functions and use modern JavaScript.",
    "Work with arrays, objects and asynchronous code.",
    "Build interactive browser applications.",
  ],
  requirements: [
    "A computer with a modern browser.",
    "VS Code installed.",
    "Basic HTML familiarity is helpful but not essential.",
  ],
  modules: [
    {
      title: "Module 1: JavaScript Foundations",
      description: "Get comfortable with the language.",
      lessons: [
        { title: "What is JavaScript?", duration: "10 min", preview: true },
        { title: "Variables and data types", duration: "20 min" },
        { title: "Operators and expressions", duration: "20 min" },
      ],
    },
    {
      title: "Module 2: Control Flow and Functions",
      description: "Write reusable, logical programs.",
      lessons: [
        { title: "Conditions and comparisons", duration: "20 min" },
        { title: "Loops and iteration", duration: "20 min" },
        { title: "Functions and scope", duration: "30 min" },
      ],
    },
    {
      title: "Module 3: Arrays and Objects",
      description: "Organise and manipulate data.",
      lessons: [
        { title: "Working with arrays", duration: "25 min" },
        { title: "Objects and object methods", duration: "25 min" },
        { title: "Modern JavaScript syntax", duration: "25 min" },
      ],
    },
    {
      title: "Module 4: The Browser and APIs",
      description: "Make interactive web applications.",
      lessons: [
        { title: "DOM selection and manipulation", duration: "30 min" },
        { title: "Events and forms", duration: "25 min" },
        { title: "Fetch and asynchronous JavaScript", duration: "30 min" },
      ],
    },
    {
      title: "Module 5: Build a JavaScript Project",
      description: "Apply your skills in a practical project.",
      lessons: [
        { title: "Project planning", duration: "15 min" },
        { title: "Build an interactive application", duration: "45 min" },
        { title: "Debugging and improvements", duration: "25 min" },
      ],
    },
  ],
};

const solidityCurriculum: Curriculum = {
  subtitle: "Explore blockchain development and learn to write smart contracts.",
  duration: "8 weeks",
  level: "Intermediate",
  outcomes: [
    "Explain blockchain and Ethereum fundamentals.",
    "Write Solidity contracts and understand their structure.",
    "Test contracts in a local development environment.",
    "Recognise common smart contract security risks.",
  ],
  requirements: [
    "Basic programming knowledge is recommended.",
    "A laptop with VS Code.",
    "No real cryptocurrency is needed for the practice exercises.",
  ],
  modules: [
    {
      title: "Module 1: Blockchain Fundamentals",
      description: "Understand the technology behind decentralised apps.",
      lessons: [
        { title: "What is a blockchain?", duration: "15 min", preview: true },
        { title: "Transactions, blocks and consensus", duration: "25 min" },
        { title: "Ethereum and smart contracts", duration: "25 min" },
      ],
    },
    {
      title: "Module 2: Solidity Basics",
      description: "Learn the Solidity programming language.",
      lessons: [
        { title: "Your first Solidity contract", duration: "25 min" },
        { title: "Variables, functions and visibility", duration: "30 min" },
        { title: "Mappings, arrays and structs", duration: "30 min" },
      ],
    },
    {
      title: "Module 3: Development Tools",
      description: "Compile and test smart contracts.",
      lessons: [
        { title: "Set up a local development project", duration: "25 min" },
        { title: "Compile and deploy a practice contract", duration: "30 min" },
        { title: "Write automated contract tests", duration: "35 min" },
      ],
    },
    {
      title: "Module 4: Smart Contract Security",
      description: "Learn defensive development principles.",
      lessons: [
        { title: "Access control and permissions", duration: "25 min" },
        { title: "Reentrancy and external calls", duration: "30 min" },
        { title: "Checks, effects and interactions", duration: "25 min" },
      ],
    },
    {
      title: "Module 5: Final Project",
      description: "Create and test a sample smart contract.",
      lessons: [
        { title: "Plan a simple on-chain application", duration: "20 min" },
        { title: "Implement and test your contract", duration: "45 min" },
        { title: "Review, document and improve security", duration: "30 min" },
      ],
    },
  ],
};

const cybersecurityCurriculum: Curriculum = {
  subtitle: "Learn security fundamentals and defensive cybersecurity practices.",
  duration: "6 weeks",
  level: "Beginner",
  outcomes: [
    "Understand common cyber threats and attack surfaces.",
    "Apply basic account and device security practices.",
    "Recognise phishing and common social engineering tactics.",
    "Understand security testing in authorised environments.",
  ],
  requirements: [
    "A computer and internet access.",
    "Curiosity about computer security.",
    "Practise only in systems and labs you are authorised to use.",
  ],
  modules: [
    {
      title: "Module 1: Security Foundations",
      description: "Learn the principles of information security.",
      lessons: [
        { title: "Introduction to cybersecurity", duration: "15 min", preview: true },
        { title: "Confidentiality, integrity and availability", duration: "20 min" },
        { title: "Threats, risks and vulnerabilities", duration: "25 min" },
      ],
    },
    {
      title: "Module 2: Network and Web Basics",
      description: "Understand the systems we protect.",
      lessons: [
        { title: "Networks and common protocols", duration: "25 min" },
        { title: "How websites and HTTPS work", duration: "25 min" },
        { title: "Identity, authentication and access", duration: "25 min" },
      ],
    },
    {
      title: "Module 3: Everyday Security",
      description: "Build stronger security habits.",
      lessons: [
        { title: "Passwords and multi-factor authentication", duration: "20 min" },
        { title: "Phishing and social engineering", duration: "25 min" },
        { title: "Device and data protection", duration: "20 min" },
      ],
    },
    {
      title: "Module 4: Safe Security Practice",
      description: "Explore responsible testing and reporting.",
      lessons: [
        { title: "Security lab setup and safe boundaries", duration: "20 min" },
        { title: "Introduction to vulnerability assessment", duration: "30 min" },
        { title: "Writing a clear security report", duration: "25 min" },
      ],
    },
  ],
};

export const curricula: Record<string, Curriculum> = {
  "frontend-development": frontendCurriculum,
  javascript: javascriptCurriculum,
  "solidity-blockchain": solidityCurriculum,
  "smart-contract-auditing": solidityCurriculum,
  cybersecurity: cybersecurityCurriculum,
};
