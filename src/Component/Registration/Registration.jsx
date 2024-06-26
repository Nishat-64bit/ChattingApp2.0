import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import RegistrationImg from "../../assets/RegistrationImg.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";

const Registration = () => {
  //? ================ Firebase Hook start ======================= //
  const auth = getAuth();
  //? ================ Firebase Hook end ======================= //
    //react router navigate
    const navigate = useNavigate();

  //? ================ useState Hook ======================= //
  const [Email, SetEmail] = useState("");
  const [FullName, SetFullName] = useState("");
  const [Password, SetPassword] = useState("");
  const [Eye, setEye] = useState(false); // use state value = Eye
  const [loading, setloading] = useState(false);
  //? ================ useState Hook ======================= //

  //* ================ Error useState Hook ======================= //

  const [EmailError, setEmailError] = useState("");
  const [FullNameError, setFullNameError] = useState("");
  const [PasswordError, setPasswordError] = useState("");

  //* ================ Error useState Hook ======================= //

  //!  ================ prevent Reload ======================= //
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  //! ================ prevent Reload ======================= //

  //? ======================= All Handle Functionality ========================= //

  // ======================= Handle Email Functionality ========================= //
  //  const HandleEmail = (event)=>{
  //     SetEmail(event.target.value); 
  // As same as Fullname / Password but we dont need this method cause we nest them in onchange func

  //  }
  // ======================= Handle Email Functionality ========================= //

  

  //? ======================= Handle eye Functionality start ========================= //
  const handleEye = () => {
    setEye(!Eye);
    // console.log(Eye);
  };
  //? ======================= Handle eye Functionality end ========================= //

  //*======================= Regex Email & Password Functionality start ========================= //
  const EmailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3}$/;
  const email = "nishatmahmudur89@gmail.com";
  //console.log(EmailRegex.test(email));

  const PasswordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.\-+*/])[A-Za-z\d@$!%*?&.\-+*/]{8,}$/;
  const password1 = "SoftwareEngineer75@/com";
  //console.log(PasswordRegex.test(password1));
  //*======================= Regex Email & Password Functionality end ========================= //

  
  
  // Regestration Page
  function handleRegestration() {
    //* ======================= Handle signup Functionality ========================= //
// ! user input dibe start //
    if (!Email) {
      setEmailError("Email Credential Missing Or Wrong ⚠️");
    } else if (!EmailRegex.test(Email)) {
      setEmailError("Email Credential Missing Or Wrong ⚠️");
    } else if (!FullName) {
      setEmailError("");
      setFullNameError("Name is missing ⚠️");
    } else if (!Password) {
      setEmailError("");
      setFullNameError("");
      setPasswordError("Passwrod Credential Missing Or Wrong ⚠️");
    } else if (!PasswordRegex.test(Password)) {
      setPasswordError("Password Credential Missing Or Wrong ⚠️");
    } else {
      setloading(true);
      SetEmail("");
      SetFullName("");
      SetPassword("");
      setEmailError("");
      setFullNameError("");
      setPasswordError("");
      //console.log("everything is oke");
      // ! user input dibe end //  
      //*======================= Handle signup Functionality End ========================= //
      //? user jodi succesfully input fill up  kore mane valid sobkicu dei  (email,password )  dei ===>
         //?=======================  signup  new user Firebase start ========================= //
      createUserWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
          console.log(userCredential);
          // send mail 
          sendEmailVerification(auth.currentUser).then(() => {
            setloading(false);
            toast.success("Email Verification Link Sent", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
            setTimeout(() => {
              navigate('/login')
            }, 3000);
            console.log("verification mail sent");
          });
        })
        .catch((error) => {
          setloading(false)
          if (
            error.message === "Firebase: Error (auth/email-already-in-use)."
          ) {
            toast.warn(`Email Already In Use `, {
              position: "top-right",
              autoClose: 20000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
          }
        })
        .finally(() => {
          // setloading(false); //acca
        });
    }
  }
  // const user = auth.currentUser;
  // console.log(user.email);
  // console.log(user.emailVerified);
  //?=======================  signup  new use Firebase end   ========================= //

  // ======================= All handle Functionality End ========================= //
  return (
    <>
      <ToastContainer />
      <div className=" flex justify-between items-center">
        <div className="  w-1/2 h-fullvh flex justify-center items-center ">
          <div>
            <h1 className="font-Nunito text-dark-blue font-bold text-4xl mb-3 pt-10">
              Get started with easily register
            </h1>
            <h3 className="font-Nunito text-black font-normal text-xl opacity-50 pb-5">
              Free register and you can enjoy it
            </h3>
            <form onSubmit={handleSubmit}>
              {/* email start */}
              <div className="my-3">
                <label
                  htmlFor="Email"
                  className="font-Nunito font-semibold text-[12px] text-dark-blue opacity-70 tracking-wide"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Ladushing691@gmail.com"
                  name="Email"
                  id="Email"
                  value={Email}
                  autoComplete="off"
                  className="font-Nunito py-4 text-dark-blue text-xl font-medium border-2 border-dark-blue rounded-lg opacity-30 w-full px-5"
                  // ======================= Handle Email Functionality ========================= //
                  onChange={(event) => SetEmail(event.target.value)}
                  // ======================= Handle Email Functionality ========================= //
                />
              </div>

              {/* email error start and its functionality start*/}
              {EmailError && (
                <span className="text-red-400 font-Nunito font-normal text-md">
                  {EmailError}
                </span>
              )}
              {/* email error end and its functionality end */}

              {/* email end */}

              {/* Full name input start */}
              <div className="my-3">
                <label
                  htmlFor="fullname"
                  className="font-Nunito font-semibold text-[12px] text-dark-blue opacity-70 tracking-wide"
                >
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Ladushing GTG"
                  name="fullname"
                  id="fullname"
                  value={FullName}
                  autoComplete="off"
                  className="font-Nunito py-4 text-dark-blue text-xl font-medium border-2 border-dark-blue rounded-lg opacity-30 w-full px-5"
                  // ======================= Handle Name Functionality ========================= /
                  onChange={(event) => SetFullName(event.target.value)}
                  // ======================= Handle Name Functionality ========================= /
                />
              </div>

              {/* Full name error start and its functionality start*/}
              {FullNameError && (
                <span className="text-red-400 font-Nunito font-normal text-md">
                  {FullNameError}
                </span>
              )}
              {/* Full name error start and its functionality start*/}

              {/* Full name input end */}

              {/* password start */}
              <div className="my-3 relative ">
                <label
                  htmlFor="Password"
                  className="font-semibold text-[12px] text-dark-blue opacity-70 tracking-wide font-Nunito"
                >
                  Password
                </label>
                <input
                  type={Eye ? "text" : "password"}
                  placeholder="1234@adfdsaf"
                  name="Password"
                  id="Password"
                  value={Password}
                  autoComplete="off"
                  className="py-4 text-dark-blue text-xl font-medium border-2 border-dark-blue rounded-lg opacity-30 w-full px-5 font-Nunito "
                  // ======================= Handle Password Functionality ========================= //
                  onChange={(event) => SetPassword(event.target.value)}
                  // ======================= Handle Password Functionality ========================= //
                />

                {/* eye button start */}
                <div
                  className="absolute top-[53%] right-[3%] text-dark-blue opacity-30 cursor-pointer"
                  // ======================= Handle Eye Functionality ========================= //
                  onClick={handleEye} /// ! direct func call na kore setEye(!Eye) korte paren
                  // ======================= Handle Eye Functionality ========================= //
                >
                  {Eye ? <FaRegEye /> : <FaEyeSlash />}
                </div>
                {/* eye button End */}
              </div>

              {/* Password error start and its functionality start*/}
              {PasswordError && (
                <span className="text-red-400 font-Nunito font-normal text-md">
                  {PasswordError}
                </span>
              )}
              {/* Password error start and its functionality End*/}

              {/* password end */}

              {/* button start */}
              <button
                type="submit"
                className="w-full py-5 rounded-[86px] bg-btnColor text-white text-xl font-normal mt-3 font-Nunito relative"
                // ======================= Handle login / signup Functionality ========================= //
                onClick={handleRegestration}
                // ======================= Handle login / signup Functionality ========================= //
              >
                {/* loader functionality start */}
                {loading && ( //? loading jeheto postion kora tai eye er moto direct object kore kora jai
                  <div>
                    <div class="loader absolute top-[36%] left-[34%]"></div>
                    <div class="loader absolute top-[36%] right-[34%]"></div>
                  </div>
                )}
                {/* loader functionality end */}
                Sign up
              </button>

              {/* button end */}
            </form>

            {/* sign UP start & LOGIN  functionality */}
            <h3 className="text-center font-OpenSans font-normal text-[#03014C] text-sm mt-4">
              Already have an account?
              <span className="text-[#EA6C00] ml-1 cursor-pointer hover:underline hover:decoration-dark-blue ">
                <Link to={"/login"} className="hover:underline hover:decoration-dark-blue">Sign In</Link>
              </span>
            </h3>
            {/* sign UP End & LOGIN functionality  */}
          </div>
        </div>
        <div className=" w-1/2 h-fullvh">
          <img
            src={RegistrationImg}
            alt={RegistrationImg}
            className=" min-w-full h-screen"
          />
        </div>
      </div>
    </>
  );
};

export default Registration;
