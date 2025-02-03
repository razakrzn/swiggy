import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="bg-backgroudGray">
        <div className="wrapper !w-[75%]">
          <div className="pt-8 pb-[48px] border-t border-black flex justify-between">
            <div className="">
              <h3 className="w-[95%] text-2xl font-[800] opacity-[0.7] tracking-[-0.6px]">
                For better experience,download the Swiggy app now
              </h3>
            </div>
            <div className="flex">
              <a
                className="inline-block mx-2"
                href="https://play.google.com/store/apps/details?id=in.swiggy.android&pcampaignid=web_share"
                target="blank"
              >
                <img
                  className="h-16 max-w-[208px]"
                  src="/images/play_store.png"
                  alt="play_store"
                />
              </a>
              <a
                className="inline-block mx-2"
                href="https://apps.apple.com/in/app/swiggy-food-instamart-dineout/id989540920"
                target="blank"
              >
                <img
                  className="h-[64px] max-w-[208px]"
                  src="/images/app_store.png"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="grid-container">
            <div className="item1 margin-top w-60">
              <div>
                <span className="w-[160px] inline-block">
                  <img src="/images/swiggy-logo-01.svg" alt="" />
                </span>
              </div>
              <div className="opacity-[.5]">© 2024 Swiggy Limited</div>
            </div>
            <div className="item2">
              <ul>
                <li className="margin-top">
                  <div className="heading">Company</div>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">About Us</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Swiggy Corporate</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Careers</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Team</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style"> Swiggy One</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Swiggy Instamart</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Swiggy Dineout</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Swiggy Genie</div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="item3">
              <ul>
                <li className="margin-top">
                  <div className="heading">Contact us</div>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Help & Support</div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/partner-login
                    "
                    target="blank"
                  >
                    <div className="font-style">Partner with us</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Ride with us</div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="item4">
              <ul>
                <li className="margin-top">
                  <div className="heading">Legal</div>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Terms & Conditions</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Cookie Policy</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Privacy Policy</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Investor Relations</div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="item5">
              <ul>
                <li className="margin-top">
                  <div className="heading">Life at Swiggy</div>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Explore with Swiggy</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Swiggy News</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Snackables</div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="item6">
              <ul>
                <li className="margin-top">
                  <div className="heading">Available in:</div>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Bangalore</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Gurgaon</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Hyderabad</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Delhi</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Mumbai</div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="font-style">Pune</div>
                  </Link>
                </li>
                <li>
                  <button className="visible border border-[rgba(2,6,12,0.15)] bg-transparent shadow-none h-8 cursor-pointer px-2 py-1 w-full max-w-[120px] text-left rounded-lg">
                    <div className="flex">
                      <div className="font-[400] text-[13px] leading-[18px] tracking-[-0.3px] text-[rgba(2,6,12,0.7)]">
                        679 cities
                      </div>
                      <div className="mt-[1px] mr-[2px] ml-auto flex">
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="text-[rgba(2,6,12,0.7)] text-[11px]"
                        />
                      </div>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
            <div className="item7">
              <ul>
                <li className="margin-top">
                  <div className="heading">Social Links</div>
                </li>
                <div className="flex gap-[16px] w-full">
                  <a className="w-[16px] h-[18px]" href="/">
                    <img
                      className="h-full w-full object-contain"
                      src="/images/icon-linkedin.png"
                      alt=""
                    />
                  </a>
                  <a className="w-[16px] h-[18px]" href="/">
                    <img
                      className="h-full w-full object-contain"
                      src="/images/icon-instagram.png"
                      alt=""
                    />
                  </a>
                  <a className="w-[16px] h-[18px]" href="/">
                    <img
                      className="h-full w-full object-contain"
                      src="/images/icon-facebook.png"
                      alt=""
                    />
                  </a>
                  <a className="w-[16px] h-[18px]" href="/">
                    <img
                      className="h-full w-full object-contain"
                      src="/images/icon-pinterest.png"
                      alt=""
                    />
                  </a>
                  <a className="w-[16px] h-[18px]" href="/">
                    <img
                      className="h-full w-full object-contain"
                      src="/images/icon-twitter.png"
                      alt=""
                    />
                  </a>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
