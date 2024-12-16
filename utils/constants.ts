import { width } from "@fortawesome/free-solid-svg-icons/fa0";

export const Tags = [
  "2 sat", "binary search", "bitmasks", "brute force", "chinese remainder theorem", "combinatorics", "constructive algorithms", "data structures", "dfs and similar", "divide and conquer", "dp", "dsu", "expression parsing", "fft", "flows", "games", "geometry", "graph matchings", "graphs", "greedy", "hashing", "implementation", "interactive", "math", "matrices", "meet in the middle", "number theory", "probabilities", "schedules", "shortest paths", "sortings", "string suffix structures", "strings", "ternary search", "trees", "two pointers"
]

export const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ formula: 'latex' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

export const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'formula',
  'script',
  'list',
  'bullet',
  'link',
  'image',
  'code-block',
];

export const programmingLanguages = {
  'cpp': 'C++',
  'python': 'Python',
  'java': 'Java',
}

export const verdicts = [
  'AC', 'WA', 'CE', 'MLE', 'TLE', 'RE', 'OE'
]

export const verdictNames = [
  'Accepted', 
  'Wrong Answer', 
  'Compilation Error', 
  'Memory Limit Exceeded', 
  'Time Limit Exceeded', 
  'Runtime Error', 
  'Unknown Error'
]

export const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  content: {
    border: 'none',
    borderRadius: '8px',
    padding: '20px',
    margin: 'auto',
    width: '80%',
    height: '80%',
  },
};