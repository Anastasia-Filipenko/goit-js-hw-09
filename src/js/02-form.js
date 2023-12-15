const key = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

const formObject = {};

let localStorageData;

try {
  localStorageData = JSON.parse(localStorage.getItem(key));
} catch (e) {
  console.log(e);
}

if (localStorageData) {
  Array.from(form.elements).forEach(element => {
    const storageValue = localStorageData[element.name];
    if (storageValue) {
      element.value = storageValue;
    }
  });
}

form.addEventListener('input', () => {
  const formData = new FormData(form);

  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  localStorage.setItem(key, JSON.stringify(formObject));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (form.elements[1].value.length > 0 && form.elements[0].value.length) {
    console.log(formObject);
    localStorage.removeItem(key);
    form.reset();
  } else {
    alert(`Fill in all fields of the form`);
  }
});
