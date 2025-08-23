// ===== SISTEMA COMÚN BAKASTA MU =====

// Función para manejar la autenticación del usuario
function handleUserAuth() {
  const userMenu = document.getElementById('userMenu');
  const logoutLink = document.getElementById('logoutLink');
  const logoutBtn = document.getElementById('logoutBtn');
  const loginSection = document.getElementById('loginSection');
  const userPanel = document.getElementById('userPanel');
  
  if (localStorage.getItem('loggedIn')) {
    // Usuario logueado
    if (userMenu) userMenu.style.display = 'block';
    if (loginSection) loginSection.style.setProperty('display', 'none');
    if (userPanel) userPanel.style.setProperty('display', 'block');
    
    // Event listeners para logout
    [logoutLink, logoutBtn].forEach((el) => {
      if (el) {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('loggedIn');
          window.location.href = 'index_bootstrap.html';
        });
      }
    });
  } else {
    // Usuario no logueado
    if (userMenu) userMenu.remove();
  }
}

// Función para manejar el menú móvil y dropdowns
function initializeMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mainMenu = document.getElementById('mainMenu');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  if (!menuToggle || !mainMenu) return;
  
  // Toggle del menú hamburguesa
  menuToggle.addEventListener('click', function() {
    mainMenu.classList.toggle('show');
    
    // Cambia el ícono del botón
    const icon = this.querySelector('.navbar-toggler-icon');
    if (mainMenu.classList.contains('show')) {
      icon.style.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(204, 213, 207, 0.8)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M6 18L18 6M6 6l12 12'/%3e%3c/svg%3e\")";
    } else {
      icon.style.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(204, 213, 207, 0.8)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")";
    }
  });
  
  // Sistema de dropdowns
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const dropdown = this.closest('.dropdown');
      
      // Cierra otros dropdowns abiertos
      document.querySelectorAll('.dropdown.show').forEach(openDropdown => {
        if (openDropdown !== dropdown) {
          openDropdown.classList.remove('show');
        }
      });
      
      // Toggle del dropdown actual
      dropdown.classList.toggle('show');
    });
  });
  
  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function(e) {
    if (!e.target.closest('#mainMenu') && !e.target.closest('#menuToggle')) {
      mainMenu.classList.remove('show');
      
      // Restaura el ícono del botón
      const icon = menuToggle.querySelector('.navbar-toggler-icon');
      icon.style.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(204, 213, 207, 0.8)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")";
      
      // Cierra todos los dropdowns
      document.querySelectorAll('.dropdown.show').forEach(dropdown => {
        dropdown.classList.remove('show');
      });
    }
  });
  
  // Cerrar menú al redimensionar a desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 992) {
      mainMenu.classList.remove('show');
      const icon = menuToggle.querySelector('.navbar-toggler-icon');
      icon.style.backgroundImage = "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(204, 213, 207, 0.8)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")";
    }
  });
}

// Función para manejar el login
function handleLogin() {
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      localStorage.setItem('loggedIn', 'true');
      window.location.href = 'usuario.html';
    });
  }
}

// Función para verificar autenticación en páginas protegidas
function requireAuth() {
  if (!localStorage.getItem('loggedIn')) {
    window.location.href = 'index_bootstrap.html';
  }
}

// Función para actualizar el año del footer
function updateFooterYear() {
  const yearElement = document.getElementById('y');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  handleUserAuth();
  initializeMenu();
  handleLogin();
  updateFooterYear();
});
