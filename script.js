// Donation logic + selection highlight (no :has)
const amountRadios = document.querySelectorAll('input[name="amount"]');
const amountCards = document.querySelectorAll('.amount-card');
const otherInput = document.querySelector('input[name="other"]');
const impactAmount = document.getElementById('impact-amount');
const impactPeople = document.getElementById('impact-people');
const joinBtn = document.getElementById('join-btn');
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

function setCheckedClass() {
  amountCards.forEach(l => l.classList.remove('is-checked'));
  const checked = document.querySelector('input[name="amount"]:checked');
  if (checked) checked.closest('.amount-card')?.classList.add('is-checked');
}

function updateImpact(fromOther = false) {
  let amount = 5, people = 1;

  if (fromOther) {
    const val = parseInt(otherInput.value, 10);
    if (!isNaN(val) && val > 0) {
      amount = val;
      people = Math.max(1, Math.round(amount * 0.3)); // $1 ≈ 0.3 people
      impactPeople.textContent = String(people);
      impactAmount.textContent = String(amount);
      setCheckedClass();
      return;
    }
  }

  const checked = document.querySelector('input[name="amount"]:checked');
  if (checked) {
    amount = parseInt(checked.value, 10);
    people = parseInt(checked.dataset.people, 10);
  }
  impactPeople.textContent = String(people);
  impactAmount.textContent = String(amount);
  setCheckedClass();
}

amountRadios.forEach(r => {
  r.addEventListener('change', () => {
    if (otherInput) otherInput.value = '';
    updateImpact();
  });
});

if (otherInput) {
  otherInput.addEventListener('input', () => updateImpact(true));
  otherInput.addEventListener('focus', () => {
    amountRadios.forEach(r => (r.checked = false));
    updateImpact(true);
  });
}

updateImpact();

joinBtn?.addEventListener('click', () => {
  const otherVal = parseInt(otherInput?.value || '', 10);
  const amount = otherVal && otherVal > 0
    ? otherVal
    : parseInt((document.querySelector('input[name="amount"]:checked') || { value: 5 }).value, 10);
  alert(`Pretend checkout: $${amount}/month selected.`);
});


