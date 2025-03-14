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

---

## **📌 11-dars Numeric and Date Values**

React Hook Form'da Numeric and Date Values raqamli va sanani ifodalovchi inputlar bilan ishlash uchun mo'ljallangan. Bu qiymatlar avtomatik ravishda valueAsNumber yoki valueAsDate xususiyatlari orqali mos keluvchi turga o‘giriladi. Misol uchun, type="number" input qiymatini son sifatida, type="date" esa JavaScript Date obyekti sifatida qaytaradi.

```tsx
type FormValues = {
  age: number;
};

const form = useForm<FormValues>({
  defaultValues: {
    age: 0,
  },
});

<div className="form-control">
  <label htmlFor="age">Age</label>
  <input
    type="number"
    {...register("age", {
      valueAsNumber: true,
      required: {
        value: true,
        message: "Age is required",
      },
    })}
  />
  <p className="error-message">{errors.age?.message}</p>
</div>;
```

- `Age` uchun input `valueAsNumber: true` qo'shilishidan oldin string turida qiymat qaytarayotgandi qo'shilgandan keyin number turida qaytardi

```tsx
type FormValues = {
  dob: Date;
};

const form = useForm<FormValues>({
  defaultValues: {
    dob: new Date(),
  },
});

<div className="form-control">
  <label htmlFor="dob">Date Of Birth</label>
  <input
    type="date"
    {...register("dob", {
      valueAsDate: true,
      required: {
        value: true,
        message: "dob is required",
      },
    })}
  />
  <p className="error-message">{errors.dob?.message}</p>
</div>;
```

- `Date` uchun input `valueAsDate: true` qo'shilishidan oldin string turida qiymat qaytarayotgandi qo'shilgandan keyin `Date` turida qaytardi

---

## **📌 12-dars Watch Field Values**

**watch** funksiyasi React Hook Form da forma maydonlarining joriy qiymatlarini kuzatish uchun ishlatiladi. U ma'lum bir inputning yoki butun formaning qiymatini olish va real vaqt rejimida o'zgarishlarni kuzatish imkonini beradi.

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
    phNumbers: [{ number: "" }],
    age: 0,
    dob: new Date(),
  },
});
const { register, control, handleSubmit, formState, watch } = form;
const watchUsername = watch("username");
<h2>{watchUsername}</h2>;
```

- `const watchUsername = watch("username")` - "username" input qiymatini kuzatadi
- Agar `watch()` argumentisiz ishlatilsa, u butun formadagi barcha qiymatlarni qaytaradi.

```tsx
const watchUsername = watch(["username", "email"]);
```

- `username` va `email` inputlarining qiymatlarini array sifatida saqlaydi

```tsx
const watchForm = watch();
<h2>{JSON.stringify(watchForm)}</h2>;
```

- `JSON` formatida form ichidagi barcha inputlarning qiymatini qaytaradi

```tsx
useEffect(() => {
  const subscription = watch((value) => {
    console.log(value);
  });

  return () => subscription.unsubscribe();
}, [watch]);
```

- Bu kod formadagi har qanday input qiymati o'zgarganda uni `console.log` orqali ko'rsatib turadi. Shu bilan birga, komponent `unmount` bo‘lganda kuzatish avtomatik ravishda to‘xtatiladi.

---

## **📌 13-dars Get Field Values**

- `getValues()` funksiyasi yordamida `react-hook-form` ichidagi maydonlarning joriy qiymatlarini olish mumkin.
- Agar `getValues("fieldName")` ishlatilsa, faqat bitta maydonning qiymati olinadi, lekin `getValues()` hech qanday argumentsiz chaqirilsa, barcha maydonlarning qiymatlarini obyekt sifatida qaytaradi.
- `watch()` dan farqli o‘laroq, `getValues()` faqat o‘sha paytdagi qiymatni qaytaradi va form maydonlaridagi o‘zgarishlarni kuzatib bormaydi.

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
    phNumbers: [{ number: "" }],
    age: 0,
    dob: new Date(),
  },
});

const { register, control, handleSubmit, formState, getValues } = form;

const handleGetValues = () => {
  console.log("get values", getValues());
};

<button type="button" onClick={handleGetValues}>
  Get Values
</button>;
```

