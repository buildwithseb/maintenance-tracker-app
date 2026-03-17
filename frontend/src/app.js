class TrackerApp {
    constructor() {
        this.taskList = [];
        this.editingTaskId = null;
        this.appInit();
    }

    loadTasks() {
        API.apiHelper('GET', 'https://maintenance-tracker-app-rq42.onrender.com/tasks')
            .then(data => {
                this.taskList = data.tasks;
                this.renderTasks();
            })
            .catch(err => alert(err.message));
    }

    appInit() {

        this.form = document.getElementById('form')
        this.submitBtn = document.getElementById('submit-btn');
        this.cancelBtn = document.getElementById("cancel-btn");
        const ul = document.getElementById('task-list');

        this.cancelBtn.addEventListener('click', this.resetFormState.bind(this))

        ul.addEventListener('click', e => {
            const li = e.target.closest('li');
            if (!e.target.classList.contains('delete-btn') &&
                !e.target.classList.contains('edit-btn')) {
                return
            }
            if (e.target.classList.contains('delete-btn')) {
                this.deleteTaskHandler(li.dataset.taskId);
            }
            if (e.target.classList.contains('edit-btn')) {
                this.editTaskHandler(li.dataset.taskId);
            }

        }
        )


        this.loadTasks();

        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.cancelBtn.setAttribute("hidden", "hidden");
            this.saveTaskHandler();
        });
    }

    resetFormState() {

        this.editingTaskId = null;
        this.form.reset();
        this.submitBtn.value = "Add Task";
        this.cancelBtn.setAttribute("hidden", "hidden");

    }

    editTaskHandler(taskId) {

        const task = this.taskList.find(task => String(task._id) === taskId);
        if (!task) return;
        this.editingTaskId = taskId;
        this.cancelBtn.removeAttribute("hidden");

        document.getElementById("machine-id").value = task.machineId;
        document.getElementById("task-title").value = task.taskTitle;
        document.getElementById("type").value = task.type;
        document.getElementById("status").value = task.status;
        document.getElementById("priority").value = task.priority;
        document.getElementById("notes").value = task.notes;
        this.submitBtn.value = "Update Task";

    }

    saveTaskHandler() {

        const machineId = document.getElementById("machine-id").value;
        const taskTitle = document.getElementById("task-title").value;
        const typeOfWork = document.getElementById("type").value;
        const status = document.getElementById("status").value;
        const priority = document.getElementById("priority").value;
        const notes = document.getElementById("notes").value;
      
        if (!machineId.trim() || !taskTitle.trim()) {
            alert("Please enter a machine ID and a task title before adding a task");
            return;
        };

        const newTask = new Task(machineId.trim(), taskTitle.trim(), typeOfWork, status, priority, notes);

        if (this.editingTaskId !== null) {

            API.apiHelper("PATCH", `https://maintenance-tracker-app-rq42.onrender.com/tasks/${this.editingTaskId}`, newTask)
                .then(data => {

                    this.resetFormState();
                    this.loadTasks();
                })
                .catch(err => alert(err.message));
        } else {

            API.apiHelper("POST", "https://maintenance-tracker-app-rq42.onrender.com/tasks", newTask)
                .then(data => {
                    this.resetFormState();
                    this.loadTasks()
                })
                .catch(err => alert(err.message));;
        }
    }




    renderTasks() {
        const taskListEl = document.getElementById('task-list');
        taskListEl.textContent = "";

        if (this.taskList.length === 0) {
            taskListEl.textContent = "No task yet.";
            return;
        }

        for (const task of this.taskList) {
            DOMHelper.render(task);
        }

    }


    updateTaskList(tasks) {
        this.taskList = tasks;
        this.renderTasks();
    }



    deleteTaskHandler(taskId) {
        API.apiHelper("DELETE", `https://maintenance-tracker-app-rq42.onrender.com/tasks/${taskId}`)
            .then(data => {
                this.loadTasks();
                this.resetFormState();

            })

            .catch(err => {
                alert(err.message)
            });
    }
}

class API {

    static apiHelper(method = "GET", url, body = null) {

        const options = {
            method,
            headers: { "Content-Type": "application/json" }
        }

        if (body) {
            options.body = JSON.stringify(body)
        }

        return fetch(url, options)
            .then(async res => {
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'Something went wrong - server side');

                } return data;
            })

    }
}


class Task {
    constructor(machineId, taskTitle, type, status, priority, notes) {
        this.machineId = machineId
        this.taskTitle = taskTitle
        this.type = type
        this.status = status
        this.priority = priority
        this.notes = notes
    }


}

class DOMHelper {
    static render(task) {
        const taskList = document.getElementById('task-list');
        const taskElement = document.createElement('li');

        taskElement.dataset.taskId = task._id;
        taskElement.className = `task-element priority-${task.priority}`;

        taskElement.innerHTML = `
            <h3>${task.machineId} - ${task.taskTitle}</h3>
            <p><strong>Type:</strong> ${task.type}</p>
            <p><strong>Status:</strong> ${task.status}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Notes:</strong> ${task.notes || "No notes provided"}</p>
            <div class="task-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        taskList.appendChild(taskElement);
    }
}

new TrackerApp()


