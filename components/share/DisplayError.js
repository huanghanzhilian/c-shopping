import Icons from "./Icons";

export default function DisplayError({ errors }) {
  return (
    <div className='error-msg'>
      {errors && <Icons.Exclamation />}
      <span>{errors && errors.message}</span>
    </div>
  );
}
