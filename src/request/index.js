import { BASE_URL } from "../lib/yutils/index";

export const refreshToken = async (token) => {
  const res = await fetch(BASE_URL + "/auth/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: token }),
  });

  if (res.status === 200 || res.status === 201) {
    return await res.json();
  } else if (res.status == 403) {
    throw new Error(403);
  } else {
    throw new Error("Nimadir hatolik bo'ldi");
  }

  console.log(res);
};

export const login = async (data) => {
  const res = await fetch(BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status === 200 || res.status === 201) {
    return await res.json();
  } else if (res.status === 400) {
    throw new Error("Login yoki Parol hato kiritildi");
  } else {
    throw new Error("Nimadir hatolik bo'ldi");
  }
};

export const getFlowers = async (token, { limit, skip }) => {
  const res = await fetch(BASE_URL + `/flowers?skip=${skip}&limit=${limit}`, {
    // const res = await fetch(BASE_URL + "/flowers", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200 || res.status === 201) {
    return await res.json();
  } else if (res.status == 403) {
    throw new Error(403);
  } else {
    throw new Error("Nimadir hatolik bo'ldi");
  }
};

export async function uploadImage(image) {
  const formData = new FormData();
  formData.append("file", image);
  const res = await fetch(BASE_URL + "/upload", {
    method: "POST",
    body: formData,
  });

  if (res.status === 200 || res.status === 201) {
    return res.text();
  } else if (res.status == 403) {
    throw new Error(403);
  } else {
    throw new Error("Nimadir hatolik bo'ldi");
  }
}

export async function sendFlower(token, flower) {
  const res = await fetch(BASE_URL + "/flowers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(flower),
  });

  if (res.status === 200 || res.status === 201) {
    return "Malumotlar muvaffaqiyatli qo'shildi";
  }
  if (res.status === 403) throw new Error("403");
  else throw new Error("Nimadur xato ketdi");
}
export async function deleteFlower(token, id) {
  const res = await fetch(BASE_URL + `/flowers/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200 || res.status === 201) {
    return "Malumot muvaffaqiyatli o'chirildi";
  }
  if (res.status === 403) throw new Error("403");
  else throw new Error("Nimadur xato ketdi");
}

export async function editFlower(token, flower) {
  const res = await fetch(BASE_URL + `/flowers/${flower.id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(flower),
  });

  if (res.status === 200 || res.status === 201) {
    return "Malumot muvaffaqiyatli yangilandi";
  }
  if (res.status === 403) throw new Error("403");
  else throw new Error("Nimadur xato ketdi");
}
