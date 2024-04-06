const todos = [{
    text: 'Order cat food',
    completed: false
}, {
    text: 'Clean kitchen',
    completed: true
}, {
    text: 'Buy food',
    completed: true
}, {
    text: 'Do work',
    completed: false
}, {
    text: 'Exercise',
    completed: true
}]

const filters = {
    searchText: '',
    hideCompleted: false
}

const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''

    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#todos').appendChild(summary)

    filteredTodos.forEach(function (todo) {
        const todoEl = document.createElement('div')

        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.checked = todo.completed
        todoEl.appendChild(checkbox)

        const textSpan = document.createElement('span')
        textSpan.textContent = todo.text
        if (todo.completed) {
            textSpan.style.textDecoration = 'line-through'
        }
        todoEl.appendChild(textSpan)

        document.querySelector('#todos').appendChild(todoEl)

        // Add event listener for checkbox
        checkbox.addEventListener('change', function () {
            todo.completed = !todo.completed
            renderTodos(todos, filters)
        })
    })
}

renderTodos(todos, filters)

document.querySelector('#add-todo').addEventListener('click', function () {
    const newTodoText = document.querySelector('#new-todo').value.trim()

    if (newTodoText.length > 0) {
        todos.push({
            text: newTodoText,
            completed: false
        })
        renderTodos(todos, filters)
        document.querySelector('#new-todo').value = ''
    }
})

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#hide-completed').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})

/* 
exercise - complete the project based on the following instructions
part 1
1. add event listener for the button to add todos
2. add event listener for the search input to filter todos
3. add event listener for the checkbox to filter todos based on their completions
*/

/* Part 2
1. replace paragraphs in todos with a checkbox input and create a checknox for each todo item
2. if the todo is complete the item should be checked and there should be strike through for the item 
3. add event listener for the checkbox for every item
*/