import Link from "next/link";

export default function City() {
  return (
    <>
      <div className="wrapper">
        <div className="my-[16px]">
          <span>
            <Link
              href="/"
              className="mx-[5px] inline-block text-[10px] text-[#93959f]"
            >
              <span>Home</span>
            </Link>
          </span>
          <span className="after:content-['/'] after:text-[#93959f] after:text-[10px]"></span>
          <span className="mx-[5px] inline-block text-[10px] text-[#93959f]">
            Location
          </span>
        </div>
      </div>
    </>
  );
}
