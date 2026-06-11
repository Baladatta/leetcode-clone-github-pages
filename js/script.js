const problemsData = [
  { title: 'Two Sum', difficulty: 'Easy', acceptance: '57%', status: 'Solved' },
  { title: 'Add Two Numbers', difficulty: 'Medium', acceptance: '34%', status: 'Attempted' },
  { title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', acceptance: '31%', status: 'Open' },
  { title: 'Median of Two Sorted Arrays', difficulty: 'Hard', acceptance: '26%', status: 'Open' },
  { title: 'Valid Parentheses', difficulty: 'Easy', acceptance: '44%', status: 'Solved' },
  { title: 'Merge Intervals', difficulty: 'Medium', acceptance: '48%', status: 'Solved' },
  { title: 'Word Ladder II', difficulty: 'Hard', acceptance: '34%', status: 'Attempted' },
  { title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', acceptance: '61%', status: 'Solved' },
  { title: 'Course Schedule', difficulty: 'Medium', acceptance: '35%', status: 'Open' },
  { title: 'Largest Rectangle in Histogram', difficulty: 'Hard', acceptance: '34%', status: 'Open' }
];

function toggleNav() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;
  navLinks.classList.toggle('open');
}

function initMobileNav() {
  const button = document.querySelector('.nav-toggle');
  if (!button) return;
  button.addEventListener('click', toggleNav);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setError(input, message) {
  const error = input.parentElement.querySelector('.error-message');
  if (error) {
    error.textContent = message;
  }
  input.classList.add('invalid');
}

function clearError(input) {
  const error = input.parentElement.querySelector('.error-message');
  if (error) {
    error.textContent = '';
  }
  input.classList.remove('invalid');
}

function validateForm(form) {
  const inputs = Array.from(form.querySelectorAll('input'));
  let valid = true;
  inputs.forEach((input) => {
    clearError(input);
    if (!input.value.trim()) {
      valid = false;
      setError(input, 'This field is required.');
      return;
    }

    if (input.type === 'email' && !validateEmail(input.value)) {
      valid = false;
      setError(input, 'Please enter a valid email.');
      return;
    }

    if (input.minLength && input.value.length < input.minLength) {
      valid = false;
      setError(input, `Minimum ${input.minLength} characters required.`);
    }
  });
  return valid;
}

function bindAuthTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const forms = document.querySelectorAll('.form-panel');
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      tabButtons.forEach((btn) => btn.classList.remove('active'));
      forms.forEach((form) => form.classList.remove('active'));
      button.classList.add('active');
      const target = document.getElementById(button.dataset.target);
      if (target) target.classList.add('active');
    });
  });

  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (validateForm(form)) {
        alert(`Success! ${form.id === 'login-form' ? 'Logged in' : 'Account created'}.`);
        form.reset();
      }
    });
  });
}

function createProblemRow(problem) {
  const tr = document.createElement('tr');
  const statusCell = document.createElement('td');
  const titleCell = document.createElement('td');
  const difficultyCell = document.createElement('td');
  const acceptCell = document.createElement('td');

  const dot = document.createElement('span');
  dot.className = `status-dot ${problem.status.toLowerCase()}`;
  dot.textContent = problem.status;
  statusCell.appendChild(dot);
  titleCell.innerHTML = `<strong>${problem.title}</strong>`;
  difficultyCell.textContent = problem.difficulty;
  acceptCell.textContent = problem.acceptance;

  if (problem.difficulty === 'Easy') {
    difficultyCell.className = 'tag easy';
  } else if (problem.difficulty === 'Medium') {
    difficultyCell.className = 'tag medium';
  } else {
    difficultyCell.className = 'tag hard';
  }

  tr.append(statusCell, titleCell, difficultyCell, acceptCell);
  return tr;
}

function renderProblems(filter = 'all', query = '') {
  const tableBody = document.getElementById('problems-table-body');
  const countLabel = document.getElementById('problem-count');
  if (!tableBody || !countLabel) return;
  tableBody.innerHTML = '';
  const normalized = query.trim().toLowerCase();
  const filtered = problemsData.filter((problem) => {
    const matchesFilter = filter === 'all' || problem.difficulty.toLowerCase() === filter;
    const matchesSearch = problem.title.toLowerCase().includes(normalized);
    return matchesFilter && matchesSearch;
  });
  filtered.forEach((problem) => tableBody.appendChild(createProblemRow(problem)));
  countLabel.textContent = `${filtered.length} problems`;
}

function bindProblemControls() {
  const input = document.getElementById('search-input');
  const buttons = document.querySelectorAll('.filter-btn');
  if (!input || buttons.length === 0) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      renderProblems(button.dataset.filter, input.value);
    });
  });

  input.addEventListener('input', () => {
    const selected = document.querySelector('.filter-btn.active');
    const filter = selected ? selected.dataset.filter : 'all';
    renderProblems(filter, input.value);
  });
}

function buildHeatmap() {
  const container = document.getElementById('heatmap-grid');
  if (!container) return;
  container.innerHTML = '';
  const counts = Array.from({ length: 365 }, () => Math.floor(Math.random() * 20));
  counts.forEach((value) => {
    const level = value === 0 ? 0 : value < 5 ? 1 : value < 10 ? 2 : value < 15 ? 3 : 4;
    const cell = document.createElement('div');
    cell.className = `heatmap-cell heat-level-${level}`;
    cell.title = `${value} solves`;
    container.appendChild(cell);
  });
}

function initPage() {
  initMobileNav();
  bindAuthTabs();
  if (document.body.id === 'problems-page') {
    renderProblems();
    bindProblemControls();
  }
  if (document.body.id === 'profile-page') {
    buildHeatmap();
  }
}

document.addEventListener('DOMContentLoaded', initPage);
