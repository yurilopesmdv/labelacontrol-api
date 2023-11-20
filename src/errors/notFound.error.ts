import { AplicationError } from "../protocols";

export default function notFoundError(): AplicationError {
  return {
    name: "NotFoundError",
    message: "Sale was not found!"
  }
}