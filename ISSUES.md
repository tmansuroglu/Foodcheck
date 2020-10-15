-   ask louis about bad practices in the code, bug prone codes
-   should logout be a component?
-   almost everything is being done inside components, not container. is it bad?
-   add profile button
-   uid and docid are same. is it a problem?
-   there is memory leak.
-   manage diet and edit diet are too stacked, seperate it to components.
-   register redirect to login doesnt work
-   to put meal data inside edit meal component you have to click on the name of meal, not on the component that holds the name. panel doesnt have an on click event
-   some food dont have serving size
-   instead of showing selected measure as just name , shows that measure's object
-   in manageDiet, meals state store same meal 2 times
-   what if user doesnt select food from autocomplete search and clicks on add?
-   search form doesnt reset after searching
-   file names are bad. decide on naming convention
-   git doesnt recognize capital letter changes
-   round nutrient numbers

*   **Sorting within a given board.** A user should be able to sort by title and due date, both ascending and descending.
*   **Completed tasks.** Completed tasks should not be shown on the main boards. When a task is marked completed, you may decide how it will be shown, but it should be separated. For example, you could have a special board for completed tasks, or you could make a completely separate page that loads all the completed tasks.
    -   **Toggle display type**: There should be a button that allows users to toggle between "list" and "board" views of all the boards. Hint: keep a state variable on the container that contains two possible values. Here is an example of what we mean by [board](./board-example.png) and [list](./list-example.png). List-view only has to be read-only
