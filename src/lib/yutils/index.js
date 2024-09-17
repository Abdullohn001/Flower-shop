export const getFormData = (form) => {
  const data = new FormData(form);
  const obj = {};
  for (const [key, value] of data.entries()) obj[key] = value;

  return obj;
};

export const collectItem = (array, item) => {
  const result = [];
  for (const obj of array) {
    result.push(obj[item]);
  }
  return Array.from(new Set(result));
};

export const validition = function (obj) {
  let checker = false;
  let errorMessage = "";

  const errors = {
    category: "Gulni turkumini kiritilmadi",
    color: "Gulni rangini tanlanmadi",
    country: "Gulni yashash joyini tanlanmadi",
    imageUrl: "Gulni rasmini kiritilmadi",
    lifetime: "Gulni gullash davrini kiritilmadi",
    name: "Gulni nomini kiritilmadi",
    price: "Gulni narxini kiritilmadi",
    smell: "Gulni xidini kiritilmadi",
    summary: "Gulni izoxi kiritilmadi",
  };

  for (const key in obj) {
    if (obj[key].trim() === "") {
      checker = true;
      errorMessage = errors[key];
    }
  }

  return { checker, errorMessage };
};

export function findObj(array, id) {
  return array.find((element) => element.id === id);
}

export const BASE_URL = "https://json-api.uz/api/project/flowers";
export const limit = 8;
