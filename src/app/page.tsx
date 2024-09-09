import { Button, Input } from "antd";
import { currentUser } from "@clerk/nextjs/server";
import HotelPage from "./admin/hotels/page";



export default async function Home() {

  const user = await currentUser();
  return (
    <div className=" container mx-auto">
      <h1 className="text-3xl mr-1 text-center"> <span className="sm:hidden">{user ? `Hi, ${user.firstName}. Wielcome` : ''} </span>  </h1>
      <HotelPage />

    </div>

  );
}
