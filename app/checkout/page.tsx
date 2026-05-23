import { redirect } from "next/navigation";
import { CHECKOUT_URL } from "../components/ui/Button";

export default function Checkout() {
  redirect(CHECKOUT_URL);
}
