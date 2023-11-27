import { ClientLayout } from "components";

export default function ProfileLayout({ children }) {
  return (
    <div>
      <ClientLayout />
      {children}
    </div>
  );
}
