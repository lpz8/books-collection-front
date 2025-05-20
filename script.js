
function toggleLoader(show) {
    const loader = document.getElementById('loader');
    loader.style.display = show ? 'block' : 'none';
}


function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = ` message ${type}`; 
    setTimeout(() => {
        messageDiv.textContent = ''; 
        messageDiv.className = 'message';
    }, 3000);
}

async function getUsers() {
    
    toggleLoader(true);

    
    document.getElementById('users').innerHTML = '';
    document.getElementById('books').innerHTML = '';

    try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
            throw new Error('Error al obtener los usuarios');
        }
        const users = await response.json();

        
        const usersDiv = document.getElementById('users');
        usersDiv.innerHTML = users.map(user => `
            <div class="user">
                <p>Nombre: ${user.name}</p>
                <p>Email: ${user.email}</p>
                <p>Colección: ${user.collection.join(', ')}</p>
                <p>Wishlist: ${user.wishlist.join(', ')}</p>
            </div>
        `).join('');

        
        showMessage('Usuarios cargados con éxito', 'success');
    } catch (error) {
        
        showMessage(error.message || 'Error al cargar los usuarios', 'error');
    } finally {
        
        toggleLoader(false);
    }
}

async function getBooks() {
    
    toggleLoader(true);

    
    document.getElementById('users').innerHTML = '';
    document.getElementById('books').innerHTML = '';

    try {
        const response = await fetch('http://localhost:3000/books');
        if (!response.ok) {
            throw new Error('Error al obtener los libros');
        }
        const books = await response.json();

        
        const booksDiv = document.getElementById('books');
        booksDiv.innerHTML = books.map(book => `
            <div class="book">
                <p>Título: ${book.title}</p>
                <img src="${book.image}" alt="${book.title}" width="100">
                <p>Autor: ${book.author}</p>
                <p>Fecha: ${book.publicationDate}</p>
            </div>
        `).join('');

        
        showMessage('Libros cargados con éxito', 'success');
    } catch (error) {
        
        showMessage(error.message || 'Error al cargar los libros', 'error');
    } finally {
        
        toggleLoader(false);
    }
}