- `getValues` barcha inputlarning qiymatini oladi

```tsx
const handleGetValues = () => {
  console.log("get values", getValues("social"));
  console.log("get values", getValues("social.twitter"));
};
```

- `getValues("social")` social maydonining qiymatino oladi
- `social` maydoni object sifatida edi `getValues("social.twitter")` orqali uning ichidagi qiymatlarni alohida alohida olish mumkin. `twitter` `social` objecti ichidagi xususiyatlardan biri

```tsx
const handleGetValues = () => {
  console.log("get values", getValues(["username", "channel"]));
};
```

- `console.log("get values", getValues(["username", "channel"]))` bir netcha maydonlarni olish array qaytaradi

---

## **📌 14-dars Set Field Values**

**setValue** funksiyasi React Hook Form da formadagi ma'lum bir input qiymatini dinamik ravishda o'zgartirish uchun ishlatiladi. Bu funksiya bilan input qiymatini kod orqali yangilash va shu o'zgarishlarni kuzatish mumkin.

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
    phNumbers: [{ number: "" }],
    age: 0,
    dob: new Date(),
  },
});

const { register, control, handleSubmit, formState, getValues, setValue } =
  form;

const handleSetValue = () => {
  setValue("username", "Muhriddin");
};

<button type="button" onClick={handleSetValue}>
  Set Value
</button>;
```

- `setValue` funksiyasidan foydalanish
- `handleSetValue` funksiyasi `setValue` dan foydalanib, `username` maydonining qiymatini `Muhriddin` qilib o'zgartiradi.

---

## **📌 15-dars Touched and Dirty States**

**1. Touched State**
Bu holat foydalanuvchi inputga kirib, keyin undan chiqib ketganini bildiradi.
📌 Misol:

- Agar foydalanuvchi inputni bosib ichiga kirdi va hech narsa yozmay chiqib ketsa, bu input touched deb belgilanadi.
- Bu odatda validation xatolarini ko‘rsatish uchun ishlatiladi.

**2. Dirty State**
Bu holat foydalanuvchi inputning qiymatini o‘zgartirganini bildiradi.
📌 Misol:

- Foydalanuvchi inputga kirdi, eski qiymatini o‘chirib yangi qiymat kiritdi – bu input dirty deb belgilanadi.
- Agar foydalanuvchi inputga kirdi, lekin hech narsa o‘zgartirmasa, u dirty bo‘lmaydi.

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
    phNumbers: [{ number: "" }],
    age: 0,
    dob: new Date(),
  },
});
const { register, control, handleSubmit, formState, getValues, setValue } =
  form;
const { errors, touchedFields, dirtyFields, isDirty } = formState;
console.log({ touchedFields, dirtyFields, isDirty });
```

- `touchedFields`, `dirtyFields`, `isDirty` xossalarini chiqarib olish va consolega chiqarish
- `isDirty` – butun forma o‘zgarib-o‘zgarmaganini tekshiradigan boolean `(true/false)` qiymat qaytaradigan state.
  - Agar biror inputning qiymati o‘zgarsa, `isDirty = tru`e bo‘ladi.
  - Agar barcha inputlar o‘zining boshlang‘ich qiymatida bo‘lsa, `isDirty = false` bo‘ladi.

---

## **📌 16-dars Disabling Fields**

`React Hook Form` da `Disabling Fields` (maydonlarni o‘chirib qo‘yish) deganda, formadagi ba’zi inputlarni foydalanuvchi tahrirlashini cheklash tushuniladi. Buni odatda `disabled` atributi yoki `setValue` funksiyasidan foydalanib amalga oshirish mumkin.

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
    phNumbers: [{ number: "" }],
    age: 0,
    dob: new Date(),
  },
});
const {
  register,
  control,
  handleSubmit,
  formState,
  getValues,
  setValue,
  watch,
} = form;

