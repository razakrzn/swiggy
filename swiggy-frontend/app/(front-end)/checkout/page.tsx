"use client";
import AuthModal from "@/components/auth/AuthModal";
import { useCart } from "@/contexts/CartContext";
import { useCustomerAuth } from "@/contexts/CustomerAuthContext";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function checkout() {
  const [isAuthModalVisible, setAuthModalVisible] = useState(false);
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerLocation, setCustomerLocation] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const { user } = useCustomerAuth();
  const {
    cartItems,
    totalPrice,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
  } = useCart();
  const router = useRouter();

  console.log("items", cartItems);

  const closePopup = () => {
    setShowPopup(false);
    clearCart();
    router.push("/profile/customerorders");
  };

  const handlePlaceOrder = async () => {
    // Validate customer details
    if (!customerPhone || !customerLocation.trim()) {
      alert("Please fill in all customer details.");
      return;
    }

    // Validate cart
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Validate authentication
    const token = Cookies.get("customer_authToken");
    if (!token) {
      alert("You need to be logged in to place an order.");
      return;
    }

    // Validate user
    if (!user || !user.username) {
      alert("User information is not available. Please log in again.");
      return;
    }

    try {
      const foodItems = cartItems.map((item) => {
        const restaurantId = Number(item.restaurant);
        return {
          ...item,
          restaurantId,
        };
      });

      const restaurantId = foodItems[0]?.restaurantId;

      if (!restaurantId) {
        alert("Restaurant ID not found. Invalid cart data.");
        return;
      }

      const orderDetails = {
        restaurant: restaurantId,
        customer_name: user.username,
        customer_phone: customerPhone,
        customer_location: customerLocation.trim(),
        order_items: cartItems.map((item) => ({
          menu_item: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        total_price: totalPrice,
      };

      // console.log("orderDetails", orderDetails);

      // Place the order
      const orderResponse = await fetch(
        "http://127.0.0.1:8000/api/v1/orders/orders-create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderDetails),
        }
      );

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        throw new Error(errorText);
      }
      setShowPopup(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert(
        `Error placing order: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <>
      <header className="w-full h-[80px] shadow-custom pl-[20px] pr-[20px] bg-white z-0">
        <div className="text-customGray wrapper flex justify-between items-center h-full">
          <div className="left flex justify-between items-center">
            <div className="flex items-center gap-10">
              <Link
                href="/restaurants"
                className=" w-[48px] overflow-hidden inline-block rounded-[15px]"
              >
                <img
                  src="/images/logo-2.png"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="locationContainer group text-[16px] pr-[10px]">
                <span className="">
                  <span className="text-[12.5px] font-extrabold uppercase">
                    Secure Checkout
                  </span>
                </span>
              </div>
            </div>
          </div>
          <nav className="flex justify-between gap-[50px] items-center h-full">
            <Link href="/" className="hover:text-logoColor flex items-center">
              <span className="inline-block w-[18px] mr-[10px]">
                <img
                  className="block w-full"
                  src="/images/help.svg"
                  alt="corporate icon"
                />
              </span>
              <span className="text-[14px] font-medium">Help</span>
            </Link>
            {user && user.username ? (
              <Link
                href="/profile"
                className="text-[14px] font-medium hover:text-logoColor flex items-center"
              >
                <span className="inline-block w-[19px] mr-[10px]">
                  <img
                    className="block w-full"
                    src="/images/signIn.svg"
                    alt="user icon"
                  />
                </span>
                <span className="text-[14px] font-medium capitalize">
                  {user.username}
                </span>
              </Link>
            ) : (
              <button
                onClick={() => setAuthModalVisible(true)}
                className="hover:text-logoColor flex items-center"
              >
                <span className="inline-block w-[19px] mr-[10px]">
                  <img
                    className="block w-full"
                    src="/images/signIn.svg"
                    alt="sign-in icon"
                  />
                </span>
                <span className="text-[14px] font-medium">Sign In</span>
              </button>
            )}
          </nav>
        </div>
        <AuthModal
          isVisible={isAuthModalVisible}
          onClose={() => setAuthModalVisible(false)}
        />
      </header>
      {cartItems.length === 0 ? (
        <>
          <section>
            <div
              className="wrapper !max-w-[800px] !w-[90%] h-[calc(100vh - 80px)] flex justify-center items-center mb-[31px]"
              style={{ height: "calc(100vh - 80px)" }}
            >
              <div className="flex flex-col items-center">
                <div className="w-[271px] h-[256px] bg-[url('/images/checkout.png')] bg-no-repeat bg-cover mx-auto"></div>
                <div className="text-center text-[19px] font-semibold mt-6 opacity-65 ">
                  Your cart is empty
                </div>
                <div className="mt-2 text-[#7e808c] text-[13px] font-normal">
                  You can go to home page to view more restaurants
                </div>
                <Link
                  href="/restaurants"
                  className="mt-7 px-5 py-3 uppercase bg-[#ff5200] cursor-pointer text-center hover:shadow-[0_4px_14px_#d4d5d9] after:"
                >
                  <span className="text-white font-semibold inline-block text-sm w-ful h-full">
                    See restaurants near you
                  </span>
                </Link>
              </div>
            </div>
          </section>
          <section className="bg-[#E9ECEE]">
            <div className="wrapper !w-[80%] ">
              <div className="relative w-full py-8 flex justify-center gap-[30px]">
                <div className="left w-[780px] flex flex-col gap-[20px]">
                  {!user ? (
                    <>
                      <div className="bg-white px-9 py-8 relative">
                        <div className="text mb-10">
                          <h4 className="font-bold text-[15.5px] text-[#282C40]">
                            Oops, something went wrong. Please clear your cart
                            and try again.
                          </h4>
                        </div>
                        <div className="button">
                          <button className="uppercase text-white font-extrabold text-xs px-[28px] h-[40px] bg-logoColor">
                            retry
                          </button>
                        </div>
                        <div className="absolute left-[-30px] top-[34px] w-[40px] h-[40px] bg-[#282C40] shadow-custom-shadow-2 p-2 box-border">
                          <span className="bg-restaurant-closed w-full h-full bg-cover bg-center inline-block "></span>
                        </div>
                      </div>
                      <div className="bg-white px-9 py-8 relative">
                        <div className="mb-10">
                          <h4 className="font-bold text-[15px] text-[#282C40] mb-[7px]">
                            Account
                          </h4>
                          <p className="font-medium text-[14px] text-[#7E808C]">
                            To place your order now, log in to your existing
                            account or sign up.
                          </p>
                        </div>
                        <div className="buttons flex gap-[20px]">
                          <div
                            role="button"
                            onClick={() => setAuthModalVisible(true)}
                            className="login py-2 px-[35px] border border-[#60B247] inline-flex flex-col justify-center items-center"
                          >
                            <small className="font-medium text-[11.5px] text-[#60B247]">
                              Have an account?
                            </small>
                            <span className="uppercase font-bold text-[12.5px] text-[#60B247]">
                              LOG IN
                            </span>
                          </div>
                          <div
                            role="button"
                            onClick={() => setAuthModalVisible(true)}
                            className="login py-2 px-[35px] bg-[#60B247] inline-flex flex-col justify-center items-center"
                          >
                            <small className="font-medium text-[11.5px] text-white">
                              New to swiggy?
                            </small>
                            <span className="uppercase font-bold text-[12.5px] text-white">
                              SIGN UP
                            </span>
                          </div>
                        </div>
                        <div className="absolute left-[-30px] top-[34px] w-[40px] h-[40px] bg-[#282C40] shadow-custom-shadow-2 p-2 box-border flex justify-center items-center">
                          <span className="w-full h-full bg-cover bg-center flex justify-center items-center">
                            <FontAwesomeIcon
                              icon={faUser}
                              size="lg"
                              className="text-white"
                            />
                          </span>
                        </div>
                        <div className="absolute right-[40px] top-[30px] image w-[147px]">
                          <img
                            src="/images/image-login.png"
                            alt="image-login"
                            className="w-full block"
                          />
                        </div>
                      </div>
                      <div className="bg-white px-9 py-8 relative">
                        <div className="">
                          <h3 className="font-bold text-[15.5px] text-[#93959F]">
                            Delivery address
                          </h3>
                        </div>
                        <div className="absolute left-[-30px] top-[34px] w-[40px] h-[40px] bg-white shadow-custom-shadow-2 p-2 box-border flex justify-center items-center">
                          <span className="w-full h-full bg-cover bg-center flex justify-center items-center">
                            <img
                              src="images/address-icon.svg"
                              alt="address icon"
                            />
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="bg-white px-9 py-8 relative">
                      <div className="">
                        <h3 className="font-bold text-[15px] text-[#282C40]">
                          Add a delivery address
                        </h3>
                        <p className="text-[#7e808c] text-[13px]">
                          You seem to be in the new location
                        </p>
                      </div>
                      <div className="absolute left-[-30px] top-[34px] w-[40px] h-[40px] bg-[#282C40] shadow-custom-shadow-2 p-2 box-border flex justify-center items-center">
                        <span className="w-full h-full bg-cover bg-center flex justify-center items-center">
                          <img
                            src="images/address-whiteIcon.svg"
                            alt="address icon"
                          />
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="bg-white px-9 py-8 relative">
                    <div className="">
                      <h3 className="font-bold text-[15.5px] text-[#93959F]">
                        Payment
                      </h3>
                    </div>
                    <div className="absolute left-[-30px] top-[34px] w-[40px] h-[40px] bg-white shadow-custom-shadow-2 p-2 box-border flex justify-center items-center">
                      <span className="w-full h-full bg-cover bg-center flex justify-center items-center">
                        <img src="images/wallet-icon.svg" alt="payment icon" />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-[366px]">
                  <div className="h-full">
                    <div className="px-[30px] bg-transparent">
                      <div className="text-[#7e808c] tracking-[-.3px] text-[32px] font-semibold">
                        Cart Empty
                      </div>
                      <img
                        className="mt-[47px] opacity-50 w-full h-[212px]"
                        src="/images/cart-empty.png"
                        alt="cart empty"
                      />
                      <div className="text-[#93959f] mt-[15px] text-[14px] font-normal max-w-[227px] leading-5">
                        Good food is always cooking! Go ahead, order some yummy
                        items from the menu.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="bg-[#E9ECEE] h-screen">
          <div className="wrapper !w-[80%] ">
            <div className="relative w-full py-8 flex justify-center gap-[30px]">
              <div className="left w-[780px] flex flex-col gap-[20px]">
                {!user ? (
                  <>
                    <div className="bg-white px-9 py-8 relative">
                      <div className="text mb-10">
                        <h4 className="font-bold text-[15.5px] text-[#282C40]">
                          Oops, something went wrong. Please clear your cart and
                          try again.
                        </h4>
                      </div>
                      <div className="button">
                        <button className="uppercase text-white font-extrabold text-xs px-[28px] h-[40px] bg-logoColor">
                          retry
                        </button>
                      </div>
                      <div className="absolute left-[-30px] top-[34px] w-[40px] h-[40px] bg-[#282C40] shadow-custom-shadow-2 p-2 box-border">
                        <span className="bg-restaurant-closed w-full h-full bg-cover bg-center inline-block "></span>
                      </div>
                    </div>
                    <div className="bg-white px-9 py-8 relative">
                      <div className="mb-10">
                        <h4 className="font-bold text-[15px] text-[#282C40] mb-[7px]">
                          Account
                        </h4>
                        <p className="font-medium text-[14px] text-[#7E808C]">
                          To place your order now, log in to your existing
                          account or sign up.
                        </p>
                      </div>
                      <div className="buttons flex gap-[20px]">
                        <div
                          role="button"
                          onClick={() => setAuthModalVisible(true)}
                          className="login py-2 px-[35px] border border-[#60B247] inline-flex flex-col justify-center items-center"
                        >
                          <small className="font-medium text-[11.5px] text-[#60B247]">
                            Have an account?
                          </small>
                          <span className="uppercase font-bold text-[12.5px] text-[#60B247]">
                            LOG IN
                          </span>
                        </div>
                        <div
                          role="button"
                          onClick={() => setAuthModalVisible(true)}
                          className="login py-2 px-[35px] bg-[#60B247] inline-flex flex-col justify-center items-center"
                        >
                          <small className="font-medium text-[11.5px] text-white">
                            New to swiggy?
                          </small>
                          <span className="uppercase font-bold text-[12.5px] text-white">
                            SIGN UP
                          </span>
                        </div>
                      </div>
                      <div className="absolute left-[-30px] top-[34px] w-[40px] h-[40px] bg-[#282C40] shadow-custom-shadow-2 p-2 box-border flex justify-center items-center">
                        <span className="w-full h-full bg-cover bg-center flex justify-center items-center">
                          <FontAwesomeIcon
                            icon={faUser}
                            size="lg"
                            className="text-white"
                          />
                        </span>
                      </div>
                      <div className="absolute right-[40px] top-[30px] image w-[147px]">
                        <img
                          src="/images/image-login.png"
                          alt="image-login"
                          className="w-full block"
                        />
                      </div>
                    </div>
                    <div className="bg-white px-9 py-8 relative">
                      <div className="">
                        <h3 className="font-bold text-[15.5px] text-[#93959F]">
                          Delivery address
                        </h3>
                      </div>
                      <div className="absolute left-[-30px] top-[34px] w-[40px] h-[40px] bg-white shadow-custom-shadow-2 p-2 box-border flex justify-center items-center">
                        <span className="w-full h-full bg-cover bg-center flex justify-center items-center">
                          <img
                            src="images/address-icon.svg"
                            alt="address icon"
                          />
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-white px-9 py-8 relative">
                    <div className="">
                      <h3 className="font-bold text-[15px] text-[#282C40]">
                        Add a delivery address
                      </h3>
                      <p className="text-[#7e808c] text-[13px]">
                        You seem to be in the new location
                      </p>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="location"
                      >
                        location
                      </label>
                      <input
                        type="text"
                        id="location"
                        value={customerLocation}
                        onChange={(e) => setCustomerLocation(e.target.value)}
                        className="border rounded-md w-full p-2"
                        placeholder="location"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="customerPhone"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        id="customerPhone"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="border rounded-md w-full p-2"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="absolute left-[-30px] top-[34px] w-[40px] h-[40px] bg-[#282C40] shadow-custom-shadow-2 p-2 box-border flex justify-center items-center">
                      <span className="w-full h-full bg-cover bg-center flex justify-center items-center">
                        <img
                          src="images/address-whiteIcon.svg"
                          alt="address icon"
                        />
                      </span>
                    </div>
                  </div>
                )}
                <div className="bg-white px-9 py-8 relative">
                  <div className="">
                    <h3 className="font-bold text-[15.5px] text-[#93959F]">
                      Payment
                    </h3>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    className="bg-green-500 text-white py-2 px-4 rounded-md mt-4"
                  >
                    Place Order
                  </button>
                  <div className="absolute left-[-30px] top-[34px] w-[40px] h-[40px] bg-white shadow-custom-shadow-2 p-2 box-border flex justify-center items-center">
                    <span className="w-full h-full bg-cover bg-center flex justify-center items-center">
                      <img src="images/wallet-icon.svg" alt="payment icon" />
                    </span>
                  </div>
                </div>
              </div>

              {showPopup && (
                <div className="popup">
                  <div className="popup-content w-[50%]">
                    <span className="w-16 h-16 inline-block">
                      <img src="/images/popup.svg" alt="tik" />
                    </span>
                    <h2 className="font-medium my-4 capitalize">
                      order placed
                    </h2>
                    <button
                      onClick={closePopup}
                      tabIndex={0}
                      className="popup-button"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}

              {/* food itmes ? */}
              {cartItems.map((item) => (
                <div key={item.id} className="w-[366px]">
                  <div className="h-full">
                    <div className="bg-white px-[30px]">
                      <div className="py-5 flex">
                        <div className="images-wrapper w-[90px]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="block w-full"
                          />
                        </div>
                        <div className="info ml-[15px]">
                          <h3 className="font-semibold text-sm text-[#282C40]">
                            {item.restaurant}
                          </h3>
                          <h6 className="text-xs text-[#767884] mb-[14px]">
                            Kalpetta
                          </h6>
                          <span className="line border-b-2 border-[#282C40] block w-10"></span>
                        </div>
                      </div>
                      <div className="food_items">
                        <div className="flex items-center py-[10px] justify-between">
                          <span className="icon w-3 h-3 inline-block mr-[10px]">
                            <img
                              src="/images/non_veg-icon.svg"
                              alt="non-veg icon"
                            />
                          </span>
                          <span className="font-semibold text-[12.5px] text-[#282C40]">
                            {item.name}
                          </span>
                          <div className="w-[70px] mx-[20px] border border-[#BEBFC5] h-[30px] flex gap-[15px] items-center justify-center">
                            {/* <span className="border-b-2 border-[#BEBFC5] w-[10px] inline-block"></span> */}
                            <div
                              role="button"
                              onClick={() => decreaseQuantity(item.id)}
                            >
                              <span className="font-medium text-[16.5px] text-[#60B247]">
                                -
                              </span>
                            </div>
                            <span className="font-medium text-[12.5px] text-[#60B247]">
                              {item.quantity}
                            </span>
                            <div
                              role="button"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              <span className="font-medium text-[16.5px] text-[#60B247]">
                                +
                              </span>
                            </div>
                          </div>
                          <div className="rate text-right">
                            <p className="orginal text-[9px] line-through">
                              ₹ {item.price}
                            </p>
                            <p className="offer text-xs ">
                              ₹ {item.price * item.quantity}{" "}
                              {/* Update price based on quantity */}
                            </p>
                          </div>
                        </div>
                        <div className="relative bg-[#F9F9F9] p-4 mt-[15px] pl-10 flex items-center">
                          <span className="font-medium text-[12px] text-[#9496A0]">
                            Any suggestions? We will pass it on...
                          </span>
                          <span className="absolute w-[10px] top-[20px] left-[20px]">
                            <img src="/images/quote.png" alt="quote" />
                          </span>
                        </div>
                        <div className="mt-[15px]">
                          <div className="title mb-[10px] font-semibold capitalize">
                            <h5 className="">bill details</h5>
                          </div>
                          <div className="column">
                            <span className="text">item total</span>
                            <span className="rate">115</span>
                          </div>
                          <div className="column">
                            <span className="text">
                              Delivery Fee | 13.5 kms
                            </span>
                            <span className="rate">20</span>
                          </div>
                          <div className="column border-b border-[#E9E9EB] mb-[9px]">
                            <span className="text">Extra discount for you</span>
                            <span className="rate">40</span>
                          </div>
                          <div className="column">
                            <span className="text">Platform fee</span>
                            <div>
                              <span className="rate line-through text-[#E5E5E5] mr-2">
                                7.00
                              </span>
                              <span className="rate">6</span>
                            </div>
                          </div>
                          <div className="column border-b-2 border-[#282C40] !pb-5">
                            <span className="text">
                              GST and Restaurant Charges
                            </span>
                            <span className="rate">27.83</span>
                          </div>
                        </div>
                        <div className="py-5 column">
                          <h6 className="font-bold text-[12.5px] text-[#282C40] uppercase">
                            TO PAY
                          </h6>
                          <span className="font-bold text-[12.5px] text-[#282C40] uppercase">
                            ₹ {item.price * item.quantity} {/* Updated price */}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
