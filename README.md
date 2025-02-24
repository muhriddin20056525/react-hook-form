# **React-Hook-Form Darslari**

`React Hook Form`– bu `React` da `formalar` bilan ishlashni osonlashtiradigan va samaradorlikni oshiradigan kutubxona. U kontrollanmagan komponentlar (uncontrolled components) bilan ishlaydi, bu esa `React` ning qayta `render` qilish jarayonini optimallashtirishga yordam beradi.

- ✅ Yengillik – Juda kichik o‘lchamga ega va ishlash tezligi yuqori.
- ✅ Tezkor ishlash – Shakl (form) elementlarini minimum darajada qayta render qiladi.
- ✅ Uncontrolled Components – Form ma'lumotlari useState holatida emas, DOM ichida saqlanadi.
- ✅ Validatsiya integratsiyasi – Yup, Zod kabi kutubxonalar bilan osongina bog‘lanadi.
- ✅ TypeScript qo‘llab-quvvatlashi – TypeScript bilan ishlash uchun moslashgan.

---

## **📌 1-dars kutubxonani o'rnatish va useForm hooki**

```bash
npm install react-hook-form
```

- `react-hook-form` kutubxonasini o'rnatish

```tsx
import { useForm } from "react-hook-form";
```

- `useForm` hookini import qilish
- `useForm` bu forma holatini boshqarish uchun ishlatiladigan hook.

```tsx
const form = useForm();
const { register } = form;
```

- `register` funksiyasi formadagi inputlarni React Hook Form bilan bog‘lash uchun ishlatiladi.

```tsx
<label htmlFor="username">Username</label>
<input type="text" {...register("username")} />
```

- `<input>` elementlaridagi `{...register("username")}` ifodasi ushbu inputni `React Hook Form` bilan bog‘laydi.

---

## **📌 2-dars React Hook Form Devtools**

```bash
npm install -D @hookform/devtools
```

- `React Hook Form Devtools` ni o'rnatish

```tsx
import { DevTool } from "@hookform/devtools";
```

- `DevTool` ni import qilish

```tsx
const form = useForm();
const { register, control } = form;
```

- `useForm` hookidan `Devtool` uchun `control` xususiyatini chaqirish

```tsx
<DevTool control={control} />
```

- `component` ko'rinishida `<form></form>` tagidan tashqarida chaqirib qo'yiladi

---

## **📌 3-dars Formadan Olingan Malumotlarni Jo'natish (Submit)**

```tsx
type FormValues = {
  username: string;
  email: string;
  channel: string;
};
```

- `form` uchun type `useForm` ning `handleSubmit` funksiyasidan foydalanish uchun typelar zarur

```tsx
const form = useForm<FormValues>();
const { register, control, handleSubmit } = form;
```

- `useForm` dan `handleSubmit` funksiyasini chiqarish

```tsx
const onSubmit = (data: FormValues) => {
  console.log("Form Submitted");
  console.log(data);
};
```

- Bu funksiya forma jo‘natilganda chaqiriladi:
  - `data: FormValues` – jo‘natilgan ma'lumotlarni oladi.
  - `console.log(data)` – ma'lumotlarni konsolga chiqaradi.

```tsx
<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("username")} placeholder="Username" />
  <input {...register("email")} placeholder="Email" />
  <input {...register("channel")} placeholder="Channel" />
  <button type="submit">Submit</button>
</form>
```

- `Bu kodda:`
  - `onSubmit={handleSubmit(onSubmit)}` form malumotlarini jo'natish uchun `react-hook-form` ning handleSubmit funksiyasi orqali `onSubmit` funksiyasini ishga tushiradi
  - `register("username")`, `register("email")`, `register("channel")` – inputlarni `react-hook-form` ga bog‘laydi.
  - `button type="submit"` – formani jo‘natish tugmasi.

---

## **📌 4-dars Validatsiya Qo'shish**

```tsx
<form onSubmit={handleSubmit(onSubmit)} noValidate>
  <div className="form-control">
    <label htmlFor="username">Username</label>
    <input
      type="text"
      {...register("username", {
        required: "Username is required",
      })}
    />
  </div>
</form>
```

- `noValidate` `<form>` elementida `noValidate` atributi brauzerning o‘z ichki formani tekshirish (validation) mexanizmini o‘chirib qo‘yadi.
- `{ required: "Username is required" }` Agar foydalanuvchi inputni to‘ldirmasa, `"Username is required"` degan xato xabari chiqadi.

```tsx
<div className="form-control">
  <label htmlFor="email">Email</label>
  <input
    type="email"
    {...register("email", {
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email format",
      },
    })}
  />
</div>
```

- `RegEx` yordamida validatsiya qo'yish

```tsx
<div className="form-control">
  <label htmlFor="username">Username</label>
  <input
    type="text"
    {...register("username", {
      required: {
        value: true,
        message: "Username is required",
      },
    })}
  />
</div>
```

- ushbu usulda ham validatsiya qo'yish mumkin

---

## **📌 5-dars Error messagelarni ko'rsatish**