<div className="form-control">
  <label htmlFor="twitter">Twitter</label>
  <input
    type="text"
    {...register("social.twitter", {
      disabled: watch("channel") === "",
      required: "Enter twitter profile",
    })}
  />
  <p className="error-message">{errors.social?.twitter?.message}</p>
</div>;
```

- `watch` – real vaqtda input maydonlarining qiymatini kuzatish
- `<input>` elementi `register` yordamida formaga bog‘langan `(social.twitter)`.
- `disabled`: `watch("channel") === ""`
  - Agar channel maydoni bo‘sh bo‘lsa (""), `social.twitter` inputi bloklanadi (disabled bo‘ladi).
  - Agar `channel` ga qiymat kiritilsa, `social.twitter` inputi faollashadi.
- `required: "Enter twitter profile"`

  - Agar foydalanuvchi `Twitter` profilini kiritmasa, `"Enter twitter profile"` degan xato xabari chiqadi.

- Dinamik disabled: Agar channel maydoni bo‘sh bo‘lsa, social.twitter inputi bloklanadi.
- Validatsiya: required orqali Twitter profilini majburiy qilish mumkin.
- Xatoliklarni ko‘rsatish: errors.social?.twitter?.message orqali xato xabari chiqariladi.

---

## **📌 17-dars Handle Submission Error**

formadagi malumotlar jo'natilayotganda validatsiyadagi xatolarni ushlash uchun ishlatiladi

```tsx
const onError = (errors: FieldErrors<FormValues>) => {
  console.log("Form Errors", errors);
};

<form onSubmit={handleSubmit(onSubmit, onError)} noValidate></form>;
```

- `onError` funksiyasi formada xatoliklar bo‘lsa ishga tushadi.
- `errors` obyekt sifatida keladi va unda xatoliklar haqida ma’lumot bo‘ladi.
- `FieldErrors<FormValues>` bu TypeScript tipi, u formadagi maydonlarning xatoliklarini ifodalaydi.
- `handleSubmit(onSubmit, onError)`
  - Agar hamma maydonlar to‘g‘ri bo‘lsa, `onSubmit` funksiyasi ishga tushadi.
  - Agar xatolik bo‘lsa, `onError` funksiyasi chaqiriladi.

---

## **📌 18-dars Disable Form Submission**

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
    phNumbers: [{ number: "" }],
    age: 0,
    dob: new Date(),
  },
});
const {
  register,
  control,
  handleSubmit,
  formState,
  getValues,
  setValue,
  watch,
} = form;
const { errors, touchedFields, dirtyFields, isDirty, isValid } = formState;
<button disabled={!isDirty || !isValid}>Click</button>;
```

- `const form = useForm<FormValues>({...})`

  - `useForm` hook-i chaqirilmoqda va unga **`FormValues`** nomli interfeys yoki tur orqali shakl qiymatlarining turlari belgilab berilmoqda.
  - `defaultValues` orqali formaning boshlang‘ich qiymatlari berilmoqda.

- `defaultValues: {...}`

  - `username`, `email`, `channel` kabi oddiy input qiymatlarining boshlang‘ich qiymatlari o‘rnatilmoqda.
  - `social: { twitter: "", facebook: "" }` → obyekt ko‘rinishida ijtimoiy tarmoqlarga tegishli qiymatlar berilmoqda.
  - `phoneNumbers: ["", ""]` → massiv ichida ikkita bo‘sh qiymat mavjud.
  - `phNumbers: [{ number: "" }]` → obyekt ichida `number` maydoni bor massiv mavjud.
  - `age: 0` va `dob: new Date()` bilan **yosh va tug‘ilgan sana** boshlang‘ich qiymat sifatida berilmoqda.

