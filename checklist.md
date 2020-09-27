https://developer.edamam.com/food-database-api-docs

Specific Functional Requirements
- Are all the inputs to the system specified, including their source, accuracy,
range of values, and frequency?
  - req: adding component to diet, extra consumption,missing consumption,creating customized component(new board)
  - optional:login system
- Are all the outputs from the system specified, including their destination,
accuracy, range of values, frequency, and format?
  - sending user data to firebase(register info, diet info, p)
- Are all the tasks the user wants to perform specified?
  - Yes.  setting/editing predefined daily/weekly diet/weight, setting height,
- Is the data used in each task and the data resulting from each task specified?
  - data will come from firebase and API. at end of each task state will be modified when user saves changes state will be sent to database. reflect changes locally
- Have you defined coding conventions for names, comments, and layout?
  - before every function there should be comment describing the input and output of the function
- Have you defined an integration procedure—that is, have you defined the
specific steps a programmer must go through before checking code into
the master sources?
  - use branches to experiment
- Will programmers program in pairs, or individually, or some combination
of the two?
  - combination of both
