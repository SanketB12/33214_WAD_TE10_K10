async function getUsers() {
    try {
        const response = await fetch('http://localhost:3000/users/getAllUser');
        const users = await response.json();
        
        const userListDiv = document.getElementById('userList');
        userListDiv.innerHTML = '';

        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('userDetailsModified'); // Changed class name
            userDiv.innerHTML = `<p>${user.username} - ${user.email}</p>`;

            userListDiv.appendChild(userDiv);

            const buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('buttonsContainerModified'); // Changed class name

            const modifyButton = document.createElement('button');
            modifyButton.classList.add('modifyButton');
            modifyButton.textContent = 'Edit'; // Changed text
            modifyButton.addEventListener('click', () => modifyUser(user._id));

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('deleteButton');
            deleteButton.textContent = 'Remove'; // Changed text
            deleteButton.addEventListener('click', () => deleteUser(user._id));

            buttonsContainer.appendChild(modifyButton);
            buttonsContainer.appendChild(deleteButton);

            userListDiv.appendChild(buttonsContainer);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Function to add a new user
function addUser() {
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
  
    fetch('http://localhost:3000/users/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, username, email })
    })
    .then(response => {
      if (!response.ok) {
        alert('Registration failed');
        window.location.href = 'index.html';
        throw new Error('Registration failed');
      }
      return response.json();
    })
    .then(data => {
      alert('Registration successful');
      window.location.href = 'index.html';
      console.log(data);
    })
    .catch(error => {
      alert(error.message);
    });
}

// Function to modify a user
function modifyUser(userId) {
    const newUsername = prompt('Enter new username:');
    const newEmail = prompt('Enter new email:');
    
    if (!newUsername || !newEmail) {
        alert('Both username and email are required.');
        return;
    }

    fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: newUsername, email: newEmail })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to modify user');
        }
        alert('User updated successfully');
        getUsers();
    })
    .catch(error => {
        console.error('Error updating user:', error);
        alert('Error updating user');
    });
}

// Function to delete a user
function deleteUser(userId) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }

    fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
        alert('User deleted successfully');
        getUsers();
    })
    .catch(error => {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
    });
}

getUsers();