- `const { register, control, handleSubmit, formState, getValues, setValue, watch } = form;`

  - `register` → input maydonlarini `useForm` bilan bog‘lash uchun ishlatiladi.
  - `control` → `Controller` komponenti bilan ishlash uchun kerak.
  - `handleSubmit` → formani jo‘natish (`submit`) hodisasini boshqarish uchun ishlatiladi.
  - `formState` → formaning holati (`errors`, `isDirty`, `isValid` va boshqalar) haqida ma’lumot beradi.
  - `getValues` → hozirgi formadagi qiymatlarni olish uchun ishlatiladi.
  - `setValue` → aniq bir input maydoniga qiymat berish uchun ishlatiladi.
  - `watch` → formadagi o‘zgarishlarni kuzatish uchun ishlatiladi.

- `const { errors, touchedFields, dirtyFields, isDirty, isValid } = formState;`

  - `errors` → formadagi validatsiya xatolarini saqlaydi.
  - `touchedFields` → foydalanuvchi tegib o‘tgan input maydonlarini bildiradi.
  - `dirtyFields` → qiymati o‘zgartirilgan maydonlarni bildiradi.
  - `isDirty` → **biror maydon** o‘zgartirilganligini bildiradi.
  - `isValid` → forma to‘g‘ri to‘ldirilgan bo‘lsa `true`, aks holda `false`.

- `<button disabled={!isDirty || !isValid}>Click</button>`
  - `isDirty` `false` bo‘lsa (ya’ni, hech qanday o‘zgarish bo‘lmasa) yoki `isValid` `false` bo‘lsa (ya’ni, noto‘g‘ri to‘ldirilgan bo‘lsa), tugma (`button`) **o‘chirib qo‘yiladi (`disabled`)**.

---

## **📌 19-dars Form Submission State**

```tsx
const { isSubmitting, isSubmitted, isSubmitSuccessful, submitCount } =
  formState;

console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });
```

- **`isSubmitting`** → Form hozir jo‘natilayotgan bo‘lsa (`true`), jo‘natish tugagandan so‘ng (`false`).
- **`isSubmitted`** → Form **kamida bir marta** jo‘natilgan bo‘lsa (`true`).
- **`isSubmitSuccessful`** → Form jo‘natilgandan **muvaffaqiyatli yakunlangan** bo‘lsa (`true`).
- **`submitCount`** → Form **necha marta** jo‘natilganligini bildiradi.

- **Formning real vaqtdagi holatini** tekshirish va `console.log` orqali uni kuzatish mumkin.
- **`isSubmitting`** jo‘natish tugallanguncha **`true`**, keyin **`false`** bo‘ladi.
- **`isSubmitted`** faqat **birinchi marta jo‘natilgandan so‘ng `true`** bo‘ladi.
- **`isSubmitSuccessful`** form muvaffaqiyatli jo‘natilsa, **`true`** bo‘ladi.
- **`submitCount`** form har safar jo‘natilganda **1 birlikka oshadi**.

---

## **📌 20-dars Reset Form**

```tsx
const form = useForm<FormValues>();
const {
  register,
  control,
  handleSubmit,
  formState,
  getValues,
  setValue,
  watch,
  reset,
} = form;

<button onClick={() => reset()} type="button">
  Reset
</button>;
```

- **`useForm<FormValues>()`** → `react-hook-form` dan foydalanib, formani boshqarish uchun hook.
- **`register`** → Input maydonlarini formaga bog‘lash uchun ishlatiladi.
- **`control`** → `Controller` komponenti bilan boshqariladigan inputlar uchun kerak.
- **`handleSubmit`** → Form submit qilinishi uchun ishlatiladigan funksiya.
- **`formState`** → Formning hozirgi holati haqida ma'lumot beruvchi obyekt.
- **`getValues`** → Formdagi maydonlarning hozirgi qiymatlarini olish uchun ishlatiladi.
- **`setValue`** → Form maydonlariga dasturiy ravishda qiymat berish uchun ishlatiladi.
- **`watch`** → Form maydonlaridagi o‘zgarishlarni real vaqtda kuzatish uchun ishlatiladi.
- **`reset`** → Formni dastlabki holatiga qaytarish uchun ishlatiladi.
- **`onClick={() => reset()}`** → Bu tugma bosilganda, form **tozalab yuboriladi**.
- **Form maydonlari o‘zining boshlang‘ich qiymatlariga qaytadi**.
- **Serverdan kelgan validatsiya xatolari ham tozalanadi**.

