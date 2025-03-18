import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z
    .string()
    .nonempty("Email is required")
    .email("Email format not is valid"),
  channel: z.string().nonempty("Channel is required"),
});

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

export default function ZodYoutubeForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Zod Youtube Form</h1>
      <div className="form-control">
        <label htmlFor="username">Username</label>
        <input type="text" {...register("username")} />
        <p className="error-message">{errors.username?.message}</p>
      </div>

      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input type="email" {...register("email")} />
        <p className="error-message">{errors.email?.message}</p>
      </div>

      <div className="form-control">
        <label htmlFor="channel">Channel</label>
        <input type="text" {...register("channel")} />
        <p className="error-message">{errors.channel?.message}</p>
      </div>
      <button>Submit</button>
    </form>
  );
}
