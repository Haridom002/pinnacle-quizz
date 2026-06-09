export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface BankQuestion {
  text: string;
  answers: string[];
  correct: number;
  difficulty: Difficulty;
}

export interface GESBank {
  [subject: string]: {
    [grade: string]: {
      [strand: string]: {
        [subStrand: string]: {
          [topic: string]: BankQuestion[];
        };
      };
    };
  };
}

export const GES_BANK: GESBank = {
  "Mathematics": {
    "Grade 1": {
      "Number": {
        "Counting and Numerals": {
          "Counting 1-100": [
            {
              "text": "What number comes after 9?",
              "answers": [
                "10",
                "8",
                "11",
                "7"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What number comes before 5?",
              "answers": [
                "4",
                "6",
                "3",
                "7"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "How many fingers do you have on both hands?",
              "answers": [
                "10",
                "8",
                "12",
                "9"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Count the stars: \u2605\u2605\u2605\u2605\u2605. How many are there?",
              "answers": [
                "5",
                "4",
                "6",
                "3"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What number is missing? 1, 2, 3, __, 5",
              "answers": [
                "4",
                "6",
                "2",
                "7"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ],
          "Comparing Numbers": [
            {
              "text": "Which number is greater: 7 or 4?",
              "answers": [
                "7",
                "4",
                "They are equal",
                "Cannot tell"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which number is smaller: 3 or 8?",
              "answers": [
                "3",
                "8",
                "They are equal",
                "Cannot tell"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Arrange in order from smallest: 5, 2, 8, 1",
              "answers": [
                "1,2,5,8",
                "8,5,2,1",
                "2,1,5,8",
                "5,8,1,2"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ]
        },
        "Addition and Subtraction": {
          "Addition within 20": [
            {
              "text": "What is 3 + 4?",
              "answers": [
                "7",
                "6",
                "8",
                "5"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What is 5 + 6?",
              "answers": [
                "11",
                "10",
                "12",
                "9"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What is 8 + 7?",
              "answers": [
                "15",
                "14",
                "16",
                "13"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "John has 4 mangoes. He gets 5 more. How many does he have?",
              "answers": [
                "9",
                "8",
                "10",
                "7"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What is 9 + 9?",
              "answers": [
                "18",
                "17",
                "19",
                "16"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ],
          "Subtraction within 20": [
            {
              "text": "What is 10 - 3?",
              "answers": [
                "7",
                "6",
                "8",
                "5"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What is 15 - 6?",
              "answers": [
                "9",
                "8",
                "10",
                "7"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Ama has 12 oranges. She gives away 5. How many are left?",
              "answers": [
                "7",
                "6",
                "8",
                "5"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ]
        }
      },
      "Geometry": {
        "Shapes": {
          "2D Shapes": [
            {
              "text": "How many sides does a triangle have?",
              "answers": [
                "3",
                "4",
                "2",
                "5"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "How many sides does a square have?",
              "answers": [
                "4",
                "3",
                "5",
                "6"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What shape is a wheel?",
              "answers": [
                "Circle",
                "Square",
                "Triangle",
                "Rectangle"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which shape has no corners?",
              "answers": [
                "Circle",
                "Square",
                "Triangle",
                "Rectangle"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ]
        }
      }
    },
    "Grade 2": {
      "Number": {
        "Number Operations": {
          "Multiplication Introduction": [
            {
              "text": "What is 2 \u00d7 3?",
              "answers": [
                "6",
                "5",
                "7",
                "8"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What is 4 \u00d7 2?",
              "answers": [
                "8",
                "6",
                "10",
                "7"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "There are 3 baskets with 4 oranges each. How many oranges in total?",
              "answers": [
                "12",
                "10",
                "8",
                "15"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What is 5 \u00d7 2?",
              "answers": [
                "10",
                "8",
                "12",
                "7"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ],
          "Addition within 100": [
            {
              "text": "What is 23 + 14?",
              "answers": [
                "37",
                "36",
                "38",
                "35"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What is 45 + 32?",
              "answers": [
                "77",
                "76",
                "78",
                "75"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What is 56 + 27?",
              "answers": [
                "83",
                "82",
                "84",
                "81"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        },
        "Place Value": {
          "Tens and Ones": [
            {
              "text": "How many tens are in 34?",
              "answers": [
                "3",
                "4",
                "30",
                "13"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What is the value of 5 in 52?",
              "answers": [
                "50",
                "5",
                "52",
                "25"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What number has 6 tens and 4 ones?",
              "answers": [
                "64",
                "46",
                "640",
                "406"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ]
        }
      }
    },
    "Grade 3": {
      "Number": {
        "Multiplication and Division": {
          "Multiplication Tables": [
            {
              "text": "What is 6 \u00d7 7?",
              "answers": [
                "42",
                "48",
                "36",
                "40"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is 8 \u00d7 9?",
              "answers": [
                "72",
                "63",
                "81",
                "64"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is 7 \u00d7 7?",
              "answers": [
                "49",
                "42",
                "56",
                "48"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is 9 \u00d7 6?",
              "answers": [
                "54",
                "45",
                "63",
                "48"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ],
          "Division": [
            {
              "text": "What is 24 \u00f7 4?",
              "answers": [
                "6",
                "5",
                "7",
                "8"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is 36 \u00f7 6?",
              "answers": [
                "6",
                "7",
                "5",
                "8"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Share 20 sweets equally among 5 children. How many each?",
              "answers": [
                "4",
                "5",
                "3",
                "6"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ]
        },
        "Fractions": {
          "Simple Fractions": [
            {
              "text": "What fraction of a pizza is one slice if it is cut into 4 equal parts?",
              "answers": [
                "1/4",
                "1/2",
                "1/3",
                "2/4"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which fraction is greater: 1/2 or 1/4?",
              "answers": [
                "1/2",
                "1/4",
                "They are equal",
                "Cannot tell"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is half of 10?",
              "answers": [
                "5",
                "4",
                "6",
                "8"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ]
        }
      }
    },
    "Grade 4": {
      "Number": {
        "Fractions and Decimals": {
          "Adding Fractions": [
            {
              "text": "What is 1/4 + 1/4?",
              "answers": [
                "1/2",
                "2/8",
                "1/8",
                "2/4"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is 1/3 + 1/3?",
              "answers": [
                "2/3",
                "2/6",
                "1/6",
                "3/6"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is 3/8 + 1/8?",
              "answers": [
                "4/8",
                "4/16",
                "2/8",
                "5/8"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ],
          "Decimals": [
            {
              "text": "What is 0.5 + 0.5?",
              "answers": [
                "1.0",
                "0.10",
                "1.5",
                "0.55"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Which decimal is greater: 0.7 or 0.3?",
              "answers": [
                "0.7",
                "0.3",
                "They are equal",
                "Cannot tell"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What is 1.2 + 2.3?",
              "answers": [
                "3.5",
                "3.23",
                "4.5",
                "2.5"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      },
      "Measurement": {
        "Length and Perimeter": {
          "Perimeter": [
            {
              "text": "What is the perimeter of a square with side 5 cm?",
              "answers": [
                "20 cm",
                "25 cm",
                "15 cm",
                "10 cm"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "A rectangle is 6 cm long and 4 cm wide. What is its perimeter?",
              "answers": [
                "20 cm",
                "24 cm",
                "10 cm",
                "12 cm"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      }
    },
    "Grade 5": {
      "Number": {
        "Percentages and Ratios": {
          "Percentages": [
            {
              "text": "What is 50% of 80?",
              "answers": [
                "40",
                "50",
                "30",
                "60"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is 25% of 100?",
              "answers": [
                "25",
                "50",
                "75",
                "20"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "A shirt costs GH\u20b550. It is discounted by 10%. What is the new price?",
              "answers": [
                "GH\u20b545",
                "GH\u20b540",
                "GH\u20b555",
                "GH\u20b535"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ],
          "Ratios": [
            {
              "text": "Simplify the ratio 4:8",
              "answers": [
                "1:2",
                "2:4",
                "4:8",
                "1:4"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "In a class of 30, the ratio of boys to girls is 2:3. How many girls are there?",
              "answers": [
                "18",
                "12",
                "15",
                "20"
              ],
              "correct": 0,
              "difficulty": "advanced"
            }
          ]
        }
      },
      "Algebra": {
        "Simple Equations": {
          "Solving for x": [
            {
              "text": "If x + 5 = 12, what is x?",
              "answers": [
                "7",
                "8",
                "6",
                "17"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "If 2x = 14, what is x?",
              "answers": [
                "7",
                "6",
                "8",
                "28"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "If x - 3 = 9, what is x?",
              "answers": [
                "12",
                "6",
                "13",
                "9"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      }
    },
    "Grade 6": {
      "Number": {
        "Integers": {
          "Operations with Integers": [
            {
              "text": "What is -3 + 7?",
              "answers": [
                "4",
                "-4",
                "10",
                "-10"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is -5 \u00d7 -2?",
              "answers": [
                "10",
                "-10",
                "7",
                "-7"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is -8 + 3?",
              "answers": [
                "-5",
                "5",
                "-11",
                "11"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      },
      "Algebra": {
        "Linear Equations": {
          "One-step Equations": [
            {
              "text": "Solve: 3x = 21",
              "answers": [
                "7",
                "6",
                "8",
                "63"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Solve: x/4 = 5",
              "answers": [
                "20",
                "9",
                "1",
                "25"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Solve: 2x + 3 = 11",
              "answers": [
                "4",
                "7",
                "3",
                "8"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      },
      "Geometry": {
        "Angles": {
          "Types of Angles": [
            {
              "text": "What type of angle is 90\u00b0?",
              "answers": [
                "Right angle",
                "Acute angle",
                "Obtuse angle",
                "Straight angle"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What type of angle is 45\u00b0?",
              "answers": [
                "Acute angle",
                "Right angle",
                "Obtuse angle",
                "Reflex angle"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What type of angle is 120\u00b0?",
              "answers": [
                "Obtuse angle",
                "Acute angle",
                "Right angle",
                "Straight angle"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Angles in a triangle add up to?",
              "answers": [
                "180\u00b0",
                "360\u00b0",
                "90\u00b0",
                "270\u00b0"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      }
    },
    "Grade 7": {
      "Number": {
        "Indices and Standard Form": {
          "Laws of Indices": [
            {
              "text": "What is 2\u00b3?",
              "answers": [
                "8",
                "6",
                "9",
                "12"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is 5\u00b2?",
              "answers": [
                "25",
                "10",
                "15",
                "20"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Simplify: x\u00b2 \u00d7 x\u00b3",
              "answers": [
                "x\u2075",
                "x\u2076",
                "x",
                "x\u00b2"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is 10\u00b3 in standard form?",
              "answers": [
                "1000",
                "100",
                "10000",
                "300"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      },
      "Algebra": {
        "Expressions and Equations": {
          "Expanding Brackets": [
            {
              "text": "Expand: 2(x + 3)",
              "answers": [
                "2x + 6",
                "2x + 3",
                "x + 6",
                "2x + 5"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Expand: 3(2x - 4)",
              "answers": [
                "6x - 12",
                "6x - 4",
                "3x - 12",
                "6x + 12"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Simplify: 3x + 2x - x",
              "answers": [
                "4x",
                "5x",
                "6x",
                "3x"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      },
      "Statistics": {
        "Data Handling": {
          "Mean, Median, Mode": [
            {
              "text": "Find the mean of: 4, 6, 8, 10, 12",
              "answers": [
                "8",
                "6",
                "10",
                "7"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Find the mode of: 3, 5, 3, 7, 3, 8",
              "answers": [
                "3",
                "5",
                "7",
                "8"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Find the median of: 2, 5, 7, 9, 11",
              "answers": [
                "7",
                "5",
                "9",
                "2"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      }
    },
    "Grade 8": {
      "Algebra": {
        "Quadratic Expressions": {
          "Factorisation": [
            {
              "text": "Factorise: x\u00b2 + 5x + 6",
              "answers": [
                "(x+2)(x+3)",
                "(x+1)(x+6)",
                "(x+5)(x+1)",
                "(x+4)(x+2)"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "Factorise: x\u00b2 - 9",
              "answers": [
                "(x+3)(x-3)",
                "(x-9)(x+1)",
                "(x-3)\u00b2",
                "(x+9)(x-1)"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "Factorise: 2x\u00b2 + 4x",
              "answers": [
                "2x(x+2)",
                "2(x\u00b2+2x)",
                "x(2x+4)",
                "2x\u00b2(1+2)"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      },
      "Geometry": {
        "Circle Theorems": {
          "Basic Circle Properties": [
            {
              "text": "What is the formula for the area of a circle?",
              "answers": [
                "\u03c0r\u00b2",
                "2\u03c0r",
                "\u03c0d",
                "r\u00b2"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is the formula for circumference of a circle?",
              "answers": [
                "2\u03c0r",
                "\u03c0r\u00b2",
                "\u03c0r",
                "2r"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "A circle has radius 7 cm. What is its area? (\u03c0 = 22/7)",
              "answers": [
                "154 cm\u00b2",
                "44 cm\u00b2",
                "49 cm\u00b2",
                "22 cm\u00b2"
              ],
              "correct": 0,
              "difficulty": "advanced"
            }
          ]
        }
      },
      "Statistics": {
        "Probability": {
          "Basic Probability": [
            {
              "text": "A bag has 3 red and 2 blue balls. What is the probability of picking a red ball?",
              "answers": [
                "3/5",
                "2/5",
                "1/5",
                "3/2"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is the probability of getting a head when tossing a fair coin?",
              "answers": [
                "1/2",
                "1/4",
                "1",
                "0"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "A die is rolled. What is the probability of getting a 6?",
              "answers": [
                "1/6",
                "1/3",
                "1/2",
                "6"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ]
        }
      }
    },
    "Grade 9": {
      "Algebra": {
        "Simultaneous Equations": {
          "Solving Simultaneously": [
            {
              "text": "Solve: x + y = 5 and x - y = 1. What is x?",
              "answers": [
                "3",
                "4",
                "2",
                "5"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "Solve: 2x + y = 7 and x + y = 4. What is x?",
              "answers": [
                "3",
                "1",
                "4",
                "2"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "Solve: x + y = 10 and x - y = 4. What is y?",
              "answers": [
                "3",
                "7",
                "4",
                "6"
              ],
              "correct": 0,
              "difficulty": "advanced"
            }
          ]
        }
      },
      "Geometry": {
        "Trigonometry": {
          "Basic Trigonometry": [
            {
              "text": "In a right triangle, what is sin \u03b8 equal to?",
              "answers": [
                "Opposite/Hypotenuse",
                "Adjacent/Hypotenuse",
                "Opposite/Adjacent",
                "Hypotenuse/Opposite"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "In a right triangle, what is cos \u03b8 equal to?",
              "answers": [
                "Adjacent/Hypotenuse",
                "Opposite/Hypotenuse",
                "Opposite/Adjacent",
                "Hypotenuse/Adjacent"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "What is tan 45\u00b0?",
              "answers": [
                "1",
                "0",
                "\u221a2",
                "1/2"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "What is sin 30\u00b0?",
              "answers": [
                "1/2",
                "\u221a3/2",
                "1",
                "\u221a2/2"
              ],
              "correct": 0,
              "difficulty": "advanced"
            }
          ]
        }
      },
      "Statistics": {
        "Probability": {
          "Combined Events": [
            {
              "text": "Two coins are tossed. What is the probability of getting two heads?",
              "answers": [
                "1/4",
                "1/2",
                "1/8",
                "3/4"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "A bag has 4 red, 3 blue, 3 green balls. What is the probability of NOT picking red?",
              "answers": [
                "6/10",
                "4/10",
                "3/10",
                "7/10"
              ],
              "correct": 0,
              "difficulty": "advanced"
            }
          ]
        }
      }
    }
  },
  "English Language": {
    "Grade 1": {
      "Reading and Writing": {
        "Phonics": {
          "Letter Sounds": [
            {
              "text": "Which word starts with the sound 'b'?",
              "answers": [
                "Ball",
                "Cat",
                "Dog",
                "Fish"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which word ends with the sound 't'?",
              "answers": [
                "Cat",
                "Dog",
                "Fish",
                "Hen"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which word rhymes with 'hat'?",
              "answers": [
                "Cat",
                "Dog",
                "Sun",
                "Tree"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "How many syllables in 'banana'?",
              "answers": [
                "3",
                "2",
                "4",
                "1"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        },
        "Sight Words": {
          "Common Words": [
            {
              "text": "Which word means the opposite of 'big'?",
              "answers": [
                "Small",
                "Tall",
                "Wide",
                "Long"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Fill in the blank: The cat ___ on the mat.",
              "answers": [
                "sat",
                "sit",
                "sets",
                "set"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which of these is a colour word?",
              "answers": [
                "Blue",
                "Run",
                "Jump",
                "Fast"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ]
        }
      }
    },
    "Grade 2": {
      "Grammar": {
        "Parts of Speech": {
          "Nouns and Verbs": [
            {
              "text": "Which word is a noun?",
              "answers": [
                "School",
                "Run",
                "Happy",
                "Quickly"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which word is a verb?",
              "answers": [
                "Jump",
                "Ball",
                "Tall",
                "Book"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which word is an adjective?",
              "answers": [
                "Beautiful",
                "Dance",
                "School",
                "Eat"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "The plural of 'child' is:",
              "answers": [
                "Children",
                "Childs",
                "Childes",
                "Child"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      }
    },
    "Grade 3": {
      "Grammar": {
        "Tenses": {
          "Past Present Future": [
            {
              "text": "Choose the correct past tense of 'go':",
              "answers": [
                "Went",
                "Goed",
                "Going",
                "Goes"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which sentence is in the present tense?",
              "answers": [
                "She eats rice",
                "She ate rice",
                "She will eat rice",
                "She has eaten rice"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "The past tense of 'run' is:",
              "answers": [
                "Ran",
                "Runned",
                "Runs",
                "Running"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Fill in: Tomorrow, we ___ to school.",
              "answers": [
                "will go",
                "went",
                "go",
                "going"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      },
      "Reading Comprehension": {
        "Understanding Texts": {
          "Main Idea": [
            {
              "text": "What is a 'main idea' in a passage?",
              "answers": [
                "The most important point",
                "A supporting detail",
                "The title",
                "The last sentence"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What does 'comprehension' mean?",
              "answers": [
                "Understanding",
                "Writing",
                "Speaking",
                "Spelling"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ]
        }
      }
    },
    "Grade 4": {
      "Grammar": {
        "Punctuation": {
          "Using Punctuation": [
            {
              "text": "Which punctuation ends a question?",
              "answers": [
                "?",
                "!",
                ".",
                "'"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which sentence is correctly punctuated?",
              "answers": [
                "Kofi went to school.",
                "Kofi went to school?",
                "Kofi went to school!",
                "kofi went to school."
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "A comma is used to:",
              "answers": [
                "Separate items in a list",
                "End a sentence",
                "Show ownership",
                "Ask a question"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        },
        "Pronouns": {
          "Using Pronouns": [
            {
              "text": "Replace 'Ama and Kofi' with the correct pronoun:",
              "answers": [
                "They",
                "He",
                "She",
                "We"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which is a possessive pronoun?",
              "answers": [
                "Mine",
                "I",
                "Me",
                "My"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Choose the correct pronoun: ___ is my friend.",
              "answers": [
                "He",
                "Him",
                "His",
                "Himself"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      }
    },
    "Grade 5": {
      "Grammar": {
        "Sentence Structure": {
          "Types of Sentences": [
            {
              "text": "Which sentence is a command?",
              "answers": [
                "Close the door.",
                "Is the door closed?",
                "The door is closed.",
                "What a door!"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "An exclamatory sentence ends with:",
              "answers": [
                "!",
                "?",
                ".",
                "'"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Identify the subject in: 'The tall boy ran fast.'",
              "answers": [
                "The tall boy",
                "ran",
                "fast",
                "tall"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      },
      "Vocabulary": {
        "Word Meanings": {
          "Synonyms and Antonyms": [
            {
              "text": "What is a synonym for 'happy'?",
              "answers": [
                "Joyful",
                "Sad",
                "Angry",
                "Tired"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What is an antonym for 'hot'?",
              "answers": [
                "Cold",
                "Warm",
                "Cool",
                "Mild"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What is a synonym for 'big'?",
              "answers": [
                "Large",
                "Small",
                "Tiny",
                "Short"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ]
        }
      }
    },
    "Grade 6": {
      "Grammar": {
        "Active and Passive Voice": {
          "Voice": [
            {
              "text": "Change to passive: 'The boy kicked the ball.'",
              "answers": [
                "The ball was kicked by the boy",
                "The ball kicked the boy",
                "The boy was kicked the ball",
                "The ball is kicked by boy"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "Which sentence is in passive voice?",
              "answers": [
                "The cake was eaten by Mary",
                "Mary ate the cake",
                "Mary eats cake",
                "Mary will eat the cake"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "In passive voice, the ___ receives the action.",
              "answers": [
                "Subject",
                "Object",
                "Verb",
                "Adverb"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      },
      "Literature": {
        "Poetry": {
          "Poetic Devices": [
            {
              "text": "What is a simile?",
              "answers": [
                "Comparing using 'like' or 'as'",
                "A type of rhyme",
                "Repeating sounds",
                "Exaggeration"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is alliteration?",
              "answers": [
                "Repetition of initial consonant sounds",
                "Comparison using like",
                "Giving objects human qualities",
                "Extreme exaggeration"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is personification?",
              "answers": [
                "Giving human qualities to non-human things",
                "A comparison using like",
                "Repetition of sounds",
                "A type of rhyme"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      }
    },
    "Grade 7": {
      "Grammar": {
        "Reported Speech": {
          "Direct and Indirect Speech": [
            {
              "text": "Change to indirect speech: He said 'I am tired.'",
              "answers": [
                "He said he was tired",
                "He said I am tired",
                "He says he is tired",
                "He told I was tired"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "In reported speech, 'will' changes to:",
              "answers": [
                "Would",
                "Shall",
                "Could",
                "Should"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "In reported speech, 'am/is' changes to:",
              "answers": [
                "Was/Were",
                "Is/Are",
                "Be",
                "Been"
              ],
              "correct": 0,
              "difficulty": "advanced"
            }
          ]
        }
      },
      "Writing": {
        "Essay Writing": {
          "Types of Essays": [
            {
              "text": "An essay that argues a point is called:",
              "answers": [
                "Argumentative",
                "Narrative",
                "Descriptive",
                "Expository"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is the purpose of a topic sentence?",
              "answers": [
                "Introduce the main idea of a paragraph",
                "End a paragraph",
                "Give an example",
                "Provide evidence"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      }
    },
    "Grade 8": {
      "Grammar": {
        "Conditional Sentences": {
          "Types of Conditionals": [
            {
              "text": "Complete: If it rains, we ___ stay inside.",
              "answers": [
                "will",
                "would",
                "shall",
                "should"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Which is a second conditional sentence?",
              "answers": [
                "If I were rich, I would travel",
                "If it rains, I will stay home",
                "When I study, I pass",
                "Unless you hurry, you'll be late"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "Complete: If she had studied, she ___ passed.",
              "answers": [
                "would have",
                "will have",
                "would",
                "had"
              ],
              "correct": 0,
              "difficulty": "advanced"
            }
          ]
        }
      },
      "Literature": {
        "Prose": {
          "Elements of a Story": [
            {
              "text": "What is the 'climax' of a story?",
              "answers": [
                "The most exciting turning point",
                "The beginning",
                "The end",
                "The setting"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is the 'setting' of a story?",
              "answers": [
                "The time and place",
                "The main character",
                "The problem",
                "The solution"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What is 'conflict' in a story?",
              "answers": [
                "A struggle between opposing forces",
                "The main character",
                "The location",
                "The happy ending"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      }
    },
    "Grade 9": {
      "Grammar": {
        "Complex Sentences": {
          "Clauses": [
            {
              "text": "Identify the subordinate clause: 'Although it was raining, we played football.'",
              "answers": [
                "Although it was raining",
                "we played football",
                "it was raining",
                "we played"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "A clause that cannot stand alone is called:",
              "answers": [
                "Subordinate clause",
                "Main clause",
                "Independent clause",
                "Simple clause"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "Which word is a subordinating conjunction?",
              "answers": [
                "Although",
                "And",
                "But",
                "Or"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      },
      "Literature": {
        "Drama": {
          "Elements of Drama": [
            {
              "text": "What is a 'soliloquy'?",
              "answers": [
                "A speech made alone on stage",
                "A conversation between two characters",
                "A type of stage direction",
                "A dramatic ending"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "What is dramatic irony?",
              "answers": [
                "When the audience knows something characters don't",
                "When a character speaks alone",
                "When a play ends sadly",
                "When actors use props"
              ],
              "correct": 0,
              "difficulty": "advanced"
            }
          ]
        }
      }
    }
  },
  "Science": {
    "Grade 1": {
      "Life Science": {
        "Living Things": {
          "Characteristics of Living Things": [
            {
              "text": "Which of these is a living thing?",
              "answers": [
                "Plant",
                "Rock",
                "Water",
                "Air"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which of these needs food to survive?",
              "answers": [
                "Dog",
                "Stone",
                "Chair",
                "Water"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What do plants need to make their own food?",
              "answers": [
                "Sunlight",
                "Darkness",
                "Sand",
                "Ice"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which of these can grow?",
              "answers": [
                "Tree",
                "Car",
                "Shoe",
                "Book"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ]
        }
      },
      "Physical Science": {
        "Materials": {
          "Properties of Materials": [
            {
              "text": "Which material is hard?",
              "answers": [
                "Rock",
                "Cotton",
                "Water",
                "Air"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which object sinks in water?",
              "answers": [
                "Stone",
                "Wood",
                "Leaf",
                "Balloon"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What happens to ice when heated?",
              "answers": [
                "It melts",
                "It freezes",
                "It burns",
                "It floats"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ]
        }
      }
    },
    "Grade 2": {
      "Life Science": {
        "Plants": {
          "Parts of a Plant": [
            {
              "text": "Which part of a plant absorbs water from the soil?",
              "answers": [
                "Roots",
                "Leaves",
                "Stem",
                "Flower"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which part of a plant makes food using sunlight?",
              "answers": [
                "Leaves",
                "Roots",
                "Stem",
                "Seed"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What does a seed grow into?",
              "answers": [
                "A plant",
                "A fruit",
                "A flower",
                "A root"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which part of a plant carries water from roots to leaves?",
              "answers": [
                "Stem",
                "Flower",
                "Seed",
                "Root"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ]
        }
      }
    },
    "Grade 3": {
      "Life Science": {
        "Animals": {
          "Classification of Animals": [
            {
              "text": "Which animal is a mammal?",
              "answers": [
                "Dog",
                "Lizard",
                "Eagle",
                "Frog"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which animal lays eggs?",
              "answers": [
                "Hen",
                "Dog",
                "Cow",
                "Cat"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "A frog is an example of an:",
              "answers": [
                "Amphibian",
                "Reptile",
                "Mammal",
                "Bird"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Fish breathe through:",
              "answers": [
                "Gills",
                "Lungs",
                "Skin",
                "Nose"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ]
        }
      },
      "Physical Science": {
        "Forces": {
          "Push and Pull": [
            {
              "text": "When you kick a ball, you apply a:",
              "answers": [
                "Push force",
                "Pull force",
                "Gravity",
                "Friction"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which force pulls objects towards the Earth?",
              "answers": [
                "Gravity",
                "Friction",
                "Magnetism",
                "Push"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Friction makes moving objects:",
              "answers": [
                "Slow down",
                "Speed up",
                "Float",
                "Disappear"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ]
        }
      }
    },
    "Grade 4": {
      "Earth Science": {
        "Weather and Climate": {
          "Weather": [
            {
              "text": "What instrument measures temperature?",
              "answers": [
                "Thermometer",
                "Barometer",
                "Rain gauge",
                "Wind vane"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What instrument measures rainfall?",
              "answers": [
                "Rain gauge",
                "Thermometer",
                "Barometer",
                "Compass"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What causes wind?",
              "answers": [
                "Differences in air pressure",
                "Rain",
                "Clouds",
                "Temperature alone"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is climate?",
              "answers": [
                "Average weather over a long period",
                "Today's weather",
                "A type of wind",
                "A season"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      },
      "Life Science": {
        "Human Body": {
          "Body Systems": [
            {
              "text": "What is the main function of the heart?",
              "answers": [
                "Pump blood",
                "Digest food",
                "Filter waste",
                "Control breathing"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which organ controls the body?",
              "answers": [
                "Brain",
                "Heart",
                "Lungs",
                "Stomach"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What do lungs do?",
              "answers": [
                "Exchange oxygen and carbon dioxide",
                "Pump blood",
                "Digest food",
                "Filter blood"
              ],
              "correct": 0,
              "difficulty": "beginner"
            }
          ]
        }
      }
    },
    "Grade 5": {
      "Physical Science": {
        "Matter": {
          "States of Matter": [
            {
              "text": "What are the three states of matter?",
              "answers": [
                "Solid, liquid, gas",
                "Hot, warm, cold",
                "Hard, soft, liquid",
                "Metal, wood, plastic"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "When water is heated, it changes to:",
              "answers": [
                "Steam (gas)",
                "Ice (solid)",
                "Oil",
                "Juice"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What is the process of liquid turning to gas called?",
              "answers": [
                "Evaporation",
                "Condensation",
                "Melting",
                "Freezing"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is the process of gas turning to liquid called?",
              "answers": [
                "Condensation",
                "Evaporation",
                "Melting",
                "Solidification"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      },
      "Earth Science": {
        "Solar System": {
          "Planets and Space": [
            {
              "text": "How many planets are in our solar system?",
              "answers": [
                "8",
                "9",
                "7",
                "10"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "Which planet is closest to the Sun?",
              "answers": [
                "Mercury",
                "Venus",
                "Earth",
                "Mars"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What do we call the path a planet takes around the Sun?",
              "answers": [
                "Orbit",
                "Revolution",
                "Rotation",
                "Eclipse"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "The Earth rotates on its axis once every:",
              "answers": [
                "24 hours",
                "12 hours",
                "365 days",
                "7 days"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      }
    },
    "Grade 6": {
      "Life Science": {
        "Cells": {
          "Cell Structure": [
            {
              "text": "What is the basic unit of life?",
              "answers": [
                "Cell",
                "Atom",
                "Tissue",
                "Organ"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Which part of the cell controls its activities?",
              "answers": [
                "Nucleus",
                "Cell wall",
                "Cytoplasm",
                "Membrane"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Which structure is found in plant cells but NOT animal cells?",
              "answers": [
                "Cell wall",
                "Nucleus",
                "Cytoplasm",
                "Cell membrane"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is the function of the cell membrane?",
              "answers": [
                "Controls what enters and leaves the cell",
                "Produces energy",
                "Stores genetic material",
                "Makes proteins"
              ],
              "correct": 0,
              "difficulty": "advanced"
            }
          ]
        }
      },
      "Physical Science": {
        "Energy": {
          "Forms of Energy": [
            {
              "text": "Which is a renewable source of energy?",
              "answers": [
                "Solar energy",
                "Coal",
                "Petrol",
                "Natural gas"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What form of energy does the Sun provide?",
              "answers": [
                "Light and heat",
                "Electrical",
                "Chemical",
                "Nuclear"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What energy does a moving object have?",
              "answers": [
                "Kinetic energy",
                "Potential energy",
                "Chemical energy",
                "Electrical energy"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      }
    },
    "Grade 7": {
      "Life Science": {
        "Reproduction": {
          "Human Reproduction": [
            {
              "text": "What is the male sex cell called?",
              "answers": [
                "Sperm",
                "Egg",
                "Zygote",
                "Embryo"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is the female sex cell called?",
              "answers": [
                "Egg (ovum)",
                "Sperm",
                "Zygote",
                "Fetus"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is fertilisation?",
              "answers": [
                "The fusion of sperm and egg",
                "The growth of a baby",
                "The birth of a baby",
                "The release of an egg"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      },
      "Physical Science": {
        "Electricity": {
          "Basic Electricity": [
            {
              "text": "What does an electric circuit need to work?",
              "answers": [
                "A complete path for current",
                "Only a battery",
                "Only a bulb",
                "Only wires"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "What is the unit of electric current?",
              "answers": [
                "Ampere",
                "Volt",
                "Ohm",
                "Watt"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Which material conducts electricity best?",
              "answers": [
                "Copper",
                "Plastic",
                "Wood",
                "Glass"
              ],
              "correct": 0,
              "difficulty": "beginner"
            },
            {
              "text": "What is the unit of voltage?",
              "answers": [
                "Volt",
                "Ampere",
                "Ohm",
                "Watt"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      }
    },
    "Grade 8": {
      "Physical Science": {
        "Chemical Reactions": {
          "Acids and Bases": [
            {
              "text": "What is the pH of a neutral substance?",
              "answers": [
                "7",
                "0",
                "14",
                "1"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Acids have a pH:",
              "answers": [
                "Less than 7",
                "Greater than 7",
                "Equal to 7",
                "Equal to 14"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Which indicator turns red in acid?",
              "answers": [
                "Litmus paper",
                "Universal indicator",
                "Methyl orange",
                "Phenolphthalein"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "What gas is produced when an acid reacts with a metal?",
              "answers": [
                "Hydrogen",
                "Oxygen",
                "Carbon dioxide",
                "Nitrogen"
              ],
              "correct": 0,
              "difficulty": "advanced"
            }
          ]
        }
      },
      "Earth Science": {
        "Rocks and Minerals": {
          "Types of Rocks": [
            {
              "text": "Which type of rock is formed from magma?",
              "answers": [
                "Igneous",
                "Sedimentary",
                "Metamorphic",
                "Organic"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Which type of rock is formed from layers of sediment?",
              "answers": [
                "Sedimentary",
                "Igneous",
                "Metamorphic",
                "Crystal"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Marble is an example of which type of rock?",
              "answers": [
                "Metamorphic",
                "Igneous",
                "Sedimentary",
                "Volcanic"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      }
    },
    "Grade 9": {
      "Physical Science": {
        "Motion and Forces": {
          "Newton's Laws": [
            {
              "text": "Newton's First Law states that an object at rest stays at rest unless acted on by:",
              "answers": [
                "An external force",
                "Gravity alone",
                "Friction alone",
                "Another object"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "What is the formula for force?",
              "answers": [
                "F = ma",
                "F = mv",
                "F = m/a",
                "F = m+a"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "What is the unit of force?",
              "answers": [
                "Newton",
                "Kilogram",
                "Metre",
                "Joule"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            },
            {
              "text": "Newton's Third Law states that every action has an equal and opposite:",
              "answers": [
                "Reaction",
                "Force",
                "Motion",
                "Acceleration"
              ],
              "correct": 0,
              "difficulty": "intermediate"
            }
          ]
        }
      },
      "Life Science": {
        "Genetics": {
          "Basic Genetics": [
            {
              "text": "What carries genetic information in a cell?",
              "answers": [
                "DNA",
                "RNA",
                "Protein",
                "Enzyme"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "What is a gene?",
              "answers": [
                "A segment of DNA that codes for a trait",
                "A type of cell",
                "A protein",
                "A chromosome"
              ],
              "correct": 0,
              "difficulty": "advanced"
            },
            {
              "text": "How many chromosomes do human body cells have?",
              "answers": [
                "46",
                "23",
                "48",
                "44"
              ],
              "correct": 0,
              "difficulty": "advanced"
            }
          ]
        }
      }
    }
  }
};

export const GES_SUBJECTS = Object.keys(GES_BANK);

export function getGrades(subject: string): string[] {
  return Object.keys(GES_BANK[subject] ?? {});
}

export function getStrands(subject: string, grade: string): string[] {
  return Object.keys(GES_BANK[subject]?.[grade] ?? {});
}

export function getSubStrands(subject: string, grade: string, strand: string): string[] {
  return Object.keys(GES_BANK[subject]?.[grade]?.[strand] ?? {});
}

export function getTopics(subject: string, grade: string, strand: string, subStrand: string): string[] {
  return Object.keys(GES_BANK[subject]?.[grade]?.[strand]?.[subStrand] ?? {});
}

export function getQuestions(
  subject: string, grade: string, strand: string, subStrand: string, topic: string
): BankQuestion[] {
  return GES_BANK[subject]?.[grade]?.[strand]?.[subStrand]?.[topic] ?? [];
}

export function getAllQuestionsForTopic(
  subject: string, grade: string, strand: string, subStrand: string, topic: string,
  difficulty?: Difficulty
): BankQuestion[] {
  const qs = getQuestions(subject, grade, strand, subStrand, topic);
  if (!difficulty) return qs;
  return qs.filter(q => q.difficulty === difficulty);
}
