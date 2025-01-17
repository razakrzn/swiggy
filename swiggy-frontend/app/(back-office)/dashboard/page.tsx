import Link from "next/link";

export default function dashboard() {
  return (
    <>
      <div className="mx-auto w-90 text-center">
        <h1>dashboard</h1>
        <h2>welcome to swiggy dashboard</h2>
        <Link href="/dashboard/orders">your orders</Link>
      </div>
    </>
  );
}
