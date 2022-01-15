let list = JSON.parse(localStorage.getItem('list'));
// let list = [
//     {
//         id: 'id1',
//         title: 'Learn JS',
//         done: true
//     },
//     {
//         id: 'id2',
//         title: 'Learn HTML',
//         done: false
//     }
// ]

const listElement = document.getElementById('list');
const todoInput = document.getElementById('todoInput');

function render() {
    listElement.innerText = null;

    list.forEach(el => {
        const listItem = document.createElement('li');
        listItem.setAttribute('class', el.done ? 'done' : 'progress')
        const listItemText = document.createTextNode(el.title);
        listItem.appendChild(listItemText);

        const buttonItem = document.createElement('button');
        buttonItem.setAttribute('id', el.id);
        const buttonItemText = document.createTextNode('Done');
        buttonItem.appendChild(buttonItemText);

        listItem.appendChild(buttonItem);

        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('id', 'delete_' + el.id);  // special id for delete button
        const deleteBtnText = document.createTextNode("Delete task");
        deleteBtn.appendChild(deleteBtnText);

        listItem.appendChild(deleteBtn);

        listElement.appendChild(listItem);
    })
}

render();


listElement.addEventListener('click', (event) => {
    if (event.target.nodeName === "BUTTON") {

        // done:
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === event.target.id) {
                list[i].done = !list[i].done;
            }
        }

        // delete element:
        list = list.filter(el => 'delete_' + el.id !== event.target.id);

        updateLocalStorage();
        render();
    }
})


const addToList = () => {
    const todoInputValue = todoInput.value;
    console.log(todoInputValue)

    list.push({
        id: Math.random().toString(),
        title: todoInputValue,
        done: false
    })

    updateLocalStorage();
    render();
    todoInput.value = '';

}

function updateLocalStorage() {
    localStorage.setItem('list', JSON.stringify(list));
}

