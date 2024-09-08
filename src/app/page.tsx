import { Button, Input } from "antd";
import { currentUser } from "@clerk/nextjs/server";


export default async function Home() {

  const user = await currentUser();
  return (
    <div className=" container mx-auto flex flex-col items-center justify-center gap-2">
      <h1 className="text-3xl mr-1"> <span className="sm:hidden">{user ? `Hello ${user.firstName}` : ''} </span>  </h1>
      <Button type="primary">Button</Button>
      <Button type="default">Button</Button>
      <Button type="link">Button</Button>
      <Input placeholder="Basic usage" />

    </div>

  );
}