```tsx
const form = useForm<FormValues>();
const { register, control, handleSubmit, formState } = form;
const { errors } = formState;
```

- `useForm` dan `formState` ni `formState` dan `error` ni chiqarib olish xatolarni ko'rsatish uchun

```tsx
<div className="form-control">
  <label htmlFor="username">Username</label>
  <input
    type="text"
    {...register("username", {
      required: {
        value: true,
        message: "Username is required",
      },
    })}
  />
  <p className="error-message">{errors.username?.message}</p>
</div>
```

- `<p className="error-message">{errors.username?.message}</p>` xatoni ko'rsatish

---

## **📌 6-dars Custom Valudation**

```tsx
validate: (fieldValue) => {
  return (
    fieldValue !== "admin@gmail.com" ||
    "Enter a different email address"
  );
},

```

- `validate` funksiyasi foydalanuvchi kiritgan qiymatni `(fieldValue)` qabul qiladi.
- `fieldValue !== "admin@gmail.com"` → Agar kiritilgan email `"admin@gmail.com"` bo‘lmasa, `true` qaytariladi (ya’ni, email yaroqli hisoblanadi).
- `|| "Enter a different email address"` → Agar `fieldValue === "admin@gmail.com"` bo‘lsa, `false` bo‘ladi va `"Enter a different email address"` xabari foydalanuvchiga ko‘rsatiladi.

```tsx
validate: {
  notAdmin: (fieldValue) => {
    return (
      fieldValue !== "admin@gmail.com" ||
      "Enter different email address"
    );
  },

  notBlackListed: (fieldValue) => {
    return (
      !fieldValue.endsWith("baddomain.com") ||
      "This domain is not supported"
    );
  },
},

```

Bu kod React Hook Form'ning validate parametri orqali bir nechta validatsiya shartlarini qo‘shish imkonini beradi.
Kod ichida ikkita validatsiya funksiyasi mavjud:

- `notAdmin` – `"admin@gmail.com"` email manzilini kiritishga ruxsat bermaydi.
- `notBlackListed` – `"baddomain.com"` domeni bilan tugaydigan email manzillarni bloklaydi.

- `fieldValue.endsWith("baddomain.com")` → email `"baddomain.com"` bilan tugasa, true bo‘ladi.
- `!fieldValue.endsWith("baddomain.com")` → email "baddomain.com" bilan tugamasa, true qaytaradi, validatsiyadan o‘tadi.
- Aks holda "`This domain is not supported"` xatolik xabari chiqariladi.

---

## **📌 7-dars Default Qiymat Berish**

Biz useForm hooki orqali u bog'langan inputlarga default qiymat berishimiz mumkin.

```tsx
type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const form = useForm<FormValues>({
  defaultValues: {
    username: "mdavlatov",
    email: "",
    channel: "",
  },
});
```

- `useForm` hookining `defaultValues` xossasi inputga default qiymat berish uchun ishlatiladi
- bu yerda `username` ni qabul qiladigan inputga `mdavlatov` qiymati berib qo'yildi

```tsx
const form = useForm<FormValues>({
  defaultValues: async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    const data = await response.json();
    return {
      username: data.username,
      email: data.email,
      channel: data.website,
    };
  },
});
```

- `useForm` hooki orqali api dan malumot olib ularni inputlarga default qiymat sifatida berish. Bu usul `put` so'rovlar bilan ishlaganda juda qulay

---

## **📌 8-dars Nested Objects**

Nested object inputdan malumot olib uni object sifatida saqlash imkonini beradi. Misol uchun biz foydalanuvchidan injtimoiy tarmoqlarni olishimiz kerkak buning uchun `social` nomi object yaratib uning ichiga olishimiz kerak bo'lgan ijtimoiy tarmoqlarni kiritamiz va shu orqali fydalanuvchidan malumotlarni olamiz

```tsx
type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
};

const form = useForm<FormValues>({
  defaultValues: {
    username: "batman",
    email: "",
    channel: "",
    social: {
      twitter: "",
      facebook: "",
    },
  },
});


<div className="form-control">
  <label htmlFor="twitter">Twitter</label>
  <input type="text" {...register("social.twitter")} />
  <p className="error-message">{errors.social?.twitter?.message}</p>
</div>

<div className="form-control">
  <label htmlFor="channel">Facebook</label>
  <input type="text" {...register("social.facebook")} />
  <p className="error-message">{errors.social?.facebook?.message}</p>
</div>
```

- `{...register("social.twitter")}` social objecti ichidagi twitter xossasiga inputdagi malumotni yuklash

---

## **📌 9-dars Arrays**

React Hook Formda malumotlarni arrayga saqlashimiz ham mumkin

```tsx
type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
};
```

- `phoneNumbers` - foydalanuvchidan telefon raqamlarini olib saqlaydigan array

```tsx
const form = useForm<FormValues>({
  defaultValues: {
    username: "batman",
    email: "",
    channel: "",
    social: {
      twitter: "",
      facebook: "",
    },
    phoneNumbers: ["", ""],
  },
});
```

- `phoneNumbers` - arrayini `useForm` ga qo'shish
- `["", ""]` - bu degani ushbu arrayga faqat 2 ta telefon raqami qo'shiladi

```tsx
<div className="form-control">
  <label htmlFor="primary-phone">Primary Phone Number</label>
  <input
    type="text"
    id="primary-phone"
    {...register("phoneNumbers.0")}
  />
