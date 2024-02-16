

export function loadRegisteredUsers() {
    const registerdUsers = JSON.parse(sessionStorage.getItem('registerdUsers')) || [];
    return registerdUsers;
  }