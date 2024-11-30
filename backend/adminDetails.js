import brcypt from "bcryptjs";

export const ADMIN_USERNAME="Praveen";
export const ADMIN_PASSWORD_HASH=await brcypt.hash("prav@123",10);
