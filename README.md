# Playwright Introduction


---

## Overview
We are given a simple JS app that lets the user add tasks, mark them as completed, delete them, and filter them according to their status. We will use Playwright to write code to test the UI of this app.

## Steps

### 1. Install Dependencies
1. Open the To-Do app directory in Visual Studio Code and open a terminal.
2. Install all dependencies using these commands:
    ```bash
    npm install
    npx playwright install
    ```

### 2. Start the Server
1. The command above installs Playwright and http-server.
2. Start the server with the command:
    ```bash
    npm start
    ```

### 3. Write Tests
1. Create a new folder in the project directory and name it `tests`.
2. Create a file `todo.spec.js` inside the `tests` folder. This file will hold the test code.

#### Test 1: Test If a User Can Add a Task
- Ensure the application correctly adds a new task when a user types into the task input and clicks the [Add Task] button.
- The code should look like this:

    ```javascript
    const { test, expect } = require('@playwright/test');

    test('user can add a task', async ({ page }) => {
        await page.goto('http://localhost:8000');
        await page.fill('#new-task', 'Test Task');
        await page.click('#add-task');
        const task = await page.textContent('.task');
        expect(task).toContain('Test Task');
    });
    ```

#### Test 2: Test If a User Can Delete a Task
- Check if the application correctly deletes a task when the user clicks the [Delete] button of a task.
- The code should look like this:

    ```javascript
    const { test, expect } = require('@playwright/test');

    test('user can delete a task', async ({ page }) => {
        await page.goto('http://localhost:8000');
        await page.fill('#new-task', 'Test Task');
        await page.click('#add-task');
        await page.click('.task .delete');
        const task = await page.textContent('.task');
        expect(task).not.toContain('Test Task');
    });
    ```

#### Test 3: Test If a User Can Mark a Task as Complete
- Check if the application correctly marks a task as complete when the user clicks the checkbox of a task.
- The code should look like this:

    ```javascript
    const { test, expect } = require('@playwright/test');

    test('user can mark a task as complete', async ({ page }) => {
        await page.goto('http://localhost:8000');
        await page.fill('#new-task', 'Test Task');
        await page.click('#add-task');
        await page.click('.task .complete');
        const completedTask = await page.$('.task.completed');
        expect(completedTask).not.toBeNull();
    });
    ```

#### Test 4: Test If a User Can Filter Tasks
- Check if the application correctly filters tasks based on their status.
- The code should look like this:

    ```javascript
    const { test, expect } = require('@playwright/test');

    test('user can filter tasks', async ({ page }) => {
        await page.goto('http://localhost:8000');
        await page.fill('#new-task', 'Test Task');
        await page.click('#add-task');
        await page.click('.task .complete');
        await page.selectOption('#filter', 'completed');
        const incompleteTask = await page.$('.task:not(.completed)');
        expect(incompleteTask).toBeNull();
    });
    ```

### 4. Run Tests
1. Run all tests with the command:
    ```bash
    npm test
    ```
2. Verify that all tests pass.

---

## Contributing
Contributions are welcome! If you have any improvements or bug fixes, feel free to open a pull request.

## License
This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

## Contact
For any questions or suggestions, please open an issue in the repository.
