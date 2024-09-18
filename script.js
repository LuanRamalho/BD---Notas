// Função para carregar as notas salvas do localStorage
function loadNotes() {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    return notes;
}

// Função para salvar notas no localStorage
function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Função para adicionar nova nota
document.getElementById('noteForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const noteText = document.getElementById('noteText').value;
    const noteDate = document.getElementById('noteDate').value;

    let notes = loadNotes();
    notes.push({ text: noteText, date: noteDate });
    saveNotes(notes);

    document.getElementById('noteText').value = '';
    document.getElementById('noteDate').value = '';

    alert('Nota salva com sucesso!');
});

// Função para exibir as notas na tabela
function displayNotes(notes) {
    const tableBody = document.querySelector('#notesTable tbody');
    tableBody.innerHTML = '';

    notes.forEach((note, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td contenteditable="false">${note.text}</td>
            <td contenteditable="false">${note.date}</td>
            <td>
                <button onclick="editRow(${index})">Editar</button>
                <button onclick="deleteRow(${index})">Excluir</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Função para editar nota
function editRow(index) {
    const table = document.querySelector('#notesTable tbody');
    const row = table.rows[index];
    row.cells[0].contentEditable = true;
    row.cells[1].contentEditable = true;
    row.cells[2].innerHTML = `<button onclick="saveRow(${index})">Salvar</button>`;
}

// Função para salvar as alterações na nota
function saveRow(index) {
    const table = document.querySelector('#notesTable tbody');
    const row = table.rows[index];

    const updatedText = row.cells[0].innerText;
    const updatedDate = row.cells[1].innerText;

    let notes = loadNotes();
    notes[index] = { text: updatedText, date: updatedDate };
    saveNotes(notes);
    displayNotes(notes);
}

// Função para deletar nota
function deleteRow(index) {
    let notes = loadNotes();
    notes.splice(index, 1);
    saveNotes(notes);
    displayNotes(notes);
}

// Função para ordenar as notas
function sortNotes(criteria) {
    let notes = loadNotes();

    if (criteria === 'nameAsc') {
        notes.sort((a, b) => a.text.localeCompare(b.text));
    } else if (criteria === 'nameDesc') {
        notes.sort((a, b) => b.text.localeCompare(a.text));
    } else if (criteria === 'dateAsc') {
        notes.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (criteria === 'dateDesc') {
        notes.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    displayNotes(notes);
}

// Função para buscar notas
document.getElementById('search')?.addEventListener('input', function (event) {
    const searchTerm = event.target.value.toLowerCase();
    let notes = loadNotes();
    const filteredNotes = notes.filter(note =>
        note.text.toLowerCase().includes(searchTerm) || note.date.includes(searchTerm)
    );
    displayNotes(filteredNotes);
});

// Função para atualizar a exibição conforme o critério de ordenação
document.getElementById('sortOrder')?.addEventListener('change', function (event) {
    sortNotes(event.target.value);
});

// Carregar notas e exibir na tabela quando a página for carregada
window.addEventListener('load', function () {
    let notes = loadNotes();
    displayNotes(notes);
});