</div>

<div className="form-control">
  <label htmlFor="secondary-phone">Secondary Phone</label>
  <input
    type="text"
    {...register("phoneNumbers.1")}
    id="secondary-phone"
  />
</div>
```

- `phoneNumbers` arrayiga malumot qo'shish uchun uning indexsidan foydalanamiz
- `{...register("phoneNumbers.0")}` - phoneNumbers arrayining birinchi bo'sh stringiga malumot qo'shadi arraydagi index bo'yicha bu bo'sh string nolinchi bo'ladi
- `{...register("phoneNumbers.1")}` - phoneNumbers arrayining ikkinchi bo'sh stringiga malumot qo'shadi arraydagi index bo'yicha bu birinchi bo'sh string bo'ladi

---

## **📌 10-dars Dynamic Fields**

Dynamic Fields – bu React Hook Form da formadagi maydonlarni dinamik ravishda qo‘shish yoki o‘chirish imkonini beradigan usul. Bu odatda array (massiv) sifatida saqlanadigan inputlar bilan ishlash uchun ishlatiladi.

```tsx
type FormValues = {
  phNumbers: {
    number: string;
  }[];
};

const form = useForm<FormValues>({
  defaultValues: {
    phNumbers: [{ number: "" }],
  },
});

const { register, control, handleSubmit, formState } = form;
const { errors } = formState;

const { fields, append, remove } = useFieldArray({
  name: "phNumbers",
  control,
});

<div>
  <label>List of phone numbers</label>

  <div>
    {fields.map((field, index) => (
      <div className="form-control" key={field.id}>
        <input
          type="text"
          {...register(`phNumbers.${index}.number` as const)}
        />
        {index > 0 && (
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        )}
      </div>
    ))}

    <button type="button" onClick={() => append({ number: "" })}>
      Add phone number
    </button>
  </div>
</div>;
```

- Bu kod React Hook Form va useFieldArray yordamida dinamik telefon raqamlarini qo‘shish va o‘chirish imkonini beruvchi formani yaratadi.

```tsx
type FormValues = {
  phNumbers: {
    number: string;
  }[];
};
```

- `phNumbers` – massiv (array), unda har bir element `{ number: string }` shaklida bo‘ladi.
- Har bir elementda `number` maydoni mavjud bo‘lib, telefon raqami sifatida ishlatiladi.

```tsx
const form = useForm<FormValues>({
  defaultValues: {
    phNumbers: [{ number: "" }],
  },
});
```

- `useForm<FormValues>()` – formani yaratadi va unga TypeScript tipi beriladi.
- `defaultValues` – boshlang‘ich qiymatlar:
  - `phNumbers` massivi ichida bitta bo‘sh telefon raqami bor.

```tsx
const { register, control, handleSubmit, formState } = form;
const { errors } = formState;
```

- `register` – inputlarni formaga bog‘lash uchun ishlatiladi.
- `control` – useFieldArray ni ishlatish uchun kerak bo‘lgan boshqaruvchi obyekt.
- `handleSubmit` – formani yuborish uchun ishlatiladi.
- `errors` – validatsiya xatolarini olish uchun ishlatiladi.

```tsx
const { fields, append, remove } = useFieldArray({
  name: "phNumbers",
  control,
});
```

- `fields` – formadagi telefon raqamlarini ifodalovchi input maydonlarining ro‘yxati.
- `append` – yangi telefon raqamini qo‘shish.
- `remove` – mavjud telefon raqamini o‘chirish.

```tsx
<div>
  <label>List of phone numbers</label>

  <div>
    {fields.map((field, index) => (
      <div className="form-control" key={field.id}>
        <input
          type="text"
          {...register(`phNumbers.${index}.number` as const)}
        />
        {index > 0 && (
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        )}
      </div>
    ))}

    <button type="button" onClick={() => append({ number: "" })}>
      Add phone number
    </button>
  </div>
</div>
```

- Telefon raqamlar ro‘yxati `(fields.map())`:

  - `fields` massivi ichidagi har bir telefon raqami uchun input yaratadi.
  - `key={field.id}` – React uchun unikallikni ta’minlaydi.
  - `register("...phNumbers.${index}.number")` – har bir inputni formaga bog‘laydi.

- `Remove` tugmasi:

  - Faqat 1-elementdan boshlab `(index > 0)` chiqariladi, chunki hech bo‘lmaganda bitta telefon raqami bo‘lishi kerak.
  - Tugmaga bosilganda `remove(index)` orqali o‘sha telefon raqami o‘chiriladi.

- `Add phone number` tugmasi:
  - `append({ number: "" })` funksiyasi orqali yangi bo‘sh input qo‘shiladi.