```tsx
useEffect(() => {
  if (isSubmitSuccessful) {
    reset();
  }
}, [isSubmitSuccessful, reset]);
```

- **`useEffect`** → React komponenti yuklanganda yoki berilgan dependensiyalar (`isSubmitSuccessful`, `reset`) o‘zgarganda ishlaydigan hook.
- **`isSubmitSuccessful`** → Form muvaffaqiyatli jo‘natilgan bo‘lsa (`true`), shuni tekshiradi.
- **`reset()`** → Agar `isSubmitSuccessful` **`true`** bo‘lsa, formani tozalaydi.
- **`[isSubmitSuccessful, reset]`** → `useEffect` faqat `isSubmitSuccessful` yoki `reset` o‘zgarganida qayta ishlaydi.

---

## **📌 21-dars Async Validation**

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
      validate: {
        emailAvailable: async (fieldValue) => {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
          );

          const data = await response.json();
          return data.length == 0 || "Email already exists";
        },
      },
    })}
  />
  <p className="error-message">{errors.email?.message}</p>
</div>
```

- **`validate` (Serverdan tekshirish)**
  - `emailAvailable` → Asinxron funksiya bo‘lib, email mavjudligini API orqali tekshiradi.
  - `fetch("https://jsonplaceholder.typicode.com/users?email=${fieldValue}")`
    - JSONPlaceholder API dan emailni tekshirish uchun foydalanilmoqda.
  - **Agar email bazada mavjud bo‘lsa, `"Email already exists"` xatosi qaytadi.**
  - **Agar email mavjud bo‘lmasa, `true` qaytadi va form valid bo‘ladi.**

---

## **📌 22-dars Validation Modes**

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
    phNumbers: [{ number: "" }],
    age: 0,
    dob: new Date(),
  },
  mode: "all",
});
```

**`mode: "all"` - Validatsiya rejimi**

- `"all"` - Bu validatsiya rejimi bo‘lib, formadagi barcha o‘zgarishlarni kuzatadi va real vaqt rejimida tekshiradi.
- Boshqa variantlar:
  - `"onSubmit"` — faqat submit (yuborish) vaqtida tekshiradi.
  - `"onChange"` — har o‘zgarishda tekshiradi.
  - `"onBlur"` — foydalanuvchi maydondan chiqsa tekshiradi.

---

## **📌 23-dars Manually Trigger Validations**

```tsx
const { trigger } = form;
<button type="button" onClick={() => trigger()}>
  validate
</button>;
```

- `trigger` – Forma maydonlarini validatsiya qilish uchun ishlatiladi.
- Bu oddiy tugma bo‘lib, bosilganda `trigger()` funksiyasini chaqiradi.
- `trigger()` esa formadagi barcha maydonlarni `validatsiya` (tekshirish) qiladi.
- Agar formadagi maydonlar validatsiyadan o‘tmasa, u holda xatoliklarni `formState.errors` orqali ko‘rish mumkin.

```tsx
<button type="button" onClick={() => trigger("channel")}>
  validate
</button>
```

- `trigger("channel")` – faqat "channel" nomli input maydonini validatsiya qiladi.
- Agar `"channel"` inputi noto‘g‘ri to‘ldirilgan bo‘lsa, `formState.errors.channel` orqali xatolikni olish mumkin.
- Agar `"channel"` inputi to‘g‘ri bo‘lsa, hech qanday xatolik qaytmaydi.
