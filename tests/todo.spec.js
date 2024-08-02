const {test,expect} = require('@playwright/test');
test.only('Page has Playwright in title', async ({ page }) => {
await page.goto('http://playwright.dev/');
const title = await page.title();
expect(title).toBe('Playwright');
const getStartedLink = await page.textContent('text=Get Started');
expect(getStartedLink).toBeTruthy();
});

// verify that the user can add a task
test('user can add a task', async ({ page }) =>{
await page.goto('http://localhost:8080');
await page.fill('#task-input', 'Test Task');
await page.click('#add-task');
const taskText = await page.textContent('.task');
expect(taskText).toContain('Test Task');
}); 

// verify that the user can delete a task
test('user can delete a task', async ({ page }) =>{
//arrange
await page.goto('http://localhost:8080');
await page.fill('#task-input', 'Test Task');
await page.click('#add-task');
//act
await page.click('.task .delete-task');
//assert
const taskText = await page.$$eval('.task', tasks => tasks.map
    (task => task.textContent
));
expect(taskText).not.toContain('Test Task');
});

// verify that the user can mark a task as complete
test('user can mark task as complete', async ({ page }) =>{
//arrange
await page.goto('http://localhost:8080');
await page.fill('#task-input', 'Test Task');
await page.click('#add-task');
//act
await page.click('.task .task-complete');
//assert
const completedTask = await page.$('.task.completed');
expect(completedTask).not.toBeNull()
});

// verify that the user filter tests
test('user can filter tests', async ({ page }) => {
    //arrange
await page.goto('http://localhost:8080');
await page.fill('#task-input', 'Test Task');
await page.click('#add-task');
await page.click('.task .task-complete');

//act
await page.click('#filter', "Completed");

//assert
const incompletedTask = await page.$('.task:not(.completed)');
expect(incompletedTask).toBeNull();
});
