
document.getElementById('nameForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('studentName').value;
  document.querySelector('h1').textContent = `Welcome, ${name}!`;
  const greeting = document.getElementById('greeting');
  greeting.textContent = `We're glad to have you here. 😄`;
  greeting.classList.remove('hidden');
  document.getElementById('nameForm').classList.add('hidden');
  
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, 500);
});
