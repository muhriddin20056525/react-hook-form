import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
// import { useEffect } from "react";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

export default function YoutubeForm() {
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
  const { errors, touchedFields, dirtyFields, isDirty } = formState;
  console.log({ touchedFields, dirtyFields, isDirty });

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted");
    console.log(data);
  };

  const handleGetValues = () => {
    console.log("get values", getValues("social"));
    console.log("get values", getValues("social.twitter"));
    console.log("get values", getValues(["username", "channel"]));
  };

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });

  //   return () => subscription.unsubscribe();
  // }, [watch]);

  const handleSetValue = () => {
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  renderCount++;
  return (
    <div className="form-content">
      <h1>Youtube Form ({renderCount / 2}) </h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@gmail.com" ||
                    "Enter different email address"
                  );
                },

                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "Tis domain is not supported"
                  );
                },
              },
            })}
          />
          <p className="error-message">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            {...register("channel", {
              required: {
                value: true,
                message: "Channel is required",
              },
            })}
          />
          <p className="error-message">{errors.channel?.message}</p>
        </div>

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
        </div>

        <div className="form-control">
          <label htmlFor="channel">Facebook</label>
          <input type="text" {...register("social.facebook")} />
          <p className="error-message">{errors.social?.facebook?.message}</p>
        </div>

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
        </div>

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
        </div>

        <button>Click</button>
        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>

        <button type="button" onClick={handleSetValue}>
          Set Value
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
