document.addEventListener('DOMContentLoaded', () => {
    
    // --- Global Button Handlers and Routing ---

    document.querySelectorAll('.btn').forEach(button => {
        const text = button.textContent;
        
        button.addEventListener('click', () => {
            if (text === 'Get Started') {
                window.location.href = 'routines.html';
            } else if (text === 'Learn More') {
                window.location.href = 'how_it_works.html'; // Changed to How It Works page
            } else if (text === 'See Features in Detail' || text === 'Read More Success Stories') {
                window.location.href = 'features.html';
            }
        });
    });

    // --- Routine Tracker Logic (Specific to routines.html) ---

    const taskList = document.getElementById('taskList');
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const progressBar = document.getElementById('progressBar');
    
    if (taskList && newTaskInput && addTaskBtn) {

        let taskIdCounter = 6; // Start ID after pre-loaded tasks

        function updateProgress() {
            const totalTasks = taskList.children.length;
            const checkedTasks = taskList.querySelectorAll('input[type="checkbox"]:checked').length;
            
            let percentage = 0;
            if (totalTasks > 0) {
                percentage = Math.round((checkedTasks / totalTasks) * 100);
            }

            progressBar.style.width = `${percentage}%`;
            progressBar.textContent = `${percentage}%`;
            
            // Visual feedback: green for 100% and animation class
            if (percentage === 100) {
                progressBar.style.backgroundColor = 'var(--accent-color)'; // Green
                progressBar.classList.add('complete');
            } else {
                progressBar.style.backgroundColor = 'var(--primary-color)'; // Purple
                progressBar.classList.remove('complete');
            }
        }

        function createTaskElement(taskText) {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-checked', 'false');
            listItem.setAttribute('data-task-id', taskIdCounter++);
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            
            const label = document.createElement('label');
            label.textContent = taskText;

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-task-btn';
            removeButton.innerHTML = '<i class="fa-solid fa-times"></i>';
            removeButton.setAttribute('aria-label', 'Remove task'); // Accessibility

            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            listItem.appendChild(removeButton);

            return listItem;
        }

        // Add Task Button Click
        addTaskBtn.addEventListener('click', () => {
            const taskText = newTaskInput.value.trim();
            if (taskText) {
                const newTask = createTaskElement(taskText);
                taskList.appendChild(newTask);
                newTaskInput.value = '';
                updateProgress();
            }
        });

        // Checkbox and Remove Button Click (Delegation)
        taskList.addEventListener('click', (e) => {
            // Handle checkbox change
            if (e.target.classList.contains('task-checkbox')) {
                const listItem = e.target.closest('li');
                const isChecked = e.target.checked;
                
                listItem.setAttribute('data-checked', isChecked);
                listItem.classList.toggle('completed', isChecked); // Add class for line-through effect
                updateProgress();
            }

            // Handle remove button click
            if (e.target.closest('.remove-task-btn')) {
                const listItem = e.target.closest('li');
                listItem.remove();
                updateProgress();
            }
        });
        
        // Initial setup for existing tasks (adds 'completed' class if checked)
        taskList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
             checkbox.addEventListener('change', (e) => {
                 const listItem = e.target.closest('li');
                 listItem.classList.toggle('completed', e.target.checked);
                 updateProgress();
             });
        });

        updateProgress();
    }


    // --- Contact Form Logic (Specific to contact.html) ---

    const contactForm = document.querySelector('.contact-form');
    const successMessage = document.getElementById('successMessage');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            e.target.reset(); 
            successMessage.style.display = 'block';
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000); 
        });
    }

});