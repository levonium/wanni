(() => {
  const wrapper = document.getElementById('app')
  const ul = wrapper.querySelector('.tasks')
  const form = wrapper.querySelector('.form')

  const getTasks = () => (localStorage.getItem('tasks') || '').split('|').filter(t => t).sort((a, b) => a > b)
  const setTasks = (list) => localStorage.setItem('tasks', list)

  const toggleForm = () => {
    form.querySelector('input').value = ''
    form.classList.toggle('visible')
  }

  const addTask = (task) => {
    const tasks = getTasks()

    if (!tasks.length) {
      setTasks(task)
    } else {
      tasks.push(task)
      setTasks(tasks.join('|'))
    }
  }

  const removeTask = (task) => {
    setTasks(getTasks().filter(t => t !== task).join('|'))
  }

  const makeTask = (idx, task) => {
    const id = `task-${idx}`

    const wrapper = document.createElement('div')
    const li = document.createElement('li')

    const label = document.createElement('label')
    label.setAttribute('for', id)

    const ch = document.createElement('input')
    ch.setAttribute('type', 'checkbox')
    ch.id = id
    ch.classList.add('task-checkbox')

    const span = document.createElement('span')
    span.innerText = task

    label.appendChild(ch)
    label.appendChild(span)
    li.appendChild(label)
    wrapper.appendChild(li)

    return wrapper.innerHTML
  }

  const displayTaskList = () => {
    const toDos = getTasks()
    ul.innerHTML = ''
    ul.dataset.count = toDos.length
    if (toDos.length) {
      ul.innerHTML = toDos.map((t, idx) => `${ul.innerHTML}${makeTask(idx, t)}`).join('')
    }
  }

  wrapper.querySelector('.toggle-form')
    .addEventListener('click', () => toggleForm())

  form.querySelector('button').addEventListener('click', () => {
    const task = form.querySelector('input').value
    if (!task) return

    addTask(task)
    displayTaskList()
    toggleForm()
  })

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('task-checkbox')) {
      const task = e.target.parentElement.querySelector('span').innerText
      removeTask(task)
      displayTaskList()
    }
  })

  displayTaskList()
})()
