import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
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
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted");
    console.log(data);
  };

  renderCount++;
  return (
    <div className="form-content">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>Youtube Form ({renderCount / 2}) </h1>
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
          <input type="text" {...register("social.twitter")} />
          <p className="error-message">{errors.social?.twitter?.message}</p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Facebook</label>
          <input type="text" {...register("social.facebook")} />
          <p className="error-message">{errors.social?.facebook?.message}</p>
        </div>

        <button>Click</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
